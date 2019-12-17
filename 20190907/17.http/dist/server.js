"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _url = _interopRequireDefault(require("url"));

var _zlib = _interopRequireDefault(require("zlib"));

var _crypto = _interopRequireDefault(require("crypto"));

var _mime = _interopRequireDefault(require("mime"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ejs = _interopRequireDefault(require("ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let {
  readFile,
  writeFile,
  readdir,
  stat
} = _fs.default.promises; // 第三方 

// 希望确定的查找 template文件
let template = _fs.default.readFileSync(_path.default.resolve(__dirname, '../template.html'), 'utf8');

class Server {
  constructor(config) {
    this.port = config.port;
    this.template = template; // 将template属性放到实例上 可以保证属性永远可以通过this来获取，不被参数覆盖掉
  }

  async handleRequest(req, res) {
    let {
      pathname
    } = _url.default.parse(req.url, true); // 解析中文路径


    pathname = decodeURIComponent(pathname); // 找到当前执行命令的目录,并执行，而不是当前文件所在的文件夹目录

    let filePath = _path.default.join(process.cwd(), pathname); // /http-1.md


    try {
      // 判断文件的状态
      let statObj = await stat(filePath);

      if (statObj.isDirectory()) {
        // 我需要判断是不是目录 
        // 如果是目录 我需要读取目录下的文件
        let dirs = await readdir(filePath); // 我需要访问文件的时候 增加他当前的路径，如果是/ 就不增加了，否则将路径拼在文件前面

        let templateStr = _ejs.default.render(this.template, {
          dirs,
          path: pathname === '/' ? '' : pathname
        });

        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(templateStr);
      } else {
        this.sendFile(filePath, req, res, statObj);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }
  }

  gzip(filePath, req, res, statObj) {
    // 查看一下当前是否支持 压缩
    let encoding = req.headers['accept-encoding'];

    if (encoding) {
      // 看一下是否支持gzip 、 deflate
      if (encoding.match(/gzip/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return _zlib.default.createGzip();
      } else if (encoding.match(/deflate/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return _zlib.default.createDeflate();
      }

      return false;
    }

    return false;
  }

  cache(filePath, req, res, statObj) {
    // 协商缓存  对比
    // 1) 文件可能没发生变化 但是修改时间变化了
    // 2) 精确的时间不准确 会导致问题 同一时间内改了很多次
    // 3) cdn   55 继续
    // 指纹
    // statObj.ctime 是一个时间类型
    let lasModified = statObj.ctime.toGMTString();

    let Etag = _crypto.default.createHash('md5').update(_fs.default.readFileSync(filePath)).digest('base64');

    res.setHeader('Last-Modified', lasModified);
    res.setHeader('Etag', Etag); // 真正的etag 可能只是文件的某一份

    let ifModifiedSince = req.headers['if-modified-since'];
    let ifNoneMatch = req.headers['if-none-match'];

    if (ifModifiedSince && ifNoneMatch) {
      if (ifNoneMatch !== Etag || ifModifiedSince !== lasModified) {
        return false;
      }

      return true;
    } else {
      return false;
    } // 如果指纹变了 就不是一个人 md5 
    // 我们可以计算文件md5戳  slice(20)

  }

  sendFile(filePath, req, res, statObj) {
    // 表示10s 内不要在访问服务器
    res.setHeader('Cache-Control', 'max-age=10'); // // 如果设置强制缓存 首页是不会缓存的，访问的页面如果有强制缓存 则不会在发起请求
    // res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());
    // console.log(filePath);
    // res.setHeader('Cache-Control','no-cache'); // 每次都访问服务器 但是缓存
    // res.setHeader('Cache-Control','no-store'); // 不走缓存 而且缓存里没有
    //  在文件发送过程中 如果浏览器支持压缩 我需要对浏览器的内容先压缩有在返回

    let cache = this.cache(filePath, req, res, statObj);

    if (cache) {
      // 有缓存 直接找缓存里的内容就好了
      res.statusCode = 304;
      return res.end();
    } // 对比缓存


    let flag = this.gzip(filePath, req, res, statObj);
    let type = _mime.default.getType(filePath) || 'text/plain';
    res.setHeader('Content-Type', type + ';charset=utf-8');

    if (!flag) {
      _fs.default.createReadStream(filePath).pipe(res);
    } else {
      _fs.default.createReadStream(filePath).pipe(flag).pipe(res);
    }
  }

  sendError(e, req, res) {
    console.log(e);
    res.statusCode = 404;
    res.end(`Not Found`);
  }

  start() {
    let server = _http.default.createServer(this.handleRequest.bind(this));

    server.listen(this.port, () => {
      console.log(`${_chalk.default.yellow('Starting up http-server, serving')} ${_chalk.default.blue('./')}
Available on:
    http://127.0.0.1:${_chalk.default.green(this.port)}
Hit CTRL-C to stop the server`);
    });
  }

}

var _default = Server; // http优化策略 压缩  缓存
// 1) 实现压缩 
// 2) 客户端说我支持:Accept-Encoding: gzip, deflate, br
// 服务器：Content-Encoding: gzip
// 缓存
// 1) 强制缓存 : Cache-Control Expires
// ajax 跨域
// 防盗链
// 反向代理 正向代理
// 虚拟主机
// 多语言 、 根据内核跳转页面
// koa 讲原理
// 作业 写一篇关于http的文章
// 1）借鉴别人的文章 http 不安全 https
// 2) koa 原理编写

exports.default = _default;