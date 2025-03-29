import {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import "./index.scss"

let itemHeight = 300;
const WeatherFutureDisplay: FC = () => {
    const {weatherState} = useContext(WeatherContext);
    const [startIndex, setStartIndex] = useState(0);
    const boxRef = useRef(null);
    const [boxHeight, setBoxHeight] = useState(0);
    const [totalItems, setTotalItems] = useState(weatherState.future.length);

    useEffect(() => {
        setTotalItems(weatherState.future.length)
        const box = boxRef.current;
        setBoxHeight(box.clientHeight);
        const handleScroll = () => {
            const scrollTop = box.scrollTop;
            const newIndex = Math.floor(scrollTop / itemHeight);
            setStartIndex(newIndex);
        }
        box.addEventListener('scroll', handleScroll);
        return () => box.removeEventListener('scroll', handleScroll);
    }, [])

    const list = weatherState.future.slice(startIndex, startIndex + Math.ceil(boxHeight / itemHeight));

    return <>
        <div className={"title"}>未来一周天气</div>
        <div ref={boxRef} className={"box-ref"}>
            <div className={'sky-content'} style={{height: itemHeight * weatherState.future.length}}>
                <ul className={'sky-ul'} style={{position: 'absolute', top: `${startIndex * itemHeight}px`}}>
                    {list.map((item, i) =>
                        <li className={[item.textDay === "阴" ? "sky-li-yin" : "sky-li-sun", "sky-li"].join(" ")}
                            key={i + startIndex} style={{height: itemHeight}}>
                            <div className={"sky-content-left"}>
                                <span>{item.fxDate}</span>
                                <div className="icon-text">
                                    <i className={["qi-2205", item.tempMax > 30 && "temp-hot" || "temp-tepid", item.tempMax < 10 && "temp-cold" || "temp-tepid"].join(" ")}/><span>温度:{item.tempMin}-{item.tempMax}(℃)</span>
                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-502", "gray"].join(" ")}/><span>能见度:{item.vis}公里</span>
                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-305", "blue"].join(" ")}/><span>总降水量:{item.precip}mm</span>
                                </div>
                                <div className="icon-text">
                                    <i className={["qi-399-fill", "blue"].join(" ")}/><span>相对湿度:{item.humidity}%</span>
                                </div>
                            </div>
                            <div className={"sky-content-middle"}>
                                <div>白天</div>
                                <div className="icon-text"><i
                                    className={["qi-" + item.iconDay, item.textDay === "晴" ? "text-orange" : "text-gray"].join(" ")}/><span>{item.textDay}</span>
                                </div>
                                <div className="icon-text"><i
                                    className={[item.windSpeedDay >= 5 ? "qi-2306" : "qi-2352", "gray"].join(" ")}/><span>{item.windDirDay}</span><span>{item.windScaleDay}(级)</span>
                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-100-fill","text-white"].join(" ")}/>
                                    <span>日出:{item.sunrise}</span>
                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-100-fill" ,"text-gray"].join(" ")}/>
                                    <span>日落:{item.sunset}</span>
                                </div>
                            </div>
                            <div className={"sky-content-right"}>
                                <div>夜间</div>
                                <div className="icon-text"><i
                                    className={["qi-" + item.iconNight].join(" ")}/><span>{item.textDay}</span>
                                </div>

                                <div className="icon-text">
                                    <i
                                    className={[item.windSpeedNight >= 5 ? "qi-2306" : "qi-2352", "gray"].join(" ")}/><span>{item.windDirNight}</span> <span>{item.windScaleNight}(级)</span>
                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-150-fill" ,"text-white"].join(" ")}/>
                                    <span>月升:{item.moonrise}</span>

                                </div>
                                <div className={"icon-text"}>
                                    <i className={["qi-150-fill" ,"text-gray"].join(" ")}/>
                                    <span>月落:{item.moonset}</span>
                                </div>
                            </div>
                        </li>)}
                </ul>
            </div>
        </div>
    </>
}

export default WeatherFutureDisplay;


