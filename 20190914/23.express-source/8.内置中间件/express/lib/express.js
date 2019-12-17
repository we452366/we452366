// 真正express文件夹
// 创建应用
console.log('my')

const Application = require('./application')
const Router = require('./router/index')
function createApplication(){
    // 创建 应用 核心就是new Application
    return new Application
}
createApplication.Router = Router;
module.exports = createApplication