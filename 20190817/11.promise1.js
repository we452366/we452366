// 1) 并发问题 (同步多个异步方法的执行结束)
// 2) 链式调用问题 (先获取 name，通过name再获取age) 解决多个回调嵌套的问题

//Promise是一个类
// 1) 每次new 一个Promise都需要 传递一个执行器，只想起是立即执行的
// 2) 函数中由两个参数 resolve reject
// 3) 默认Promise 有三个状态 pendding => resolve 表示成功了fulfilled reject 表示拒绝rejected
// 4) 如果一旦成功了 不能变成失败 一旦失败 不能再成功了 只有当前状态是pending的时候 才能更改状态
// 5) 每个Promise都有一个then方法
const Promise=require('./Promise.js');
let p=new Promise((resolve,reject)=>{
    resolve('money');
    throw new Error('失败'); //如果抛出异常也会执行失败
});
//没有完全解决回调问题
p.then(data=>{
    console.log('success',data)
},err=>{
    console.log('error',err)
})
