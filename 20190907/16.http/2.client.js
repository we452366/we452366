// 类似 中间层
const http = require('http');

// request  / get
// http.get('http://localhost:3000',function(){
//     console.log('发送成功')
// })
// request方法 发送请求体
let config = {
    port:3000,
    hostname:'localhost',
    headers:{
    //    'Content-Type':'application/x-www-form-urlencoded',
    //    'Content-Type':'application/json'
    },
    method:'POST'
}
// 请求后 会讲响应的结果 放到函数中
let clinet = http.request(config,function(res){
    res.on('data',function(chunk){
        console.log(chunk.toString())
    })
})
// 数据传输 常见格式
// 1) json字符串  {a:1}
// 2) 表单格式 a=1
// 3) 文件格式 图片 formData
// 4) 传递是字符串
clinet.end('aaa'); // 写响应体 ajax的data数据

// 请求头 规范


// node 适合 i/o 密集

// 1) 服务器可以返回静态资源
// 2) 我的服务器可以返回动态的资源 接口
// 3) 访问别人的服务器 把别人的服务的结果格式化后返回去 爬虫