//微任务
let fs=require('fs');
process.nextTick(()=>{ //node中的微任务
    console.log('nextTick')
})
//新版本 Node 和 浏览器基本一样
//事件环 node里面是自己实现的时间环

//受nodejs影响 不一定谁在前 73版本后的谷歌浏览器和node已经一致
//fs.readFile('1.argv.js',function(){
    setTimeout(()=>{ //根据调用的上下文
        console.log('timer'+1);
        Promise.resolve().then(()=>{
            console.log('then')
        })
    });
    Promise.resolve().then(()=>{
        console.log('then2');
        setImmediate(()=>{
            console.log('timer'+2);
        })
    })
//})

//nextTick 不能写无限递归

//面试题
async function async1(){
    console.log('async1 start1');
    await async2()
    console.log('async1 end');
}
async function async2(){
    console.log('async2')
}
console.log('script start');
setTimeout(function(){
    console.log('setTimeout')
},0)
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve()
}).then(function(){
    console.log('promise2')
})
console.log('script end');
//script start
//async1 start1
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout