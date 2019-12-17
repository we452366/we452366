const express = require('./express');

let app = express(); 
// cookie path 只要路径开头匹配

// 中间件的特点 可以封装一些公共逻辑 ，扩展req，res
// 决定是否向下执行

// 错误处理: 只要有错误 就在next中传递错误
app.use(function(req,res,next){
    console.log('middle1');
    next(); // router中的layer中的next
});
app.use('/u',function(req,res,next){
    console.log('middle2')
    next();
})
app.use('/user',function(req,res,next){
    console.log('middle3')
    next();
})
app.get('/user/add',function(req,res,next){
    console.log('xxxx');
    next(); // route中的layer中的next
},function(req,res,next){
    res.end('ok');
})
// 放到页面的最底下
app.use((err,req,res,next)=>{
    console.log(err);
    res.end('not found')
})
app.listen(3000); // 监听端口号