//浏览器 window对象
//浏览器无法直接访问global对象 所以需要window来代理

//在node中可以直接访问global

//默认声明的属性不放在global上的
//node 的特点 每个文件都是一个模块，模块外面包含了匿名函数
// module exports require __dirname __filename 全局对象
console.log(this===module.exports);//true

(function(){
    console.log(Object.keys(global))
})();

console.log(global)

//global 中的属性 全局属性 

//process 进程 开启很多线程
//Buffer 缓存区 读取文件 内存中的数据都是二进制的 用十六进制表示
//clearInterval setInterval
//clearTimeout setTimeout
//clearImmediate setImmediate

//命令 windows目录 mac目录
console.log(process);

//argv 代表用户传递的参数
//argv 代表用户传递的参数 默认前两个参数 没有实际意义
//执行node node + 文件名执行
//只能通过该 命令 + 文件名 文件后面是参数
console.log(process.argv.slice(2)); //收集用户传递的参数

// '--port'
let config=process.argv.slice(2).reduce((memo,current,index,array)=>{
    if(current.includes('--')){
        memo[current.slice(2)]=array[index+1]
    }
    return memo;
},{});
console.log(config);

//chdir cwd() current working directory

//env 环境变量
//nextTicknode 中的微任务




//commander 命令行的管家 帮你提供 --help 必须先安装
const program = require('commandor');
const chalk= require('chalk');
// 解析用户的参数 默认提供 --help
program //配置命令 我输入命令后 要执行一些内容
    .command('create')
    .alias('c')
    .description('create project')
program //配置属性 给代码传递参数
    .options('-p,--port, <val>','set port')
    .version('1.0.0')
    

program.on('--help',()=>{
    console.log('Examples')
    console.log('node 1.js --help')
    console.log('node 1.js create project'+chalk.green('project'))
}).parse(process.argv)
//chalk 粉笔
console.log(program.port)