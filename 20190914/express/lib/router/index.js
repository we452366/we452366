const url=require('url');
const Layer=require('./layer');
const Route=require('./Route');
function Router(){
    let router=function(req,res,next){
        router.handle_request(req,res,next);
    }
    router.stack=[];
    router.paramsCallbacks={};
    router.__proto__=proto;
    return router;
};

let proto={};
proto.use=function(path,handler){
    let layer=new Layer(path,handler);
    this.stack.push(layer);
};
proto.route=function(path){
    let route=new Route();
    let layer=new Layer(path,route.dispatch.bind(route));
    layer.route=route;
    this.stack.push(layer);
    return route;
};
proto.param=function(key,handler){
    if(this.paramsCallbacks[key]){
        this.paramsCallbacks[key].push(handler);
    }else{
        this.paramsCallbacks[key]=[handler];
    }
};
['post','put','delete','get'].forEach((method)=>{
    proto[method]=function(path,handlers){
        if(!Array.isArray(handlers)){
            handlers=[handlers]
        }
        let route=this.route(path);
        route[method](handlers);
    }
});
proto.process_param=function(req,res,layer,done){
    let params=this.paramsCallbacks;
    let keys=layer.keys.map(item=>item.name);
    if(!keys || keys.length==0){
        return done();
    }
    let idx=0;
    let callbacks;
    let key;
    let value;
    let next=()=>{
        if(idx===keys.length) return done();
        key=keys[idx++];
        value=layer.params[key];
        if(key){
            callbacks=params[key];
            processCallback(next);
        }else{
            next();
        }
    }
    next();
    function processCallback(out){
        let idx=0;
        let next=()=>{
            let callback=callbacks[idx++];
            if(callback){
                callback(req,res,next,value,key);
            }else{
                out()
            }
        }
        next();
    }
};
proto.handle_request=function(req,res,out){
    let idx=0;
    let removed='';
    let next=(err)=>{
        if(removed.length>0){
            req.url=removed+req.url;
            removed='';
        }
        if(idx===this.stack.length) return out();
        let layer=this.stack[idx++];
        let {pathname}=url.parse(req.url);

        if(err){
            if(!layer.route){
                if(layer.handler.length===4){
                    layer.handler(err,req,res,next);
                }else{
                    next(err);
                }
            }else{
                next(err);
            }
        }else{
            if(layer.match(pathname)){
                if(layer.route){
                    if(layer.route.methods[req.method.toLowerCase()]){
                        req.params=layer.param || {};
                        this.process_param(req,res,layer,()=>{
                            layer.handler(req,res,next);
                        })
                    }else{
                        next()
                    }
                }else{
                    if(layer.handler.length!==4){
                        if(layer.path!=='/'){
                            removed=layer.path;
                            req.url=req.url.slice(removed.length);
                        }
                        layer.handler(req,res,next)
                    }
                }
            }else{
                next()
            }
        }
    }
    next(0);
}
module.exports=Router;
