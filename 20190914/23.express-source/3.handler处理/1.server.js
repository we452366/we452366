const express = require('./express');

let app = express(); 

// express 中的路由系统

// 多个函数 可以进行路由的鉴权
app.get('/1',function(req,res,next){
    console.log('1');
    next();
},function(req,res,next){
    console.log(11);
    next();
},function(req,res,next){
    console.log(111);
    next();
})
app.get('/1',function(req,res,next){
    console.log('2');
    res.end('end')
})
app.listen(3000); // 监听端口号

// /2