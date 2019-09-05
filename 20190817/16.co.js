const fs=require('fs').promises;
function co(it){
    return new Promise((resolve,reject)=>{
        // 异步迭代需要先提供一个next方法
        function next(data){
            let {value,done}= it.next(data);
            if(!done){
                Promise.resolve(value).then(data=>{
                    next(data)
                })
            }else{
                resolve(value)
            }
        }
        next()
    })
}
function * read(){
    let content = yield fs.readFile('./20190817/name.txt','utf8');
    let age =yield fs.readFile(content,'utf8');
    return age;
}
co(read()).then(data=>{
    console.log(data)
})