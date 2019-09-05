let fs=require('fs');

function readFile(...args){
    return new Promise((resolve,reject)=>{
        fs.readFile(...args,function(err,data){
            if(err) reject(err);
            resolve(data)
        })
    })
}
// 链式调用 如果返回一个普通值 会走下一个then的陈宫
// 抛出错误 then失败的方法
// 如果是promise 就让promise执行采用它的状态
// 是返回了一个新的promise 来实现链式调用

// promise链式调用
// 1) 普通值表示不是promise 也不是错误
// 2) 如果返回的是一个promise 那么这个promise会执行 并且采用它的状态
readFile('./20190817/name.txt','utf8').then(data=>{
    return readFile(data,'utf8')
}).then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})