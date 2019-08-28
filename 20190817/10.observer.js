
class Subject{//被观察者
    constructor(){
        this.arr=[];
        this.state='happy';
    }
    attach(o){//原型上的方法
        this.arr.push(o);
    }
    setState(newState){
        this.state=newState;
        this.arr.forEach(o=>o.update(newState));
    }
}
// 观察者模式包含发布订阅
class Observer{//观察者
    constructor(name){
        this.name=name;
    }
    update(newState){
        console.log(this.name+'baby'+newState)
    }
}

let s = new Subject('baby');
let o1 = new Observer('wo');
let o2 = new Observer('xifu');

s.attach(o1);
s.attach(o2);
s.setState('unhappy');