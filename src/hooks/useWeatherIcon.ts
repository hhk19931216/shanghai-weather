import {useMemo} from "react";
import {faBaseball, faCloud, faCloudRain, faCloudSun, faSnowflake, faSun} from "@fortawesome/free-solid-svg-icons";

export const useWeatherIcon = (item)=>{

    const weatherIcon = useMemo(()=>{
        switch (true) {
            case /晴/.test(item.textDay):
                return faSun;
            case /阴/.test(item.textDay):
                return faCloud
            case /雨/.test(item.textDay):
                return faCloudRain
            case /雪/.test(item.textDay):
                return faSnowflake
            case /多云/.test(item.textDay):
                return faCloudSun
            default:
                return faBaseball
        }
    },[item.textDay]);

    return [weatherIcon]
}