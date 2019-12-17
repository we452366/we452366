const Layer = require('./layer')
function Route(){
    this.stack = [];
}
Route.prototype.get = function(handlers){
    handlers.forEach(handler => {
        let layer = new Layer('',handler);
        layer.method = 'get'; // 内部的route中要表示当前这一层的方法是什么方法
        this.stack.push(layer);
    });
}
Route.prototype.dispatch = function(req,res,out){
    // 需要在route中 依次取出layer 看下方法是否ok 如果ok 就执行
    let idx = 0;
    let next = ()=>{
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.method === req.method.toLowerCase()){
            layer.handler(req,res,next);
        }else{
            next();
        }
    }
    next();
}
module.exports = Route;