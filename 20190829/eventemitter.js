function EventEmitter(){
    this._events=Object.create(null);
}
EventEmitter.prototype.on=function(eventName,callback){
    //不管任何人 调用了on方法 欧度可以增加_events
    if(!this._events) this._events=Object.create(null);

    //监听事件不是newListener 就调用 newListener
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName);
    }

    if(this._events[eventName]){
        this._events[eventName].push(callback)
    }else{
        this._events[eventName]=[callback]
    }
}

EventEmitter.prototype.off=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName]=this._events[eventName].filter(fn=>{
            return fn != callback && fn.l !==callback;
        })
    }
}

EventEmitter.prototype.once=function(eventName,callback){
    //绑定执行后删除
    let one=()=>{// 会触发one函数
        callback(); // 触发原有的路基
        this.off(eventName,one); //再将one删除掉
    }
    one.l=callback; //保存原有指定的绑定 自定义属性
    this.on(eventName,one);
}

EventEmitter.prototype.emit=function(eventName,...args){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => {
            fn(...args)
        });
    }
}
module.exports=EventEmitter;