import {FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import "./index.scss";
import clsx from 'clsx';

const ITEM_HEIGHT = 300;
const ICON_CLASSES = {
    TEMPERATURE: 'qi-2205',
    VISIBILITY: 'qi-502',
    PRECIPITATION: 'qi-305',
    HUMIDITY: 'qi-399-fill',
    SUN: 'qi-100-fill',
    MOON: 'qi-150-fill',
    WIND: {
        STRONG: 'qi-2306',
        WEAK: 'qi-2352'
    }
};
const WeatherFutureDisplay: FC = () => {
    const {weatherState} = useContext(WeatherContext);
    const [startIndex, setStartIndex] = useState(0);
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxHeight, setBoxHeight] = useState(0);
    const totalItems = weatherState.future.length;

    const visibleItems = useMemo(() => {
        const visibleCount = Math.ceil(boxHeight / ITEM_HEIGHT);
        return weatherState.future.slice(startIndex, startIndex + visibleCount);
    }, [weatherState.future, startIndex, boxHeight]);

    const handleScroll = useCallback(() => {
        if (boxRef.current) {
            const scrollTop = boxRef.current.scrollTop;
            setStartIndex(Math.floor(scrollTop / ITEM_HEIGHT));
        }
    }, []);

    useEffect(() => {
        const box = boxRef.current;
        if (box) {
            setBoxHeight(box.clientHeight);
            box.addEventListener('scroll', handleScroll);
            return () => box.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll])


    const renderWeatherItem = (item, index: number) => {
        const isCloudy = item.textDay === "阴";
        const isSunny = item.textDay === "晴";
        const tempClass = item.tempMax > 30 ? 'temp-hot' : item.tempMax < 10 ? 'temp-cold' : 'temp-tepid';
        const dayWindIcon = item.windSpeedDay >= 5 ? ICON_CLASSES.WIND.STRONG : ICON_CLASSES.WIND.WEAK;
        const nightWindIcon = item.windSpeedNight >= 5 ? ICON_CLASSES.WIND.STRONG : ICON_CLASSES.WIND.WEAK;

        return (
            <li
                key={`${item.fxDate}-${index}`}
                className={clsx('sky-li', { 'sky-li-yin': isCloudy, 'sky-li-sun': !isCloudy })}
                style={{ height: ITEM_HEIGHT }}
            >
                <div className="sky-content-left">
                    <span>{item.fxDate}</span>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.TEMPERATURE, tempClass)} />
                        <span>温度: {item.tempMin}-{item.tempMax}℃</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.VISIBILITY, 'gray')} />
                        <span>能见度: {item.vis}公里</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.PRECIPITATION, 'blue')} />
                        <span>总降水量: {item.precip}mm</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.HUMIDITY, 'blue')} />
                        <span>相对湿度: {item.humidity}%</span>
                    </div>
                </div>

                <div className="sky-content-middle">
                    <div>白天</div>
                    <div className="icon-text">
                        <i className={clsx(`qi-${item.iconDay}`, { 'text-orange': isSunny, 'text-gray': !isSunny })} />
                        <span>{item.textDay}</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(dayWindIcon, 'gray')} />
                        <span>{item.windDirDay}</span>
                        <span>{item.windScaleDay}级</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.SUN, 'text-white')} />
                        <span>日出: {item.sunrise}</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.SUN, 'text-gray')} />
                        <span>日落: {item.sunset}</span>
                    </div>
                </div>

                <div className="sky-content-right">
                    <div>夜间</div>
                    <div className="icon-text">
                        <i className={`qi-${item.iconNight}`} />
                        <span>{item.textNight}</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(nightWindIcon, 'gray')} />
                        <span>{item.windDirNight}</span>
                        <span>{item.windScaleNight}级</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.MOON, 'text-white')} />
                        <span>月升: {item.moonrise}</span>
                    </div>
                    <div className="icon-text">
                        <i className={clsx(ICON_CLASSES.MOON, 'text-gray')} />
                        <span>月落: {item.moonset}</span>
                    </div>
                </div>
            </li>
        );
    };

    return <div className={"weather-future-container"}>
        <div className={"title"}>未来一周天气</div>
        <div ref={boxRef} className={"box-ref"}>
            <div className={'sky-content'} style={{height: ITEM_HEIGHT * weatherState.future.length}}>
                <ul className={'sky-ul'} style={{position: 'absolute', top: `${startIndex * ITEM_HEIGHT}px`}}>
                    {visibleItems.map(renderWeatherItem)}
                </ul>
            </div>
        </div>
    </div>
}

export default WeatherFutureDisplay;


