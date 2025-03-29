import {WebAPIError} from "./WebAPIError";
import axios, {
    AxiosError, AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig, AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig
} from 'axios';
import {message} from "antd";
import {checkNetwork} from "@/utils/utils";
import {DebugConfig} from "@/service/DebugConfig";


export class dataService {

    private axiosinstance: AxiosInstance;
    // private static _instances: Service;
    //
    // public static getInstance(): Service {
    //     if (!Service._instances) {
    //         Service._instances = new Service();
    //         // this.initInstance()
    //     }
    //     return Service._instances;
    // }

    constructor(config?: CreateAxiosDefaults) {
        this.axiosinstance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });

        this.initializeInterceptors();
    }

    private initInstance(config?: CreateAxiosDefaults) {
        this.axiosinstance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });

        // this.initializeInterceptors();
    }


    private initializeInterceptors() {
        // 请求拦截器
        this.axiosinstance.interceptors.request.use(
            this.handleRequestSuccess,
            this.handleRequestError
        );

        // 响应拦截器
        this.axiosinstance.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        );
    }

    private handleRequestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        if (config.url && config.url.startsWith('http://')) {
            config.url = config.url.replace('http://', 'https://');
        }

        if (config.url && config.url.startsWith('http://localhost:5173')) {
            config.url = config.url.replace('http://localhost:5173', '');
        }
        // 可以在这里添加token等
        const token = localStorage.getItem('token');
        if (token) {
            const headers = new AxiosHeaders();
            headers.set('Authorization',`Bearer ${token}`)
        }
        return config;
    }

    private handleRequestError(error: AxiosError): Promise<AxiosError> {
        return Promise.reject(error);
    }

    private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
        return response.data;
    }

    private handleResponseError(error: AxiosError): Promise<AxiosError> {
        // 统一错误处理
        if (error.response) {
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }

    public http_get<T = any>(url: string, params: Record<string, any> = null, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosinstance.get(url, {params, ...config});
    }

    public http_post<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosinstance.post(url, data, config);
    }

    /**
     * @param instance
     * 浏览器不支持Ed25519算法未找到合适解决方案暂时弃用token
     */

    public static interceptors_response_retry(instance) {
        instance.interceptors.response.use((res) => {//token过期响应处理
            return res.data;
        }, async (error) => {
            const originalRequest = error.config;
            if (error.response) {
                switch (error.response.status) {
                    case WebAPIError.CODE_NOT_LOGGED_IN:
                        if (error.response?.status === WebAPIError.CODE_NOT_LOGGED_IN && !originalRequest._retry) {
                            originalRequest._retry = true;
                            try {
                                // 尝试刷新token
                                // const newToken = await this.refreshToken();
                                // localStorage.setItem('access_token', newToken);

                                // 重试原始请求
                                // originalRequest.headers.Authorization = `Bearer ${newToken}`;
                                return instance(originalRequest);
                            } catch (refreshError) {
                                // 刷新失败跳转登录
                                message.error('会话已过期，请重新登录');
                                window.location.href = '/login';
                                return Promise.reject(refreshError);
                            }
                            break;
                        }
                }
            }

        })
    }

    private refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/auth/refresh', {refreshToken});
        return response.data.access_token;
    };


    public static interceptors_request(http) {
        http.interceptors.request.use((config) => {//请求拦截
            const token = localStorage.getItem('access_token');
            if (token) {
                config.head.Authorization = `Bearer ${token}`
            }
            return config
        }, err => {
            return Promise.reject(err)
        })
    }


    public static getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return ('');
    }

    public static getRequestUrl(url, params: any): string {
        if (null === params) {
            return url;
        }
        let paramsStr: string = '';
        let i: number = 0;
        for (let key in params) {
            if (i !== 0) {
                paramsStr += ('&' + key + '=' + params[key].toString());
            } else {
                paramsStr += (key + '=' + params[key].toString());
            }
            i++;
        }

        if (url.charAt(url.length - 1) !== '?') {
            if (url.charAt(url.length - 1) !== '/') {
                url = url + '/';
            }
            url = url + '?';
        }
        return url + paramsStr;
    }

}

const handler = {
    get: function (target, property, receiver) {
        if (!checkNetwork()) {
            message.warning('网络不佳，请稍后重试');
            return;
        }
        return Reflect.get(target, property, receiver);
    },
    set: function (target, property, value, receiver) {
        console.log('Setting property:', property, 'with value:', value);
        return Reflect.set(target, property, value, receiver);
    }
};

let webService = new dataService();
export default webService;
