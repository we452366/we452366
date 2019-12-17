// npm install koa
// application 创建一个应用
// request 扩展req ,res
// response
// context 上下 整合req 和 res 代理 继承了 原生req,res request和response 自己封装的

// mvc
const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
// const bodyparser = require('koa-bodyparser'); // 1） 他是一个函数

// 1特点: 可以扩展 公共属性 和方法
// 2特点： 可以决定是否向下执行
// 3特点 ： 可以实现权限
// 4中间件 一般放在真实执行逻辑的上面

function bodyparser() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = [];
      ctx.req.on("data", function(chunk) {
        arr.push(chunk);
      });
      ctx.req.on("end", function() {
        let result = Buffer.concat(arr).toString();
        ctx.request.body = result; // 把当前提交过来的数据 放到 ctx.request.body
        resolve();
      });
    });
    await next();
  };
}
app.use(bodyparser());
// web服务 接受用户请求的数据  来解析,返回数据
// 1)有一个表单 当我访问 /form 的时候 显示表单
// 2)当我点击 按钮时能提交数据
// 可以组合
app.use(async (ctx, next) => {
  if (ctx.path === "/form" && ctx.method === "GET") {
    // 实现文件下载 指定下载
    // ctx.set('Content-Disposition',"attachment;filename=FileName.txt");
    ctx.set("Content-Type", "text/html;charset=utf-8");
    ctx.body = fs.createReadStream("./form.html");
  } else {
    await next(); // await next next函数执行完后，不用等待当前下一个中间件执行完毕
  }
});
// koa 所有的异步都封装成promise
app.use(async (ctx, next) => {
  if (ctx.path === "/login" && ctx.method === "POST") {
    // 需要统一处理请求体
    ctx.body = ctx.request.body;

    // return new Promise((resolve, reject) => {
    //   let arr = [];
    //   ctx.req.on("data", function(chunk) {
    //     arr.push(chunk);
    //   });
    //   ctx.req.on("end", function() {
    //     let result = Buffer.concat(arr).toString();
    //     ctx.body = result;
    //     resolve();
    //   });
    // });
  }
});
app.on('error',function(err){ // catch 方法

})
app.listen(3000); // 监听3000 端口
