function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 看一下这一层能不能匹配到
// 可以匹配中间件和路由的逻辑
Layer.prototype.match = function(pathname){
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