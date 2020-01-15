## 央视国际视通

### 笔试

#### 输入一堆人名，然后输出格式化的名字比如：list([{name:'Bart'},{name:'Lisa'},{name:'Maggie'}]) return 'Bert,Lisa & Maggie';list([]) return ''
```
    function list(arr){
        if(Object.prototype.toString.call(arr) !== '[object Array]') return 'arr is not an Array';
        let newArr=[];
        arr.forEach(element=>{
            if(element.name){
                newArr.push(element.name)
            }else{
                console.log('arr is not contained name');
            }
        });
        let last=newArr.pop();
        let str=newArr.join(',');
        if(last===undefined) return '';
        if(newArr.length===0) return last;
        str+=' & '+last;
        return str;
    }
```

#### 输入一个字符串，找出其中最长的不重复的子字符串，并返回子字符串长度。例如：字符长'abcabcbb'，最长的不重复的子字符串是'abc'，长度是3 写一个函数，参数是一个字符串，返回值是其中最长的不重复的子字符串的长度
```
    function maxStrLength(str){
        let i=0,res=0,n=0;
        for(let j=0;j<str.length;j++){
            n=str.slice(i,j).indexOf(str[j]);
            if(n==-1){
                res=Math.max(res,j+1-i);
            }else{
                i+=n+1;
            }
        }
        return res;
    }
```

#### 行内元素有哪些？块级元素有哪些？空(void)元素有哪些？
```
行内元素：a、b、span、img、input、strong、select、label、em、button、textarea


块级元素：div、ul、li、dl、dt、dd、p、h1-h6、blockquote


空元素：即系没有内容的HTML元素，例如：br、meta、hr、link、input、img
```

#### css选择符有哪些？优先级如何计算？
```
- 选择器类型：
    - ID　　#id
    - class　　.class
    - 标签　　p
    - 通用　　*
    - 属性　　[type="text"]
    - 伪类　　：hover
    - 伪元素　　::first-line
    - 子选择器、相邻选择器

- 权重计算规则：
    - 第一等：代表内联样式，如: style=””，权值为1000。
    - 第二等：代表ID选择器，如：#content，权值为0100。
    - 第三等：代表类，伪类和属性选择器，如.content，权值为0010。
    - 第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。
    - 通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。
    - 继承的样式没有权值。
```

#### 使用原生方式或熟悉的JS库写一个AJAX调用，请用JSON数据格式传输和返回
```
    function getXHR() { //html元素事件触发的函数
        var myXMLHttpRequest = null;
        if (window.ActiveXObject) {
            myXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            myXMLHttpRequest = new XMLHttpRequest();
        }
        var url = "xxx.php";
        var data = "key=val"; //val一般是从某个html元素中取出的value值
        myXMLHttpRequest.open("post", url, true);
        myXMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        myXMLHttpRequest.onreadystatechange = function(){
            if (myXMLHttpRequest.readyState == 4 && myXMLHttpRequest.status == 200) {
                var res = myXMLHttpRequest.responseText;
                var jsonObj = eval("("+res+")");
                //接下来就可以使用jsonObj这个json对象取出其中的属性值，做一些修改html元素value值等操作了。
            }        
        }
        myXMLHttpRequest.send(data);
    }
```
jQuery
```
 response.write("{ username : '"+username+"' , content : '"+content+"'}") 
 
 由于服务器端返回的数据格式是JSON文档，因此也需要对文档的数据进行处理，但是JSON文档比较XML文档更容易解析。
 
 $.ajax({
 
    type:"POST",
 
    url:"Handler.ashx",
 
    dataType:json,
 
    data:{username:$("#name").val(),password:$("#pwd").val()},
 
    success:function(data){
 
      var username = data.username;
      var content = data.content;
      var txtHtml = "<div class='comment'><h6>"+      username+":</h6><p class='para'>"+content+"</p></div>";
      $("#result").html(txtHtml)
 
    }
 
 }
```

#### 请用伪代码描述一个排序算法
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

#### JavaScript创建对象的方式有哪几种？
https://www.jianshu.com/p/1fb0447db852
```
{}
new Ｏbject()
使用字面量
工厂模式
构造函数模式（constructor）
原型模式（prototype）
构造函数+原型模式
```

### 原生js

#### 请简述一下js的原型和原型链
```
什么是原型链：只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被称为原型链
所有的实例有一个内部指针(prototype)，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。
```

#### js继承有几种方式？
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

#### 如何实现promise
完整版
```
    const PENDING='pending';
    const FULFILLED='fulfilled';
    const REJECTED='rejected';

    function MyPromise(fn){
        const self=this;
        self.value=null;
        self.error=null;
        self.status=PENDING;
        self.onFulfilledCallbacks=[];
        self.onRejectedCallbacks=[];

        function resolve(value){
            if(value instanceof MyPromise){
                return value.then(resolve,reject);
            }
            if(self.status===PENDING){
                setTimeout(()=>{
                    self.status=FULFILLED;
                    self.value=value;
                    self.onFulfilledCallbacks.forEach((callback)=>callback(self.value));
                },0)
            }
        }

        function reject(error){
            if(self.status===PENDING){
                setTimeout(function(){
                    self.status=REJECTED;
                    self.error=error;
                    self.onRejectedCallbacks.forEach((callback)=>callback(self.error))
                },0)
            }
        }
        try{
            fn(resolve,reject);
        }catch(e){
            reject(e);
        }
    }

    function resolvePromise(bridgepromise,x,resolve,reject){
        if(bridgepromise===x){
            return reject(new TypeError('Circular reference'));
        }

        let called=false;
        if(x instanceof MyPromise){
            if(x.status===PENDING){
                x.then(y=>{
                    resolvePromise(bridgepromise,y,resolve,reject)
                },error=>{
                    reject(error);
                })
            }else{
                x.then(resolve,reject)
            }
        }else if(x!=null && ((typeof x === 'object') || (typeof x === 'function'))){
            try{
                let then=x.then;
                if(typeof then === 'function'){
                    then.call(x,y=>{
                        if(called) return;
                        called=true;
                        resolvePromise(bridgepromise,y,resolve,reject)
                    },error=>{
                        if(called) return;
                        called=true;
                        reject(error);
                    })
                }else{
                    resolve(x);
                }
            }catch(e){
                if(called) return;
                called=true;
                reject(e);
            }
        }else{
            resolve(x);
        }
    }

    MyPromise.prototype.then=function(onFulfilled,onRejected){
        const self=this;
        let bridgePromise;
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:value=>value;
        onRejected=typeof onRejected==='function'?onRejected:error=>{throw error};
        if(self.status===FULFILLED){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x=onFulfilled(self.value);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            })
        }
        if(self.status===REJECTED){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x=onRejected(self.error);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            })
        }
        if(self.status===PENDING){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                self.onFulfilledCallbacks.push((value)=>{
                    try{
                        let x=onFulfilled(value);
                        resolvePromise(bridgePromise,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                });
                self.onRejectedCallbacks.push((error)=>{
                    try{
                        let x=onRejected(error);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    }
    MyPromise.prototype.catch=function(onRejected){
        return this.then(null,onRejected);
    }
    MyPromise.deferred=function(){
        let defer={};
        defer.promise=new MyPromise((resolve,reject)=>{
            defer.resolve=resolve;
            defer.reject=reject;
        });
        return defer;
    }
    try{
        module.exports=MyPromise;
    }catch(e){}
```
简版
```
    function myPromise(constructor){
        let self=this;
        self.status='pending';
        self.vlaue=undefined;
        self.reason=undefined;
        function resolve(value){
            if(self.status==='pending'){
                self.value=value;
                self.status='resolved';
            }
        }
        function reject(reason){
            if(self.status==='pending'){
                self.reason=reason;
                self.status='rejected';
            }
        }
        try{
            constructor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    myPromise.prototype.then=function(onFullfilled,onRejected){
        let self=this;
        switch(self.status){
            case 'resolved':
                onFullfilled(self.value);
                break;
            case 'rejected':
                onRejected(self.reason);
                break;
            default:
        }
    }
```

#### let和var的区别
```
- const定义的变量不可以修改，而且必须初始化
- var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
- let是块级作用域，函数内部使用let定义后，对函数外部无影响。
```

### css

#### 水平垂直居中都有哪些方式？
```
- 绝对定位水平垂直居中
<div style="position: absolute;
     width: 500px;
     height: 300px;
     margin: auto;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background-color: green;">水平垂直居中</div>

- 水平垂直居中
<div style="position: relative;
     width:400px;
     height:200px;
     top: 50%;
     left: 50%;
     margin: -100px 0 0 -200px;
     background-color: red;">水平垂直居中</div>

- 水平垂直居中
<div style="position: absolute;
     width:300px;
     height:200px;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: blue;">水平垂直居中</div>

- flex 布局居中
<div style="display: flex;align-items: center;justify-content: center;">
    <div style="width: 100px;height: 100px;background-color: gray;">flex 布局</div>
  </div>
```

#### 如何实现一个烟花爆炸的效果
```
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>js烟花效果</title>
<script type="text/javascript">
document.onclick=function (ev)
{
    var oEvent=ev||event;
    var aDiv=[];
    var oDiv=null;
    var _oDiv=document.createElement('div');
    var i=0;
    var x=oEvent.clientX;
    var y=oEvent.clientY;
    _oDiv.style.position='absolute';
    _oDiv.style.background='red';
    _oDiv.style.width='3px';
    _oDiv.style.height='30px';
    _oDiv.style.left=oEvent.clientX+'px';
    _oDiv.style.top=document.documentElement.clientHeight+'px';
    document.body.appendChild(_oDiv);
    var t=setInterval(function (){
        if(_oDiv.offsetTop<=y)
        {
            clearInterval(t);
            show();
            document.body.removeChild(_oDiv);
        }
        _oDiv.style.top=_oDiv.offsetTop-30+'px';
    }, 30);
    function show()
    {
        var oDiv=null;
        for(i=0;i<100;i++)
        {
            oDiv=document.createElement('div');
            oDiv.style.width='3px';
            oDiv.style.height='3px';
            oDiv.style.background='#'+Math.ceil(Math.random()*0xEFFFFF+0x0FFFFF).toString(16);
            oDiv.style.position='absolute';
            oDiv.style.left=x+'px';
            oDiv.style.top=y+'px';
            var a=Math.random()*360;
            //oDiv.speedX=Math.random()*40-20;
            //oDiv.speedY=Math.random()*40-20;
            oDiv.speedX=Math.sin(a*180/Math.PI)*20*Math.random();
            oDiv.speedY=Math.cos(a*180/Math.PI)*20*Math.random();
            document.body.appendChild(oDiv);
            aDiv.push(oDiv);
        }
    }
    setInterval(doMove, 30);
    function doMove()
    {
        for(i=0;i<aDiv.length;i++)
        {
            aDiv[i].style.left=aDiv[i].offsetLeft+aDiv[i].speedX+'px';
            aDiv[i].style.top=aDiv[i].offsetTop+aDiv[i].speedY+'px';
            aDiv[i].speedY+=1;
            if(aDiv[i].offsetLeft<0 || aDiv[i].offsetLeft>document.documentElement.clientWidth || aDiv[i].offsetTop<0 || aDiv[i].offsetTop>document.documentElement.clientHeight)
            {
                document.body.removeChild(aDiv[i]);
                aDiv.splice(i, 1);
            }
        }
    }
};
</script>
</head>
<body style="overflow:hidden; background:black;">
</body>
</html>
```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css3实现烟花特效</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        html{
            width: 100%;
            height: 100%;
        }
        body{
            width: 100%;
            height: 100%;
        }
        #container{
            width: 100%;
            height: 100%;
            background-color: black;
            position: relative;
        }
        #fireworks{
            position: absolute;
            left: 50%;
            margin-left: -250px;
            bottom: 60%;
            margin-bottom: -180px;
            transform: scale(0);
            animation: fireworks 5s 3s;
        }

        @keyframes fireworks {
            0%{
                transform: scale(0);
            }
            80%{
                transform: scale(1);
            }
            100%{
                opacity: 0;
            }
        }
        #firecracker{
            position: absolute;
            left: 50%;
            bottom: 0%;
            margin-left: -4px;
            animation: firecracker 3s forwards;
        }

        @keyframes firecracker {
            0%{
                transform: scale(1);
                bottom: 0%;
            }
            100%{
                bottom: 60%;
                transform: scale(0);
            }
        }
    </style>
</head>
<body>
<div id="container">
    <div id="fireworks"><img src="imgs/fireworks.png" alt=""></div>
    <div id="firecracker"><img src="imgs/firecracker.png" alt="" width="8px"></div>
</div>
</body>
</html>
```

### 框架

#### vue的生命周期都有哪些？
```
Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。
生命周期中有多个事件钩子，如下：
- beforeCreate（创建前） 在数据观测和初始化事件还未开始
- created（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
- beforeMount（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
- mounted（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
- beforeUpdate（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- updated（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- beforeDestroy（销毁前） 在实例销毁之前调用。实例仍然完全可用。
- destroyed（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
```

#### 封装组件需要考虑哪些内容？
```
开发通用组件是很基础且重要的工作，通用组件必须具备高性能、低耦合的特性

一、数据从父组件传入

为了解耦，子组件本身就不能生成数据。即使生成了，也只能在组件内部运作，不能传递出去。

父对子传参，就需要用到 props，但是通用组件的的应用场景比较复杂，对 props 传递的参数应该添加一些验证规则

二、在父组件处理事件

在通用组件中，通常会需要有各种事件，

比如复选框的 change 事件，或者组件中某个按钮的 click 事件

这些事件的处理方法应当尽量放到父组件中，通用组件本身只作为一个中转

三、记得留一个 slot

一个通用组件，往往不能够完美的适应所有应用场景

所以在封装组件的时候，只需要完成组件 80% 的功能，剩下的 20% 让父组件通过 solt 解决

四、不要依赖 Vuex

父子组件之间是通过 props 和 自定义事件 来传参，非父子组件通常会采用 Vuex 传参

但是 Vuex 的设计初衷是用来管理组件状态，虽然可以用来传参，但并不推荐

因为 Vuex 类似于一个全局变量，会一直占用内存

在写入数据庞大的 state 的时候，就会产生内存泄露

五、合理运用 scoped 编写 CSS

在编写组件的时候，可以在 <style> 标签中添加 scoped，让标签中的样式只对当前组件生效

但是一味的使用 scoped，肯定会产生大量的重复代码

所以在开发的时候，应该避免在组件中写样式

当全局样式写好之后，再针对每个组件，通过 scoped 属性添加组件样式
```

#### vue中数据传递都有哪些方式？
```
- 父组件向子组件传值 --Props传递数据
在父组件中使用儿子组件
<template>
　　<div>
　　　　父组件：{{money}}
　　　　<Son1 :money="money"><Son1>
　　</div>
</template>
<script>
　　import Son1 from ''./Son1";
　　export default{
　　　　components:{
　　　　　　Son1
　　　　},
　　　　data(){
　　　　　　return { money: 100};
　　　　}
　　};
</script>
子组件接受数据
props:{
　　value:{
　　　　type:Number,
　　　　default:1
　　}
}
如果是数组
props:{
　　value:{
　　　　type:Array,
　　　　default: ()=>[]
　　}
}

- 子组件通信父组件 $emit使用
<template>
　　<div>
　　　　父组件：{{money}}
　　　　<Son1 :money="money" @input="change"><Son1>
　　</div>
</template>
<script>
　　import Son1 from ''./Son1";
　　export default{
　　　　methods:{
　　　　　change(data){
　　　　　　 this.money = data
　　　　　 }　
　　　　},
　　　　components:{
　　　　　　Son1
　　　　},
　　　　data(){
　　　　　　return { money: 100};
　　　　}
　　};
</script>
子组件触发绑定自己身上的方法
<template>
　　<div>
　　　　子组件1：{{money}}
　　　　<button @click="$emit('input',200)">修改父组件的值<Son1>
　　</div>
</template>
<script>
　　export default{
　　　　props:{
　　　　　money:{
　　　　　　 type:Number
　　　　　}
　　　　}
　　};
</script>

- $parent、$children（多层级传递）
<Grandson1 :value="value"></Grandson1>
<template>
　　<div>
　　　　孙子1：{{value}}
　　　　<---调用父组件的input事件-->
　　　　<button @click="$parent.$emit('input',200)">更改<Son1>
　　</div>
</template>
<script>
　　export default{
　　　　props:{
　　　　　value:{
　　　　　　 type:Number
　　　　　}
　　　　}
　　};
</script>

- $attrs、 $listeners：
$attrs批量向下传入属性：
<Son2 name="小明" age="18"></Son2>
<--可以在son2组件中使用$attrs,可以将属性继续向下传递-->
<div>
　　儿子2：{{  $attrs.name }}
　　<Grandson2  v-bind="$attrs"></Grandson2>
</div>
<tempalte>
　　<div>孙子：{{$attrs}}</div>
</template>
$listeners批量向下传入方法：
<Son2 name="小明" age="18" @click=“()=>{this.money  =500}”></Son2>
<--可以在son2组件中使用$attrs,可以将属性继续向下传递-->
<Grandson2  v-bind="$attrs" v-on="$listeners"></Grandson2>
<button @click="$listeners.click()">更改<Son1>

- Provide&Inject
Provide 在父级中注入数据
provide(){
　　return {parentMsg:'父亲'}；
}
Inject
在任意子组件中可以注入父级数据
inject：['parentMsg']//会将数据挂载在当前实例上

- ref使用
<Grandson2  name="花花" ref="grand2"></Grandson2>
mounted(){
　　console.log(this.$refs.grand2.name);
}

- EventBus：用于跨组件通知
Vue.prototype.$bus = new Vue();
Son2组件和Grandson1互相通信
mounted() {
　　//父亲组件注册
　　this.$bus.$on('my',data=>{
　　　　console.log(data)
　　})
}
mounted(){
　　//侄子组件调用
　　this.$nextTick(()=>{
　　　　this.$bus.$emit('my',"我是小红”);
　　})
}
```

#### vuex和eventBus的区别是什么？
http://dongfanker.coding.me/2018/09/03/vue-bus/
```
为什么需要Bus

一般来说，都是利用父组件给子组件使用query或者params传递参数来实现子组件的数据显示
不过，当出现子组件需要向父组件传递数据的时候，就需要用到bus，bus可以自己创建，也可以通过装包来实现

直接创建Bus

在此处直接将Bus注入Vue对象中，成为全局的组件。
在子组件中通过this.$root.Bus.$on(key,method),this.$root.Bus.$emit(key,data)来调用
将$on放在mounted，created这些钩子函数中，相应的函数使用(e)=>{function}比较便捷

1
2
3
4
5
6
7
8
9
10
import Vue from 'vue'
const Bus = new Vue()

var app= new Vue({
    el:'#app',
　　 data:{
　　　　Bus
    }　　

})
使用vue-bus

使用yarn或者npm安装vue-bus之后，在main.js中引用它

1
2
import VueBus from 'vue-bus';
Vue.use(VueBus);
于是调用直接可以写为 this.$bus.on(key, this.method)，this.$bus.emit(key, { text: …… }
其中第一个字符串参数代表key，每个key都能够实现自己的独立传输，this.method为事先定义好的method，用于对传入的数据进行处理

为什么使用vuex

当我们的应用遇到多个组件共享状态时，会需要：

多个组件依赖于同一状态。
来自不同组件的行为需要变更同一状态。
经过我的观察，vuex在其中的作用就是组件与状态的捆绑剥离开来，使得组件状态的改变依赖于某个行为，这使得代码变得易于调试。
Vuex采用集中式存储管理应用的所有组件的状态，这里的关键在于集中式存储管理。这意味着本来需要共享状态的更新是需要组件之间通讯的，而现在有了vuex，就组件就都和store通讯了。

使用vuex

使用yarn或者npm安装vuex之后，在main.js中引用它

1
2
3
4
5
6
7
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)
new Vue({
  el: '#app',
  store
})
随后创建vuex目录,将store.js放在目录下,定义state和mutation

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    author: 'Wise Wrong'
  },
  mutations:{
      newAuthor(state,msg){
          state.author = msg
      }
  }
})
export default store
在使用的时候，不直接修改this.$store.state.author，而是使用this.$store.commit()来提交，可以让我们更好的跟踪每一个状态的变化，在大型项目中更为适用
```