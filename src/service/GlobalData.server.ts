// import {WebService} from "@/service/WebService";
import {WebAPI} from "@/service/WebAPI";
import {RequestConfig} from "@/service/types";
import webService from "@/service/WebService";
import {AxiosRequestConfig} from "axios";

export interface WeatherData {
    obsTime: string//观测数据时间
    text: string//天气情况文字描述
    icon: string//使用图标
    temp: string//温度
    feelsLike: string//体感温度
    humidity:string //相对湿度
    windScale: string//风力等级
    windSpeed: string//风速
    windDir:string//风向
}

interface City {
    id: string;
    name: string;
    adm2: string;
}

export type weatherType = {code:string,now:WeatherData,refer:{[key:string]:any},daily:any[]}

class DataServer {

    public provinces = {
        "北京": "a",
        "上海": "s",
        "天津": "t",
        "重庆": "c",
        "河北": "h",
        "山西": "s",
        "内蒙古": "n",
        "辽宁": "l",
        "吉林": "j",
        "黑龙江": "h",
        "江苏省": "j",
        "浙江": "z",
        "安徽": "a",
        "福建": "f",
        "江西": "j",
        "山东": "s",
        "河南": "h",
        "湖北": "h",
        "湖南": "h",
        "广东": "g",
        "广西": "g",
        "海南": "h",
        "四川": "s",
        "贵州": "g",
        "云南": "y",
        "西藏": "x",
        "陕西": "s",
        "甘肃": "g",
        "青海": "q",
        "宁夏": "n",
        "新疆维吾尔自治区": "x",
        "台湾": "t",
        "香港": "x",
        "澳门": "a"
    }


    /**
     * 获取省市区
     * @returns {Promise<any>}
     */
    public async getCitys(location?: string) {
        let params: any;
        params = {
            location: location,
            range: 'cn',
            key: WebAPI.KEY,
        }
        const cache:RequestConfig = {
            cache: 10 * 60 * 1000
        }
        return webService.http_get(WebAPI.GET_CITYS, params,cache);
    }

    public async getHotCitys(location?: string) {
        let params: any;
        params = {
            location: "an",
            range: 'cn',
            key: WebAPI.KEY,
        }
        return webService.http_get(WebAPI.GET_HOT_CITYS, params,{ cache: true });
    }


    /**
     * 获取当前城市天气情况
     * @returns {Promise<any>}
     */
    public async getCurrentWeather(location?: string):Promise<weatherType> {
        let params: any;
        params = {
            location: location || "101020100",
            key: WebAPI.KEY
        }
        return webService.http_get<typeof params>(WebAPI.GET_WEATHER, params,{ cache: 10 * 60 * 1000 });
    }


    /**
     * 获取未来7天天气情况
     * @param location
     */

    public async getFutureWeather(location?:string):Promise<weatherType>{
        let params: any;
        params = {
            location: location || "101010100",
            key: WebAPI.KEY
        }
        return webService.http_get<typeof params>(WebAPI.GET_WEATHER_7D, params,{ cache: true });
    }


}

const globalDataServer = new DataServer();
export default globalDataServer;