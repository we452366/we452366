// file system 可以在服务端读取文件和数据 方法是同步+异步共存
// 同步方法易使用
// 异步方法不会阻塞主线程 (运行起来后用异步) 回调函数

const fs=require('fs');
// 读取文件 文件不存在会报错
// 写入文件 文件不存在会创建文件

// fs.readFile('./note.md',function(err,data){
//     if(err){
//         console.log(err)
//     }
//     fs.writeFile('note1.md',data,function(){

//     });
// })
//64k 以下可以使用以上方式

// 不适合大文件来使用 否则可能会导致内存的浪费
// 可以读取一点 写入一点
// 手动按照字节来读取 fs.open fs.read fs.write fs.close

// r：读取 w：写入 r+：在读的基础上可以写 但是文件不存在会报错 w+：在写的基础上读取 如果文件不存在会创建
const SIZE=5;
let buffer=Buffer.alloc(SIZE);
fs.open('./note.md','r',(err,rfd)=>{//fiel descriptor number类型
    //读取恩建 fd代表的文件 buffer 我要把读取的内容写到哪个buffer中
    //0,3 从buffer的第0个位置写入 写入3个
    //0 从文件的哪个位置开始读取
    if(err){
        return console.log(err);
    }
    // fs.read(rfd,buffer,0,3,0,function(err,bytesRead){
    //     fs.close(fd,()=>{

    //     })
    // })
})

// 解耦合 stream