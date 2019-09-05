const EventEmitter=require('events');
const fs=require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options={}){
        super();
        this.path=path;
        this.flags=options.flags || 'w';
        this.encoding=options.encoding || 'utf8';
        this.highWaterMark=options.highWaterMark || 64*1024;
        this.mode=options.mode || 0o666;
        this.start=options.start || 0;
        this.open();
        // 缓存区
        this.cache=[];
        this.writing=false;
        this.len=0; // 缓存区的大小
        this.needDrain=false; // 是否触发darin
        this.offset=0;
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            this.fd=fd;
            this.emit('open',fd)
        })
    }
    write(chunk,encoding=this.encoding,callback){
        chunk=Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
        // 判断缓存区长度和highwatermark的大小
        this.len+=chunk.length;
        let flag=this.len < this.highWaterMark;
        this.needDrain=!flag;
        // 此时用户调用write方法时 判断是否正在写入
        if(this.writing){
            // 如果正在写入 放入缓存
            this.cache.push({ // 除第一次的文件其他放入缓存
                chunk,
                encoding,
                callback
            })
        }else{
            // 否则把真正的文件放入
            this.writing=true; // 标识是否正在写入
            this._write(chunk,encoding,()=>{
                callback && callback()
                this.clearBuffer();
            })
        }   
        return flag;
    }
    clearBuffer(){
        // 去缓存中取
        let obj=this.cache.shift();
        if(obj){ // 需要写入
            this._write(obj.chunk,obj.encoding,()=>{
                obj.callback && obj.callback()
                this.clearBuffer();
            })
        }else{
            if(this.needDrain){
                this.needDrain=false; // 下一次需要重新判断是否需要出发drain事件
                this.writing=false; // 下一次调用直接向文件中写入
                this.emit('drain')
            }
        }
    }
    // 核心写入方法
    _write(chunk,encoding,clearBuffer){
        if(typeof(this.fd)!=="number"){ 
            return this.once('open',()=>this._write(chunk,encoding,clearBuffer)); 
        }
        // 真实写入操作
        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,bytesWrite)=>{
            this.offset+=bytesWrite;
            this.len-=bytesWrite; // 减少缓存中数据
            clearBuffer();
        })

    }
    close(){
        fs.close(this.fd,()=>{
            this.emit('close')
        })
    }
    end(chunk,encoding){
        if(chunk){
            // 先讲写入的缓存 强制清空 在去写入end方法中的内容 在关闭文件
            
            chunk=Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
            return this.write(chunk,encoding,()=>{
                this.close()
            })
            
        }
        this.close()
    }
}
module.exports=WriteStream
