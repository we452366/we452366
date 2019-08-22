//proxy 兼容性差
//代理 我们可以创造一个代理
let obj={
    a:1,
    b:2
}
let handler={//只能代理当前这个对象 1层
    get(target,key){
        //return target[key]
        if(typeof target[key]=== 'object'){
            return new Proxy(target[key],handler)
        }
        return Reflect.get(target,key)
    },
    set(target,key,value){//反射属性 Reflect
        if(key === 'length') return true;
        return Reflect.set(target,key,value)
    }
}
let proxy=new Proxy(obj,handler);
proxy.a.a=100;
console.log(obj.a.a);