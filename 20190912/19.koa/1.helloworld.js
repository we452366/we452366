const Koa = require('koa');

const app = new Koa();

// compose 组合成了一个大的函数
// 中间件 use方法 他可以决定是否乡下执行
// 可以使用async + await 语法
const logger = ()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        console.log('logger');
        resolve(); 
      }, 1000);
    })
}
// 1 2 logger 3 6 5 4
// 组合的结果是一个promise
// 作业：把koa源码看一下 用逼格最高的代码来实现一版本koa reduce => compose
app.use(async (ctx,next)=>{ // 上下文 核心逻辑只有三行
  console.time('start')
  await next(); // 当前执行next的时候 没有等待这个next执行完，但是外层的函数已经执行完了
  console.timeEnd('start')
});
app.use(async (ctx,next)=>{ // 上下文
  await logger();
  return next();
});
app.use(async (ctx,next)=>{ // 上下文
  await next();
  ctx.body = '500'
});

// koa 里面有个compose 方法 会讲所有的方法组合成一个大的promise
app.listen(3000);





// node 有原生 req res (原生) 
// request response (koa封装的自己) 增加了很多的方法
// ctx 代理了 req ,res ,request,response

// 尽量不要使用原生的方法