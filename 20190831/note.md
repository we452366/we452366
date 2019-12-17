## node

### 编码

#### 字符发展历史

##### 字节
- 计算机内部，所有信息最终都是一个二进制值
- 每一个二进制位（bit）有0和1两种状态，因此八个二进制位就可以组合出256种状态，这被称为一个字节(byte) 

##### 单位
- 8位 = 1字节
- 1024字节 = 1K
- 1024K = 1M
- 1024M = 1G
- 1024G = 1T

##### JavaScript中的进制
- 进制表示
- 进制转换
    - 10进制转任意进制 10进制数.toString(目标进制)
    - 任意进制转十进制 parseInt('任意进制字符串', 原始进制);

##### ASCII 
> 最开始计算机只在美国用，八位的字节可以组合出256种不同状态。0-32种状态规定了特殊用途,一旦终端、打印机遇上约定好的这些字节被传过来时，就要做一些约定的动作，如：遇上0×10, 终端就换行；遇上0×07, 终端就向人们嘟嘟叫；又把所有的空格、标点符号、数字、大小写字母分别用连续的字节状态表示，一直编到了第 127 号，这样计算机就可以用不同字节来存储英语的文字了。这128个符号（包括32个不能打印出来的控制符号），只占用了一个字节的后面7位，最前面的一位统一规定为0。这个方案叫做 ASCII 编码(American Standard Code for Information Interchange：美国信息互换标准代码)

##### GB2312
> 后来西欧一些国家用的不是英文，它们的字母在ASCII里没有为了可以保存他们的文字，他们使用127号这后的空位来保存新的字母，一直编到了最后一位255。比如法语中的é的编码为130。当然了不同国家表示的符号也不一样，比如，130在法语编码中代表了é，在希伯来语编码中却代表了字母Gimel (ג)。从128 到 255 这一页的字符集被称为扩展字符集。中国为了表示汉字，把127号之后的符号取消了，规定:

- 一个小于127的字符的意义与原来相同，但两个大于 127 的字符连在一起时，就表示一个汉字；
- 前面的一个字节（他称之为高字节）从0xA1用到0xF7，后面一个字节（低字节）从 0xA1 到 0xFE；
- 这样我们就可以组合出大约7000多个(247-161)*(254-161)=(7998)简体汉字了。
- 还把数学符号、日文假名和ASCII里原来就有的数字、标点和字母都重新编成两个字长的编码。这就是全角字符，127以下那些就叫半角字符。
- 把这种汉字方案叫做 GB2312。GB2312 是对 ASCII 的中文扩展

##### GBK
> 后来还是不够用，于是干脆不再要求低字节一定是 127 号之后的内码，只要第一个字节是大于 127 就固定表示这是一个汉字的开始,又增加了近 20000 个新的汉字（包括繁体字）和符号。

##### GB18030 / DBCS
> 又加了几千个新的少数民族的字，GBK扩成了GB18030 通称他们叫做 DBCS。Double Byte Character Set：双字节字符集。在 DBCS 系列标准里，最大的特点是两字节长的汉字字符和一字节长的英文字符并存于同一套编码方案里。各个国家都像中国这样搞出一套自己的编码标准，结果互相之间谁也不懂谁的编码，谁也不支持别人的编码

##### Unicode
> ISO 的国际组织废了所有的地区性编码方案，重新搞一个包括了地球上所有文化、所有字母和符 的编码！ Unicode 当然是一个很大的集合，现在的规模可以容纳100多万个符号。

- International Organization for Standardization：国际标准化组织。
- Universal Multiple-Octet Coded Character Set，简称 UCS，俗称 Unicode

ISO 就直接规定必须用两个字节，也就是 16 位来统一表示所有的字符，对于 ASCII 里的那些 半角字符，Unicode 保持其原编码不变，只是将其长度由原来的 8 位扩展为16 位，而其他文化和语言的字符则全部重新统一编码。

从 Unicode 开始，无论是半角的英文字母，还是全角的汉字，它们都是统一的一个字符！同时，也都是统一的 两个字节

- 字节是一个8位的物理存贮单元，
- 而字符则是一个文化相关的符号。

##### UTF-8
Unicode 在很长一段时间内无法推广，直到互联网的出现，为解决 Unicode 如何在网络上传输的问题，于是面向传输的众多 UTF 标准出现了，
Universal Character Set（UCS）Transfer Format：UTF编码

- UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式
- UTF-8就是每次以8个位为单位传输数据
- 而UTF-16就是每次 16 个位
- UTF-8 最大的一个特点，就是它是一种变长的编码方式
- Unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节
- UTF-8 是 Unicode 的实现方式之一

##### 编码规则 
- 对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。
- 对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n+ 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

```
function transfer(num) {
  let ary = ['1110', '10', '10'];
  let binary = num.toString(2);
  ary[2] = ary[2]+binary.slice(binary.length-6);
  ary[1] = ary[1]+binary.slice(binary.length-12,binary.length-6);
  ary[0] = ary[0]+binary.slice(0,binary.length-12).padStart(4,'0');
  let result =  ary.join('');
  return parseInt(result,2).toString(16);
}
```

##### 文本编码
> 使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。

###### BOM的移除
BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：
```
 Bytes      Encoding
----------------------------
 FE FF       UTF16BE
 FF FE       UTF16LE
 EF BB BF    UTF8
```

因此，我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM，以及使用哪种Unicode编码。但是，BOM字符虽然起到了标记文件编码的作用，其本身却不属于文件内容的一部分，如果读取文本文件时不去掉BOM，在某些使用场景下就会有问题。例如我们把几个JS文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器JS语法错误。因此，使用NodeJS读取文本文件时，一般需要去掉BOM

```
function readText(pathname) {
    var bin = fs.readFileSync(pathname);
    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }
    return bin.toString('utf-8');
}
```

###### GBK转UTF8
NodeJS支持在读取文本文件时，或者在Buffer转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般我们借助iconv-lite这个三方包来转换编码。使用NPM下载该包后，我们可以按下边方式编写一个读取GBK文本文件的函数。
```
var iconv = require('iconv-lite');
function readGBKText(pathname) {
    var bin = fs.readFileSync(pathname);
    return iconv.decode(bin, 'gbk');
}
```

### buffer

#### 什么是Buffer
- 缓冲区Buffer是暂时存放输入输出数据的一段内存。
- JS语言没有二进制数据类型，而在处理TCP和文件流的时候，必须要处理二进制数据。
- NodeJS提供了一个Buffer对象来提供对二进制数据的操作
- 是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
- Buffer好比由一个8位字节元素组成的数组，可以有效的在JavasScript中表示二进制数据

#### 什么是字节
- 字节(Byte)是计算机存储时的一种计量单位，一个字节等于8位二进制数
- 一个位就代表一个0或1，每8个位（bit）组成一个字节（Byte）
- 字节是通过网络传输信息的基本单位
- 一个字节最大值十进制数是255(2**8-1)

#### 进制
- 0b 2进制
- 0x 16进制
- 0o 8进制

##### 转为十进制
```
parseInt("11", 2); // 3 2进制转10进制
parseInt("77", 8); // 63 8进制转10进制
parseInt("e7", 16); //231 16进制转10进制
```

##### 转其它进制
```
(3).toString(2) // "11" 十进制转2进制
(17).toString(16) // "11" 十进制转16进制
(33).toString(32) // "11" 十提制转32进制
```

#### 定义buffer的三种方式 

##### 通过长度定义buffer 
```
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
// 创建一个长度为 10、且未初始化的 Buffer。
const buf3 = Buffer.allocUnsafe(10);
```

##### 通过数组定义buffer
```
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
```

##### 字符串创建
```
const buf5 = Buffer.from('珠峰培训');
```

#### buffer常用方法
- fill：buf.fill(value[, offset[, end]][, encoding])
```
buffer.fill(0);
```

- write：buf.write(string[, offset[, length]][, encoding])
```
let buffer = Buffer.allocUnsafe(6);
buffer.write('珠',0,3,'utf8');
buffer.write('峰',3,3,'utf8'); //珠峰
```


- writeInt8：通过指定的 offset 将 value 写入到当前 Buffer 中；这个 value 应当是一个有效的有符号的8位整数 buf.writeInt8(value, offset[, noAssert])
```
let buf = Buffer.alloc(4);
buf.writeInt8()
buf.writeInt8(0,0);
buf.writeInt8(16,1);
buf.writeInt8(32,2);
buf.writeInt8(48,3);
console.log(buf);// <Buffer 00 10 20 30>
console.log(buf.readInt8(0));//0
console.log(buf.readInt8(1));//16
console.log(buf.readInt8(2));//32
console.log(buf.readInt8(3));//48
```

- Little-Endian&Big-Endian：不同的CPU有不同的字节序类型，这些字节序是指整数在内存中保存的顺序。Big-endian：将高序字节存储在起始地址（高位编址；Little-endian：将低序字节存储在起始地址（低位编址）
```
let buffer = Buffer.alloc(4);
buffer.writeInt16BE(2**8,0);//256
console.log(buffer);//<Buffer 01 00 00 00>
console.log(buffer.readInt16BE(0));//256

buffer.writeInt16LE(2**8,2);//256
console.log(buffer);//<Buffer 01 00 00 01>
console.log(buffer.readInt16LE(2));//256
```

- toString：buf.toString([encoding[, start[, end]]])
```
let buffer = Buffer.from('珠峰架构');
console.log(buffer.toString('utf8',3,6));//峰
```

- slice：buf.slice([start[, end]])
```
let buffer = Buffer.from('珠峰架构');
let subBuffer = buffer.slice(0,6);
console.log(subBuffer.toString());
// 截取乱码
let {StringDecoder}  = require('string_decoder');
let sd = new StringDecoder();
let buffer = Buffer.from('珠峰');
console.log(sd.write(buffer.slice(0,4)));
console.log(sd.write(buffer.slice(4)));
```

- copy：复制Buffer 把多个buffer拷贝到一个大buffer上 buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
```
let buffer = Buffer.from('珠峰架构');
let subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer,0,0,4);//珠
buffer.copy(subBuffer,3,3,6);//峰
console.log(subBuffer.toString());//珠峰
Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
    for(let i=sourceStart;i<sourceEnd;i++){
        targetBuffer[targetStart++] = this[i];
    }
}
let buffer = Buffer.from('珠峰');
let subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer,0,0,4);//珠
buffer.copy(subBuffer,3,3,6);//峰
console.log(subBuffer.toString());//珠峰
```

- concat：Buffer.concat(list[, totalLength])
```
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
let buffer = Buffer.concat([buffer1,buffer2]);
console.log(buffer.toString());
Buffer.concat = function (list) {
    let totalLength = list.reduce((len, item) => len + item.length, 0);
    if (list.length == 0)
        return list[0];
    let newBuffer = Buffer.alloc(totalLength);
    let pos = 0;
    for (let buffer of list) {
        for (let byte of buffer) {
            newBuffer[pos++] = byte;
        }
    }
    return newBuffer;
}
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
let buffer = Buffer.concat([buffer1, buffer2]);
console.log(buffer.toString());
```

- isBuffer： 判断是否是buffer
```
Buffer.isBuffer();
```

- length：获取字节长度(显示是字符串所代表buffer的长度)
```
let str = '珠峰';
console.log(str.length);//2
let buffer = Buffer.from(str);
console.log(Buffer.byteLength(buffer));//6
```

#### base64
- Base64是网络上最常见的用于传输8Bit字节码的编码方式之一
- Base64就是一种基于64个可打印字符来表示二进制数据的方法
- Base64要求把每三个8Bit的字节转换为四个6Bit的字节（38 = 46 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节

```
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str){
  let buf = Buffer.from(str);
  let result = '';
  for(let b of buf){
      result += b.toString(2);
  }
  return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('');
}
let r = transfer('珠');
console.log(r);//54+g
```

### fs

#### fs模块
- 在Node.js中，使用fs模块来实现所有有关文件及目录的创建、写入及删除操作。
- 在fs模块中，所有的方法都分为同步和异步两种实现。
- 具有sync后缀的方法为同步方法，不具有sync后缀的方法为异步方法。

#### 整体读取文件

##### 异步读取 
```
fs.readFile(path[, options], callback)
```

##### 同步读取
```
fs.readFileSync(path[, options])
```

#### 写入文件

##### 异步写入
```
fs.writeFile(file, data[, options], callback)
```

- options
    - encoding
    - flag flag 默认 = 'w'
    - mode 读写权限，默认为0666

```
let fs = require('fs');
fs.writeFile('./1.txt',Date.now()+'\n',{flag:'a'},function(){
  console.log('ok');
});
```

##### 同步写入
```
fs.writeFileSync(file, data[, options])
```

##### 追加文件
> fs.appendFile(file, data[, options], callback)
```
fs.appendFile('./1.txt',Date.now()+'\n',function(){
  console.log('ok');
})
```

##### 拷贝文件 
```
function copy(src,target){
  fs.readFile(src,function(err,data){
    fs.writeFile(target,data);
  })
}
```

#### 从指定位置处开始读取文件

##### 打开文件
> fs.open(filename,flags,[mode],callback);

- FileDescriptor 是文件描述符
- FileDescriptor 可以被用来表示文件
- in -- 标准输入(键盘)的描述符
- out -- 标准输出(屏幕)的描述符
- err -- 标准错误输出(屏幕)的描述符

```
fs.open('./1,txt','r',0600,function(err,fd){});
```

##### 读取文件
> fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))

##### 写入文件
> fs.write(fd, buffer[, offset[, length[, position]]], callback)

##### 同步磁盘缓存
> fs.fsync(fd,[callback]);

##### 关闭文件 
> fs.close(fd,[callback]);

##### 拷贝文件
```
let BUFFER_SIZE=1;
const path=require('path');
const fs=require('fs');
function copy(src,dest,callback) {
    let buf=Buffer.alloc(BUFFER_SIZE);
    fs.open(src,'r',(err,readFd)=>{
        fs.open(dest,'w',(err,writeFd) => {
            !function read() {
                fs.read(readFd,buf,0,BUFFER_SIZE,null,(err,bytesRead) => {
                    bytesRead&&fs.write(writeFd,buf,0,bytesRead,read);
                });
            }()
        })
    });
}
copy(path.join(__dirname,'1.txt'),path.join(__dirname,'2.txt'),()=>console.log('ok'));
```

#### 目录操作

##### 创建目录
> fs.mkdir(path[, mode], callback)

##### 判断一个文件是否有权限访问
> fs.access(path[, mode], callback)

##### 读取目录下所有的文件
> fs.readdir(path[, options], callback)

##### 查看文件目录信息
> fs.stat(path, callback)

- stats.isFile()
- stats.isDirectory()
- atime(Access Time)上次被读取的时间。
- ctime(State Change Time)：属性或内容上次被修改的时间。
- mtime(Modified time)：档案的内容上次被修改的时间。

##### 移动文件或目录
> fs.rename(oldPath, newPath, callback)

##### 删除文件
> fs.unlink(path, callback)

##### 截断文件 
> fs.ftruncate(fd[, len], callback)

##### 监视文件或目录 
> fs.watchFile(filename[, options], listener)

#### 递归创建目录

##### 同步创建目录
```
let fs=require('fs');
let path=require('path');
function makepSync(dir) {
    let parts=dir.split(path.sep);
    for (let i=1;i<=parts.length;i++){
        let parent=parts.slice(0,i).join(path.sep);
        try {
            fs.accessSync(parent);
        } catch (error) {
            fs.mkdirSync(parent);
        }

    }
}
```

##### 异步创建目录 
```
function makepAsync(dir,callback) {
    let parts=dir.split(path.sep);
    let i=1;
    function next() {
        if (i>parts.length)
            return callback&&callback();    
        let parent=parts.slice(0,i++).join(path.sep);
        fs.access(parent,err => {
            if (err) {
                fs.mkdir(parent,next);
            } else {
                next();
            }
        });
    }
    next();
}
```

##### Async+Await创建目录
```
async function mkdir(parent) {
    return new Promise((resolve,reject) => {
        fs.mkdir(parent,err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

async function access(parent) {
    return new Promise((resolve,reject) => {
        fs.access(parent,err => {
            if (err) reject(err);
            else resolve();
        });
    });
}
async function makepPromise(dir,callback) {
    let parts=dir.split(path.sep);
    for (let i=1;i<=parts.length;i++){
        let parent=parts.slice(0,i).join(path.sep);
        try {
            await access(parent);
        }catch(err) {
            await mkdir(parent);
        }

    }
}
```

#### 递归删除目录

##### 同步删除目录(深度优先)
```
let fs=require('fs');
let path=require('path')
function rmSync(dir) {
    try {
        let stat = fs.statSync(dir);
        if (stat.isFile()) {
            fs.unlinkSync(dir);
        } else {
            let files=fs.readdirSync(dir);
            files
                .map(file => path.join(dir,file))
                .forEach(item=>rmSync(item));
            fs.rmdirSync(dir);
        }
    } catch (e) {
        console.log('删除失败!');
    }
}
rmSync(path.join(__dirname,'a'));
```

##### 异步删除非空目录(Promise版)
```
function rmPromise(dir) {
    return new Promise((resolve,reject) => {
        fs.stat(dir,(err,stat) => {
            if (err) return reject(err);
            if (stat.isDirectory()) {
                fs.readdir(dir,(err,files) => {
                    let paths = files.map(file => path.join(dir,file));
                    let promises = paths.map(p=>rmPromise(p));
                    Promise.all(promises).then((() => fs.rmdir(dir,resolve)));
                });
            } else {
                fs.unlink(dir,resolve);
            }
        });
    });
}
rmPromise(path.join(__dirname,'a')).then(() => {
    console.log('删除成功');
})
```

##### 异步串行删除目录(深度优先)
```
function rmAsyncSeries(dir,callback) {
    setTimeout(() => {
        fs.stat(dir,(err,stat) => {
            if (err) return callback(err);
            if (stat.isDirectory()) {
                fs.readdir(dir,(err,files) => {
                    let paths = files.map(file => path.join(dir,file));
                    function next(index) {
                        if (index>=files.length) return fs.rmdir(dir,callback);
                        let current=paths[index];
                        rmAsyncSeries(current,()=>next(index+1));
                    }
                    next(0);
                });
            } else {
                fs.unlink(dir,callback);
            }
        })
    },1000);
}

console.time('cost');
rmAsyncSeries(path.join(__dirname,'a'),err => {
     console.timeEnd('cost');
})
```

##### 异步并行删除目录(深度优先)
```
function rmAsyncParallel(dir,callback) {
    setTimeout(() => {
        fs.stat(dir,(err,stat) => {
            if (err) return callback(err);
            if (stat.isDirectory()) {
                fs.readdir(dir,(err,files) => {
                    let paths=files.map(file => path.join(dir,file));
                    if (paths.length>0) {
                        let i=0;
                        function done() {
                            if (++i == paths.length) {
                                fs.rmdir(dir,callback);
                            }
                        }
                      paths.forEach(p=>rmAsyncParallel(p,done));
                    } else {
                        fs.rmdir(dir,callback);
                    }
                });
            } else {
                fs.unlink(dir,callback);
            }
        })
    },1000);
}
console.time('cost');
rmAsyncParallel(path.join(__dirname,'a'),err => {
     console.timeEnd('cost');
})
```

##### 同步删除目录(广度优先)
```
function rmSync(dir){
    let arr=[dir];
    let index=0;
    while (arr[index]) {
        let current=arr[index++];
        let stat=fs.statSync(current);
        if (stat.isDirectory()) {
            let dirs=fs.readdirSync(current);
            arr=[...arr,...dirs.map(d => path.join(current,d))];
        }
    }
    let item;
    while (null != (item = arr.pop())) {
        let stat = fs.statSync(item);
        if (stat.isDirectory()) {
            fs.rmdirSync(item);
        } else {
            fs.unlinkSync(item);
        }
    }
}
```

##### 异步删除目录(广度优先)
```
function rmdirWideAsync(dir,callback){
    let dirs=[dir];
    let index=0;
    function rmdir() {
        let current = dirs.pop();
        if (current) {
            fs.stat(current,(err,stat) => {
                if (stat.isDirectory()) {
                    fs.rmdir(current,rmdir);
                } else {
                    fs.unlink(current,rmdir);
                }
            });
        }
    }
    !function next() {
        let current=dirs[index++];
        if (current) {
            fs.stat(current,(err,stat) => {
                if (err) callback(err);
                if (stat.isDirectory()) {
                    fs.readdir(current,(err,files) => {
                        dirs=[...dirs,...files.map(item => path.join(current,item))];
                        next();
                    });
                } else {
                    next();
                }
            });
        } else {
            rmdir();
        }

    }();
}
```

### path模块
> path是node中专门处理路径的一个核心模块

- path.join 将多个参数值字符串结合为一个路径字符串
- path.basename 获取一个路径中的文件名
- path.extname 获取一个路径中的扩展名
- path.sep 操作系统提定的文件分隔符
- path.delimiter 属性值为系统指定的环境变量路径分隔符
- path.normalize 将非标准的路径字符串转化为标准路径字符串 特点：
    - 可以解析 . 和 ..
    - 多个杠可以转换成一个杠
    - 在windows下反杠会转化成正杠
    - 如结尾以杠结尾的，则保留斜杠
- resolve
    - 以应用程序根目录为起点
    - 如果参数是普通字符串，则意思是当前目录的下级目录
    - 如果参数是.. 回到上一级目录
    - 如果是/开头表示一个绝对的根路径
