// 反向代理 正向代理
// 虚拟主机

// koa 讲原理

let http = require('http');
let httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer(); 

// 我希望 一个 服务器上可以部署多个网站  nginx
// www.zf1.cn  => 3000
// proxy
// www.zf2.cn  => 4000
let map = {
    'a.zhufeng.cn':'http://localhost:3000',
    'b.zhufeng.cn':'http://localhost:4000'
}
// 根据host不同返回不同的网站 ，主要倚靠的就是反向代理
http.createServer((req,res)=>{
    // http-proxy
    let target = req.headers.host.split(':')[0]
    proxy.web(req,res,{
        target:map[target]
    });
}).listen(81);

// 反向是针对浏览器透明，正向是针对服务器透明