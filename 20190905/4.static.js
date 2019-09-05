// 静态资源

const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs').promises;
const {createReadStream}=require('fs');
const mime=require('mime');

// 提供一个静态服务
class HttpServer{
    async handleRequest(req,res){
        let {pathname,query}=url.parse(req.url,true);
        let filePath=path.join(__dirname,pathname);
        try{
            let statObj=await fs.stat(filePath);
            this.sendFile(statObj,filePath,req,res);
        }catch(e){
            this.sendError(e,res)
        }
    }
    start(...args){
        let server=http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
    async sendFile(statObj,filePath,req,res){
        if(statObj.isDirectory()){
            filePath=path.join(filePath,'index.html');
            try{
                await fs.access(filePath)
            }catch(e){
                this.sendError(e,res)
            }
        }
        res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8');
        createReadStream(filePath).pipe(res);
    }
    sendError(e,res){
        res.statusCode=404;
        res.end(`not found`)
    }
}

let hs=new HttpServer();
hs.start(3000,()=>{
    console.log(`server start`)
})