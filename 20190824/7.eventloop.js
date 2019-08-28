//浏览器的eventloop
//我们代码的执行顺序 微任务 宏任务

//进程 计算机调度任务的最小单位
//线程 js是单线程是指进程中只有一个单线程
//渲染线程和js线程 是互斥的

//script脚本里执行 宏任务
//异步代码 需要等待同步 等待执行完毕
setTimeout(()=>{
    console.log(1);
    setTimeout(()=>{
        console.log(3)
    },0)
},2000)
setTimeout(()=>{
    console.log(2)
},1000)
//当前主栈全部执行完毕后 -> 清空微任务 -> 会取出一个宏任务 -> 执行完毕后 继续清空微任务 -> 无限循环

//vue 为什么要提供一个$nextTick 做一个缓存机制

//nextTick先查看是否支持promise 微
//MutationObserver 微

//setImmediate 宏
//setTimeout 宏

//微任务：promise.then、MutationObserver
//宏任务：script、ajax、事件、requestFrameAnimation、setTimeout、setInterval、setImmediate（ie）、MessageChannel、UI rendering