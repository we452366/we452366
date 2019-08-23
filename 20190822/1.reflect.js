// 反射 Object.defineProperty
// 里面有部分的对象的方法 放到 Reflect 功能基本一致
//Proxy 中代理的方法 Reflect 都可以实现
//1)Reflec.get/set
const obj={}

Reflect.set(obj,'name','zf');

console.log(Reflect.get(obj,'name'));

//2)Reflect.has
//老的写法
console.log('a' in {a:1});
//新的写法
console.log(Reflect.has({a:1},'a'));

//3)Reflect.defineProperty
//把对象的属性get set 都给重写了
const obj={a:1};
Object.freeze(obj);//这个属性就不能配置了 冻结freeze
let flag=Reflect.defineProperty(obj,'a',{
    value:100
});
console.log(flag);

//4)Reflect.getOwnPropertyDescriptor
const obj={a:1};
console.log(Reflect.getOwnPropertyDescriptor(obj,'a'));

//5)Reflect.ownKeys
let obj={
    a:1,
    [Symbol()]:1
};
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj));

//6)Reflect.setPrototypeOf/getPrototypeOf
Reflect.setPrototypeOf
Reflect.getPrototypeOf

//7)Reflect.apply
//函数的apply方法 bind call apply的区别 改变this指向
const fn=function(a,b){
    console.log(this,a,b);
}

fn.apply(1,[2,3]) //apply支持多个参数传参
fn.apply=function(){
    console.log('apply')
}
//函数原型上的apply方法
//call 1）改this指向 2)让函数执行
Function.prototype.apply.call(fn);
Reflect.apply(fn,1,[2,3]);//用原型上的apply

//8)Reflect.construct
let xxx=Reflect.construct(XXX,['zf']);

//9)Reflect.deleteProperty
Reflect.deleteProperty //delete obj.a 返回是否删除成功

//10)Reflect.preventExtensions
let obj={};//扩展不能添加属性
Reflect.preventExtensions(obj);
//11)Reflect.isExtensible
obj.a=1;
console.log(Reflect.isExtensible)

