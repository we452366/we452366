// promise.all 全部 处理多个异步的并发问题
let fs =require('fs').promises;

// 全部完成才算完成 如果由一个失败 就失败
// promise.all 是按照顺序执行的
// promise.race 谁快返回谁
const isPromise=function(value){
    if((typeof value === 'object' && typeof value !== null)|| typeof value === 'function'){
        return typeof value.then === 'function'
    }
    return false;
}
Promise.all=function(promises){
    return new Promise((resolve,reject)=>{
        let arr=[]; // 存放最终结果
        let i=0;
        let processData=(index,data)=>{
            arr[index]=data;
            if(++i === process.length){
                resolve(arr)
            }
        }
        for(let i=0;i<promises.length;i++){
            let current=promises[i]; // 获取当前的每一项
            if(isPromise(current)){ // 如果是promise
                current.then(data=>{
                    processData(i,data)
                },reject)
            }else{
                processData(i,current)
            }
            
        }
    })
}
Promise.all([fs.readFile('./20190817/name.txt','utf8'),1,2,3,
fs.readFile('./20190817/name.txt','utf8')]).then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})
