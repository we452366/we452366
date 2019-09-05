const Promise = require('./Promise');

// 如果一个promise then的方法中返回了一个普通值

let p = new Promise((resolve,reject)=>{
    resolve('hello')
})

p.then(data=>{
    return data
}).then(data=>{
    console.log(data)
})
