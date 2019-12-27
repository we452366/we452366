## 出门问问

### css

#### 左右两栏布局，右边高度随内容撑开，左边高度如何和右边保持一致？
1. 使用display:table;
```
.container {
                display: table;
                width: 80%;
            }
             
            .container .left,
            .container .right {
                display: table-cell;
            }
             
            .container .left {
                width: 20%;
                background: pink;
            }
             
            .container .right {
                width: 80%;
                background: deeppink;
            }
```
2. 利用margin和padding
```
.container {
                overflow: hidden;
                width: 400px;
            }
            .container .left,
            .container .right {
                float: left;
                margin-bottom: -10000px;
                padding-bottom: 10000px;
            }
            .container .left {
                width: 20%;
                background: pink;
            }
            .container .right {
                width: 80%;
                background: deeppink;
            }
```
3. flex，兼容性IE10下面不能使用，手机端也有些兼容
```
.container {
                display: flex;
                width: 400px;
            }
             
            .container .left {
                width: 20%;
                background: pink;
            }
             
            .container .right {
                width: 80%;
                background: deeppink;
            }
```
4. 用js获取右侧div的高度，将这个高度值赋值给左侧的高度

### 原生js

#### 如何实现a连接定位到网页中某个位置？
```
需求：点击跳转到页面指定位置

<div id="test">点击跳转到此处</div>


1、利用a标签的锚点跳转

<a href="#test">点击跳转</a>
由于锚点跳的原理是改变哈希值，所以会改变url
 


2、用js的scrollIntoView方法
document.getElementById('test').scrollIntoView()
此方法可以让当前的元素滚动到浏览器窗口的可视区域内，不会改变url，但会有兼容问题


3、获取id为test的元素距离父元素顶部的位置，即offsetTop， 改变父元素的scrollTop （父元素有定位，可滚动）
document.querySelector('.scrollElement').scrollTop = document.getElementById('test').offsetTop;
 在vue中，demo示例

<button @click="jump(index)">点击</button>

<div ref="docs">
    <div id="data-1">跳转到此处</div>
</div>

methods: {
    jump(id) {
        this.$refs.docs.scrollTop =  this.$el.querySelector(`#data-${id}`).offsetTop ;
    },
}    
```

#### url参数如何返回对象？
```
function parseQueryString(url){
        let search=url.split('?')[1];
        let strs=search.split('&');
        let params={};
        for(let str of strs){
            let arr=str.split('=');
            params[arr[0]]=isNaN(arr[1])?arr[1]:Number(arr[1]);
        }
        return params;
    }
```

#### js的继承方式有几种？分别是什么？有什么优缺点？
6种
```
方式一:借助构造函数实现继承

这里使用的原理就是在Child里面,把Parent的this指向改为是Child的this指向,从而实现继承

function Parent(name){
    this.name=name;
    }
    Parent.prototype.saiHi=function(){
        console.log("hello")
    }
    function Child(name,age,gender){
        Parent.call(this,name)
        this.age=age;
        this.gender=gender;
    }
    let child=new Child("王磊",20,"男")
    console.log(child.name);// 王磊
    child.sayHi(); // Uncaught TypeError:child.sayHi is not a function
缺点:只能解决属性的继承,使用属性的值不重复,但是父级类别的方法不能继承

方式二:借助原型链实现继承

第二种方式就是把Child的原型改为是Parent的实例,从而实现继承

　　　　　function Parent(name,gender){
            this.name=name;
            this.gender=gender;
            this.list=[1,2,3]
        }
        Parent.prototype.eat=function(){
            console.log("晚餐时间到")
        }
        function Child(age){
            this.age=age;
        }
        Child.prototype=new Parent("李白","男");
        var child=new Child(20);
        var child2=new Child(30);
        child.eat();
        console.log(child.list,child2.list);// [1,2,3] [1,2,3]
        child.list.push(4)
        console.log(child.list);// [1,2,3,4]        
        console.log(child2.list);// [1,2,3,4]
缺点:因为Child的原型对象都是New Parent,所以实例化出来的对象的属性都是一样的,而且Parent上面的引用类型只要有一个实例对象修改了,其他也会跟着修改.因为他们原型对象都是共用的

方式三:组合型

方式三的话是结合了方式一和方式二来实现继承

function Person(school){
            this.school=school;
        }
        Person.prototype.skill=function(){
            console.log("学习");
        }
        function Student(school,name,age,gender){
            Parent.call(this,school);
            this.name=name;
            this.age=age;
            this.gender=gender;
        }
        Student.prototype=Person.prototype;
        let student=new Student("广铁一中","王菲菲",14,"女");
        console.log(Student.prototype===Person.prototype)
        console.log(student.constructor)
缺点:父类的原型对象调用了两次,没有必要,而且student实例的构造函数是来自于Person

方式四:组合方式优化

function Parent(name,play){
            this.name=name;
            this.play=play;
        }
        function Child(name,play,age){
            Parent.call(this,name,play);
            this.age=age;
        }
        Child.prototype=Parent.prototype;
        let child=new Child("张三","玩",20);
        let child2=new Child("李四","吃",10)
        console.log(child,child2)
        console.log(child.prototype===child2.prototype); true
        console.log(child.constructor); // 构造函数指向的是Parent
缺点:child实例的构造函数来自于Parent

方式五: 组方式优化

只是这种方式的话,你必须得理解Object.create()方法的使用,他创建的对象是在原型上面的

function Parent(name,play){
            this.name=name;
            this.play=play;
        }
        function Child(name,play,age){
            Parent.call(this,name,play);
            this.age=age;
        }
        Child.prototype=Object.create(Parent.prototype);// 隔离了父类和子类的构造函数,父类的添加到了__proto__属性上
        Child.prototype.constructor=Child
        let child=new Child("张三","玩",20);
        let child2=new Child("李四","吃",10)
       
        console.log(child.constructor)
```

#### promise的有几种状态？分别是什么？
3种
```
onFullfilled
onRejected
Pendding
```

#### 请手写一个快速排序和冒泡排序
快速排序
```
function quickSort(arr,left,right){
    let len=arr.length,
        partitionIndex,
        left=typeof left != 'number' ? 0 : left,
        right=typeof right != 'number' ? len-1 : right;
    if(left<right){
        partitionIndex=partition(arr,left,right);
        quickSort(arr,left,partitionIndex-1);
        quickSort(arr,partitionIndex+1,right);
    }
    return arr;
}
function partition(arr,left,right){
    let pivot=left,
        index=pivot+1;
    for(let i=index;i<=right;i++){
        if(arr[i]<arr[pivot]){
            swap(arr,i,index);
            index++;
        }
    }
    swap(arr,pivot,index-1);
    return index-1;
}
function swap(arr,i,j){
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}
```
冒泡排序
```
function bubbleSort(arr){
    let len=arr.length;
    for(let i=0;i<len-1;i++){
        for(let j=0;j<len-1-i;j++){
            if(arr[j]?arr[j+1]){
                let temp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=temp;
            }
        }
    }
    return arr;
}
```

### 框架

#### 你了解服务器端渲染吗？它是什么？
```
> Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

即：SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

服务端渲染 SSR 的优缺点如下：

（1）服务端渲染的优点：

更好的 SEO：因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
更快的内容到达时间（首屏加载更快）：SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；
（2) 服务端渲染的缺点：

更多的开发条件限制：例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。
```

#### 服务器端渲染入口有几个？
```
- entry-server.js
- entry-client.js
```

#### vue的静态资源是怎么处理的？
```
首先要理解webpack是怎样处理静态资源的。

在*.vue组件中，所有的templates和css都会被vue-html-loader 和 css-loader解析，寻找资源的URL。

举个例子，在<img src="./logo.png"> 和 background: url(./logo.png), "./logo.png"中，都是相对资源路径，都会被Webpack解析成模块依赖，由于logo.png不是JavaScript，当被看成一个模块依赖的时候，我们需要使用url-loader 和 file-loader进行处理。 该模板已经配置好了这些loaders，所以你能够使用相对/模块路径时不需要担心部署的问题。

资源处理规则

相对URL, e.g. ./assets/logo.png 将会被解释成一个模块依赖。它们会被一个基于你的Webpack输出配置自动生成的URL替代。

没有前缀的URL, e.g. assets/logo.png 将会被看成相对URL，并且转换成./assets/logo.png

前缀带~的URL 会被当成模块请求, 类似于require('some-module/image.png'). 如果你想要利用Webpack的模块处理配置，就可以使用这个前缀。例如，如果你有一个对于assets的路径解析，你需要使用<img src="~assets/logo.png">来确保解析是对应上的。

相对根目录的URL, e.g. /assets/logo.png 是不会被处理的。
```

#### 你提到的cdn，cdn是请求的绝对路径还是相对路径？
```
首先明确一点，在项目中的webpack.config.js等项目配置文件中使用的require属于nodejs范畴，而进入index.js后，加载的组件中的require都属于webpack的解析范畴。

开始前，咱们先聊聊webpack中require的用法。

您可能觉得这有什么，不就是直接require(url)直接引用吗，如果您这么想，那可就太小看require了。

let url = "@/assets/images/carousel/logo.svg"
require(url)    //报错

let url = "logo.svg"
require("@/assets/images/carousel/"+url); //正确
很诡异是不是? 我相信你第一次见到后会不自觉的说句f**k。

这是因为你修改页面后，webpack进行编译，等待编译完，需要进行工程的打包，然后打包正确，才能热加载运行并刷新页面。
如果require中传入的是个变量，它有可能是计算机系统中的任何目录下的任何文件，那么在打包静态资源时它有可能会将你的电脑整个磁盘遍历一遍(它很傻)。所以至少需要给出在哪个路径下，这样才能精确的将那个路径下的对应文件打包，然后在代码运行时，直接用对应文件名生成正则匹配(因为打包后的文件，可能有hash值。不能直接查文件名)，找到后，加载到代码中。

所以，请记住 尽可能详细的指定require中的路径，然后拼接变量

接下来说下打包后的路径问题
webpack将项目中的静态资源编译打包后，生成的路径已经不是原来的那个路径了。如
src/assets/image/logo.jpg 
编译后可能变成
dist/public/image/logo.1d997ea3.jpg

而通过require("src/assets/image/logo.jpg")，会自动找到并加载dist/public/image/logo.1d997ea3.jpg文件

一、<template>部分的路径处理

Vue Loader 在编译单文件组件中的 <template> 块时，它也会将所有遇到的资源 URL 转换为 webpack 模块请求。(这样我们就没必要手动调用require了，而是交给vue-loader处理了)

vue-loader默认可以处理的标签/特性的组合如下:

{
  video: ['src', 'poster'],
  img: 'src',   //即img元素上的src属性
  source: 'src',  //source元素上的src属性
  image: 'xlink:href'
}
面对上面的标签组合，vue-loader会自动进行资源url的转换。

转换规则:
a、如果路径是绝对路径，会被原样保留。如/src/assets/image/login/title.png

//代码
<template>
   <img src="/src/assets/image/login/title.png" alt="">
</template>

//渲染后html页面
<img data-v-70c98a68="" src="/src/assets/image/login/title.png" alt="">
//当然这个图片是无法展示的，因为编译后title.png已不在src/assets/image/login下了
b、如果路径以 . 开头，将会被看作相对的模块依赖。如 ./titlea.png

//代码
<img src="./titlea.png" alt="">

//渲染后html页面
<img data-v-70c98a68="" src="/static/img/titlea.1e9fa570.png" alt="">
c、如果路径以 @ 开头，也会被看作模块依赖。如果你的 webpack 配置中给 @ 配置了 alias，这就很有用了。所有 vue-cli 创建的项目都默认配置了将 @ 指向 /src

//代码
<img src="@/assets/image/login/title.png" alt="">

//渲染后html页面
<img data-v-70c98a68="" src="/static/img/title.1e9fa570.png" alt="">
d、如果路径以 ~ 开头，其后的部分将会被看作模块依赖，既可以加载含有别名的静态资源，又可以加载node-modules中的资源。如

//代码
<img src="~@/assets/image/login/title.png" alt="">
//渲染后html页面
<img data-v-70c98a68="" src="/static/img/title.1e9fa570.png" alt="">


//代码
<img src="~[npm包名]/xxx/logo.png" alt="">
//渲染后的html页面
<img data-v-70c98a68="" src="/static/img/logo.2f53e458.png" alt="">
二、<style>部分的路径处理

由于vue-loader在处理style时，采用的是style-loader，所以可能 和上面<template>部分的转换规则不太一样。
在vue-loader的内部使用了如下的配置（不一定配置，也有可能通过js直接给rules赋值）:

//在vue-loader的内部使用css-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {  
          url: true, //默认选项
        },
      },
    ],
  },
};
url为true时，则意味着可以将url中的字符串通过require()加载进来。

转换规则

//代码
<style scoped>
.login-wrap {
  background-image: url("/src/assets/image/login/title.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/src/assets/image/login/title.png);
}
同样不会显示，编译后的路径不是这个
b、如果路径以 . 开头，将会被看作相对的模块依赖。如 ./titlea.png

//代码
<style scoped>
.login-wrap {
  background-image: url("./titlea.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/titlea.1e9fa570.png);
}
c、如果路径以 ~ 开头，其后的部分将会被看作模块依赖，即可以加载含有别名的静态资源，又可以加载node-modules中的资源。如

//代码
<style scoped>
.login-wrap {
  background-image: url("~[npm包名]/logo.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/logo.e05643fc.png);
}




//代码
<style scoped>
.login-wrap {
  background-image: url("~@/assets/image/login/bg.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/bg.1d997ea3.png);
}
注意： 和上面的<template>相比，唯独少了直接用@开头的方式url("@/assett/logo.png"),所以下面写法是错误的

//代码
<style scoped>
.login-wrap {
  background-image: url("@/assets/image/login/bg.png");
}
</style>
```

### node

#### 你用过数据库吗？在node端如何连接数据库？
```
var mysql = require('mysql');
//连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',  //用户名
    password:'rootroot',   //密码
    database:'myblog',
    port:'3306'     //端口号
});
connection.connect(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('连接succeed');
});
// 插入一条数据
var sql = 'insert into userlist (id,name,age,sex) values(?,?,?,?)';
var param = ['3','姜艳霞','18','女'];
connection.query(sql,param,function(err,rs){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('插入数据succeed');
});
//执行查询 查询study数据库中的userlist表的数据
connection.query('select * from userlist',function(err,rs){
    if(err){
        console.log(err);
        return;
    }
    for(var i=0;i<rs.length;i++){
        console.log('id:'+rs[i].id+'name:'+rs[i].name+'age:'+rs[i].age+'sex:'+rs[i].sex);
    }
});
//关闭数据库
connection.end(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('关闭succeed');
});
```

### 编程题

#### 答案：Jim
```
    var name='Jim';
    function person(){
        console.log(name);
    }
    function test(){
        var name='Tom';
        person();
    }
    test()
```

#### 答案：undefined undefined undefined undefined undefined
```
    for(var i=0;i<5;i++){
        setTimeout(function(i){
            console.log(i)
        },i*1000)
    }
```

#### 答案：3
```
    var temp=3;
    function c(){
        console.log(temp);
    }
    (function(){
        var temp=4;
        c();
    })();
```

#### 答案：undefined
```
    var temp='hello world';
    function example(){
        console.log(temp);
        var temp='Aralic';
    }
    example();
```

#### 答案：rejected12 rejected2undefined rejected33
```
    new Promise((resolve,reject)=>{
        reject(2)
    }).then(val=>{
        console.log('fulfilled 1'+val);
    },val=>{
        console.log('rejected 1'+val);
    }).then(val=>{
        console.log('fulfilled 2'+val);
        return 3;
    },val=>{
        console.log('rejected 2'+val);
    }).then(val=>{
        console.log('fulfilled 3'+val);
    },val=>{
        console.log('rejected 3'+val);
    })
```

#### 答案：undefined [10,20,30,40]
```
    var array=[1,2,3,4];
    var result=array.forEach(function(item,index,input){
        input[index]=item*10;
    });
    console.log(result);
    console.log(array);
```

#### 答案：① script start ② script end ③ promise1 ④ promise2 ⑤ setTimeout
```
    console.log('script start');
    setTimeout(function(){
        console.log('setTimeout');
    },0);
    Promise.resolve().then(function(){
        console.log('promise1');
    }).then(function(){
        console.log('promise2');
    });
    console.log('script end');
```

#### 答案：Tom ['age','height','weight','hobby'] Jim ['age','height','weight','hobby']
```
    function Person(){
        this.name='Jim';
        this.info=['age','height','weight'];
    }
    function Student(){};
    Student.prototype=new Person();
    var student1=new Student();
    student1.name='Tom';
    student1.info.push('hobby');
    var student2=new Student();
    console.log(student1.name);
    console.log(student1.info);
    console.log(student2.name);
    console.log(student2.info);
```

#### 答案：{name:'Tom',info:{height:178,weight:70}} {name:'Jim',info:{height:178,weight:70}}
```
    var person={
        name:'Jim',
        info:{
            height:180,
            weight:70
        }
    }
    var student=Object.assign({},person);
    student.name='Tom';
    student.info.height=178;
    console.log(student);
    console.log(person);
```

### 场景题

#### 如何从source的格式通过map的数据格式转化到target的格式？
```
source=[{
    'tags':['顺风车','快车','专车','切勿','时代大厦'],
    'colors':['红色','五彩斑斓','绚丽']
    ...
}]

map=[{
    'tag':'打车',
    'class':'class01'
},
...
]

target=[{
    'tag':['顺风车','快车','专车'],
    'class':['class01','class02','class03']
}]
```