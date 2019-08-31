let fs=require('fs');
let path=require('path');

let r=fs.readFileSync(path.resolve(__dirname,'note.md'));

// 默认文件读取操作 读取出来的都是buffer
// 内存表示方式就是buffer 内存二进制的
console.log(r);

// 面试：js中0.1+0.2为什么不等于0.3 ？
// 答：我们需要将值存到内存中 保存的时候存储的是二进制 小数进制转换的时候是乘2取整会形成无限循环 导致精度误差

// 补充：整数 进制转换 基于编码
// 最早编码方式是ASCII 默认 一个字节就是一个字母或符号
// 1个字节 有8个bit 最大是255(十进制)

// gb2312 第一位大于127对的认为 第二位就是一个中文
// 用两个字节来表示中文

// unicode => utf-8
// 可变长度 如果是中文采用3个字节表示 node里默认支持utf8格式，可以采用其他的模块来实现

// 将10进制 转化成其他进制 (取余)
// 进制转化

console.log((0xff).toString(2));

console.log(parseInt('0xff',16));

// base64 二进制的值不能超过64 (核心就是进制的转化)
// base64 可以反解 
// 补充：什么是加密？ 加密是特殊的人可以解密

// 在浏览器header中 任意的url中都可以采用base64 前端实现文件预览 fileReader
// 转码后的结果 比原来的内容大

// 如果一个汉字
console.log(Buffer.from('谦').toString('base64'));
// base64 转化后去特定的字符串取值
// base64就是编码转化 不需要发送http请求 大小会比以前大

// 扩展 unicode => utf8 如何规范
// 扩展 
