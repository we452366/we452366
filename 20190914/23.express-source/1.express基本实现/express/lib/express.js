// 真正express文件夹
// 创建应用
console.log('my')
const http = require('http');
const url = require('url');
let router = [
    {path:'*',method:'*',handler(req,res){
        res.end(`Cannot ${req.method} ${req.url}`)
    }}
];
function createApplication(){
    return { // 将注册的方法 放到路由系统中
        get(path,handler){
            router.push({
                path,
                method:'get',
                handler
            })
        },  
        listen(){
            let server = http.createServer((req,res)=>{
                // 获取请求的方法 和路径
                let m = req.method.toLowerCase();
                let pathname = url.parse(req.url).pathname;
                for(let i = 1;i<router.length;i++){
                    let {method,path,handler} = router[i];
                    // 如果匹配到就执行 对应的处理函数
                    if(m === method && pathname === path){
                        return handler(req,res);
                    }
                }
                // 如果炸不到对应的就调用 默认404逻辑
                router[0].handler(req,res)
            });
            server.listen(...arguments)
        }
    }
}
module.exports = createApplication