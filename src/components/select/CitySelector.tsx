import React, {useState, useEffect, useRef, useMemo, useContext, memo, useCallback} from 'react';
import globalDataServer from "@/service/GlobalData.server";
import TabComponent from "@/components/select/tabComponent/tabComponent";
import SearchInputComponent from "@/components/select/search/SearchInputComponent";
import CityComponent from "@/components/select/cityComponent/cityComponent";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import {WeatherData} from "@/service/GlobalData.server";
import "./index.scss"
import {useGetWeather} from "@/hooks/useWeather";
import {useCityData} from "@/hooks/useCityData";

const CitySelector = memo((props) => {
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const [cityList, setCityList] = useState([])
    const [active, setActive] = useState("上海")
    const {getWeather} = useGetWeather()
    const { fetchHotCities, searchCities } = useCityData();

    // 模拟API数据获取
    useEffect(() => {
        const fetchCity = async () => {
            try {
                setLoading(true)
                const cities = await fetchHotCities();
                setCityList(cities);
                await getWeather();
            } catch (err) {
                console.error('初始化天气数据失败：',err)
            } finally {
                setLoading(false)
            }
        }

        fetchCity()
    }, []);


    // 搜索城市（模拟）
    const onSearch = useCallback(async (value) => {
        if (!value.trim()) return;

        try {
            setLoading(true);
            const locations = await searchCities(value);
            const cityname = locations[0]?.tz.toLowerCase().replace("asia/", "");
            if(locations.length > 0){
                setActive(value);
                if(locations[0]?.name === value || cityname === value){
                    const id = locations[0].id;
                    await getWeather(id)
                }
                setLocation(locations)
            }
        }catch (e) {
            console.error('搜索失败:', e);
        }finally {
            setLoading(false);
        }
    },[searchCities, getWeather])

    // 选择城市后的回调
    const handleChange = useCallback(async (value:string, id?:string) => {
        setActive(value);
        if (!id) {//省市
            const locations = await searchCities(value);
            if (locations[0].name === value) {//当前选择为城市不是省
                //获取当前城市天气
                if(locations[0]?.id){
                    await getWeather(locations[0].id);
                }
            }
            setLocation(locations)
        } else {//市区
            await getWeather(id);
        }
    },[getWeather, searchCities]);

    const isAllEnglish = (str) => {
        return /^[a-zA-Z]+$/.test(str);
    }

    const onChangeTab = useCallback(async (item) => {
        setLocation([]);
        if (isAllEnglish(item)) {
            setCurrentItem(item);
        } else {
            const cityList = await fetchHotCities();
            setCityList(cityList)
            setCurrentItem('');
        }
    },[])


    const provinces = useMemo(() => {
        if (!currentItem) return [];
        const lowercase = currentItem.toLowerCase();
        return Object.entries(globalDataServer.provinces)
            .filter(([_, p]) => lowercase.includes(p.toLowerCase()))
            .map(([code]) => code);
    }, [currentItem])

    return (
        <>
            <div className={'city-selector'}>
                <div className={'text-inverse'}>{active}天气</div>
                <SearchInputComponent placeholder={'搜索国内城市/区域名称'} onSearch={onSearch}></SearchInputComponent>
                <div className={'city-container'}>
                    <TabComponent onChangeTab={onChangeTab}/>
                    <CityComponent provinces={provinces.length > 0 ? provinces : cityList} handleChange={handleChange}
                                   location={location} propsActive={active}/>
                </div>
            </div>
        </>
    );
});

export default CitySelector;