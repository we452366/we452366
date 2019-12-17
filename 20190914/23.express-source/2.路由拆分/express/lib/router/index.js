const url = require('url')
function Router(){
    this.stack = [];
}
Router.prototype.get = function(path,handler){
    this.stack.push({
        path,
        method:'get',
        handler
    })
}
Router.prototype.handle_request = function(req,res,out){
    let idx = 0;
    let next = () =>{
        // 如果找不到就出去   删除文件夹
       if(idx === this.stack.length) return out();
       let layer =  this.stack[idx++]; // 默认拿出一层来 执行
       let {pathname} = url.parse(req.url);
       //  判断路径和方法 是否匹配 
       if(layer.method === req.method.toLowerCase() && pathname == layer.path){
           // 如果匹配就执行
        layer.handler(req,res,next)
       }else{
           // 匹配不到找下一个
           next();
       }
    }
    next(0);
}
module.exports = Router;