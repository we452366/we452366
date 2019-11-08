import { AxiosRequestConfig, AxiosResponse } from './types';
import qs from 'qs';
import parse from 'parse-headers';
class Axios {
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.dispatchRequest<T>(config);
    }
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            let { method='get',url,params,headers,data,timeout} = config;
            let request: XMLHttpRequest = new XMLHttpRequest();
            if (params) {
                let paramsString = qs.stringify(params);
                url = url + (url.indexOf('?') === -1 ? '?' : '&') + paramsString;
            }
            request.open(method, url, true);
            request.responseType = 'json';
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status !== 0) {
                    if (request.status >= 200 && request.status < 300) {
                        let response: AxiosResponse = {
                            data: request.response,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parse(request.getAllResponseHeaders()),
                            config: config,
                            request
                        }
                        resolve(response);
                    } else {
                        reject(new Error(`Request failed with status code ${request.status}`));
                    }
                }
            }
            if(headers){
                for(let key in headers){
                    request.setRequestHeader(key,headers[key])
                }
            }
            let body:string | null =null;
            if(data && typeof data == 'object'){
                body =JSON.stringify(data)
            }
            request.onerror=()=>{
                reject(new Error('Network Error'))
            }
            if(timeout){
                request.timeout=timeout;
                request.ontimeout=()=>{
                    reject(new Error(`timeout of ${timeout}ms exceeded`))
                }
            }
            request.send(body);
        });
    }
}
export default Axios;