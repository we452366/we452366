// 把二进制表现成了10进制 可以和字符串进行转化

// 1) buffer的声明方式 （内存） 数组可以扩展

// 固定大小
let buf = Buffer.allocUnsafe(5);
buf.fill(0);
// allocUnsafe + fill => alloc

buf = Buffer.from([100,120,130]); // 很少用到
console.log(buf);

buf = Buffer.from('李恒谦');
console.log(buf);

// 2.1) buffer常见方法
// 和数组类似
let arr=[[1,2,3],3,4,5];// 浅拷贝
let newArr=arr.slice(0);
console.log(arr);

let buffer=Buffer.from('李恒谦'); // buffer中存放的都是内存地址，如果截取某一段 改变的时候也是改变了这个内存地址
let newBuffer=buffer.slice(0);
newBuffer[0]=100;
console.log(buffer);

//2.2) 判断buffer类型
console.log(Buffer.isBuffer(buffer));

//2.3) buffer不能扩展大小
// copy 拷贝
Buffer.prototype.copy=function(targetBuffer,targetStart,sourceStart=0,sourceEnd=this.length){
    for(let i=0;i<sourceEnd-sourceStart;i++){ //确定循环次数
        // 将每次的循环出的结果 拷贝到目标的buffer上即可
        targetBuffer[targetStart+i]=this[sourceStart+i];
    }
};
let buff = Buffer.alloc(9);
let buffer1 = Buffer.from('李');
let buffer2 = Buffer.from('恒');
let buffer3 = Buffer.from('谦');
// 当前buffer.copy (目标buffer,目标的开始位置,源的开始,源的结束)
buffer1.copy(buff,0,0,3);
buffer2.copy(buff,3,0,3);
buffer3.copy(buff,6,0,3);
console.log(buff.toString());

//2.4) concat 拼接
Buffer.concat=function(list,length=list.reduce((a,b)=>a+b.length,0)){
    let buff =Buffer.alloc(length);
    let offset =0;
    list.forEach(b => {
        b.copy(buff,offset);
        offset+=b.length;
    });
    return buff;
}
let newBuffer1=Buffer.concat([buffer1,buffer2]);
console.log(newBuffer1.toString('base64'));

//isBuffer length 字节数 toString('base64') slice fill

// 3) 扩展buffer方法

buffer = Buffer.from(`李恒谦李恒
李恒谦
李恒谦李恒谦李恒谦
`);
// 行读取器
Buffer.prototype.split=function(sep){
    sep=Buffer.from(sep).length; // 分隔符的长度
    let offset=0;
    let result=[];
    let current;
    // 把找打的位置赋给current 看是否为-1
    while((current=this.indexOf(sep,offset))!==-1){
        result.push(this.slice(offset,current)) // 把每次的结果push到数组中
        offset = current+length;
    }
    result.push(this.slice(offset)); // 最后一段追加进去
    return result;
}
console.log(buffer.split('\n'));