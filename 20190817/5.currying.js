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
const checkType=(type,content)=>{
    return Object.prototype.toString.call(content) === `[objec ${type}]`
}
let types=['Number','String','Boolean'];
let utils={};
types.forEach(type=>{
    utils['is'+type]=currying(checkType)(type); //先传入一个参数
})