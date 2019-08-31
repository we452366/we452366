// 手写可读流
const EventEmitter = require('events');
const fs=require('fs');
class ReadStream extends EventEmitter{
    constructor(path,options={}){
        super();
        this.path=path;
        this.flags=options.flags || 'r';
        this.encoding=options.encoding || null;
        this.highWaterMark=options.highWaterMark || 64*1024;
        this.mode=options.mode || 0o666;
        this.autoClose=options.autoClose || true;
        this.start=options.start || 0;
        this.end=options.end || Infinity;
        this.offset=0;
        this.flowing=null;// 默认是暂停模式
        this.open(); // 打开文件 当创建可读流时 就打开文件 异步执行
        this.on('newListener',(type)=>{
            if(type==='data'){
                this.flowing=true;
                this.read();
            }
        })
    }
    read(){
        if(typeof(this.fd)!=="number"){ // 因为read比open先调用 
            return this.once('open',this.read); // 先把read方法存起来，等open后再次调用
        }
        // 每次读两个 把buffer填满
        let howMuchToRead=this.end ? Math.min(this.highWaterMark,this.end-this.start+1-this.offset) : this.highWaterMark;
        let buffer=Buffer.alloc(howMuchToRead);
        fs.read(this.fd,buffer,0,howMuchToRead,this.offset,(err,bytesRead)=>{
            this.offset += bytesRead;
            if(bytesRead > 0){ // 如果读取到内容就再次尝试读取内容
                this.emit('data',buffer); // 如果读取到就触发data事件
                this.flowing && this.read();
            }else{
                this.emit('end');
                this.close();
            }
        })
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            this.fd=fd;
            this.emit('open',this.fd)
        })
    }
    close(){
        if(this.autoClose){
            fs.close(this.fd,()=>{
                this.emit('close')
            })
        }
    }
    pause(){ // 暂停流
        this.flowing=false;
    }
    resume(){ // 恢复读取
        this.flowing=true;
        this.read();
    }
}
module.exports=ReadStream;

// 可读流：如何将多个有关系的异步代码进行拆分 => 发布订阅
// 可写流：如何处理并发操作文件 => 多个异步请求 做数据结构为队列或链表的cache