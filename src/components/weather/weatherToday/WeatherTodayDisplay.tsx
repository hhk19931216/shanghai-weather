import {FC, useContext, useEffect} from "react";

import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import "./index.scss"

const WeatherTodayDisplay: FC = () => {
    const {weatherState} = useContext(WeatherContext);

    useEffect(() => {
        console.log(weatherState)
    })

    return <>
        <div className={'today-weather-content'}>
                <div className={"title"}>当前天气</div>
                <ul className={"sky-content-today"}>
                    <li className="icon-text">
                        <i className={"qi-" + weatherState.today.icon}/><span>{weatherState.today.text}</span>
                    </li>
                    <li className="icon-text">
                        <i className="qi-2205"/><span>温度{weatherState.today.temp}</span>
                    </li>
                    <li className="icon-text">
                        <i className={weatherState.today.windSpeed >= 5 ? "qi-2306" : "qi-2352"}/><span>{weatherState.today.windDir}</span><span>{weatherState.today.windScale}级</span>
                    </li>
                    <li className="icon-text">
                        <i className="qi-1036"/><span>相对湿度:{weatherState.today.humidity}%</span>
                    </li>
                </ul>
        </div>
    </>
}

export default WeatherTodayDisplay;


