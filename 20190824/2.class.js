//类
//__proto__ 指向所属类的原型
//prototype 所有类都有一个prototype属性
//constructor prototype.constructor 每个类的原型上都有这个属性

//继承公共属性prototype 继承实例上
class Animal{
    //新型语法 type='哺乳类';//声明到实例上的
    constructor(){
        this.type='哺乳类'
    }
    get a(){//Object.defineProperty(Animal.prototype.a)
        return 1;//Animal.prototype.a=1
    }
    say(){//放到了原型上
        console.log(this);
    }
    //静态属性就是定义到类上的属性 es6中只有静态方法
    static get flag(){//es6 静态属性
        return '动物'
    }
}
let animal=new Animal(); //如果将类中的方法拿出来用必须绑定this 否则默认指向undefined
//let say=animal.say;
let say=animal.say.bind(animal);
say();


//静态方法在es6中也会被子类继承
class Animal{
    constructor(name){
        this.name=name;
        this.type='哺乳类'
    }
    static a=1;
    say(){
        console.log('say')
    }
}
//call + Object.create() + Object.setPrototypeOf
//通过Object.defineProperty实现了 原型 + 静态方法属性的定义
class Tiger extends Animal{
    constructor(name){
        super(name);//调用super Animal.call(tiger)
    }
    static getAnimal(){
        console.log(super.a,'---')
    }
    say(){
        super.say();//super 指向的是 父类的原型
    }
}
let tiger=new Tiger('老虎');
tiger.say()
console.log(tiger)

//new 的原理

function A(){
    this.name=1;
    this.age=2;
    //return {c:1} //如果一个类返回了一个引用空间 那么实例将指向这个空间
}
A.prototype.say=function(){
    console.log('say')
}
function mockNew(A){
    let obj={};
    let returnVal=A.call(obj);
    if((typeof returnVal==='object' && returnVal !== null) || typeof returnVal === 'function'){
        return returnVal;
    }
    obj.__proto__=A.prototype;
    return obj;
}
let o=mockNew(A);//1) 创建了一个对象，并且将对象传入到函数中作为this
//o.say();
console.log(o);