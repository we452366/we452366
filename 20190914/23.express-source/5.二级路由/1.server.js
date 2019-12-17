const express = require('./express');

// 类 js中没有类  就是构造函数
let router1 = express.Router(); // 创建了一个路由系统
let router2 = express.Router();
let app = express(); 

router1.get('/add',function(req,res,next){
    res.end(`user add`)
})
router1.get('/delete',function(req,res,next){
    res.end(`user delete`)
})
// /add
router2.get('/xxx',function(req,res,next){
    res.end('xxx');
})
// /user/xxx
app.use('/user',router1); // 挂载了一个中间件
app.use('/user',router2);
app.listen(3000);

// 1) 如何处理二级路由 
// 2) 处理路径参数 req.params
// 3) 参数处理