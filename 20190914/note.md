## node

### express框架
Express是一个简洁、灵活的node.js Web应用开发框架,是目前最流行的基于Node.js的Web开发框架. 它提供一系列强大的功能，比如：

- 模板解析
- 静态文件服务
- 中间件
- 路由控制
还可以使用其他模块来帮助你创建各种Web和移动设备应用

#### get请求
根据请求路径来处理客户端发出的GET请求 语法

app.get(path,function(request, response));

- 第一个参数path为请求的路径
- 第二个参数为处理请求的回调函数，有两个参数分别是
    - request 代表请求信息
    - response 代表响应信息

var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.end('welcome to  首页');
});
app.get('/about',function(req,res){
 res.end('欢迎来到关于我们');
})
app.listen(3000);

#### curl客户端使用方法
- 指定请求头
curl -H 'content-type:application/json;charset=utf-8' http://localhost:8080/users

- 指定方法名
curl -X POST http://localhost:8080/users

- 指定请求体
curl --data "name=zfpx&age=8" http://localhost:8080/users

#### all
app.all()函数可以匹配所有的HTTP动词 路由中的星号能匹配所有的路径 语法

app.all(path,function(request, response));

- 示例

var express = require('express');//引入express
var app = express();
app.all("*",function(req,res){
 res.send("404");
})
app.listen(3000);

#### 获取请求参数
- req.host 返回请求头里取的主机名(不包含端口号)
- req.path 返回请求的URL的路径名

app.get('/',function(req,res){
   res.end('欢迎来到首页'+req.host+" "+req.path);
});

#### 获得查询字符串
//http://localhost:3000/?a=1&b=2&c=3
app.get('/',function(req,res){
   res.send(req.query);
});

#### params路径参数
req.params可以用来获取请求URL中的参数值

app.get('/:id/:name',function(req,res){
   res.send(req.params.id+" "+req.params.name);
});

#### 中间件
中间件就是处理HTTP请求的函数，用来完成各种特定的任务 比如检查用户是否登录、检测用户是否有权限访问等，它的特点是:
- 一个中间件处理完请求和响应可以把相应数据再传递给下一个中间件
- 回调函数的next参数,表示接受其他中间件的调用，函数体中的next(),表示将请求数据传递给下一个中间件
- 还可以根据路径来区分进行返回执行不同的中间件

var express = require('express');
var app = express();
var path = require('path');

app.use(function(req,res,next){
 res.setHeader('Content-Type','text/plain;charset=utf-8');
 next();
});

app.get('/',function(req,res){
 res.end('首页');
});
app.get('/about',function(req,res){
 res.end('关于我们');
});

app.listen(3000);

#### send
send方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据 并在输出响应时会自动进行一些设置，比如HEAD信息、HTTP缓存支持等等。 语法

res.send([body|status], [body])
1.当参数为一个String时，Content-Type默认设置为"text/html"。
res.send('Hello World'); //Hello World

2.当参数为Array或Object时，Express会返回一个JSON
res.send({ user: 'tobi' }); //{"user":"tobi"}
res.send([1,2,3]); //[1,2,3]

3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"
res.send(200); // OK
res.send(404); // Not Found
res.send(500); // Internal Server Error

#### 模板
在nodejs中使用express框架，它默认的是ejs和jade渲染模板

- 安装模板
npm install ejs

- 使用模板
使用ejs模板

//指定渲染模板文件的后缀名为ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
res.render('index');
模板使用html后缀

// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
app.set('views',path.join(__dirname,'views'));
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express ); //__express是ejs模块的一个公共属性，表示要渲染的文件扩展名

- 渲染视图
语法
参数view就是模板的文件名
在渲染模板时locals可为其模板传入变量值
callback用来处理返回的渲染后的字符串

res.render(view, [locals], callback);

- 模板原理
var tmpl = '<h1>{{name}}</h1><h1>{{age}}</h1>';
var data = {name:'zfpx',age:30};
var html= tmpl.replace(/\{\{(\w+)\}\}/g,function(input,group){
    return data[group];
})
console.log(html);

#### 静态文件服务器
如果要在网页中加载静态文件（css、js、img），就需要另外指定一个存放静态文件的目录，当浏览器发出非HTML文件请求时，服务器端就会到这个目录下去寻找相关文件

app.use(express.static(path.join(__dirname,'/')));

#### 重定向
redirect方法允许网址的重定向，跳转到指定的url并且可以指定status，默认为302方式。 语法

res.redirect([status], url);
示例

res.redirect("http://www.baidu.com");

#### post请求
post方法 根据请求路径来处理客户端发出的Post请求 语法

app.post(path,function(req, res));
示例

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post('/login',function(req,res){
        console.log(req.body.username);
});

#### 中间件原理
// 当请求到来的时候执行app,这是会对数组里的配置项一次匹配，匹配上的执行，匹配不上执行
var app = function(req,res){
   var i=0;//定义一个变量每次执行next后加一
    //每执行一次next,会取出一个中间件函数执行，并且把next传进去
   function next(){
       var fn = app.routes[i++];
       if(fn)
        fn(req,res,next);
   }
    next();
}
//存放中间件函数的数组
app.routes = [];
//配置函数
app.use = function(fn){
    //往数组里添加函数
    app.routes.push(fn);
}
//------------------------
app.use(function(req,res,next){
    console.log(req.url);
    console.log(1);
    next();
});
app.use(function(req,res,next){
    console.log(2);
    res.end('ok');
    next();
});
//-------------------
var http = require('http');
var server = http.createServer(app);
server.listen(9090);

#### params原理
//是路由里的路径
var path = '/users/:name/:age';
//真实请求的URL
var url = '/users/zfpx/8';
//存放所有的参数名
var paramNames = [];
var regStr = path.replace(/:(\w+)/g,function(matchedStr,group1){
    paramNames.push(group1);// name age 添加进来的
    return '(\\w+)';
});
console.log(regStr);//   \/users\/(\w+)\/(\w+)
var reg = new RegExp(regStr);
var result = url.match(reg);
//[ '/users/zfpx/8', 'zfpx', '8', index: 0, input: '/users/zfpx/8' ]
console.log(result);
var params = {};
//循环数组名 值就是 result中的分组
for(var i=0;i<paramNames.length;i++){
    params[paramNames[i]] = result[i+1];
}
console.log(params);

#### 构建基本服务器
- 创建express模块,导出一个函数，执行函数可以返回一个app对象
- app对象里定义get和listen两个方法
- get方法用于往路由里添加一条路由规则
- 初始化router对象保存所有的路由
- listen方法用于启动一个HTTP服务器并指定处理函数

const express = require('../index');
const app = express();
app.get('/',function(req,res){
    res.end('hello');
});
app.listen(3000,function(){
    console.log('server started on port 3000');
});

#### 封装Router
- app从字面量变为Application类
- 丰富HTTP请求方法
- 封装Router
- 路径一样的路由整合为一组，引入Layer的概念
- 增加路由控制，支持next方法，并增加错误捕获功能
- 执行Router.handle的时候传入out参数

const express = require('../');
const app = express();
/**
app.get('/',function(req,res,next){
    console.log(1);
    next();
},function(req,res,next){
    console.log(11);
    next();
}).get('/',function(req,res,next){
    console.log(2);
    next();
}).get('/',function(req,res,next){
    console.log(3);
    res.end('ok');
});
app.listen(3000);
**/
//-----------

app.get('/',function(req,res,next){
    console.log(1);
    next('wrong');
},function(req,res,next){
    console.log(11);
    next();
}).get('/',function(req,res,next){
    console.log(2);
    next();
}).get('/',function(req,res,next){
    console.log(3);
    res.end('ok');
}).get('/',function(err,req,res,next){
    res.end('catch: '+err);
});
app.listen(3000);

function Route(path){
    this.path = path;
    this.methods = {};
    this.stack = [];
}

function Layer(path,handler){
    this.path = path;
    this.handler = handler;
    this.regexp = pathToRegexp(this.path,this.keys = []);
}

//route主要跟path有关
proto.route = function (path) {
    const route = new Route(path);
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}
methods.forEach(function (method) {
    proto[method] = function (path) {
        //创建路由实例，添加Router Layer,创建时和path有关
        let route = this.route(path);
        //调用路由方法 添加route Layer
        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
});

// lib/router/route.js

function Route(path){
    this.path = path;
    this.methods = {};
    this.stack = [];
}
methods.forEach(function(method){
    Route.prototype[method] = function(){
    const handlers = Array.from(arguments);
    for(let i=0;i<handlers.length;i++){
        let layer = new Layer('/',handlers[i]);
        layer.method = method;
        this.stack.push(layer);
    }
    this.methods[method] = true;
    return this;
    }
});
Route.prototype._handles_method = function(method){
    return this.methods[method];
}
Route.prototype.dispatch = function(req,res,out){
    let idx = 0,self=this;
    function next(err){
        if(err){
            return out(err);
        }
        if(idx >= self.stack.length){
            return out(err);
        }
        let layer = self.stack[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_request(req,res,next);
        }else{
            next();
        }
    }
    next();
}

// lib/router/layer.js
function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function(path){
    return this.path == path;
}
Layer.prototype.handle_request = function(req,res,next){
    this.handler(req,res,next);
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length != 4){
        return next(err);
    }
    this.handle(err,req,res,next);
}

// lib/application.js
Application.prototype.lazyrouter = function(){
    if(!this._router){
        this._router = new Router();
    }
}
methods.forEach(function(method){
    Application.prototype[method] = function(){
       this.lazyrouter();
       this._router[method].apply(this._router,slice.call(arguments));
       return this;
    }
});

Application.prototype.listen = function(){
    const self = this;
    const server = http.createServer(function(req,res){
        function done(){
            res.end('Not Found');
        }
        self._router.handle(req,res,done);
    });
    server.listen.apply(server,arguments);
}

// lib/router/index.js

//route主要跟path有关
Router.prototype.route = function(path){
    const route = new Route(path);
    const layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}
methods.forEach(function(method){
    Router.prototype[method] = function(path){
        //创建路由实例，添加Router Layer
        let route = this.route(path);
        //调用路由方法 添加route Layer
        route[method].apply(route,slice.call(arguments,1));
        return this;
    }
});

Router.prototype.handle = function(req,res,out){
    let idx=0,self=this;
    let {pathname} = url.parse(req.url,true);
    function next(err){
        if(idx >= self.stack.length){
            return out(err);
        }
        let layer = self.stack[idx++];
        if(layer.match(pathname) && layer.route&&layer.route._handles_method(req.method.toLowerCase())){
            if(err){
                //没有中间件之前此写法无效
                layer.handle_error(err,req,res,next);
            }else{
                layer.handle_request(req,res,next);
            }
        }else{
            next();
        }
    }
    next();
}


// lib/router/route.js
Route.prototype.dispatch = function(req,res,out){
    let idx = 0,self=this;
    function next(err){
        if(err){
            return out(err);
        }
        if(idx >= self.stack.length){
            return out(err);
        }
        let layer = self.stack[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_request(req,res,next);
        }else{
            next();
        }
    }
    next();
}

#### 实现中间件
- application中添加use方法
- Router变函数
- 抽象出Router方便复用
- Router处理中间件

const express = require('../');
const app = express();
/**
app.use(function(req,res,next){
    console.log('Ware1:',Date.now());
    next();
});
app.get('/',function(req,res,next){
    res.end('1');
});
const user = express.Router();
user.use(function(req,res,next){
    console.log('Ware2',Date.now());
    next();
});
user.use('/2',function(req,res,next){
    res.end('2');
});
app.use('/user',user);
app.use(function(err,req,res,next){
    res.end('catch '+err);
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});
 **/
//----------------------------
app.use(function(req,res,next){
    console.log('Ware1:',Date.now());
    next('wrong');
});
app.get('/',function(req,res,next){
    res.end('1');
});
const user = express.Router();
user.use(function(req,res,next){
    console.log('Ware2',Date.now());
    next();
});
user.use('/2',function(req,res,next){
    res.end('2');
});
app.use('/user',user);
app.use(function(err,req,res,next){
    res.end('catch '+err);
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});

// lib/application.js
Application.prototype.use = function(handler){
    this.lazyrouter();
    let path = '/';
    let router = this._router;
    if(typeof handler != 'function'){
        path = handler;
        handler = arguments[1];
    }
    router.use(path,handler);
    return this;
}

// lib/router/index.js
function Router(){
    this.stack = [];
    function router(req,res,next){
        router.handle(req,res,next);
    }
    Object.setPrototypeOf(router,proto);
    router.stack = [];
    return router;
}
const proto = Object.create(null);

proto.use = function(handler){
  let path = '/',router= this._router;
  if(typeof handler != 'function'){
      path = handler;
      handler = arguments[1];
  }
  let layer = new Layer(path,handler);
  layer.route = undefined;
  this.stack.push(layer);
  return this;
}

proto.handle = function(req,res,out){
    let idx=0,self=this,removed='',slashAdded=false;
    let {pathname} = url.parse(req.url,true);
    function next(err){
        if(slashAdded){
            req.url = '';
            slashAdded = true;
        }
        if(removed.length>0){
            req.url = removed + req.url;
            removed = '';
        }
        if(idx >= self.stack.length){
            return out(err);
        }
        let layer = self.stack[idx++];
        if(layer.match(pathname) && layer.route&&layer.route._handles_method(req.method.toLowerCase())){
            if(layer.match(pathname)){
                if(err){
                    //没有中间件之前此写法无效
                    layer.handle_error(err,req,res,next);
                }else{
                    layer.handle_request(req,res,next);
                    if(!layer.route){
                        let removed = layer.path;
                        req.url = req.url.slice(0,removed.length);
                        if(req.url == ''){
                            req.url = '/';
                            slashAdded = true;
                        }
                        layer.handle_request(req,res,next)
                    }else if(layer.route._handles_method(req.method)){
                        layer.handle_request(req,res,next);
                    }else{
                        next(err);
                    }
                }
            }else{
                next();
                next(err);
            }
        }
        next();
    }
}

// lib/router/layer.js
if(this.path == path){
        return true;
    }
if(!this.route){
    if(this.path == '/'){
        return true;
    }
    if(this.path = path.slice(0,this.path.length)){
        return true;
    }
}
return false;

#### req.params
- 可以获取req.params
- 提供app.param的能力
    - layer借助path-to-regexp提取params
    - 在Router.handle里,process_params函数一次调用参数处理函数

const express = require('../');
const app = express();
app.param('uid',function(req,res,next,val,name){
    req.user = {id:1,name:'zfpx'};
    next();
})
app.param('uid',function(req,res,next,val,name){
    req.user.name = 'zfpx2';
    next();
})
app.get('/user/:uid',function(req,res){
    console.log(req.user);
    res.end('user');
});
app.listen(3000);

// lib/router/layer.js
Layer.prototype.match = function(path){
    if(this.path == path){
        return true;
    }
    if(this.route){
        this.params = {};
        let matches = this.regexp.exec(path);
        if(matches){
            for(let i=1;i<matches.length;i++){
                let key = this.keys[i-1];
                let prop = key.name;
                this.params[prop] = matches[i];
            }
            console.log(this.params);
            return true;
        }
    }
}

// lib/router/index.js
proto.param = function (name, handler) {
    if (!this.paramCallbacks[name]) {
        this.paramCallbacks[name] = []
    }
    this.paramCallbacks[name].push(handler);
}
proto.process_params = function (layer, req, res, done) {
  const paramCallbacks = this.paramCallbacks;
  const  keys = layer.keys;
  if(!keys || keys.length ==0){
      return done();
  }
  let keyIndex=0,name,callbacks,key,val;
  function param(){
      if(keyIndex >= keys.length){
          return done();
      }
      key = keys[keyIndex++];
      name = key.name;
      val = req.params[name];
      callbacks = paramCallbacks[name];
      if(!val || !callbacks){
          return param();
      }
      execCallback();
  }
  let callbackIndex = 0;
  function execCallback(){
      let cb = callbacks[callbackIndex++];
      if(!cb){
          return param();
      }
      cb(req,res,execCallback,val,name);
  }
  param();
}

#### 模版引擎
- 如何开发或绑定一个渲染引擎
- 注册一个渲染引擎
- 指定模版路径
- 渲染模版引擎

- app.engine(ext,callback)

    - ext 文件扩展名
    - callback 模版引擎的主函数
        - 文件路径
        - 参数对象
        - 回调函数

const express = require('../');
const path = require('path');
const html = require('../lib/html');
const app = express();
const fs = require('fs');
app.engine('html',html);
app.set('views',path.resolve('views'));
app.set('view engine','html');
app.get('/',function(req,res,next){
    res.render('index',{title:'hello',user:{name:'zfpx'}});
});
app.listen(3000);

// application.js
Application.prototype.set = function(key,val){
    if(arguments.length == 1){
        return this.settings[key];
    }
    this.settings[key] = val;
    return this;
}

Application.prototype.engine = function(ext,fn){
  let extension = ext[0]=='.'?ext:'.'+ext;
  this.engines[extension] = fn;
  return this;
}

Application.prototype.render = function(name,options,callback){
    console.log('app render');
    let engines = this.engines;
    let type = '.'+this.get('view engine');
    let render = engines[type];
    name = name.includes('.')?name:name+type;
    let file = path.join(this.get('views'),name);
    render(file,options,callback);
}

methods.forEach(function(method){
    Application.prototype[method] = function(){
        if(method == 'get'){
            if(arguments.length == 1){
                return this.set(arguments[0]);
            }
        }
       this.lazyrouter();
       this._router[method].apply(this._router,slice.call(arguments));
       return this;
    }
});

const server = http.createServer(function(req,res){
    function done(){
        res.end('Not Found');
    }
    res.app = self;
    self._router.handle(req,res,done);
});

// middle/init.js
module.exports = function(req,res,next){
    res.render = function(filepath,options,callback){
        let self = this;
        let done = function(err,html){
            res.setHeader('Content-Type','text.html;charset=utf-8');
            res.end(html);
        }
        res.app.render(filepath,options,callback||done);
    }
    next();
}

// 模版引擎
const fs = require('fs');
function render(filepath,options,callback){
  fs.readFile(filepath,'utf8',function(err,content){
      if(err) return callback(err);
      let head = "let tpl = ``;\n with(obj){\n tpl +=`";
      content = content.replace(/<%=([\s\S]+?)%>/g,function(){
          return "${"+arguments[1]+"}";
      });
      content = content.replace(/<%([\s\S]+?)%>/g,function(){
          return "`;\n"+arguments[1]+" tpl+=`";
      });
      let tail = "`\n}\nreturn tpl;";
      let html = head + content + tail;
      console.log(html);
      html = new Function('obj',html);
      html = html(options);
      return callback(null,html);
  })
}
module.exports = render;
/**
<%if(user){%>
  hello <%=user.name%>
<%}else{%>
  hello guest
<%}%>
*/
/**
 let tpl = ``;
 with (obj) {
        tpl += ``;
        if (user) {
            tpl += `hello ${user.name}`;
        } else {
            tpl += `hello guest`;
        }
        tpl += ``;
    }
 return tpl;
 **/

 lib/application.js

Application.prototype.set = function(key,val){
    if(arguments.length == 1){
        return this.settings[key];
    }
    this.settings[key] = val;
    return this;
}

Application.prototype.engine = function(ext,fn){
  let extension = ext[0]=='.'?ext:'.'+ext;
  this.engines[extension] = fn;
  return this;
}

Application.prototype.render = function(name,options,callback){
    console.log('app render');
    let engines = this.engines;
    let type = '.'+this.get('view engine');
    let render = engines[type];
    name = name.includes('.')?name:name+type;
    let file = path.join(this.get('views'),name);
    render(file,options,callback);
}

methods.forEach(function(method){
Application.prototype[method] = function(){
        if(method == 'get'){
            if(arguments.length == 1){
                return this.set(arguments[0]);
            }
        }
    this.lazyrouter();
    this._router[method].apply(this._router,slice.call(arguments));
    return this;
    @@ -37,6 +70,7 @@ Application.prototype.listen = function(){
    function done(){
        res.end('Not Found');
    }
    res.app = self;
    self._router.handle(req,res,done);
});
server.listen.apply(server,arguments);

// lib/html.js
const fs = require('fs');
function render(filepath,options,callback){
  fs.readFile(filepath,'utf8',function(err,content){
      if(err) return callback(err);
      let head = "let tpl = ``;\n with(obj){\n tpl +=`";
      content = content.replace(/<%=([\s\S]+?)%>/g,function(){
          return "${"+arguments[1]+"}";
      });
      content = content.replace(/<%([\s\S]+?)%>/g,function(){
          return "`;\n"+arguments[1]+" tpl+=`";
      });
      let tail = "`\n}\nreturn tpl;";
      let html = head + content + tail;
      console.log(html);
      html = new Function('obj',html);
      html = html(options);
      return callback(null,html);
  })
}
module.exports = render;

// lib/middle/init.js
module.exports = function(req,res,next){
    res.render = function(filepath,options,callback){
        let self = this;
        let done = function(err,html){
            res.setHeader('Content-Type','text.html;charset=utf-8');
            res.end(html);
        }
        res.app.render(filepath,options,callback||done);
    }
    next();
}

#### 静态文件中间件
express.static(root, [options])
express.static是 Express 内置的唯一一个中间件。是基于 serve-static 开发的，负责托管 Express 应用内的静态资源。

- root 参数指的是静态资源文件所在的根目录。
- options 对象是可选的，支持以下属性：

属性 | 描述 | 类型 | 默认值
dotfiles | 控制点文件服务，可选值为allow,deny,'ignore' | String | “ignore”
etag | 控制etag生成 | Boolean | true
extensions | 设置文件后缀名补充 | Boolean | false
index | 设置目录访问的返回，设置为false可以禁止目录访问 | Mixed | “index.html”
lastModified | 根据文件修改时间设置Last-Modified报头 | Boolean | true
maxAge | 设置Cache-Control报头的缓存控制时间，单位为毫秒 | Number | 0
redirect | 当路径名是目录时，重定向到包含结尾/的目录 | Boolean | true
setHeaders | 函数用于为文件设置HTTP头 | Function | 

#### body-parser中间件
body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。使用非常简单，以下两行代码已经覆盖了大部分的使用场景。

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

##### http报文头

POST / HTTP/1.1
Host: 127.0.0.1:8080
Content-Type: text/html; charset=utf8
Content-Encoding: gzip

zfpx

- Content-Type：请求报文主体的类型、编码。常见的类型有text/plain、application/json、application/x-www-form-urlencoded。常见的编码有utf8、gbk等。
- Content-Encoding：声明报文主体的压缩格式，常见的取值有gzip、deflate、identity。 报文主体：这里是个普通的文本字符串zfpx。

##### body-parser工作
- 处理不同类型的请求体：比如text、json、urlencoded等，对应的报文主体的格式不同。
- 处理不同的编码：比如utf8、gbk等。
- 处理不同的压缩类型：比如gzip、deflate等。

##### 处理内容类型

###### 处理text/plain
var http = require('http');

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'identity'
    }
};

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end('zfpx');
var http = require('http');

var parse = function (req, done) {
    let arr = [];
    req.on('data', data => {
        arr.push(data);
    });

    req.on('end', () => {
        let result = Buffer.concat(arr);
        done(result);
    });
};

var server = http.createServer(function (req, res) {
    parse(req, (chunks) => {
        res.end(chunks)
    });
});

server.listen(3000);

###### 处理application/json

'Content-Type': 'application/json',
client.end( JSON.stringify({name:zfpx}) );
 var json = JSON.parse( chunks.toString() );

###### 处理application/x-www-form-urlencoded

'Content-Type': 'form/x-www-form-urlencoded',
client.end( querystring.stringify({name:'zfpx}) );
 
var body = querystring.parse( chunks.toString() );

#### 处理不同编码
var iconv = require('iconv-lite');
var encoding = 'gbk';
'Content-Type': 'text/plain; charset=' + encoding,
var buff = iconv.encode('zfpx', encoding);
var contentType = require('content-type');
var obj = contentType.parse(req.headers['content-type']);
var charset = obj.parameters.charset;
var body = iconv.decode(chunks, charset);

#### 处理不同压缩类型
var zlib = require('zlib');
'Content-Encoding': 'gzip'
var buff = zlib.gzipSync('zfpx');
client.end(buff);
var contentEncoding = req.headers['content-encoding'];
if(contentEncoding === 'gzip') {
  stream = zlib.createGunzip();
  req.pipe(stream);
}

#### multipart/form-data
