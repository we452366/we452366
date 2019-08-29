//发布订阅模块 pub / sub
let eventEmitter=require('./eventemitter');
let util=require('util');
let e =new eventEmitter();

function Girl(){
    
}
util.inherits(Girl,eventEmitter);
let girl=new Girl;

girl.on('newListener',(type)=>{
    if(type=='失恋'){
        process.nextTick(()=>{
            girl.emit(type)
        })
    }
});

let fn1=function(){
    console.log('got it')
};

girl.once('失恋',fn1);

girl.off('失恋',fn1);

girl.once('失恋',()=>{
    console.log('ok')
});

// let listener1=(w)=>{
//     console.log('哭 '+w)
// };
// let listener2=(w)=>{
//     console.log('逛街 '+w)
// }
// girl.on('女生失恋',listener1);
// girl.on('女生失恋',listener2);

//on emit=> new Vue $on $emit $once

girl.emit('失恋');