
const http = require('http');

http.createServer((req,res)=>{
    // http 无状态的 没法记住状态   cookie
    // 不能写 * 但是表示所有人都能访问我
    res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
    // 如果发送的是其他header 我需要允许一下
    res.setHeader('Access-Control-Allow-Headers','token,xxx');
    // 我允许哪个方法来访问我
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE');
    // 30分钟 发一次options  prefight 预检
    res.setHeader('Access-Control-Max-Age','1800');
    // 允许客户端携带凭证
    res.setHeader('Access-Control-Allow-Credentials',true)
    if(req.method === 'OPTIONS'){
        console.log('options')
        return res.end();
    }
    if(req.url === '/api'){
        res.setHeader('Set-Cookie','name=zf');
        res.end(JSON.stringify({name:'zf'}));
    }
}).listen(3000)

// nginx 反向代理 就是针对用户是透明的
// webpack proxy 反向 代理接口 我访问的还是以前的接口 缓存 cdn （缓存 + 反向代理）
// 核心创建代理服务器

// ajax 跨域
// 跨域解决方案 1.jsonp  2.cors  3.iframe 4.websocket 5.widnow.name  6.nginx
// 多语言 、 根据内核跳转页面

// koa 讲原理

// 作业 写一篇关于http的文章
// 1）借鉴别人的文章 http 不安全 https
// 2) koa 原理编写