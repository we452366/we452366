// 1) 我们希望 读取数据 node 异步 会等待同步代码都执行完成后再执行
const fs=require('fs');
let school={};
//并发的问题 如何解决 计数器
const after=(times,fn)=>()=> --times===0 && fn();

let newAfter=after(2,()=>{
    console.log(school)
})

fs.readFile('name.txt','utf8',(err,data)=>{
    school['name']=data;
    newAfter();
});
fs.readFile('age.txt','utf8',(err,data)=>{
    school['age']=data;
    newAfter();
});