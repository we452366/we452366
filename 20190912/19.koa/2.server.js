const Koa = require('./koa/application'); // 核心文件


let app = new Koa();

app.use((ctx)=>{
  // console.log(ctx.req.path);
  // console.log(ctx.request.req.path);
  // // 必须要把req放到request上，可以在request上拿到req的属性
  // console.log(ctx.request.path);
  // // 非常像vue 
  // // ctx.url => ctx.request.url  代理
  // console.log(ctx.path);

  // ctx.body = 'hello';
  // console.log(ctx.response.body)
});

app.listen(4000);