// 基础响应类型
export interface BaseResponse<T = any> {
    code: number
    data: T
    message?: string
}

// 分页数据
export interface Pagination<T = any> {
    current: number
    pageSize: number
    total: number
    list: T[]
}

// 错误类型
export interface RequestError {
    code: number
    message: string
    data?: any
}

// 请求配置
export interface RequestConfig {
    headers?: Record<string, string>
    silent?: boolean // 是否静默模式（不显示错误提示）
    [key: string]: any
}