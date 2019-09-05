const fs=require('fs').promises;
// async + await 是 generator + co 的语法糖
async function read(){ // async函数返回的是promise
    let content = await fs.readFile('./20190817/name.txt','utf8');
    let age =await fs.readFile(content,'utf8');
    return age;
}
read().then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})