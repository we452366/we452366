// 反射 Object.defineProperty
// 里面有部分的对象的方法 放到 Reflect 功能基本一致
//Proxy 中代理的方法 Reflect 都可以实现
//1)get/set
const obj={}

Reflect.set(obj,'name','zf');

console.log(Reflect.get(obj,'name'));

//2)
//老的写法
console.log('a' in {a:1});
//新的写法
console.log(Reflect.has({a:1},'a'));

//3)Object.defineProperty
//把对象的属性get set 都给重写了
const obj={a:1};
Object.freeze(obj);//这个属性就不能配置了 冻结freeze
let flag=Reflect.defineProperty(obj,'a',{
    value:100
});
console.log(flag);

//4)
const obj={a:1};
console.log(Object.getOwnPropertyDescriptor(obj,'a'));

//5)ownKeys
let obj={
    a:1,
    [Symbol()]:1
};
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys());

//6)
Reflect.setPrototypeOf
Reflect.getPrototypeOf

//7)函数的apply方法 bind call apply的区别 改变this指向
const fn=function(a,b){
    console.log(this,a,b);
}

fn.apply(1,[2,3])//apply支持多个参数传参
fn.apply=function(){
    console.log('apply')
}
//函数原型上的apply方法
//call 1）改this指向 2)让函数执行
Function.prototype.apply.call(fn);
Reflect.apply(fn,1,[2,3]);//用原型上的apply


let xxx=Reflect.construct(XXX,['zf']);

Reflect.deleteProperty //delete obj.a 返回是否删除成功

let obj={};//扩展不能添加属性
Reflect.preventExtensions(obj);
obj.a=1;
console.log(Reflect.isExtensible)

