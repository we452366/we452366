const url = require('url');
const Layer = require('./layer');
const Route = require('./Route'); // 每个路由都要有一个route的实例
function Router(){
    this.stack = [];
}
Router.prototype.use = function(path,handler){
    let layer = new Layer(path,handler);
    this.stack.push(layer);
}
Router.prototype.route = function(path){
    let route = new Route();
    // 每次调用get 方法就产生一个layer ,把route放到layer上，当路径匹配到交过对应的route的dispatch方法来吃力
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 如果是路由就会配置一个route属性
    this.stack.push(layer);// 将layer存放到stack中
    return route;
}
;['post','put','delete','get'].forEach((method)=>{
    Router.prototype[method] = function(path,handlers){
        // 1.先产生route
        let route = this.route(path); // 产生route后需要将handler 存到route中的stack
        route[method](handlers);
        //this.stack.push(layer)
    }
})

Router.prototype.handle_request = function(req,res,out){
    let idx = 0;
    let next = (err) =>{
        // 如果找不到就出去   删除文件夹
       if(idx === this.stack.length) return out();
       let layer =  this.stack[idx++]; // 默认拿出一层来 执行
       let {pathname} = url.parse(req.url);
       //  判断路径和方法 是否匹配 

        // 当请求到来时 会遍历所有的layer,如果是路由 严格匹配路径 ，中间件的话 路径开头相同或者是/ 
        // 中间件是没有方法的 
        if(err){
            // 找到错误中间件
            if(!layer.route){
                // 中间件的参数是否是4个
                if(layer.handler.length === 4){
                    layer.handler(err,req,res,next);
                }else{
                    next(err);
                }
            }else{
                next(err); // 继续传递错误
            }
        }else{
            if(layer.match(pathname)){
                if(layer.route){ // 路由
                    // 进一步匹配路由中的方法
                    if(layer.route.methods[req.method.toLowerCase()]){
                        // 执行handler
                        layer.handler(req,res,next); 
                    }else{ // 如果没有匹配到 就继续向下执行
                        next();
                    }
                }else{ // 如果中间件 路径匹配到了就执行
                    if(layer.handler.length!==4){
                        layer.handler(req,res,next); 
                    }
                }
            }else{
                next();
            }
        }
        

    //    if( && ){
    //        // 如果匹配就执行
    //     layer.handler(req,res,next); // 把当前外层的next 传递给 route中
    //    }else{
    //        // 匹配不到找下一个
    //        next();
    //    }
    }
    next(0);
}
module.exports = Router;