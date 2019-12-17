const EventEmitter = require('events');
const fs = require('fs');
class ReadStream extends EventEmitter {
    constructor(path,options = {}){
        super()
        // 默认参数的赋值
        this.path = path; 
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.mode = options.mode || 438;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end

        this.flowing = null; // 默认是暂停模式
        this.offset = 0; // 便宜量
        this.open(); // 打开文件 当创建可读流时 就打开文件  (异步执行)
        this.on('newListener',(type)=>{
            if(type === 'data'){ // 当用户监听 data事件的时候  就开始读取文件
                this.flowing = true;
                this.read();
            }
        })
    }
    pipe(ws){
        this.on('data',(chunk)=>{
            let flag = ws.write(chunk);
            if(!flag){
                this.pause();
            }
        });
        ws.on('drain',()=>{
            this.resume();
        })
    }
    read(){
        if(typeof this.fd !== "number" ){ // 因为read 比open先调用
            return this.once('open',this.read); // 先把read方法存起来，等open后再次调用
        }
        // 每次读取 2个 把buffer填满
        // 一共读取几个 this.end - this.start + 1 0-4 5个
        // 2 2 1     5 - 4
        // 2 2 2 
        let howMuchToRead = this.end?Math.min(this.highWaterMark,this.end-this.start + 1 - this.offset):this.highWaterMark;
        let buffer = Buffer.alloc(howMuchToRead)
        fs.read(this.fd,buffer,0,howMuchToRead,this.offset,(err,bytesRead)=>{
            this.offset += bytesRead;
            if(bytesRead > 0 ){ // 如果读取到了内容就再次尝试读取一次
               this.emit('data',buffer.slice(0,bytesRead)); // 如果读取到了内容就触发data事件
               this.flowing &&this.read(); 
            }else{
                this.emit('end');
                this.close();
            }
        })
    }
    close(){
        if(this.autoClose){
            fs.close(this.fd,()=>{
                this.emit('close')
            })
        }
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            this.fd = fd;
            this.emit('open',this.fd);
        })
    }
    pause(){
        this.flowing = false
    }
    resume(){
        this.flowing = true;
        this.read();
    }
}
module.exports = ReadStream;
// 可读流
// 如何将多个 异步代码 有关系的异步代码进行拆分 read open 发布订阅
// 可写流
// 如果处理并发操作文件 多个异步 造队列 => 链表

// 第二周作业


// cli 
