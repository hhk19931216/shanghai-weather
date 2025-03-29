import {createContext, useState} from 'react';

const WeatherContext = createContext(null);

function WeatherProvider({children}) {
    const [weatherState, setWeatherState] = useState({today:{},future:[]});

    return (
        <WeatherContext.Provider value={{weatherState, setWeatherState}}>
            {children}
        </WeatherContext.Provider>
    );
}

export {WeatherContext, WeatherProvider};