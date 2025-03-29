export class WebAPI {
    private static _instance: WebAPI;

    /**
     * 天气所需接口
     */

    public static readonly LOG_IN: string = '/api/login';  // 登录
    public static readonly JWT: string = '/auth/sso/loginInfo';  // 获取token


    public static webHost: string = "localhost:5173";

    public static readonly GET_CITYS: string = 'https:/geoapi.qweather.com/v2/city/lookup';  // 获取省市区
    public static readonly GET_HOT_CITYS: string = 'https:/geoapi.qweather.com/v2/city/top';  // 获取热门城市
    public static GET_WEATHER:string = "https://devapi.qweather.com/v7/weather/now"//获取天气
    public static GET_WEATHER_7D:string = "https://devapi.qweather.com/v7/weather/7d"//获取当前城市未来30天天气


    public static readonly POST: string = "POST";
    public static readonly GET: string = "GET";
    public static readonly PUT: string = "PUT";

    public static readonly KID:string = "TEGW7VKPJV";//凭证ID
    public static readonly ALG:string = "EdDSA";//签名算法
    public static readonly SUB:string = "2H2CN77P88";//项目ID
    public static readonly EXP:string = "1703912940"//过期时间
    public static readonly SSH:string = "Ed25519"//私钥算法
    public static readonly CRV:string = "ECDSA"//私钥算法新
    public static readonly KEY:string = "f15772be9e4b4ad9878904f2662ed69b";



}
