const Koa = require("koa");
const app = new Koa();
const {createReadStream} = require("fs");
const fs = require('fs').promises
const path  =require('path');
const mime = require('mime');
const uuid = require('uuid'); // 第三方
const static = require('koa-static')
Buffer.prototype.split = function(sep){
  let len = Buffer.from(sep).length; // 分割符的长度
  let offset = 0;
  let result = [];
  let current;
  // 把找到的位置赋给current  看一下是否为-1
  while((current = this.indexOf(sep,offset))!==-1){
      result.push(this.slice(offset,current)); // 把每次的记过push到数组中
      offset = current + len // 增加查找偏移量
  }
  result.push(this.slice(offset)); // 最后一段追加进去
  return result;
}
function bodyparser() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = [];
      ctx.req.on("data", function(chunk) {
        arr.push(chunk);
      });
      ctx.req.on("end", function() {
        // 如果当前提交过来的数据 不是正常 json 、 表单格式 我们需要自己解析)

        let type = ctx.get('content-type');
        if(type.includes('multipart/form-data')){
          let buff = Buffer.concat(arr);
          let bonduary = type.split('=')[1];
          bonduary = '--' + bonduary;
          let lines = buff.split(bonduary).slice(1,-1);
          let obj = {};
          lines.forEach((line)=>{
            let [head,content] = line.split('\r\n\r\n'); // ?  自己算
            head = head.toString();
            let key = head.match(/name="(.+?)"/)[1]
            if(head.includes('filename')){
              // 文件
              let filename = uuid.v4()
              fs.writeFileSync(path.resolve(__dirname,'upload',filename),content.slice(0,-2),'utf8');
              obj[key] = filename
            }else{
              obj[key] = content.slice(0,-2).toString();
            }
          });
         ctx.request.body = obj; 
          resolve();
        }else{
          resolve();
        }
      });
    });
    await next();
  };
}
app.use(bodyparser());


// function static(dirname){
//   return async (ctx,next)=>{
//     try{
//       let filePath = path.join(dirname,  ctx.path)
//       let statObj = await fs.stat(filePath);
//       if(statObj.isDirectory()){
//         filePath = path.join(filePath,'index.html');
//         await fs.access(filePath);
//       }
//      ctx.set('Content-Type',mime.getType(filePath)+';charset=utf-8')
//      ctx.body = createReadStream(filePath);
//     }catch(e){
//       await next();
//     }
//   }
// }
// 静态文件中间件 ，根据用户访问的路径 去对应的目录下查找，查找到返回即可，找不到交给下一个中间件
app.use(static(__dirname));
app.use(static(path.resolve(__dirname,'upload')))

app.use(async (ctx, next) => {
  if (ctx.path === "/form" && ctx.method === "GET") {
    ctx.set("Content-Type", "text/html;charset=utf-8");
    ctx.body = createReadStream("./form.html");
  } else {
    await next();
  }
});
app.use(async (ctx, next) => {
  console.log(ctx.path,ctx.method);
  if (ctx.path === "/login" && ctx.method === "POST") {
    console.log(ctx.request.body)
    ctx.set("Content-Type", "text/plain;charset=utf-8");
    ctx.body = ctx.request.body;
  }
});

app.on('error',function(err){ // catch 方法
  console.log(err)
})
app.listen(3000); // 监听3000 端口
