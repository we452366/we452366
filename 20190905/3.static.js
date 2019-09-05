// 静态资源

const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');

let server=http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let filePath=path.join(__dirname,pathname);

    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.statusCode=404;
            return res.end(`not found`)
        }else{
            if(statObj.isDirectory()){
                filePath=path.join(filePath,'index.html');
                fs.access(filePath,err=>{
                    if(err){
                        res.statusCode=404;
                        res.end(`not found`)
                    }else{
                        res.setHeader('Content-Type','text/html;charset=utf-8')
                        fs.createReadStream(filePath).pipe(res)
                    }
                })
            }else{
                let t=require('mime').getType(filePath);
                res.setHeader('Content-Type',t+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res)
            }
        } 
    })
});

server.listen(3000);