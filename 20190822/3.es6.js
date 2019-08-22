//es6模块化
//怎么使用es6模块 esModule模块(es6) commonjs模块(node模块) umd
//尽量不要混用
//es6静态导入(不能再作用域中使用) 
//import export 每个文件都是一个模块
let a=1;
let b=2;
let h='hello'
setInterval(()=>{
    a++;
},1000)
export {
    a as c,
    b,
    h as default
} //导出变量

//import语法只能放在最外层作用域中
//import语法会解析到页面的最顶端
//导入的变量不能更改赋值
setInterval(()=>{
    console.log(c,d)
},1000)
import _,{c,d} from './a';
import * as obj from './a';
console.log(obj);//可以将所有属性收集到obj对象中

//文件合并导出

export * from './y';//不能

//有副作用的导入，可以改让文件执行
import './a'; 

//动态导入
let btn=document.createElement('button');
btn.addEventListener('click',function(){
    //import返回的是一个promise
    import('./file').then(data=>{
        console.log(data);
    })
})
document.body.appendChild(btn);
