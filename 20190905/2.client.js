// 类似 中间层
const http=require('http');

// http.get('http://localhost:3000',()=>{
//     console.log('succuess')
// })
let config={
    port:3000,
    hostname:'localhost',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    },
    method:'POST'
}
let client=http.request(config,(res)=>{
    res.on('data',(chunk)=>{

    })
})
// 数据传输常见格式
// 1) json字符串
// 2) 表单格式 a=1&b=2
// 3) 文件格式 图片 formData
// 4) 传递字符串
client.end('a=1') // 写响应体

