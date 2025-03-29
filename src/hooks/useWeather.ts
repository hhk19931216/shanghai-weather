import {useContext} from "react";
import globalDataServer, {WeatherData,weatherType} from "@/service/GlobalData.server";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";

export const useGetWeather = ()=>{
    const { setWeatherState } = useContext(WeatherContext);

    const getWeather = async(id?:any) =>{
        const weatherDataToday = await globalDataServer.getCurrentWeather(id);
        const todayData:WeatherData = weatherDataToday.now;//当前天气
        const futureWeatherData = await globalDataServer.getFutureWeather(id);
        const futureData:weatherType[] = futureWeatherData.daily;//未来天气
        setWeatherState({today:todayData,future:futureData});
    }

    return {getWeather}
}