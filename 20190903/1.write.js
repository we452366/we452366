// drain close
let fs=require('fs');
let WriteStream=require('./_WriteStream');
let ws=new WriteStream('./1.txt',{
    highWaterMark:3,
    encoding:'utf8',
    start:0,
    mode:438,
    flags:'w'
});
let index=0;
function write(){
    let flag=true;
    while(index<10 && flag){
        flag=ws.write(index+'');
        index++;
    }
    if(index>9){
        ws.end('hello');
    }
}
write();
ws.on('drain',function(){
    console.log('dry')
    write()
})
ws.on("close",function(){
    console.log('close')
})