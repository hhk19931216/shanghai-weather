import React, {useState, useEffect, useRef, useMemo, useContext, memo} from 'react';
import {message} from 'antd';
// import {searchCity} from "@/service/GlobalData.server";
import globalDataServer from "@/service/GlobalData.server";
import TabComponent from "@/components/select/tabComponent/tabComponent";
import SearchInputComponent from "@/components/select/search/SearchInputComponent";
import CityComponent from "@/components/select/cityComponent/cityComponent";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import {WeatherData} from "@/service/GlobalData.server";
// import {WeatherEnum} from "@/components/weathercomponents/WeatherComponent";
import "./index.scss"
import {useGetWeather} from "@/hooks/useWeather";

const CitySelector = memo((props) => {
    const [location,setLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentItem,setCurrentItem] = useState('');
    const [cityList,setCityList] = useState([])
    const [active,setActive] = useState("上海")
    const {getWeather} = useGetWeather()

    // 模拟API数据获取
    useEffect(() => {
        setLoading(true);
        const fetchCity = async () => {
            try {
                setLoading(true)
                const cityPromise = await globalDataServer.getHotCitys()
                const cityList = cityPromise.topCityList.map((item)=>item.name);
                getWeather();
                setCityList(cityList)
            } catch (err) {
                console.error(err.message || '获取天气数据失败')
            } finally {
                setLoading(false)
            }
        }

        fetchCity()
    }, []);


    // 搜索城市（模拟）
    const onSearch = async (value)=>{
        if (!value) {
            return;
        }
        setActive(value);
        setLoading(true);
        const cityPromise = await globalDataServer.getCitys(value);
        const location = cityPromise.location;
        const cityname = location[0].tz.toLowerCase().replace("asia/","");

        if(location[0].name === value || cityname === value){
            //获取当前城市天气
            const id = location[0].id;
            getWeather(id)
        }else {
            //获取当前城市下辖市区
            const citys = cityPromise.location.map(item=>item.name);
        }
        setLocation(location)
    }

    // 选择城市后的回调
    const handleChange = async (value, id?) => {
        setActive(value);
        if(!id){//省市
            const cityPromise = await globalDataServer.getCitys(value);
            const location = cityPromise.location;
            if(location[0].name === value){//当前选择为城市不是省
                //获取当前城市天气
                const id = location[0].id;
                getWeather(id);
            }
            setLocation(location)
        }else {//市区
            getWeather(id);
        }
    };

    const isAllEnglish = (str)=>{
        return /^[a-zA-Z]+$/.test(str);
    }

    const onChangeTab = async (item)=>{
        setLocation([]);
        if(isAllEnglish(item)){
            setCurrentItem(item);
        }else {
            const cityPromise = await globalDataServer.getHotCitys()
            const cityList = cityPromise.topCityList.map((item)=>item.name)
            setCityList(cityList)
            setCurrentItem('');
        }
    }



    const provinces= useMemo( ()=>{
            const lowercase = currentItem.toUpperCase().toLowerCase().split('');
            const provinces = globalDataServer.provinces;
            const prosValue = Object.values(provinces).filter((p,index)=>{return lowercase.includes(p)});
            const entries = Object.entries(provinces) as Array<[keyof typeof provinces, typeof provinces[keyof typeof provinces]]>;
            const proCur = Object.fromEntries((Object.entries(provinces) as any).filter((item,index)=>prosValue.includes(item[1])));
            return Object.keys(proCur);
    },[currentItem])

    return (
        <>
        <div className={'city-selector'}>
            <div className={'text-inverse'}>{active}天气</div>
            <SearchInputComponent placeholder={'搜索国内城市/区域名称'} onSearch={onSearch}></SearchInputComponent>
            <div className={'city-container'}>
                <TabComponent onChangeTab={onChangeTab}/>
                <CityComponent provinces={provinces.length > 0 ?provinces:cityList} handleChange={handleChange} location={location} propsActive={active}/>
            </div>
        </div>
        </>
    );
});

export default CitySelector;