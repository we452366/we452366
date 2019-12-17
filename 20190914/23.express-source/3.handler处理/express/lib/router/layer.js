function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 看一下这一层能不能匹配到
Layer.prototype.match = function(pathname){
    return pathname === this.path
}
module.exports = Layer