//装饰器 装饰模式 在执行类之前可以进行包装

//装饰器 必须是一个函数 只能修饰类 (类中的属性 还有类中的方法) 参数分别是 类的原型 装饰的key 和key的属性描述器
//@type1('哺乳1')
//@type2('哺乳2')
class Circle{
    //@readonly PI=3.14;
    //@before
    say(){
        console.log('say')
    }
}

//对类进行扩展
function type1(type1){
    console.log('t1')
    return function(Constructor){
        console.log('innerT1')
        Constructor.type1=type1
    }
}
function type2(type2){
    console.log('t2')
    return function(Constructor){
        console.log('innerT2')
        Constructor.type2=type2
    }
}
function readonly(CirclePrototype,key,descriptor){
    descriptor.writable=false;
    descriptor.enumerable=false; 
}
function before(CirclePrototype,key,descriptor){
    let oldSay=descriptor.value;//函数劫持
    descriptor.value=function(){//将函数原有的逻辑 进行包装
        console.log('before');
        oldSay();
    }
}
//实验型语法

//mixin 混合
let obj={
    name:'zf',
    age:'10'
}
//@minxin
class School{

}
function mixin(School){
    return function(Constructor){
        Object.assign(School.prototype,obj)
    } 
}
let school=new School;
console.log(school.name,school.age)