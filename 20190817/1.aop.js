//高阶函数
//1.一个函数的参数 是一个函数(回调)
//2.一个函数返回一个函数(拆分函数)

//函数的before
//希望将核心的逻辑提取出来，在外面再增加功能

//重写原型上的方法
Function.prototype.before=function(beforeFn){
    return (...args)=>{//箭头函数中没有this指向 没有arguments 所以会向上级作用域查找
        beforeFn();
        this(...args);//展开运算符
    }
}
//AOP 面向切片编程 把核心抽离出来 在核心基础上增加功能
const say=(...args)=>{//剩运算符把剩余所有参数组成一个数组
    console.log('说话');
}

const newSay=say.before(()=>{
    console.log('您好')
})
const newSay1=say.before(()=>{
    console.log('天气很好')
})

newSay(1,2,3);
newSay1();