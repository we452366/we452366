// 流 可读流_read 可写流_write 双工流_read _write
// 转化流 压缩就是靠这个转化流实现的
const {Transform} = require('stream');
class MyTransform  extends Transform{
    _transform(chunk,encoding,callback){ //和可写流一样
        chunk = chunk.toString().toUpperCase();
        this.push(chunk);
        callback();
    }
}
let myTransform = new MyTransform(); // 创建一个转化流
// 标准输出  console.log()
process.stdin.pipe(myTransform).pipe(process.stdout)
// process.stdin.on('data',function(data){
//     process.stdout.write(data);
// })
// 专门做压缩的 gzip  xxxxx.gz
let zlib =  require('zlib');
let fs = require('fs');
// readFile writeFile
fs.createReadStream('./1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('2.TXT.GZ'));
// zlib.gzip(fs.readFileSync('./1.txt'),function(err,data){
//     fs.writeFileSync('1.gz',data)
// })