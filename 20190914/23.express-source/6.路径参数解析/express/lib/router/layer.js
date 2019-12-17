const pathToRegExp = require('path-to-regexp');
function Layer(path,handler){
    this.path = path;
    this.handler = handler;

    // 我需要在生产layer的时候将path转换成正则
    this.regExp = pathToRegExp(this.path,this.keys=[]);

    // layer中新增了两个属性
    // this.regExp当前的正则
    // this.keys 存放的是 当前匹配的key
}
// 看一下这一层能不能匹配到
// 可以匹配中间件和路由的逻辑
Layer.prototype.match = function(pathname){
    if(this.route){ // 是路由
        let [,...matches] = pathname.match(this.regExp);
        if(matches){ // /user/\d+/\d+  /user/1/2
            // 将解析后的params属性 放到当前的layer上
            // this.keys = [{name:'name'},{name:'age'}]
            this.params = this.keys.reduce((memo,current,index,arr)=>
            (memo[current.name] = matches[index],memo)
            ,{});
            return true;
        }
    }
    if(!this.route){ // 中间件
        if(this.path === '/'){
            return true
        }
        // /user/add    /user/
        if(pathname.startsWith(this.path+'/')){
            return true
        }
    }
    return pathname === this.path
}
module.exports = Layer