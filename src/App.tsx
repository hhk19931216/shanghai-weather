import React from "react";
import {WeatherProvider} from "@/components/weathercomponents/WeatherComponent";
import CitySelector from "@/components/select/SelectCitys";
import WeatherDisplay from "@/components/weather/WeatherDisplay";
import "./App.css"
import 'qweather-icons/font/qweather-icons.css';

function App() {
  return (
    <>
        <WeatherProvider>
                <CitySelector/>
                <WeatherDisplay />
        </WeatherProvider>
    </>
  )
}

export default App
