const url = require('url');
const Layer = require('./layer');
const Route = require('./Route'); // 每个路由都要有一个route的实例
function Router(){
    let router =  function(req,res,next){
        // req.url = '/add'
        router.handle_request(req,res,next); // 当请求到来时 需要到对应的子路由系统中查找
    }
    router.stack = [];
    router.paramsCallbacks = {}; // {name:[fn,fn],age:[fn]}
    router.__proto__ = proto; // 我让当前的函数 查找可以找到proto
    // 如果一个构造函数 返回了一个引用类型 那么this 就是 返回的结果
    return router;
}

let proto = {};
proto.use = function(path,handler){
    let layer = new Layer(path,handler);
    this.stack.push(layer);
}
proto.route = function(path){
    let route = new Route();
    // 每次调用get 方法就产生一个layer ,把route放到layer上，当路径匹配到交过对应的route的dispatch方法来吃力
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 如果是路由就会配置一个route属性
    this.stack.push(layer);// 将layer存放到stack中
    return route;
}
// 订阅
proto.param = function(key,handler){
    if(this.paramsCallbacks[key]){
        this.paramsCallbacks[key].push(handler);
    }else{
        this.paramsCallbacks[key] = [handler];
    }
    console.log(this.paramsCallbacks)
}
;['post','put','delete','get'].forEach((method)=>{
    proto[method] = function(path,handlers){
        if(!Array.isArray(handlers)){
            handlers = [handlers]
        }
        // 1.先产生route
        let route = this.route(path); // 产生route后需要将handler 存到route中的stack
        route[method](handlers);
        //this.stack.push(layer)
    }
})
proto.process_param = function(req,res,layer,done){
    let params = this.paramsCallbacks // {name:[fn,fn],age:fn}
    let keys = layer.keys.map(item=>item.name); // [{name:name},{ah}]
    if(!keys || keys.length ===0){
        return done(); // 不需要处理参数
    }
    // keys = [name,age]
    let idx = 0;
    let callbacks;
    let key;
    let value;
    let next = ()=>{
        if(idx === keys.length) return done();
        key = keys[idx++]; // 先取第一个key,如果有让里面的函数依次执行
        value = layer.params[key];
        if(key){
           callbacks =  params[key]; //[fn,fn];
          
           processCallback(next);
            // 把函数处理交给process_callback
        }else{
            next(); // 如果没有了找下一个
        }
    }
    next();
    function processCallback(out){
        let idx = 0;
        let next = ()=>{ // 如果取不到 就出去，能取到就执行
           let callback = callbacks[idx++];
           if(callback){ // 如果有callback 就执行此callback 
              callback(req,res,next,value,key);
           }else{
              out(); // 如果没有 就应该去找下一个key
           }
        }
        next();
    }
}
proto.handle_request = function(req,res,out){
    let idx = 0;
    let removed  = '';
    let next = (err) =>{ // tj co koa express redux-thunk
        if(removed.length > 0){ // 说明以前删除过
            req.url = removed + req.url; // 将路径增加上保证下一个中间件可以正常执行
            removed = '';
        }
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
            if(layer.match(pathname)){ // layer.params
                if(layer.route){ // 路由
                    // 进一步匹配路由中的方法
                    if(layer.route.methods[req.method.toLowerCase()]){
                        // 执行handler,在此之前 需要给req属性 添加params属性
                        req.params = layer.params || {};

                        // 需要执行param方法,将请求 响应 传入，并且将layer也传入 layer.keys
                        this.process_param(req,res,layer,()=>{
                            layer.handler(req,res,next); 
                        })
                    }else{ // 如果没有匹配到 就继续向下执行
                        next();
                    }
                }else{ // 如果中间件 路径匹配到了就执行
                    if(layer.handler.length!==4){
                        // 是中间件可能会出现二级路由的情况 ，需要把当前中间件的路径 从当前url删除掉
                        if(layer.path !== '/'){ // 如果这个中间件是/就不要删除 
                            removed = layer.path; // /user  /user/add
                            req.url = req.url.slice(removed.length)
                        }
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