// fs 操作文件
// 删除文件 给文件改名
const fs=require('fs');
const path=require('path');
// 文件的操作
// rename unlink readFile existsSync access writeFile copyFile

// 文件夹操作
// mkdir
function mkdir(paths,callback){
    paths = paths.split('/');
    let index=1;
    function next(){
        if(index==paths.length+1) return callback();// 说明整个目录全部创建完毕
        let dirPath=paths.slice(0,index++).join('/');
        fs.access(dirPath,function(err){
            if(err){
                //不存在
                fs.mkdir(dirPath);
                next();
            }else{
                next(); // 存在创建下一层
            }
        })
        console.log(dirPath);
    }
    next();
}

// rmdir readdir(返回数组) stat

// fs.readdir(target,function(err,dirs){
//     dirs = dirs.map(dir=>path.join(target,dir));
//     dirs.forEach(dir=>{
//         fs.stat(dir,function(err,statObj){
//             if(statObj.isFile()){
//                 fs.unlink(dir,function(){

//                 })
//             }else{
//                 fs.rmdir(dir,function(){

//                 })
//             }
//         })
//     })
// })

// 递归删除目录
// 异步先序深度优先遍历 串联 递归
function preDeep(dir,callback){
    // 有儿子就删除儿子
    // 儿子删除完毕后删除自己 只想第一层和第二层的关系
    fs.stat(dir,function(err,statObj){
        if(statObj.isFile()){
            // 是文件删除即可
            fs.unlink(dir,callback)
        }else{
            fs.readdir(dir,function(err,dirs){
                // dirs 是读取到的儿子
                dirs=dirs.map(item=>path.join(dir,item));
                let index=0;
                function next(){
                    if(index==dirs.length){
                        return fs.rmdir(dir,callback);
                    }
                    let currentPath = dirs[index++];
                    // 删除当前第一个儿子 成功后删除第二个儿子
                    preDeep(currentPath,next)
                }
                next()
            })
        }
    })  
}

// 并联
function preParalDeep(dir,callback){
    // 有儿子就删除儿子
    // 儿子删除完毕后删除自己 只想第一层和第二层的关系
    fs.stat(dir,function(err,statObj){
        if(statObj.isFile()){
            // 是文件删除即可
            fs.unlink(dir,callback)
        }else{
            fs.readdir(dir,function(err,dirs){
                // dirs 是读取到的儿子
                dirs=dirs.map(item=>path.join(dir,item));
                if(dirs.length===0){ // 如果没有儿子节点 直接将自己删除掉即可
                    return fs.rmdir(dir,callback)
                }
                let index=0;
                function done(){
                    if(++index=== dirs.length) return fs.rmdir(dir,callback)
                }
                dirs.forEach(dir=>{
                    preParalDeep(dir,done)
                })
            })
        }
    })  
}

// promise改造
function preProDeep(dir){
    return new Promise((resolve,reject)=>{
        fs.stat(dir,function(err,statObj){
            if(statObj.isFile()){
                fs.unlink(dir,resolve)
            }else{
                fs.readdir(dir,function(err,dirs){
                    dirs=dirs.map(item=>preProDeep(path.join(dir,item)));
                    Promise.all(dirs).then(()=>{
                        fs.rmdir(dir,resolve)
                    })
                })
            }
            
        })
    })
}

// async改造
let {unlink,readdir,stat,rmdir}=require('fs').promises;
async function preAsyncDeep(){
    let statObj=await stat(dir);
    if(statObj.isFile()){
        await unlink(dir)
    }else{
        let dirs = await readdir(dir);
        dirs = dirs.map(item=>preAsyncDeep(path.join(dir,item)));
        await Promise.all(dirs);
        await rmdir(dir);
    }
}

// 前序广度优先遍历删除
function preWide(dir){
    let arr=[dir];
    let index=0;
    let current;
    while(current=arr[index++]){
        let dirs=fs.readdirSync(current);
        dirs=dirs.map(item=>path.join(dir,item));
        arr=[...arr,...dirs];
    }
}

// 实现一个异步广度删除 做队列 / 栈结构