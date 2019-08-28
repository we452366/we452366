//怎么用es5来模拟es6中的class
//new 的原理

//es5中没有类 用构造函数来模拟类

//类中有两种属性 1) 实例上的属性 2) 公共属性
// function Animal(){
//     if(!(this instanceof Animal)){//当前是不是通过new来调用的
//         throw new Error('NOT NEW')
//     }
//     this.name={name:'zf'};
//     this.age=10;
// }
// Animal.prototype.say=function(){

// }
// //es5中的类可以当做函数来调用，es6中不可以
// let a1=new Animal();
// let a2=new Animal();
// //一般情况下 最好不用操作__proto__
// console.log(a1.name===a2.name);
// console.log(a1.say===a2.say);
// console.log(a1.__proto__===Animal.prototype);
// console.log(a1.__proto__.constructor===Animal);
// console.log(a1.__proto__.__proto__===Object.prototype);
// console.log(a1.__proto__.__proto__.__proto__===null);
// console.log(a1.__proto__===a1.constructor.prototype);

//---- 类的继承 继承实例上的属性 公共属性
function Animal(){
    this.type = '哺乳类'
}
Animal.prototype.say=function(){
    console.log('我是动物')
}

function Tiger(name){
    this.name=name;
    Animal.call(this);//调用父类的构造函数 并且让this指向子类即可
}

/* 实现原型继承的方法 */
//Tiger.prototype.__proto__=Animal.prototype;
//Object.setPrototypeOf(Tiger.prototype,Animal.prototype);//es6的语法就是指定了链的指向
//Object.create();

// function create(parentProto){
//     function Fn(){}
//     Fn.prototype=parentProto;
//     let fn=new Fn();
//     fn.constructor=Tiger;
//     return fn;
// }
//唯一有些不同的是 它在中间加了一层
Tiger.prototype=Object.create(Animal.prototype,{constructor:{value:Tiger}});//create如何实现的

let tiger = new Tiger('大老虎');
console.log(tiger.constructor);

//实现原型的继承的方法 1) Object.create; 2) __proto__ 改变指向
//call 实现实例继承的方法
