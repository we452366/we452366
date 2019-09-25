const http=require('http');
http.createServer((req,res)=>{
    res.end('process:'+process.pid)
}).listen(3000)