const express = require('./express');
const path = require('path');
// 模板引擎 koa-views
const app = express();
app.set('views','view'); // 将默认的存放路径更改
app.set('view engine','.html');// 默认使用可以使用html文件

app.engine('.html',require('ejs').__express);//如果遇到.html用ejs来渲染
app.get('/',function(req,res){
   console.log(req.a)
   res.sendFile(path.resolve(__dirname,'package.json'))
   // res.send(301);
})

app.listen(3000);
// 默认会查找 views目录下的文件
// 默认后缀 ejs