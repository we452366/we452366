const express = require('express');
let app = express();
let fs = require('fs').promises;
let path = require('path');
const bodyparser = require('body-parser');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })



app.post('/profile', upload.array('avatar'), function (req, res, next) {
    console.log(req.files)
    res.send(req.file)
})
express.static = function(dirname){ // 中间件 是函数的目的：可以定制
    return async (req,res,next)=>{
        try{
            let filePath = path.join(dirname,req.path);
            let statObj = await fs.stat(filePath);
            if(statObj.isFile()){
                let content = await fs.readFile(filePath);
                // mime;
                res.end(content);
            }
        }catch(e){
            next(); // 处理不了 继续向下执行
        }
    }
}
app.use(express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
// 作业：实现body-parser
app.post('/login',function(req,res){
   console.log(req.body);
});


// 静态文件处理 请求体处理 文件上传 koa-better-body / koa-multer
// multer


app.listen(3000);