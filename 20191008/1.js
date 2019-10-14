let mongoose=require('mongoose');
let connection=require('./connection');

let UserSchema= new mongoose.Schema({
    name:String,
    age:Number
});

let UserModel=connection.model('User',UserSchema);
UserModel.create({name:'aaa',age:10}).then(result=>{
    console.log(result)
})