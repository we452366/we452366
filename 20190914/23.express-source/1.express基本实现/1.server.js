const express = require('./express');

let app = express(); // app 就是一个监听函数,内部会创建一个应用

// express 内置了路由系统
// req,res 是 http.createServer((req,res)) 扩展了一些属性
app.get('/',function(req,res){
    res.end('end');
})
app.get('/1',function(req,res){
    res.end('end 1');
})
app.listen(3000); // 监听端口号