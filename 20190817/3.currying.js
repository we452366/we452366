//柯里化 可以把一个大函数拆分成很多具有具体的功能的函数

//判断类型 Object.prototype.toString.call()

//高阶函数中包含 柯里化 可以保留参数 bind
//反柯里化函数(让函数的调用方式变大)

const checkType=(type)=>{
    return (content)=>{
        return Object.prototype.toString.call(content) === `[objec ${type}]`
    }
}

//闭包
let types=['Number','String','Boolean'];
let utils={};
types.forEach(type=>{
    utils['is'+type]=checkType(type)
})

console.log(utils.isString('123'));

