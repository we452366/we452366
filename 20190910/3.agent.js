// 根据内核跳转页面 302 临时重定向


const http = require('http');

// 手机端 移动端页面 
// pc端 
http.createServer((req,res)=>{
    // 如果是手机端 跳转到百度
    let useAgent = req.headers['user-agent'];
    if(useAgent.includes('iPhone')){
        res.statusCode = 302;
        res.setHeader('Location','http://www.baidu.com');
        res.end(); // redirect
    }else{
        console.log('pc')
        res.statusCode = 302;
        res.setHeader('Location','http://www.zhufengpeixun.cn');
        res.end();
    }
    // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
    // User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
    // 如果是pc 跳转到珠峰
}).listen(3000);

// 206 范围请求
// 多语言
// Accept-Language: zh-CN;q=1,zh;q=0.9,en;q=0.8
// 客户端可以自行配置语言 .不同的语言组成不同的网站

// koa 讲下原理  50继续
// 封装了 http-server http-server 框架
// vue + koa + mongo

