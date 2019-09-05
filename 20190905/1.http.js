// 通过node 实现一个http服务
// 都是通过核心模块来提供
const http=require('http');
const url=require('url'); // url.parse
const querystring=require('querystring');

// 服务器要有特定的ip和端口号
let server=http.createServer();

// http://username:password@www.baidu.com:80/s?offset=1&limit=30#app
// 开启一个端口号
let port =3000;
server.listen(port,()=>{
    console.log(`server start ${port}`);
});
server.on('request',(req,res)=>{
    // req 客户端
    // res 服务端
    let {pathname,query}=url.parse(req.url,true);
    let arr=[];
    req.on('data',(chunk)=>{ // data不一定会触发
        arr.push(chunk);
    });
    req.on('end',()=>{ // end一定会触发

    })

    // 响应
    res.statusCode=404; // 响应状态码
    res.setHeader('Content-Type','Text/plain;charset=utf-8');
    res.end('1')
})
server.on('error',(err)=>{
    err.errno === 'EADDRINUSE' && server.listen(++port)
})
// 如果端口被占用了 自动+1
// 每次挂了都要重启
// nodemon node的监视器 监视文件变化
// sudo npm install nodemon -g nodemon 文件名 可以增加配置文件

