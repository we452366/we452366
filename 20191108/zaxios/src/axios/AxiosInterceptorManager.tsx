interface OnFulfilled<V>{
    (value:V):V | Promise<V>
}

interface OnRejected{
    (error:any):any
}

export interface Interceptor<V>{
    onFulfilled?:OnFulfilled<V>;
    onRejected?:OnRejected;
}

export default class AxiosInterceptorManager<V> {
    //每当调用use的时候可以向拦截器管理器中添加一个拦截器
    public interceptors:Array<Interceptor<V> | null>=[]
    use(onFulfilled?:OnFulfilled<V>,onRejected?:OnRejected):number{
        this.interceptors.push({
            onFulfilled,
            onRejected
        });
        return this.interceptors.length-1;
    }
    eject(id:number){
        if(this.interceptors[id]){
            this.interceptors[id]=null
        }
    }
}