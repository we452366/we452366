import axios, { AxiosResponse,AxiosRequestConfig } from 'axios';
import { response } from 'express';
const baseURL = 'http://localhost:8080';
export interface User {
    username: string;
    password: string;
}
let user: User = {
    username: 'zhufeng',
    password: '123456'
};
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.headers.name +='1';
    return config
})
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.headers.name +='2';
    return config
})
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.headers.name +='3';
    return config
})
axios.interceptors.response.use((response:AxiosResponse)=>{
    response.data.name +='1';
    return response
})
axios.interceptors.response.use((response:AxiosResponse)=>{
    response.data.name +='2';
    return response
})
axios.interceptors.response.use((response:AxiosResponse)=>{
    response.data.name +='3';
    return response
})
axios({
    method: 'get',
    url: baseURL + '/get',
    params: user
}).then((response: AxiosResponse) => {
    console.log(response.data);
    return response.data;
}).then((data: User) => {
    console.log(data);
}).catch(function (error: any) {
    console.log(error);
});
