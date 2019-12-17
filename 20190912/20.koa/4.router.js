// 匹配问题
// 默认路由是严格匹配 1.路径相同
//                 2.写成这则的方式 /\/a/\d+/ 能匹配上也ok
//                 3. /a/:name 路径参数


const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router({prefix:'a'});
// 必须要有 但是可以随机
router.get('/',function(ctx,next){
    ctx.body = 'home'
})
router.get('/:name/:id',function(ctx,next){ // /a/1/2 => {name:1,id:2}
    ctx.body = ctx.params; // 路径参数
    // next();
})
app
    .use(router.routes())
    .use(router.allowedMethods()); // 405

app.listen(3000)