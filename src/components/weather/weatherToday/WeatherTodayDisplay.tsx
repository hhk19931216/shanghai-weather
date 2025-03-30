import {FC, memo, useContext, useEffect, useMemo} from "react";

import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import "./index.scss"

const WEATHER_ICONS = {
    WIND: {
        strong: 'qi-2306',
        weak: 'qi-2352'
    },
    TEMPERATURE: 'qi-2205',
    HUMIDITY: 'qi-1036'
} as const;

const WeatherTodayDisplay: FC = memo(() => {
    const {weatherState} = useContext(WeatherContext);

    const windIconClass = useMemo(() => (
        weatherState.today.windSpeed >= 5 ? WEATHER_ICONS.WIND.strong : WEATHER_ICONS.WIND.weak
    ), [weatherState.today.windSpeed]);

    const renderWeatherItem = (icon: string, ...texts: (string | number)[]) => (
        <li className="icon-text">
            <i className={icon} />
            {texts.map((text, index) => (
                <span key={index}>{text}</span>
            ))}
        </li>
    );

    return <>
        <div className={'today-weather-content'}>
                <div className={"title"}>当前天气</div>
                <ul className={"sky-content-today"}>
                    {renderWeatherItem(
                        `qi-${weatherState.today.icon}`,
                        weatherState.today.text
                    )}
                    {renderWeatherItem(
                        WEATHER_ICONS.TEMPERATURE,
                        `温度 ${weatherState.today.temp}`
                    )}
                    {renderWeatherItem(
                        windIconClass,
                        weatherState.today.windDir,
                        `${weatherState.today.windScale}级`
                    )}
                    {renderWeatherItem(
                        WEATHER_ICONS.HUMIDITY,
                        `相对湿度: ${weatherState.today.humidity}%`
                    )}
                </ul>
        </div>
    </>
})

export default WeatherTodayDisplay;


