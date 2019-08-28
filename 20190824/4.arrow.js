//箭头函数的特点 没有this arguments prototype 没有就向上找

let fn=()=>{
    console.log(arguments)
}
fn(1,2,3);

let a=100;//此属性不会放到全局上
let obj={
    a:1,
    fn(){//this => obj 没有this指向从而解决了this问题
        setTimeout(()=>{
            console.log(this.a)
        })  
    }
}
obj.fn();