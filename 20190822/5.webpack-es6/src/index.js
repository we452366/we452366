//es6模块化
//怎么使用es6模块 esModule模块(es6) commonjs模块(node模块) umd

//尽量不要混用
//es6静态导入(不能再作用域中使用) 
//import export 每个文件都是一个模块

//import语法会解析到页面的最顶端
// setInterval(()=>{
//     console.log(c,b);//每次获取的值都会随着接口中的内容变化而变化
// },1000)

//import 语法只能放啊在最外层作用域中
// import _,{c,b} from './a';
//import * as obj from './a';
//console.log(obj);//可以将所有属性收集到obj对象中
//导入的变量不能更改赋值

//文件合并导出


//-------
import * as obj from './z';
console.log(obj);
import './a' //有副作用的导入 可以让文件执行 当时没有使用这个文件中的内容

//动态导入 可以在作用域中使用
let btn =document.createElement("button");
btn.addEventListener("click",function(){
    //import语法返回的是一个promise
    import('./file').then(data=>{
        console.log(data)
    })//动态使用jsonp加载一个新的文件
})
document.body.appendChild(btn);


