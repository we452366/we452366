//模板引擎 如何实现一个模板引擎
//ejs
//npm install ejs jade handlerbar underscore nunjucks
//常见的模板引擎
//let ejs=require('ejs');
let fs=require('fs');
let template=fs.readFileSync('./template.html','utf8');
//实现模板引擎的原理 正则

function render(templateStr,obj){
    //{{name}}
    let head='let str="";\r\n';
    head+='with(xxx){\r\n';
    let content='str+=`';
    templateStr=templateStr.replace(/\{\{(.+?)\}\}/g,function(){
        return '${'+arguments[1]+'}'
    })
    //解析语法
    content+=templateStr.replace(/\{\%(.+?)\%\}/g,function(){
        return '`\r\n' + arguments[1] +'\r\nstr+=`'
    });
    let tail='`\r\n}\r\n return str;';
    //产生函数
    let fn=new Function('xxx',head+content+tail);
    return fn(obj);
}
//模板引擎的实现原理是 1) with语法 2) new Function 将字符串转化成函数 3) 字符串拼接
let r=render(template,{arr:[1,2,3]});
console.log(r);
