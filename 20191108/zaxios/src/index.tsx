import axios, { AxiosResponse, AxiosRequestConfig } from './axios';
const baseURL = 'http://localhost:8080';
//它指的是服务器返回的对象
interface User {
    name: string;
    password: string
}
let user: User = { name: 'zhufeng', password: '123456' }
console.time('cost');
//请求拦截器先加的后执行
axios.interceptors.request.use((config: AxiosRequestConfig | any): AxiosRequestConfig => {
    config.headers.name += "1";
    console.timeEnd('cost');
    return config;
}, error => Promise.reject(error));
let request = axios.interceptors.request.use((config: AxiosRequestConfig | any): AxiosRequestConfig => {
    config.headers.name += "2";//zhufeng321
    return config;
});
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    /* return new Promise(function (resolve) {
        setTimeout(() => {
            config.headers.name += "3";
            resolve(config);
        }, 3000);
    }) */
    return config;
    //return Promise.reject('请求失败了');
});
axios.interceptors.request.eject(request);
let response = axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '1';
    return response;
});
axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '2';
    return response;
});
axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '3';
    return response;
});
axios.interceptors.response.eject(response);
axios<User>({
    method: 'post',//方法名
    url: baseURL + '/post',//访问路径
    headers: {
        'content-type': 'application/json',
        "name": 'zhufeng'
    },
    timeout: 1000,
    data: user //查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log(response);
    console.log(response.data);// {name:'zhufeng123'}
    // return response.data;//(property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    console.log(error);
});