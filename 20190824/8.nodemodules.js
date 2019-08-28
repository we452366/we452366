//node 是一个runtime
//node可以开启多个子进程 pm2
//模块 es模块 commonjs模块
//每个文件都是一个模块
//AMD requirejs CMD seajs

//commonjs 只是一个规范
//每个文件都是一个模块
//如果别人想使用我 就需要ruquire
//我如果想给别人用 就需啊哟module.exports

//怎么实现模块化？ 防止命名冲突
//命名空间 无法彻底解决命名问题
//自执行函数 node让js拥有了在服务端执行的能力，可以读写文件了

// fs模块 fileSystem
// const fs=require('fs');
// //fs.readFileSync
// //判断文件是否存在
// fs.accessSync('.gitignore');//判断文件是否存在 如果不存在抛出异常

// const path=require('path');//专门处理路径的模块

// console.log(__dirname);
// //resolve 出来的一定是一个绝对路径
// //join 就是以/拼接 有/只能用join
// console.log(path.resolve(__dirname,'./a.js'));
// console.log(path.join(__dirname,'a','b'));
// console.log(path.extname('main.js'));
// console.log(path.basename('main.js','js'));
// console.log(path.dirname(__dirname));//获取父路径

// //common.js
// let vm=require('vm');//虚拟机模块

// //让字符串执行 new Function eval 
// //node提供了一个沙箱环境

// vm.runInThisContext(`console.log('vs')`)

//实现模块化
const fs=require('fs');
const path=require('path');
const vm=require('vm');
function Module(absPath){
    this.id=absPath;
    this.exports={};
}
const wrapper=[//exports是module的一个属性
    '(function(exports,module,require){','}'
]
Module.prototype.load=function(){
    let script=fs.readFileSync(this.id,'utf8');
    let fnStr=wrapper[0]+script+wrapper[1];
    let fn=vm.runInThisContext(fnStr);
    fn(this.exports,this,req);
}
function req(file){
    //1）把当前这个文件读取出来 把相对路径转换成绝对路径
    let absPath=path.resolve(__dirname,file);
    //加载一个模块 模块就是要有一个exports属性
    //2）创建一个模块
    let module=new Module(absPath);

    //3）加载模块
    module.load();
    return module.exports
}

//核心逻辑
//Module._resolveFilename 解析文件的名字 获取文件的绝对路径
//module.load(filename) 加载模块
//fs.readFileSync(filename,'utf8') 同步的读取文件内容
//加函数
//让函数执行将 module.exports 传入给 用户给module.exports 赋值
//把module.exports返回