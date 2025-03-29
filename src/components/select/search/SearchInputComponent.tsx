import React, {memo, useCallback, useEffect, useState} from 'react';
import './SearchInputComponent.scss';
import {Input} from "antd";
import {WeatherData} from "@/service/GlobalData.server";
import {WeatherContext} from "@/components/weathercomponents/WeatherComponent";
import {useGetWeather} from "@/hooks/useWeather";

const {Search} = Input;

/**
 * @param props
 * @constructor
 * placeholder:placeholder(string)
 * onSearch:点击搜索图标,或按下回车键时的回调(function)
 */

interface SearchInputProps {
    placeholder?: string;  // 可选属性
    onSearch: (value: string) => Promise<void>;  // 必需属性
}
const SearchInputComponent = memo((props:SearchInputProps) => {
    const {placeholder,onSearch} = props;
    const {getWeather} = useGetWeather()
    const [keyword,setKeyWord] = useState('');
    const [loading, setLoading] = useState(false);

    const onSearchInput = useCallback( (value) => {
        if(onSearch){
            onSearch(value)
        }
    },[])

    useEffect(()=>{

    },[keyword])

    return (
        <div className={'search-input-component'}>
            <Search placeholder={props.placeholder || '搜索国内城市'} onSearch={onSearchInput}/>
        </div>
    )
})

export default SearchInputComponent;