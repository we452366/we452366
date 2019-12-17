const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const Router = require('./Router');
const fs = require('fs');
let app = new Koa();
// 如果处理好了静态文件 就不用处理请求体力
app.use(static(__dirname));
app.use(bodyparser());
let router = new Router();
router.get('/',function(ctx,next){ // router的原理比koa还复杂
    console.log(1);
    next();
})
router.get('/',function(ctx,next){
    console.log(2);
})
router.get('/user',function(ctx,next){
    console.log(3);
    next();
})
router.get('/user',function(ctx,next){
    console.log(4);
    next();
})
app.use(router.routes());
app.use(async(ctx,next)=>{
    console.log(5);
})


// 路由匹配 会匹配 方法和路径
// router.get('/form',async (ctx,next)=>{
//     ctx.set('Content-Type','text/html');
//     ctx.body = fs.createReadStream('./form.html');
// });

// router.post('/login',async(ctx,next)=>{
//     ctx.body = ctx.request.body;
// })
// 将路由挂载在应用上


app.listen(3000);
