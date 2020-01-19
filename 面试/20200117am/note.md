## 百度

### 原生js

#### 闭包如何改变this指向？
```
闭包个人理解   函数内部还有一个函数，其作用就是可以访问上一层函数中的变量

下面的案例中函数内部有函数，this的指向就变为window了

结果闭包中this指向的两种方法

1.call对象冒充可以改变this的指向  

obj.say().call(obj)  这里把this的指向换成了obj

闭包中的this指向的是window对象，this.name=window.name

2.在方法内部改变this指向  既然对象中的say方法中this是指向obj的，那么我们就使用that代替this，在闭包函数中写成that.name   那么结果就是obj

```

#### 原生如何实现数据传递？
```
自定义函数参数传递为 字符串格式 ，传递方式
1：用this传递 
2：引号缺省 
3：转义字符（html中 " 代表"双引号，'代表单引号，javascript中直接\" 和Java通用转义字符集）

<html> 
<head> 
<script language="LiveScript"> 
function print(arg){ 
alert("你好！"+arg); 
} 
</script> 
</head> 
<body> 
<form> 
<input type="button" name="Button1" value="first" onclick="print(this.str)" str="你好one"> 
<br><br> 
<input type="button" name="button2" value="second" onclick=print("你好two")> 
 
<br><br> 
<input type="button" name="button3" value="Third" onclick="print ("你好three")"> 
 
</form> 
</body> 
</html>
总结
以上是脚本之家为你收集整理的javascript自定义函数参数传递为字符串格式全部内容，希望文章能够帮你解决javascript自定义函数参数传递为字符串格式所遇到的程序开发问题。
```

#### 如何实现ul下的li事件绑定？
https://blog.csdn.net/Web_J/article/details/83900073
```
这是一个非常常见的面试题，出题方式多样，但考察点相同，下面我们来看看这几种方法：

方法一：

  var itemli = document.getElementsByTagName("li");
 
   for(var i = 0; i<itemli.length; i++){
 
　　　　itemli[i].index = i; //给每个li定义一个属性索引值
 
　　　　itemli[i].onclick = function(){
 
　　　　　　alert(this.index+this.innerHTML); 
 
　　　　}
 
   }
方法二：

var itemli = document.getElementsByTagName("li");
 
for(var i = 0; i<itemli.length; i++){
 
　　　(function(n){
 
        　　itemli[i].onclick = function(){
 
　　　　　　alert(n+itemli[n].innerHTML);  
 
　　　　　}
 
  　　})(i)
 
   }
方法三：

var itemli = document.getElementsByTagName("li");
 
for(var i = 0; i<itemli.length; i++){
        itemli[i].onclick = function(n){
    　　　　return function(){
                alert(n+itemli[n].innerHTML);  
            }
    　　}(i)
    }
方法四：

 
$("ul li").click(function(){
        var item = $(this).index();  //获取索引下标 也从0开始
        var textword = $(this).text();  //文本内容
        alert(item+textword);
    })
上面这四种方法都可以实现循环绑定，但是我们知道，频繁的操作DOM是非常消耗性能的，如果有1000个li，怎么办呢？我们还有另一种思路，事件代理，又称事件委托。简单的来讲就是利用JS中事件的冒泡属性，把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。下面我们来看看。

方法五（JS事件代理）：

 var ul = document.querySelector("ul");
    ulItem.onclick = function (e) {
        e = e || window.event; //这一行及下一行是为兼容IE8及以下版本
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "li") {
            var li = this.querySelectorAll("li");
            index = Array.prototype.indexOf.call(li, target);
            alert(target.innerHTML + index);
        }
    }
上述代码中，为什么需要 “index = Array.prototype.indexOf.call(li,target);” 这样使用数组的indexOf方法呢，这是因为querySelectorAll方法获取到的元素列表不是数组，和函数的arguments一样是一种类数组类型，不可以直接使用数组的方法。

方法六（jQuery事件代理）：

 $(document).ready(function () {
        $("ul").on("click", function (event) {
            var target = $(event.target);
            alert(target.html() + target.index())
        });
    });
```

#### map和forEach的区别是什么？
https://www.jianshu.com/p/83aa9a2a4055
foreach底层利用迭代器Iterator来实现的
map底层是利用hashMap来实现的
forEach比map快
```
定义

foreEach()方法:
针对每一个元素执行提供的函数。
map()方法:
创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来。

区别

forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

例子

制作一个数组的平方
有如下一个数组

let arr =[1,2,3,4,5,6]
下面分别用forEach()和Map()

forEach()

注意，forEach是不会返回有意义的值的。
我们在回调函数中直接修改arr的值。

arr.forEach((value, key) => {
 return arr[key] = value * value;
});
执行结果如下：



执行结果
Map()

let list = arr.map(value => {
 return value * value;
});

执行结果如下：



执行结果
执行速度对比

forEach()的执行速度 < map()的执行速度

速度比试


image.png
如何使用

forEach适合于你并不打算改变数据的时候，而只是想用数据做一些事情 – 比如存入数据库或则打印出来。

let arr = ['a', 'b', 'c', 'd'];
arr.forEach((letter) => {
 console.log(letter);
});
// a
// b
// c
// d
map()适用于你要改变数据值的时候。不仅仅在于它更快，而且返回一个新的数组。这样的优点在于你可以使用复合(composition)(map(), filter(), reduce()等组合使用)来玩出更多的花样。

let arr = [1, 2, 3, 4, 5];
let arr2 = arr.map(value => value * value).filter(value => value > 10);
// arr2 = [16, 25]
我们首先使用map将每一个元素乘以它们自身，然后紧接着筛选出那些大于10的元素。最终结果赋值给arr2。

总结

forEach()可以做到的东西，map()也同样可以。反过来也是如此。

map()会分配内存空间存储新数组并返回，forEach()不会返回数据。

forEach()允许callback更改原始数组的元素。map()返回新的数组。
```

#### 如何实现map函数？
https://blog.csdn.net/Beijiyang999/article/details/80179097
```
思路

map 迭代方法接收两个参数：

对每一项执行的函数
该函数接收三个参数：
数组项的值
数组项的下标
数组对象本身
指定 this 的作用域对象
map 方法返回每次函数调用结果组成的数组。

代码表示：

arr.map(function(item, index, arr) {}, this);
1
实现

由此，实现 fakeMap 方法如下

代码：

Array.prototype.fakeMap = function fakeMap(fn, context) {
  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }
  
  let arr = this;
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
	// 迭代执行
    let result = fn.call(context, arr[i], i, arr);
    temp.push(result);
  }
  return temp;
};

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
检测：

let arr = ["x", "y", "z"];

arr.fakeMap((item, index, arr) => console.log(item, index, arr));
1
2
3
输出：

x 0 [ ‘x’, ‘y’, ‘z’ ]
y 1 [ ‘x’, ‘y’, ‘z’ ]
z 2 [ ‘x’, ‘y’, ‘z’ ]
this 指向：

let arr = ["x", "y", "z"];
let obj = { a: 1 };

arr.fakeMap(function() {
  console.log(this.a);
}, obj);

1
2
3
4
5
6
7
输出

1
1
1
更新

Array.prototype.myMap = function (fn, context) {
  const array = this
  context = Object(context) || global   // 严格模式下
  const resultArr = []
  
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    result = fn.call(context, item, i, array)
    resultArr.push(result)
  }
  return resultArr
};
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
注： 严格模式下，context 为 null 或 undefined 时 Object(context) 返回空对象，不会被赋值为global
```

### 框架

#### vue的数据传递有哪些？
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

#### vuex和eventbus的区别是什么？
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

#### 路由守卫如何做拦截？
https://www.cnblogs.com/1825224252qq/p/11770570.html
```
1.为什么需要路由拦截器

为了防止用户在知道组件名称的情况下，没有登录而直接进入相应的页面下，所以要为路由设置一个拦截器，来判断用户是否登录过。

2.怎样设置路由拦截器：

分析：当我们第一次登录的时候，向服务器发送请求，服务器会给我们一个token标记符（这个token时前后台约定好的一个值），客户端拿到这个token后将它保存到本地localstorage或vueX中，当我们再次访问时，将这个token在携带给服务器。服务器会通过算法校验这个token的合法性（这个token会有一个有效期），如果合法，则不干涉，不合法则强制跳转到登录界面。

 

import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    // mytoken是我们第一次登录成功后，服务器会返回给我一个token值，我们将它保存在localstorage中
    let token = localStorage.getItem('mytoken')  // 获取本地存储的token值
    if (token) {　　　　　　　　// 判断token值是否存在
　　// 个人认为在此期间可以再次判断 token是否还在有效期内，如果在，就将token放在请求头中；如果不在，就将token= '',并返回错误信息
      config.headers['Authorization'] = token // 如果token值存在，就将token值放在请求头中，发送给服务器
    }
    return config
  }, function (error) { 　　　　 // 如果不存在，就返回一个错误信息
    // Do something with request error
    return Promise.reject(error)
  })
 
3.当我我们设置了拦截器后，我们可以注册一个全局守卫（在main.js入口文件中注册），防止未登录的用户跳转到其他页面
 
 
// 注册一个全局守卫。作用是在路由跳转前对路由判断，防止未登录的用户跳转到其他页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  // 如果已经登录，那我不干涉你，让你随便访问
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
      next({path: '/login'})
    } else {
      // 如果没有登录，但你访问的login，那就不干涉你，让你访问
      next()
    }
  }
})
```

### 工程化

#### git如何只上传选定的文件？
```
进入你要操作的目录，跟Linux环境一样
git status ./           查看这个文件夹下的文件状态，会列出有哪些没有加入追踪，哪些没有commit
git add ./*             把这个文件下的所有应该加入追踪的，加入到暂存区
git commit -m "日志描述" ./           把这个文件夹下可以commit的，都commit到本地库
git push                push到远程库
```

#### git如何回滚？
https://blog.csdn.net/xinzhifu1/article/details/92770108
```
Git回滚代码到某个commit

回退命令：
git reset --hard HEAD^ 回退到上个版本

git reset --hard HEAD~3 回退到前3次提交之前，以此类推，回退到n次提交之前

git reset --hard commit_id 退到/进到，指定commit的哈希码（这次提交之前或之后的提交都会回滚）



回滚后提交可能会失败，必须强制提交

强推到远程：(可能需要解决对应分支的保护状态)
git push origin HEAD --force
```

### 面试官出题

#### 将str=`<div><p>内容</p></div>`转换成虚拟dom，考虑不符合html标签的情况
https://www.cnblogs.com/ztfjs/p/vue3.html
```
写在前面

　　一个好的架构需要经过血与火的历练，一个好的工程师需要经过无数项目的摧残。

　　昨天博主分析了一下在vue中，最为基础核心的api，parse函数，它的作用是将vue的模板字符串转换成ast，从而构建vnode，构建指令，实现virtual dom，然后在这基础之上实现双向绑定等。【vuejs深入二】vue源码解析之一，基础源码结构和htmlParse解析器

　　今天博主就来详细的实现一个拥有核心功能的htmlParse函数，看看它内部的实现逻辑，了解它是怎么样去解析一个vue模板的。

小目标

　　我们最终的目标是将html转换成ast对象，那么首先我们定一个小目标：

<div id="div1"></div>
　　我希望将上面的html解析成ast格式，类似于下面：

复制代码
{
  "tag":"div",
  "attrs":[
            {  "id":"div1" }
   ],
   "children":[],
   "type":1
}    
复制代码
       最终想要达成的第一个小目标是可以将div标签字符串输出成这样一个object格式，tag表示标签名称，attrs表示属性，children表示这个div所有的子节点，type的话表示节点的类型，我们今天只三个类型：

1.元素类型，也就是标签类型，所有用<tag attr=""></tag>这样的标签。2.变量text，现在我们实现一个{{text}}的变量转换，它其实是一个节点。3.普通文本，普通文本包括普通文字和空格、换行。

 

基本结构

　　基本结构的设计决定的代码能扩展多远，如果一开始结构设计错误，最后在新加入的功能无法嵌入的时候，那就只有重构一条路可以走了。

　　首先理清楚我们的思路。

　　匹配单个字符》匹配标签》匹配属性》匹配文本》匹配结束标签

　　然后，你想啊，html标签都是有开始，有结束的。那么这里问题就来了，可以想到的方式，解析一个标签的开始与结束吧，例如我们使用正则匹配开始标签<div id='div1'> 然后找到结束标签</div>,这样是不是就可以解析div里面的内容了？

       难。

      开始标签比较好找，结束标签就恶心了，例如 <div><div></div></div> ，，完了，怎么区分嵌套关系？第一个<div>到底匹配哪一个结束标签？

     这个思路是错的，很难。

　 那么我们换个思路，如果我们单个字符匹配呢，

　例如我们匹配一个 <div><div></div></div>,

   ok 脑补步骤

　1。匹配到 <   匹配到这个字符我就可以认为，后面的要么是开始标签，要么是结束标签。

    2。用正则匹配从<到后面的字符，如果是开始标签，现在记录一下，啊，我遇到了一个开始标签<div>  顺便用正则记录attrs

    3. 现在我们匹配走走走。。。走到<div></div></div>   

    4.又匹配到一个 < 老步骤啊。

    5.发现是开始标签，再次记录，啊，我又遇到一个开始标签  <div>  顺便用正则记录attrs

   6. 现在我们匹配走走走。。。走到</div></div>  

   7. 又匹配到一个 < 老步骤啊。

   8.发现是一个结束标签</div> ,嗯？结束标签！它是谁的结束标签？想一想。。。。。。应该是最后一个遇到的开始标签吧。  第一个遇到的结束标签不就是最后一个开始标签的结束么？

   9.啊，结束了一个。 

   10.再匹配，再完成。

    恩。。。思路清晰了有没有，来实现走一个：

复制代码
  //转化HTML至AST对象
  function parse(template){
    var currentParent; //当前父节点
    var root; //最终生成的AST对象
    var stack = []; //插入栈
    var startStack = []; //开始标签栈
    var endStack = [];  //结束标签栈
    //console.log(template);
    parseHTML(template,{
      start:function start(targetName,attrs,unary,start,end,type,text){//标签名 ，attrs，是否结束标签，文本开始位置，文本结束位置，type，文本，
        var element = {   //我们想要的对象
          tag:targetName,
          attrsList:attrs,
          parent:currentParent,  //需要记录父对象吧
          type:type,
          children:[]
        }
        if(!root){ //根节点哈
          root = element;
        }
        if(currentParent && !unary){ //有父节点并且不是结束标签？
          currentParent.children.push(element);  //插入到父节点去
          element.parent = currentParent;  //记录父节点
        }
        if (!unary) {  //不是结束标签？
            if(type == 1){
               currentParent = element;//不是结束标签，当前父节点就要切换到现在匹配到的这个开始标签哈，后面再匹配到
               startStack.push(element);  //推入开始标签栈
            }
             stack.push(element);  //推入总栈
         }else{
           endStack.push(element);  //推入结束标签栈
           currentParent = startStack[endStack.length-1].parent;   //结束啦吧当前父节点切到上一个开始标签，这能理解吧，当前这个已经结束啦
         }
         //console.log(stack,"currentstack")
      },
      end:function end(){

      },
      chars:function chars(){

      }
    });
    console.log(root,"root");
    return root;
  };
  /**
   * Not type-checking this file because it's mostly vendor code.
   */

  /*!
   * HTML Parser By John Resig (ejohn.org)
   * Modified by Juriy "kangax" Zaytsev
   * Original code by Erik Arvidsson, Mozilla Public License
   * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
   */

  // Regular Expressions for parsing tags and attributes
  var singleAttrIdentifier = /([^\s"'<>/=]+)/;
  var singleAttrAssign = /(?:=)/;
  var singleAttrValues = [
    // attr value double quotes
    /"([^"]*)"+/.source,
    // attr value, single quotes
    /'([^']*)'+/.source,
    // attr value, no quotes
    /([^\s"'=<>`]+)/.source
  ];
  var attribute = new RegExp(
    '^\\s*' + singleAttrIdentifier.source +
    '(?:\\s*(' + singleAttrAssign.source + ')' +
    '\\s*(?:' + singleAttrValues.join('|') + '))?'
  );
  // could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
  // but for Vue templates we can enforce a simple charset
  var ncname = '[a-zA-Z_][\\w\\-\\.]*';
  var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
  var startTagOpen = new RegExp('^<' + qnameCapture);
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
  var doctype = /^<!DOCTYPE [^>]+>/i;
  var comment = /^<!--/;
  var conditionalComment = /^<!\[/;

//偷懒哈  上面的正则是我在vue上拿下来的，这个后期可以研究，下面的话简单的写两个用用，和vue原版的是有一些差别的

    //{{变量}}

  var varText = new RegExp('{{' + ncname + '}}');
  //空格与换行符
  var space = /^\s/;
  var checline = /^[\r\n]/;
    /**
      type 1普通标签
      type 2代码
      type 3普通文本
    */
  function parseHTML(html,options){
    var stack = []; //内部也要有一个栈
    var index = 0;  //记录的是html当前找到那个索引啦
    var last; //用来比对，当这些条件都走完后，如果last==html 说明匹配不到啦，结束while循环
    var isUnaryTag = false;

    while(html){
      last = html;
      var textEnd = html.indexOf('<');
      if(textEnd === 0){ //这一步如果第一个字符是<那么就只有两种情况，1开始标签  2结束标签
        //结束标签
        var endTagMatch = html.match(endTag); //匹配
        if(endTagMatch){
          console.log(endTagMatch,"endTagMatch");
          isUnaryTag = true;
          var start = index;
          advance(endTagMatch[0].length); //匹配完要删除匹配到的，并且更新index，给下一次匹配做工作
          options.start(null,null,isUnaryTag,start,index,1);
          continue;
        }
        //初始标签
        var startMatch = parseStartTag();
        if(startMatch){
          parseStartHandler(startMatch);//封装处理下
          console.log(stack,"startMatch");
          continue;
        }
      }

      if(html === last){
        console.log(html,"html");
       break;
      }
    }
    function advance (n) {
      index += n;
      html = html.substring(n);
    }
    //处理起始标签 主要的作用是生成一个match 包含初始的attr标签
    function parseStartTag(){
      var start = html.match(startTagOpen);
      if(start){
        var match = {
           tagName: start[1],       // 标签名(div)
           attrs: [],               // 属性
           start: index             // 游标索引(初始为0)
       };
       advance(start[0].length);
       var end, attr;
       while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {//在endClose之前寻找attribute
           advance(attr[0].length);
           match.attrs.push(attr);
       }
       if (end) {
           advance(end[0].length);      // 标记结束位置
           match.end = index;      //这里的index 是在 parseHTML就定义 在advance里面相加
           return match         // 返回匹配对象 起始位置 结束位置 tagName attrs
       }

      }
    }
    //对match进行二次处理，生成对象推入栈
    function parseStartHandler(match){
      var _attrs = new Array(match.attrs.length);
      for(var i=0,len=_attrs.length;i<len;i++){  //这儿就是找attrs的代码哈
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || '';
        _attrs[i] = {
          name:args[1],
          value:value
        }
      }
      stack.push({tag: match.tagName,type:1, lowerCasedTag: match.tagName.toLowerCase(), attrs: _attrs}); //推栈
      options.start(match.tagName, _attrs,false, match.start, match.end,1);  //匹配开始标签结束啦。
    }

  }
复制代码
我们执行   parse("<div id='test1'><div></div></div>");  大功告成哈哈哈哈哈  呃。
```

#### 使用reduce将数组[1,2,3,4,5]变成[1,2,3,4,5,1,4,9,16,25]
```
[1,2,3,4,5].concat([1,2,3,4,5].reduce((prev,cur)=>[...prev, cur*cur], []))
```

#### 使用reduce将[{name:'张三',class:21},...]中class为'2年级1班'的学生选出来
```
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
```

#### module.exports,exports,export default,export const a的区别
https://www.cnblogs.com/chenyablog/p/9235699.html
```
首先我们要明白一个前提，CommonJS模块规范和ES6模块规范完全是两种不同的概念。

require: node 和 es6 都支持的引入
export / import : 只有es6 支持的导出引入
module.exports / exports: 只有 node 支持的导出
CommonJS模块规范

Node应用由模块组成，采用CommonJS模块规范。

根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

CommonJS规范，http://javascript.ruanyifeng.com/nodejs/module.html

ES6模块规范

不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。

ES6 Module 的语法，http://es6.ruanyifeng.com/#docs/module

node模块

Node里面的模块系统遵循的是CommonJS规范。
那问题又来了，什么是CommonJS规范呢？
由于js以前比较混乱，各写各的代码，没有一个模块的概念，而这个规范出来其实就是对模块的一个定义。

CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)
先解释 exports 和 module.exports
在一个node执行一个文件时，会给这个文件内生成一个 exports和module对象，
而module又有一个exports属性。他们之间的关系如下图，都指向一块{}内存区域。

1
exports = module.exports = {};


那下面我们来看看代码的吧。

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
//utils.js
let a = 100;
 
console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}
 
exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}
 
exports = '指向其他内存区'; //这里把exports的指向指走
 
//test.js
 
var a = require('/utils');
console.log(a) // 打印为 {a : 200}
从上面可以看出，其实require导出的内容是module.exports的指向的内存块内容，并不是exports的。
简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。
用白话讲就是，exports只辅助module.exports操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被require出去的内容还是module.exports的，真是好苦逼啊。

其实大家用内存块的概念去理解，就会很清楚了。

然后呢，为了避免糊涂，尽量都用 module.exports 导出，然后用require导入。

ES中的模块导出导入

说实话，在es中的模块，就非常清晰了。不过也有一些细节的东西需要搞清楚。
比如 export 和 export default，还有 导入的时候，import a from ..,import {a} from ..，总之也有点乱，那么下面我们就开始把它们捋清楚吧。

export 和 export default

首先我们讲这两个导出，下面我们讲讲它们的区别

1、export与export default均可用于导出常量、函数、文件、模块等
2、在一个文件或模块中，export、import可以有多个，export default仅有一个
3、通过export方式导出，在导入时要加{ }，export default则不需要
4、export能直接导出变量表达式，export default不行。
下面咱们看看代码去验证一下

testEs6Export.js

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
17
18
19
'use strict'
//导出变量
export const a = '100'; 
 
 //导出方法
export const dogSay = function(){
    console.log('wang wang');
}
 
 //导出方法第二种
function catSay(){
   console.log('miao miao');
}
export { catSay };
 
//export default导出
const m = 100;
export default m;
//export defult const m = 100;// 这里不能写这种格式。
index.js

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
17
18
19
20
21
22
23
24
//index.js
'use strict'
var express = require('express');
var router = express.Router();
 
import { dogSay, catSay } from './testEs6Export'; //导出了 export 方法
import m from './testEs6Export';  //导出了 export default
 
import * as testModule from './testEs6Export'; //as 集合成对象导出
 
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  dogSay();
  catSay();
  console.log(m);
  testModule.dogSay();
  console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
  console.log(testModule.default); // 100
  res.send('恭喜你，成功验证');
});
 
module.exports = router;
从上面可以看出，确实感觉 ES6的模块系统非常灵活的。
```

#### 分别用构造函数和class实现一个类，其中有属性name='张三'，方法sayHi()
https://www.cnblogs.com/yangdaren/p/10759868.html
```
class People{
  constructor(){
    this.name='张三'
  }
  sayHi(){
    console.log('hi')
  }
}

function People(){
  this.name='张三'
}
People.prototype.sayHi=function(){
  console.log('hi')
}
```