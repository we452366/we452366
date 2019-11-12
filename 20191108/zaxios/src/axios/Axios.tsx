import { AxiosRequestConfig, AxiosResponse } from './types';
import AxiosInterceptorManager,{Interceptor} from './AxiosInterceptorManager'
import qs from 'qs';
import parseHeaders from 'parse-headers';
let defaults:AxiosRequestConfig={
    method:'GET',
    timeout:0,
    headers:{
        common:{
            accept:'application/json'
        }
    }
}
let getStyleMethods=['GET','HEAD','DELETE','OPTIONS'];
getStyleMethods.forEach((method:string)=>{
    defaults.headers![method]={};
})
let postStyleMethods=['PUT','POST','PATCH'];
postStyleMethods.forEach((method:string)=>{
    defaults.headers![method]={
        'Content-Type':'application/json'
    };
})
let allMethods=[...getStyleMethods,...postStyleMethods];
export default class Axios<T> {
    public defaults:AxiosRequestConfig=defaults;
    public interceptors={
        request:new AxiosInterceptorManager<AxiosRequestConfig>(),
        response:new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    //T用来限制响应对象response里的data的类型
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        // return this.dispatchRequest<T>(config);
        config.headers=Object.assign(this.defaults.headers,config.headers);
        const chain:Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>>=[]=[
            {
                onFulfilled:this.dispatchRequest
            }
        ]
        this.interceptors.request.interceptors.forEach((interceptor:Interceptor<AxiosRequestConfig> | null)=>{
            interceptor && chain.unshift(interceptor)
        })
        this.interceptors.response.interceptors.forEach((interceptor:Interceptor<AxiosResponse<T>> | null)=>{
            interceptor && chain.push(interceptor)
        })
        let promise:Promise<AxiosRequestConfig | AxiosResponse<T> | any>=Promise.resolve(config);
        while(chain.length){
            const {onFulfilled,onRejected}=chain.shift()!;
            promise=promise.then(onFulfilled,onRejected)
        }
        return promise;
    }
    //定义一个派发请求的方法
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(function (resolve, reject) {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params) {
                //{name: 'zhufeng',password: '123456'}=>name=zhufeng&password=123456
                params = qs.stringify(params);
                // /get?
                url += ((url!.indexOf('?') === -1 ? '?' : '&') + params);
            }

            request.open(method!, url!, true);
            request.responseType = 'json';
            request.onreadystatechange = function () {//指定一个状态变更函数
                // 0 1 2 3 4 表完成
                if (request.readyState === 4 && request.status !== 0) {
                    if (request.status >= 200 && request.status < 300) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            //content-type=xx; content-length=42=>content-type:xx,content-length:42}
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        resolve(response);
                    } else {
                        reject(`Error: Request failed with status code ${request.status}`);
                    }
                }
            }
            if (headers) {
                for (let key in headers) {
                    if(key === 'common' || allMethods.includes(key)){
                        if(key === 'common' || key === config.method){
                            for(let key2 in headers[key]){
                                request.setRequestHeader(key2, headers[key][key2]);
                            }
                        }
                        
                    }else{
                        request.setRequestHeader(key, headers[key])
                    }
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(data);
            }
            request.onerror = function () {
                reject('net::ERR_INTERNET_DISCONNECTED');
            }
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject(`Error: timeout of ${timeout}ms exceeded`);
                }
            }
            request.send(body);
        });
    }
}