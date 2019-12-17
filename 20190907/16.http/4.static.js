const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream } = require("fs");
const mime = require("mime");
// 提供一个静态服务

class HttpServer {
  // constructor(){
  //     this.handleRequest  = this.handleRequest.bind(this)
  // }
  async handleRequest(req, res) { // 处理请求
    // this => HTTPServer
    let { pathname, query } = url.parse(req.url, true);
    let filePath = path.join(__dirname, pathname);
    try {
      let statObj = await fs.stat(filePath); // 文件是否存在
      this.sendFile(statObj, filePath, req, res); // 就把文件发回去
    } catch (e) {
      this.sendError(e, res);
    }
  }
  async sendFile(statObj, filePath, req, res) { // 发送文件需要判断是不是目录
    if (statObj.isDirectory()) {
      filePath = path.join(filePath, "index.html"); // 增加index.html
      try {
        await fs.access(filePath); // 如果有就继续
      } catch (e) {
        return this.sendError(e, res); // 如果没有 就直接报错
      }
    }
    // 返回文件的逻辑
    res.setHeader("Content-Type", mime.getType(filePath) + ";charset=utf-8");
    createReadStream(filePath).pipe(res); // res.write() res.end()
  }
  sendError(e,res) { // 发送错误
    console.log(e);
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  // 开启一个服务
  start(...args) {
    // 1) 保证this指向正确  bind  (call/apply)
    // 2) babel

    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

let hs = new HttpServer();
hs.start(3000, () => {
  console.log(`server start`);
});


// header header的应用 文档 优化
// koajs原理

