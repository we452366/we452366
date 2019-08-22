//函数柯里化怎么实现
const add=(a,b,c,d,e)=>{
    return a+b+c+d+e;
}
const currying=(fn,arr=[])=>{
    let len=fn.length;
    return (...args)=>{
        arr=arr.concat(args);
        if(arr.length < len){
            return currying(fn,arr)
        }
        return fn(...arr)
    }
}
let r=currying(add)(1)(2,3)(4,5)