// vue 希望调用数组方法 实现视图的更新

const update=()=>{
    console.log('更新')
}

let arr=[];

let oldProto=Array.prototype;//保留数组原有的原型
let proto=Object.create(oldProto);//创建一个新的proto

['push','shift','unshift'].forEach(method=>{
    proto[method]=function(...args){
        update();
        oldProto[method].call(this,...args);
    }
})

function observer(obj){
    //只将传入的数组中的方法重新
    if(Array.isArray(obj)){
        obj.__proto__=proto;
    }
}

observer(arr);
arr.push(1);
console.log(arr);