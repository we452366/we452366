const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const parent = new Router();
const child1 = new Router({prefix:'a'});
const child2 = new Router();


child1.get('/',async (ctx,next)=>{
    ctx.body = '/a'
})

child2.get('/',async (ctx,next)=>{
    ctx.body = '/b'
})
// parent.get('/',async (ctx)=>{
//     ctx.body = 'hello'
// })
parent.use('/',child1.routes());
parent.use('/b',child2.routes());
app.use(parent.routes())

app.listen(3000);


// npm i koa-gernator -g
// koa2 

// koa-bodyparser
// koa-static
// koa-router

// express  ctx