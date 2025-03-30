// 基础响应类型
import {AxiosRequestConfig, AxiosResponse} from "axios";

export interface BaseResponse<T = any> {
    code: number
    data: T
    message?: string
}

// 错误类型
export interface RequestError {
    code: number
    message: string
    data?: any
}

export interface RequestConfig extends AxiosRequestConfig {
    cache?: boolean | number;
}

export interface ResponseConfig extends AxiosResponse {
    cache?: boolean | number;
}