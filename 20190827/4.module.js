//module 模块
//node中js文件就是一个模块
//为什么出现模块的概念 防止命名冲突 可以把同样的功能封装到一起
//esModule commonjs规范
//一个文件就是一个模块
//module.exports 导出给别人使用
//require 来引用别人的模块

// 1) node模块 会按照后缀名查找 .js 文件是否存在 .json文件
const path=require('path');
const fs=require('fs');
const vm=require('vm');
function Module(id){
    this.id=id;
    this.exports={};//模块的结果
}
Module.wrapper=[
    '(function(exports,module,require,__filename,__dirname){'
    ,
    '})'
]
//静态方法
Module._extensions={
    '.js'(module){//js需要将exports传给用户 用户自己解析
        let script=fs.readFileSync(module.id,'utf8');
        let fnStr=Module.wrapper[0]+script+Module.wrapper[1];
        let fn=vm.runInThisContext(fnStr);//让字符串执行js代码
        //第一个参数改变this指向 module module.exports
        fn.call(module.exports,module,module.exports,req,module.id,path.dirname(module.id));
    },
    '.json'(module){
        let script=fs.readFileSync(module.id,'utf8');
        module.exports=JSON.parse(script)
    }
}
//给你一个相对路径 解析成绝对路径
Module.resolveFileName=function(filename){
    // 1) 把相对路径转化为绝对路径 默认会先判断一下是否是绝对路径
    let absPath=path.resolve(__dirname,filename);
    let flag=fs.existsSync(absPath);//判断文件是否存在 异步方法被废弃
    let current=absPath; //默认是当前路径
    if(!flag){
        let keys=Object.keys(Module._extensions);
        for(let i=0;i<keys.length;i++){
            current=absPath+keys[i];//当前找到的文件路径
            flag=fs.existsSync(current);
            if(flag){
                break;
            }else{
                current=null;
            }
        }
    }
    if(!current){ // 如果没有 说明加了后缀文件还是不存在
        throw new Error('文件不存在')
    }
    return current;
}
Module.prototype.load=function(){
    //模块加载就是读取文件的内容
    let ext =path.extname(this.id);
    Module._extensions[ext](this);//根据不同的路径处理不同的方法
}
Module._cache={};
function req(filename){
    //自己实现了一个require方法
    let current=Module.resolveFileName(filename);
    if(Module._cache[current]){
        return Module._cache[current].exports;
    }
    let module=new Module(current);
    Module._cache[current]=module;
    module.load();
    return module.exports;
}

let json=req('./a');
let js=req('./b');
js=req('./b');
console.log(json);
console.log(js);

//node中模块分为3类 文件模块 第三方模块 内置模块
//模块的查找路径

//同名 不同版本有的会先找文件 找不到再找文件夹
//第三方模块查找 会找node_modules 下的同名文件夹下的 index.js 如果找不到会向上级node_modules查找 如果根目录找不到就报错 会先找main对应的字段 如果有直接返回 如果没有 会找index.js / index.json