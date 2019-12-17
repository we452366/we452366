// 通过node实现一个http服务
// 都是通过核心模块来提供  http模块
const http = require('http');

// 服务器要有特定的ip 和端口号
let server = http.createServer();
let querystring = require('querystring');
let url = require('url'); // url.parse

// 如果别人请求我，我需要去解析请求
server.on('request',(req,res)=>{
    // req 代表的是客户端
    // res 代表的就是服务端
    
    // 1) 请求行
    console.log(req.method); // 方法名大写
    let {pathname,query} = url.parse(req.url,true)
    console.log(pathname,query); // 请求路径  / 表示首页  url是不包含# hash的
    console.log(req.httpVersion);
    // 2) 请求头
    console.log(req.headers); // 取header都是小写
    // 3) 获取请求体
    let arr = []
    req.on('data',function(chunk){
        arr.push(chunk);
        console.log(chunk.toString()); // 流的原理 push(null) data方法不一定会触发
    });
    req.on('end',function(){
        console.log('end'); // end是一定触发
        console.log()

        // 响应行 头 体
        res.statusCode = 404; // 响应状态码
        // res.setHeader('Content-Length','1');
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        let content = Buffer.concat(arr).toString();
        let type = req.headers['content-type']
        if(type === 'application/json'){
            let obj = JSON.parse(content)
            return res.end(obj.a+'');
        }else if(type === 'application/x-www-form-urlencoded'){
            // 第二个参数 字段间的分隔符 第三个参数 是key value分隔符
            let obj = querystring.parse(content);
            return res.end(obj.a+'');
            //  let str = 'a=1; b=2'
            //  str.replace(/([^=&])=([^&=])/g,function(){
            //      console.log(arguments[1],arguments[2])
            //  })
        }else{ //  如果不支持的就默认返回
            return res.end(content);
        }
       
    });
    
})

// 开启一个端口号
let port = 3000;
server.listen(port,()=>{
    console.log(`server start ${port}`)
});

// 如果端口被占用了 自动+1
server.on('error',(err)=>{
    if(err.errno === 'EADDRINUSE'){
        server.listen(++port)
    }
})

// 每次服务端代码发生变化 都需要重启服务
// nodemon node的监视器 监视文件变化的
// sudo npm install nodemon -g   nodemon 文件名  (可以增加配置文件)
// pm2





// 一个完整的url
// const requestUrl = `http://username:password@www.baidu.com:80/s?offset=1&limit=30#app`

// let result = url.parse(requestUrl,true);
// console.log(result)
/*
{
    protocol: 'http:',
    slashes: true,  是否有/
    auth: 'username:password', 用户信息
    host: 'www.baidu.com:80',
    port: '80',
    hostname: 'www.baidu.com', // 主机名
    hash: '#app',
    query: 'offset=1&limit=30',  查询参数
    pathname: '/s',  请求路径 资源路由
    path: '/s?offset=1&limit=30',
    href:
     'http://username:password@www.baidu.com:80/s?offset=1&limit=30#app' }

*/