import {FC, useContext, useEffect} from "react";
import {JWTService} from "@/service/JWTService";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import WeatherFutureDisplay from "@/components/weather/weatherFuture/WeatherFutureDisplay";
import WeatherTodayDisplay from "@/components/weather/weatherToday/WeatherTodayDisplay";

const WeatherDisplay:FC=()=>{

    useEffect(()=>{

    },[])

    return <>
        <WeatherTodayDisplay/>
        <WeatherFutureDisplay/>
    </>
}

export default WeatherDisplay;


