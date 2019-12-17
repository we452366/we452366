const url = require('url');
const Layer = require('./layer');
const Route = require('./Route'); // 每个路由都要有一个route的实例
function Router(){
    this.stack = [];
}
Router.prototype.route = function(path){
    let route = new Route();
    // 每次调用get 方法就产生一个layer ,把route放到layer上，当路径匹配到交过对应的route的dispatch方法来吃力
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 如果是路由就会配置一个route属性
    this.stack.push(layer);// 将layer存放到stack中
    return route;
}
Router.prototype.get = function(path,handlers){
    // 1.先产生route
    let route = this.route(path); // 产生route后需要将handler 存到route中的stack
    route.get(handlers);
    
    //this.stack.push(layer)
}
Router.prototype.handle_request = function(req,res,out){
    let idx = 0;
    let next = () =>{
        // 如果找不到就出去   删除文件夹
       if(idx === this.stack.length) return out();
       let layer =  this.stack[idx++]; // 默认拿出一层来 执行
       let {pathname} = url.parse(req.url);
       //  判断路径和方法 是否匹配 
       if(layer.match(pathname)){
           // 如果匹配就执行
        layer.handler(req,res,next); // 把当前外层的next 传递给 route中
       }else{
           // 匹配不到找下一个
           next();
       }
    }
    next(0);
}
module.exports = Router;