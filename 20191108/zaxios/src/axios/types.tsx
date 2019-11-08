import { AxiosInterceptorManager } from "axios";

export type Methods = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'DELETE' | 'delete';
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors:{
        request:AxiosInterceptorManager<AxiosRequestConfig>,
        response:AxiosInterceptorManager<AxiosResponse>
    }
}
export interface AxiosRequestConfig {
    url: string;
    method?: Methods;
    params?: Record<string, any>;
    data?: Record<string, any>;
    headers?: Record<string, any>;
    timeout?:number;
}

export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
}