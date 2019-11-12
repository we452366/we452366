import { AxiosInterceptorManager } from "axios";

export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'options' | 'OPTIONS';
export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: any;
    headers?: Record<string, any>;
    data?: Record<string, any>;
    timeout?: number;
    transformRequest?:(data:any,headers:any)=>any;
    transformResponse?:(data:any)=>any;
}
//Axios.prototype.request这个方法
//Promise的泛型T代表此promise变成成功态之后resolve的值 resolve(Value) 
export interface AxiosInstance {
    CancelToken: any;
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    }
}
//泛型T代表响应体的类型
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers?: Record<string, any>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest
}