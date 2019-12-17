let http = require('http');

http.createServer((req,res)=>{
    res.end('a.zhufeng.cn')
}).listen(3000)