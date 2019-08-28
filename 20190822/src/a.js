//a模块

//export let a=1;//导出a变量 (接口)
//export let b=2;

let a=1;
let b=2;
let h='hello';
setInterval(()=>{
    a++
},1000)
export{//不能写成对象格式
    a as c,//as 就是起别名
    b,
    h as default //export default
}

//export default c;