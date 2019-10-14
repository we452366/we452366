let mongoose=require('mongoose');
let connection = mongoose.createConnection('mongodb://127.0.0.1/vlee',{ useNewUrlParser: true,useUnifiedTopology: true});
connection.on('error', function (error) {
    console.log('数据库连接失败: ' + error);
});
connection.on('open', function (error) {
    console.log('数据库连接成功');
});
module.exports=connection;