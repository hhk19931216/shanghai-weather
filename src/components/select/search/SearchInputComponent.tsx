import React, {memo, useCallback, useDeferredValue, useEffect, useState} from 'react';
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
const SearchInputComponent = memo<SearchInputProps>(({placeholder,onSearch}) => {
    const {getWeather} = useGetWeather()
    const [searchTerm,setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const deferredSearchTerm = useDeferredValue(searchTerm)

    const handleSearch = useCallback( (value) => {
        setSearchTerm(value)
        setLoading(true);
        try {
            onSearch?.(value);
        } finally {
            setLoading(false);
        }
    },[onSearch])

    const handleChange = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // handleSearch(value);
    }, [handleSearch]);

    return (
        <div className={'search-input-component'}>
            <Search placeholder={placeholder || '搜索国内城市'} onChange={handleChange} onSearch={handleSearch} value={searchTerm} loading={loading}/>
        </div>
    )
})

export default SearchInputComponent;