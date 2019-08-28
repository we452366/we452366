//chidir cwd()
//process.chidir('9.node');
const path = require('path');
console.log(path.resolve());//解析出一个绝对路径
console.log(process.cwd());//在哪里执行这个文件 目录就在哪里 代表的是执行的文件的目录

//env 环境变量
console.log(process.env);//可以根据环境变量的不同 执行不同的结果
//开发的时候 localhost  / www.xxx.cn
//临时变量 export / set => cross-env
//放到系统的环境变量中 计算机/系统/环境变量 win
let url='';
if(process.env.NODE_ENV==='development'){
    url='localhost'
}else{
    url='www'
}