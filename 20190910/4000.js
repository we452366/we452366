let http = require('http');

http.createServer((req,res)=>{
    res.end('b.zhufeng.cn')
}).listen(4000)