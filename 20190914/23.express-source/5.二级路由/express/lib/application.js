// 主要的工作  创建应用
const http = require('http');
const url = require('url');
let Router = require('./router')
// 提供应用 应用和路由的分离
function Application(){}
Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new Router
    }
}
// 根据不同的调用方法 将route中的handler 和方法类型做对应
;['post','put','delete','get'].forEach((method)=>{
    Application.prototype[method] = function(path,...handlers){
        this.lazy_route();
        this.router[method](path,handlers);
    }
});
Application.prototype.use = function(path,handler){
    this.lazy_route();
    // 如果没有传递路径 直接将路径设置/ ,/表示都能匹配
    if(typeof handler !== 'function'){
        handler = path;
        path = '/';
    }
    this.router.use(path,handler);
}

Application.prototype.listen = function(){
    let server = http.createServer((req,res)=>{
        this.lazy_route();
        // 获取请求的方法 和路径
        // let m = req.method.toLowerCase();
        // let pathname = url.parse(req.url).pathname;
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.router.handle_request(req,res,done);
        // for(let i = 1;i<this.router.length;i++){
        //     let {method,path,handler} = this.router[i];
        //     // 如果匹配到就执行 对应的处理函数
        //     if(m === method && pathname === path){
        //         return handler(req,res);
        //     }
        // }
        // // 如果炸不到对应的就调用 默认404逻辑
        // this.router[0].handler(req,res)
    });
    server.listen(...arguments)
}


module.exports = Application