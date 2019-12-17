const express = require('./express');


const app = express();


app.get('/user/:name/:age',function(req,res,next){
    console.log(req.params,'***');
    res.end('ok');
});
// 1) 自己写的
// react vue  path-to-regexp

// let requestUrl = '/user/:name/:age'; // [name ,age]
// let params = [];
// let regStr = requestUrl.replace(/:([^\/]+)/g,function(){
//     params.push(arguments[1])
//     return '([^\/]+)'
// })

// let url = '/user/1/2' // {name:1,age:2}
// let [,...agrs] = url.match(new RegExp(regStr)); // 
// console.log(agrs);


//现成的
// const pathToRegExp = require('path-to-regexp');
// let keys = [];
// let requestUrl = '/user/:name/:age'; 
// let reg = pathToRegExp(requestUrl,keys);

// let url = '/user/1/2'
// console.log(url.match(reg).slice(1));
app.listen(3000);
