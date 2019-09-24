const Application=require('./application')
const Router=require('./router/index')
function createApplication(){
    return new Application
}
createApplication.Router=Router;
module.exports=createApplication;