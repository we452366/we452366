const express = require('./express');

let app = express(); 

// express 中的路由系统

app.get('/1',function(req,res,next){
    console.log('1');
    next();
    console.log('okokokok')
})
app.get('/1',function(req,res,next){
    console.log('2');
    res.end('end')
})
app.listen(3000); // 监听端口号

// /2