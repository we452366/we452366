const http=require('http');
const url=require('url');
let Router=require('./router');
const path=require('path');
const fs=require('fs');
const STATUS_CODES=require('statuses').STATUS_CODES;
function Application(){
    this.engines={
        views:'views',
        'view engine':'ejs'
    };
    this.settings={};
}
Application.prototype.lazy_route=function(){
    if(!this.router){
        this.router=new Router();
        this._init();
    }
};
Application.prototype._init=function(){
    this.use((req,res,next)=>{
        res.sendFile=function(filename){
            fs.createReadStream(filename).pipe(res);
        };
        res.json=function(value){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(value));
        };
        res.send=function(value){
            if(typeof value === 'object'){
                res.end(JSON.stringify(value));
            }else if(typeof value === 'number'){
                res.statusCode=value;
                res.end(STATUS_CODES[value]);
            }else{
                res.end(value);
            }
        };
        res.render=(filename,obj)=>{
            let views=this.get('views');
            let viewEngine=this.get('view engine');
            let render=this.engines[viewEngine];
            let filepath=path.join(views,filename)+viewEngine;
            render(filepath,obj,function(err,html){
                res.end(html);
            })
        }
        next();
    })
};
Application.prototype.set=function(key,value){
    if(arguments.length===1){
        return this.settings[key];
    }
    this.settings[key]=value;
};
Application.prototype.engine=function(extname,render){
    this.engines[extname]=render;
};
['post','put','delete','get'].forEach(method=>{
    if(method==='get'){
        if(arguments.length==1){
            return this.set(path)
        }
    }
    this.lazy_route();
    this.router[method](path,handlers)
});
Application.prototype.param=function(key,handler){
    this.lazy_route();
    this.router.param(key,handler);
}
Application.prototype.use=function(path,handler){
    this.lazy_route();
    if(typeof handler !== 'function'){
        handler=path;
        paht='/';
    }
    this.router.use(path,handler);
}
Application.prototype.listen=function(){
    let server=http.createServer((req,res)=>{
        this.lazy_route();
        function done(){
            res.end(`Cannot $(req.method) $(req.url)`);
        };
        this.router.handle_request(req,res,done);
    })
    server.listen(...arguments);
}
module.exports=Application;