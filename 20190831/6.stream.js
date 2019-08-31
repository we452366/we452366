// 文件流 文件的读取和操作
// readFile writeFile => read + write

const fs=require('fs');

let rs=fs.createReadStream(path,{
    flag:'r',
    encoding:null, // 默认是buffer
    highWaterMark:64*1024,
    mode:0o666, // 默认权限是4 写入默认是2 执行是1
    autoClose:true,
    start:0,
    end:10
})

// 默认流的模式是暂停模式
rs.on('open',function(){
    console.log('文件打开触发open事件')
})
// 将每次传入的数据 接收保存起来
let str=[];
rs.on('data',function(data){ // 每次读取到的结果
    console.log(data);
    str.push(data);
})
rs.on('end',function(){ // 每次读取到的结果
    console.log(Buffer.concat(arr).toString());
})
rs.on('close',function(){ // 每次读取到的结果
    console.log('close');
})
rs.on('error',function(){ // 每次读取到的结果
    console.log('err');
})
// 可读流需要掌握的方法