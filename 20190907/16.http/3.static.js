// 静态资源

// 浏览器 访问index.html  -> style.css

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
let server = http.createServer((req, res) => {
  // fs操作 绝对路径
  let { pathname } = url.parse(req.url); // / /index.html
  let filePath = path.join(__dirname, pathname);

  // exists  access  stat
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404;
      res.end(`Not Found`);
    } else {
      if (statObj.isDirectory()) {
        // 如果是文件夹 需要读取文件中的index.html
        filePath = path.join(filePath, "index.html");
        fs.access(filePath, function(err) {
          if (err) {
            res.statusCode = 404;
            res.end(`Not Found`);
          } else {
            // readFile writeFile  pipe
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            fs.createReadStream(filePath).pipe(res);
          }
        });
      } else {
        // 如果是文件读取出来写回去就ok
        let t = require("mime").getType(filePath);
        res.setHeader("Content-Type", t + ";charset=utf-8");
        fs.createReadStream(filePath).pipe(res);
      }
    }
  });
});

server.listen(3000);
