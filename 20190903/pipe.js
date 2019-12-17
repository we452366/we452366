let fs = require('fs');
// let ReadStream = require('./ReadStream');
// let WriteStream = require('./WriteStream');
let  rs  = fs.createReadStream('./1.txt');

// let  ws  = new WriteStream('./2.txt');
// rs.pipe(ws); // 默认会调用可写流的write方法 和最终会调用end方法


// 基于文件的流 
// 自己可以实现自己的流 http socket 压缩 req res
// 执行过程 默认可读会提供一个read方法

// 两个类 第一个类 是 ReadStream(_read),会把读取到的数据 调用push方法穿进去   Readable (read)

let {Readable,Writable} = require('stream');
class MyRead extends Readable{
    _read(){
        this.push('1');
        this.push(null)
    }
}
let mr = new MyRead();

mr.on('data',function(chunk){
    console.log(chunk)
})
mr.on('end',function(chunk){
    console.log('end')
})

// WriteStream (write)  (_write)

class MyWrite extends Writable{
    _write(chunk,encoding,clearBuffer){
        console.log(chunk,'---');
        clearBuffer()
    }
}
let myWrite = new MyWrite();
myWrite.write('123');
myWrite.write('123');
myWrite.write('123');
myWrite.write('123');

// http koa
// 双工流  转化流
