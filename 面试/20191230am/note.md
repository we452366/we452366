## 藜麦

### 框架

#### 说一下你对MVVM的理解
```
- MVC：MVC模式可以这样理解，将html看成view;js看成controller，处理用户与应用的交互，响应对view的操作（对事件的监听），调用Model对数据进行操作，完成model与view的同步（根据model的改变，通过选择器对view进行操作）;将js的ajax当做Model，从服务器获取数据，MVC是单向的。
- MVVM：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变，MVVM是双向的。

Model–View–ViewModel （MVVM） 是一个软件架构设计模式，由微软 WPF 和 Silverlight 的架构师 Ken Cooper 和 Ted Peters 开发，是一种简化用户界面的事件驱动编程方式。由 John Gossman（同样也是 WPF 和 Silverlight 的架构师）于2005年在他的博客上发表

MVVM 源自于经典的 Model–View–Controller（MVC）模式 ，MVVM 的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率，MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。

（1）View 层

View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

（2）Model 层

Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

（3）ViewModel 层

ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。需要注意的是 ViewModel 所封装出来的数据模型包括视图的状态和行为两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。

MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层，前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了，我们开发者只需要处理和维护 ViewModel，更新数据视图就会自动得到相应更新。这样 View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。

我们以下通过一个 Vue 实例来说明 MVVM 的具体实现，有 Vue 开发经验的同学应该一目了然：

（1）View 层

<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
（2）ViewModel 层

var app = new Vue({
    el: '#app',
    data: {  // 用于描述视图状态
        message: 'Hello Vue!',
    },
    methods: {  // 用于描述视图行为
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;
        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                vm.message = res;
            }
        });
    }
})
（3） Model 层

{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}

```

#### 请你简述一下什么是虚拟dom
```
> Vue.js通过编译将模版转换成渲染函数(render)，执行渲染函数就可以得到一个虚拟DOM
简单点讲，在Vue的实现上，Vue讲模版编译成虚拟DOM渲染函数。结合Vue自带的响应系统，在状态改变时，Vue能够智能地计算出重新渲染组件的最小代价并应用到DOM操作上。

优点：

保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。
缺点:

无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
```

#### 请你简述一下vue的双向数据绑定原理
```
> 实现mvvm的双向绑定，是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化。
Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化。
其中，View 变化更新 Data ，可以通过事件监听的方式来实现，所以 Vue 的数据双向绑定的工作主要是如何根据 Data 变化更新 View。

Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
```

#### react的生命周期有哪些？
```
- componentWillMount(16.3即将废弃):在渲染之前执行，用于根组件中的 App 级配置。
- componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
- componentWillReceiveProps(16.3即将废弃)：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
- shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
- componentWillUpdate(16.3即将废弃)：在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行。
- componentDidUpdate：它主要用于更新DOM以响应props或state更改。
- componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。
- static getDerivedStateFromProps：用于将this.props转为this.state
- getSnapshotBeforeUpdate：在render之前调用，state已更新，获取render之前的dom状态
```

#### 有了解weex吗？请简述一下
https://www.jianshu.com/p/32285c709682
http://www.uml.org.cn/AJAX/201812283.asp
```
导语： 以前在开发Native页面的同时，还处理Hybrid页面中Web和Native的交互，现在又开始接入Weex这样的跨平台开发方案，感觉纯粹的Native App离我们越来越远（感慨一下）。Weex到怎么工作的，本文简单说一下。【想知道如何将Weex接入iOS项目，请看Weex 1：Weex接入iOS项目）】

一、Weex架构

Weex架构图.png
从Weex的架构图中可以看出

1、Weex首先将编写的Weex源码，也就是后缀名为.we，由<template>、<style> 和 <script>等标签组织好的内容，通过transformer（转换器，weex-toolkit 提供的工具）转换成JS Bundle。

2、然后将JS Bundle部署在服务器，当接收到终端（Web端、iOS端或Android端）的JS Bundle请求，将JS Bundle下发给终端。

3、在终端（Web端、iOS端或Android端）中，由Weex的JS Framework 接收和执行JS Bundle代码，并且执行数据绑定、模板编译等操作，然后输出JSON 格式的 Virtual DOM；JS Framework发送渲染指令给Native ，提供 callNative 和 callJS 接口，方便 JS Framework 和 Native 的通信。

说明：Weex源码转换成JS Bundle 、JS Framework 和Native渲染绝对是实现跨平台技术的关键（目前我是这么想的）。

二、Weex源码转换成JS Bundle
整体工作可以分为三个部分

1、转换 <template> 为 类JSON的树状数据结构, 转换数据绑定 为 返回数据的函数原型。#####

<foo a="{{x}}" b="1" />   -->   {type: "foo", attr: {a: function () {return this.x}, b: 1}}.
2、转换 <style> 为 类JSON的树状数据结构。

.classname {name: value;}  -->  { classname :  { name :  value } }.
3、 把上面两部分的内容和 <script> 中的内容结合成一个JavaScript AMD（AMD：异步模块规范） 模块。#####

下面是一个完整的例子

<template>
  <foo a="{{x}}" b="1" class="bar"></foo>
</template>

<style>
  .bar {width: 200; height: 200}
</style>

<script>
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
</script>
将转换为:

define('@weex-component/main', function () {
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
  module.template = {
    type: "foo",
    attr: {
      a: function () {return this.x},
      b: 1,
      classname: ['bar']
    }
  }
  module.style = {
    bar: {width: 200, height: 200}
  }
})
bootstrap('@weex-component/main')
说明1：除此之外,转换器还会做一些额外的事情: 合并Bundle ,添加引导函数，配置外部数据等等。

说明2：案例来自Weex的官方文档。当前大部分Weex工具最终输出的JS Bundle格式都经过了Webpack的二次处理，所以你实际使用工具输出的JS Bundle会和上面的有所区别。

三、JS Framework
1、JS Framework 简述#####

在初始化阶段被原生 JavaScript 引擎运行。它提供被每个JS Bundle调用的 define() 和 bootstrap() 函数。一旦JS Bundle从服务器下载后，这些函数就会执行. define() 函数以注册模块; bootstrap()会编译主要的模块为Virtual DOM，并发送渲染指令给Native 。就这样，同样的一份JSON 数据，在不同平台的渲染引擎中能够渲染成不同版本的 UI，这是 Weex 可以实现动态化的原因。

2、在Weex实例运行期间，Native和JS之间的相互调用的循环往复的调用会从Weex实例初始化持续到销毁#####

callNative 是一个由native代码实现的函数, 它被JS代码调用并向native发送指令,例如 rendering, networking, authorizing和其他客户端侧的 toast 等API。

JS调用Native.png
callJS 是一个由JS实现的函数, 它用于Native向JS发送指令. 目前这些指令由用户交互和Native的回调函数组成。

Native调用JS.png
四、Native渲染
1、Native 渲染引擎提供客户端组件（Component）和模块（Module）#####

组件（Component）：在屏幕内可见，有特定行为，能被配置不同的属性和样式，能响应用户交互，常见的组件有: <div>、<text>、 <image>。

模块（Module）： 是一组能被JS Framework调用的API. 其中的一些能以异步的方式调用JS Framework, 例如: 发送HTTP请求。

2、Weex 的渲染流程#####

Weex 的渲染流程如下图：


Weex渲染流程.png
从Weex 渲染流程图中，可以看到渲染分为：

输入：虚拟DOM

构造树结构. 分析虚拟DOM JSON数据以构造渲染树(RT).

添加样式. 为渲染树的各个节点添加样式.

创建视图. 为渲染树各个节点创建Native视图.

绑定事件. 为Native视图绑定事件.

CSS布局. 使用 css-layout 来计算各个视图的布局.

更新视窗(Frame). 采用上一步的计算结果来更新视窗中各个视图的最终布局位置.

输出：Native UI 页面
```

#### pwa和weex、rn以及flutter的对比
https://www.zhihu.com/question/53793715

#### h5页面怎么处理ios和Android的兼容性问题？
https://blog.csdn.net/qq_37504376/article/details/83958440
```
先说一下viewport

先上模板

<meta charset="utf-8">
<!--主要I是强制让文档的宽度与设备宽度保持1:1，最大宽度1.0，禁止屏幕缩放。-->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<!--这个也是iphone私有标签，允许全屏浏览。-->
<meta content="yes" name="apple-mobile-web-app-capable">
<!--iphone的私有标签，iphone顶端状态条的样式。-->
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<!--禁止数字自动识别为电话号码，这个比较有用，因为一串数字在iphone上会显示成蓝色，样式加成别的颜色也是不生效的。-->
<meta content="telephone=no" name="format-detection">
<!--禁止email识别-->
<meta content="email=no" name="format-detection">
写背景图时最好加上top left 或者0 0 不然写运动效果时容易出现跳
禁止复制、选中文本

.el {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
   user-select: none;
}
苹果手机固定定位有bug 检查html和body是不是设置了overflow-x:hidden;

给不同屏幕大小的手机设置特殊样式

@media only screen  and (min-device-width : 320px)  and (max-device-width : 375px){}
IOS中input键盘事件keyup、keydown、keypress支持不是很好, 用input监听键盘keyup事件，在安卓手机浏览器中是可以的，但是在ios手机浏览器中用输入法输入之后，并未立刻相应keyup事件，只有在通过删除之后才可以响应

方法：可以用html5的oninput事件去代替keyup

<input type="text" id="testInput">
<script type="text/javascript">
  document.getElementById('input').addEventListener('input', function(e){
    var value = e.target.value;
  });
</script>
ios 设置input 按钮样式会被默认样式覆盖

解决方式如下：

input,textarea {
  border: 0;
  -webkit-appearance: none;
}
消除 IE10 里面的那个叉号:input:-ms-clear{display:none;}

手机上的flex布局时会有兼容性问题，只用新版本的会出现安卓手机不识别的现象

flex布局对于低版本的安卓，不支持flex-wrap:wrap属性，但是ios系统支持换行属性，这个时候如何解决呢？当然是不使用换行，用其他方式代替。

.box{
    display: -webkit-box; 
    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
}
input 的placeholder属性会使文本位置偏上

line-height: （和input框的高度一样高）---pc端解决方法
line-height：normal ---移动端解决方法
input type=number之后，pc端出现上下箭头

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
实现android和ios系统手机打开相机并可选择相册功能

<input class="js_upFile cover1" type="file" name="cover" accept="image/*" capture="camera" multiple/>
 
 
$(function () {
    //获取浏览器的userAgent,并转化为小写
    var ua = navigator.userAgent.toLowerCase();
    //判断是否是苹果手机，是则是true
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    if (isIos) {
        $("input:file").removeAttr("capture");
    };
})
移动端 HTML5 audio autoplay 失效问题

这个不是 BUG，由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放。

解决方法思路：先通过用户 touchstart 触碰，触发播放并暂停（音频开始加载，后面用 JS 再操作就没问题了）。

解决代码：

document.addEventListener('touchstart',function() {
  document.getElementsByTagName('audio')[0].play();
  document.getElementsByTagName('audio')[0].pause();
});
移动端 video在部分android机播放之后浮在最上层，设置z-index无效

这个目前没有好的办法解决
情景一：页面有视频，点击页面按钮显示弹出层（比如让用户输入用户信息），这时候视频会出现在弹出层上面，是不是很-d疼？
方案：点击按钮时候把video隐藏hide，关闭弹出层show，过程中视频声音还在
情景二：页面很长，往下翻滚时，视频在播放，脱离文档流
方案：页面滚动到某一合适位置把video隐藏hide，回滚到某一位置show，过程中视频声音还在
有些说position可以解决，我没有试

关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格

this.value = this.value.replace(/\u2006/g,'');
关于 iOS 与 OS X 端字体的优化(横竖屏会出现字体加粗不一致等)

iOS 浏览器横屏时会重置字体大小，设置 text-size-adjust 为 none 可以解决 iOS 上的问题，但桌面版 Safari 的字体缩放功能会失效，因此最佳方案是将 text-size-adjust 为 100% 。

-webkit-text-size-adjust:100%;
-ms-text-size-adjust:100%;
text-size-adjust:100%;
移动端点击300ms延迟

原因：浏览器兴起初期，为了判断用户是双击还是单击，就设置了一个时间段300ms，用户单击后300ms后做事件处理，如果在300ms内连续点击，就判断为双击，做双击处理事件。
所以现在用click绑定事件呢，就会有300ms延迟的问题。
300ms尚可接受，不过因为300ms产生的问题，我们必须要解决。300ms导致用户体验并不是很好，解决这个问题，我们一般在移动端用tap事件来取代click事件。

推荐两个js，一个是fastclick，一个是tap.js

移动端点透问题

案例如下：

<div id="haorooms">点头事件测试</div>
<a href="www.baidu.net">www.baidu.com</a>
div是绝对定位的蒙层,并且z-index高于a。而a标签是页面中的一个链接，我们给div绑定tap事件：

$('#haorooms').on('tap',function(){
    $(this).hide();
});
我们点击蒙层时 div正常消失，但是当我们在a标签上点击蒙层时，发现a链接被触发，这就是所谓的点透事件。

原因：

touchstart 早于 touchend 早于click。 亦即click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏， 此时 click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上。
解决：

尽量都使用touch事件来替换click事件。例如用touchend事件(推荐)。
用fastclick，https://github.com/ftlabs/fastclick
用preventDefault阻止a标签的click
延迟一定的时间(300ms+)来处理事件 （不推荐）
以上一般都能解决，实在不行就换成click事件。
下面介绍一下touchend事件，如下：

$("#haorooms").on("touchend",function(event) {
   event.preventDefault();
 });
```
https://www.jianshu.com/p/cd46d59ddead
https://www.cnblogs.com/lzbk/p/6081988.html
```
1.在Android下滑动不流畅问题，这个滑动不流畅好像局限于局部的滚动，建议都写成 全局滚动，在css样式中加上：

 -webkit-overflow-scrolling: touch; 
解决流畅度。

2.ios下 下拉 上滑 会出现出界情况 浏览器自带黑色背景色，解决方案：

使用 scrollfix.js 组件 进行设置。引入后加入 所要滑动的id模块。

var scrollable1 = document.getElementById("talklist");

new ScrollFix(scrollable1);
给大家一个下载地址：链接: 百度网盘 密码: 5j8a。

3.在开发微信号时候 Android和ios下点击返回键  会直关闭页面 对用户交互效果很不好，所以要用js控制下返回键 返回到自己要去的页面：

window.addEventListener("popstate", function(e) {

location.replace(location.href);

}, false);

function pushHistory() {

    var state = {

        title: "title",

        url: "#"

    };

    window.history.pushState(state, "title", "#");

}

pushHistory();
粘贴到代码中 测试下 你会看到效果。

4.是图片填充到外层的框内，很好用，直接给图片添加样式。

object-fit: cover;

width:100%;

height:100%;
5.手机端按住不放 阻止浏览器默认响应事件 调试

//clikMenu 你要点击的事件节点

function touchendmovie(clikMenu){

var timeOutEvent = 0;

$(document).on('touchstart',clikMenu,function(e){

timeOutEvent = setTimeout(function(){

//这里编写你要执行的事件 },300);

//这里设置长按响应时间

e.preventDefault();

});

$(document).on('touchmove',clikMenu,function(e){

clearTimeout(timeOutEvent);

timeOutEvent = 0;

});

$(document).on('touchend',clikMenu,function(e){

e.stopPropagation();

if(timeOutEvent != 0 ){

console.log('这里是点击了一下'); }

clearTimeout(timeOutEvent); });

}
```

#### 请你简述一下服务器端渲染，为什么要服务器端渲染？
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

#### 要解决首屏加载慢的问题，在客户端有什么好的办法吗？
```
1.Vue-router懒加载
2.使用CDN加速
3. gzip压缩
4.异步加载组件
```

#### 什么是预渲染？它和服务端渲染以及客户端渲染有什么区别？
https://blog.csdn.net/huangjianfeng21/article/details/92421738
```
客户端渲染：用户访问 url，请求 html 文件，前端根据路由动态渲染页面内容。关键链路较长，有一定的白屏时间；

服务端渲染：用户访问 url，服务端根据访问路径请求所需数据，拼接成 html 字符串，返回给前端。前端接收到 html 时已有部分内容；

预渲染：构建阶段生成匹配预渲染路径的 html 文件（注意：每个需要预渲染的路由都有一个对应的 html）。构建出来的 html 文件已有部分内容

服务端渲染与预渲染共同点

针对单页应用，服务端渲染和预渲染共同解决的问题：

SEO：单页应用的网站内容是根据当前路径动态渲染的，html 文件中往往没有内容，网络爬虫不会等到页面脚本执行完再抓取；
弱网环境：当用户在一个弱环境中访问你的站点时，你会想要尽可能快的将内容呈现给他们。甚至是在 js 脚本被加载和解析前；
低版本浏览器：用户的浏览器可能不支持你使用的 js 特性，预渲染或服务端渲染能够让用户至少能够看到首屏的内容，而不是一个空白的网页。
预渲染能与服务端渲染一样提高 SEO 优化，但前者比后者需要更少的配置，实现成本低。弱网环境下，预渲染能更快地呈现页面内容，减少页面可见时间。

 

 

什么场景下不适合使用预渲染

个性化内容：对于路由是 /my-profile 的页面来说，预渲染就失效了。因为页面内容依据看它的人而显得不同；

经常变化的内容：如果你预渲染一个游戏排行榜，这个排行榜会随着新的玩家记录而更新，预渲染会让你的页面显示不正确直到脚本加载完成并替换成新的数据。这是一个不好的用户体验；

成千上万的路由：不建议预渲染非常多的路由，因为这会严重拖慢你的构建进程。

 

 

Prerender SPA Plugin

prerender-spa-plugin 是一个 webpack 插件用于在单页应用中预渲染静态 html 内容。因此，该插件限定了你的单页应用必须使用 webpack 构建，且它是框架无关的，无论你是使用 React 或 Vue 甚至不使用框架，都能用来进行预渲染。

prerender-spa-plugin 原理

那么 prerender-spa-plugin 是如何做到将运行时的 html 打包到文件中的呢？原理很简单，就是在 webpack 构建阶段的最后，在本地启动一个 phantomjs，访问配置了预渲染的路由，再将 phantomjs 中渲染的页面输出到 html 文件中，并建立路由对应的目录。



查看 prerender-spa-plugin 源码 prerender-spa-plugin/lib/phantom-page-render.js。

// 打开页面
page.open(url, function (status) {
  ...
  // 没有设置捕获钩子时，在脚本执行完捕获
  if (
    !options.captureAfterDocumentEvent &&
    !options.captureAfterElementExists &&
    !options.captureAfterTime
  ) {
    // 拼接 html
    var html = page.evaluate(function () {
      var doctype = new window.XMLSerializer().serializeToString(document.doctype)
      var outerHTML = document.documentElement.outerHTML
      return doctype + outerHTML
    })
    returnResult(html) // 捕获输出
  }
  ...
})
 

 

项目实例

该实列基于Vue.js 2.0 + vue-router，使用 vue-cli3.0 生成

安装

npm install prerender-spa-plugin --save
vue.config.js中增加

const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    // 生成文件的路径，也可以与webpakc打包的一致。
                    // 下面这句话非常重要！！！
                    // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                    staticDir: path.join(__dirname,'dist'),
                    // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                    routes: ['/', '/product','/about'],
                    // 这个很重要，如果没有配置这段，也不会进行预编译
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: false,
                        // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                        renderAfterDocumentEvent: 'render-event'
                    })
                }),
            ],
        };
    }
}
在main.js中增加

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
router.js 中设置mode: “history”

预渲染的单页应用路由需要使用 History 模式而不是 Hash 模式。原因很简单，Hash 不会带到服务器，路由信息会丢失。vue-router 启用 History 模式参考这里。

验证是否配置成功

运行npm run build，看一下生成的 dist 的目录里是不是有每个路由名称对应的文件夹。然后找个 目录里 的 index.html 用IDE打开，看文件内容里是否有该文件应该有的内容。有的话，就设置成功了

如果你想修改每个页面的meta 信息，这里推荐使用 vue-meta

首先生成一个项目并安装依赖，组件开发过程我们不关注，具体可以查看示例源代码。开发完成视图如下。
```

#### 你在项目中都做了哪些优化？
```
- 代码层面的优化：
    - v-if 和 v-show 区分使用场景
    - computed 和 watch 区分使用场景
    - v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
    - 长列表性能优化
    - 事件的销毁
    - 图片资源懒加载
    - 路由懒加载
    - 第三方插件的按需引入
    - 优化无限列表性能
    - 服务端渲染 SSR or 预渲染

- Webpack 层面的优化：
    - Webpack 对图片进行压缩
    - 减少 ES6 转为 ES5 的冗余代码
    - 提取公共代码
    - 模板预编译
    - 提取组件的 CSS
    - 优化 SourceMap
    - 构建结果输出分析
    - Vue 项目的编译优化

- 基础的 Web 技术的优化：
    - 开启 gzip 压缩
    - 使用Chrome Performance 查找性能瓶颈
    - 减少http请求，合理设置http缓存
    - 使用浏览器缓存
    - css sprites
    - lazyload images
    - css放最上部，js放最下面
    - 异步请求callback
    - 减少cookie传输
    - JavaScript代码优化：
        - dom：html colleciton、重绘
        - 慎用with
        - 避免使用eval和Function
        - 减少作用域链查找
        - 数据访问
        - 字符串拼接
    - css选择符优化
    - cdn加速
    - 反向代理
```

### 原生js

#### em和rem原理是什么？
https://blog.csdn.net/BobbleHat/article/details/88881393
```
原理

    在讲rem和em的原理之前我先讲一下微信是怎么实现类似的缩放效果到移动端，辅助大家理解，原生微信会将手机的宽度定义为750rpx（无论是什么手机、分辨率为多少）其实也就是相当于把手机的宽分为750个栅格，这样大家就好理解的多了，在讲文字或者图片之类的交互组件按着rpx来进行宽高的缩放，以达到移动端的自适应效果

    那么em和rem是怎么做到自适应的呢？其实在逻辑上两者的差别仅仅是参照的对象不同，em是参照父元素的字体大小，rem是参照根目录html的字体大小，他们的具体逻辑是这样的：

      假如用户显示器的分辨率的宽是1440，浏览器默认的font-size是16px（一般都是16）那么以16为此页面分辨率下的统一比例来计算其他组件的实际应该显示的宽度和高度，做个除法，1440 / 16px = 90，那么以此为统一比例的1rem就代表16px，90意思是整个页面宽度划分为90个rem，也就是说假如你要写一个宽度是32px的按钮，你也可以写成2rem。那这样有什么好处呢？我们再做个计算，假如此时用户换了1920的显示器，那么宽度就变成了1920px，此时我们只需按着rem比例反向除法就能算出在1920为宽的分辨率下应该呈现给用户的实际字体大小为 21.333333px

                                      1440 : 16    =    1920 : 21.3333

     这个比例就是针对屏幕进行自适应的关键，我们只需要改变初始字体大小为21.3333px就可以兼容1920分辨率的屏幕，通过计算可知，1440分辨率下的1rem=16px，而在1920分辨率下的1rem=21.333333px，刚刚用户在1440的分辨率下看到的32px的按钮，现在在1920分辨率下就会变为42.6666px大小，以此类推，在js里加上实时获取窗口innerWidth再通过计算得出该分辨率下初始字体大小，就可以实现自适应布局，得益于这个数字是针对屏幕分辨率和字体大小做比的，从而正面解决了布局自适应分辨率的问题

    其实大家看了上面的原理就能反应过来，rem实际上是把屏幕分成了  分辨率宽度/根字体大小  个栅格，这是个十分巧妙的办法，尤其适应类似文章页面文字较多的情况，而em其实是依据父元素的font-size，原理和rem是完全一样的，比较适合相对较局部的自适应问题

 

实现

    说了这么久怎么实现rem或者em布局呢，我上vue的代码举例：

<script>
 
fnResize()
    window.onresize = function () {
    fnResize()
}
 
function fnResize() {
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5*2) + 'px'
}
 
</script>
上面代码放到入口index.html下面之后就可以用rem啦

 

缺点

    自然这种布局方法也是有缺点的，因为对页面来说宽度是一般纠结的问题，所以rem通常是字体大小和页面宽度做比，但事实上以这种方式画出来的页面有个致命的漏洞，就是必须是同比例的屏幕才能完成自适应效果，一般屏幕都是16：9的，但是也同样有像我正在写着的这个mac就是16：10的，ipadpro是16：11的，一些古老的ThinkPad是4：3的，爱玩游戏的大佬会用21：9以上的带鱼屏。。。这就使得整个页面难以协调，所以针对不同的屏幕也可以做不同的优化
```

#### 前端发送异步请求的方式有几种？各有什么不同？
```
- 原生XHR
    - 本质：xhr=new XMLHttpRequest()
    - 优劣势：浏览器支持的原生技术，基于回调方式处理响应
- jQuery.ajax()
    - 本质：xhr的进一步封装
    - 优劣势：比原生要简单，基于回调方式处理响应
- Axios
    - 本质：xhr的进一步封装
    - 优劣势：比原生简单，基于Promise处理响应，可以排队、并发
- NG HttpClient
    - 本质：xhr的进一步封装
    - 优劣势：比原生简单，基于"观察者模式"处理响应，可以排队、并发、撤销
- Fetch
    - 本质：不再是xhr，是w3c提出的新技术，有望取代xhr
    - 优劣势：比xhr从根本上就更加先进，天然基于Promise，目前浏览器还有兼容性问题  
```

### Ajax和Fetch区别
```
- ajax是使用XMLHttpRequest对象发起的，但是用起来很麻烦，所以ES6新规范就有了fetch，fetch发一个请求不用像ajax那样写一大堆代码。
- 使用fetch无法取消一个请求，这是因为fetch基于Promise，而Promise无法做到这一点。
- 在默认情况下，fetch不会接受或者发送cookies
- fetch没有办法原生监测请求的进度，而XMLHttpRequest可以
- fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
- fetch由于是ES6规范，兼容性上比不上XMLHttpRequest
```

#### 请简述原生发送ajax请求四步
```
1.创建Ajax对象
    if(window.XMLHttpRequest){
        //创建Ajax对象 获取浏览器内部的一个XMLHttpRequest对象,创建该对象.(非IE6)
        var oAjax = new XMLHttpRequest();
    }else{
        //ie6使用的自几特殊的东西
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");             
    }

2.链接到服务器
    //open(方法,亟待读取文件名,异步传输)
    oAjax.open('GET','./a.txt',true);

3.发送请求
    //发送请求
    oAjax.send();

4.接受返回值
    //接收返回
    //0 （未初始化）还没有调用open方法
    //1 （载入）已经调用send（）方法，正在发送请求
    //2（载入完成）已收到全部响应内容
    //3（解析）正在解析响应内容
    //4（完成）响应内容解析完成，可以在客户端调用
    oAjax.onreadystatechange=function(){
        //oAjax.readyState浏览器和服务器的交互情况
        if(oAjax.readyState == 4)//读取完成
        {
            if(oAjax.status==200)//http状态码,用来判断是否成功接受并返回文件
            {
                alert(oAjax.status+" Success" +oAjax.responseText);//读取响应文件里面的TEXT
            }else{
                alert(oAjax.status+" NotFound");
            }
        }
    };
```

#### 请你简述一下axios的拦截器
https://segmentfault.com/a/1190000016980755
```
axios的拦截器是一个作用非常大，非常好用的东西。分为请求拦截器和响应拦截器两种。
我一般把拦截器写在main.js里。

1. 请求拦截器

请求拦截器的作用是在请求发送前进行一些操作，例如在每个请求体里加上token，统一做了处理如果以后要改也非常容易。

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    .......
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
2. 响应拦截器

响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页。

axios.interceptors.response.use(function (response) {
    // 在接收响应做些什么，例如跳转到登录页
    ......
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
3. 移除拦截器

var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
4. 为axios实例添加拦截器

var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
拦截器真的非常重要非常好用~
```

#### 请简述一下promise，常用的api有哪些？(发生错误怎么处理，race和all)
https://blog.csdn.net/songlf521/article/details/55670977
```
1、概念:Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

通俗讲，Promise是一个许诺、承诺,是对未来事情的承诺，承诺不一定能完成，但是无论是否能完成都会有一个结果。

Pending  正在做。。。

Resolved 完成这个承诺

Rejected 这个承诺没有完成，失败了

Promise 用来预定一个不一定能完成的任务，要么成功，要么失败

在具体的程序中具体的体现，通常用来封装一个异步任务，提供承诺结果

Promise 是异步编程的一种解决方案，主要用来解决回调地狱的问题，可以有效的减少回调嵌套。

2、特点:

(1)对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

(2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

3、缺点:

(1)无法取消Promise，一旦新建它就会立即执行，无法中途取消。和一般的对象不一样，无需调用。

(2)如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

(3)当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

4、基本的API(node服务器端测试promise.js)

const  fs = require('fs')  
// promise.js 文件
(1)new Promise

new Promise((resolve,reject)=>{
	
fs.readFile('./data/a.txt','utf8',(err,data)=>{
		if(err){
			reject(err)
		}
		resolve(data)
	})
})


(2)PromiseObj.then(resolveFn,rejectFn)

resolveFn：就是Promise对象成功的回调处理函数，指向 resolve

rejectFn：就是Promise对象失败的回调处理函数

new Promise((resolve,reject)=>{
	fs.readFile('./data/a.txt','utf8',(err,data)=>{
		if(err){
			return reject(err)
		}
		resolve(data)
	})
}).then((resolveData)=>{
	console.log(resolveData)   // './data/a.txt' 文件中的内容
},(rejectErr)=>{
 
})
/*除了第一个 then ，以后的所有的 then 都是上一个 then 中的返回结果
  then 接收到结果一共有三种情况：
   1. 上一个 then 没有返回值，则就是 undefined
   2. 上一个 then 有普通返回值：数组、数字、字符串、对象。。。
   3. 上一个 then 又返回了一个新的 Promise 对象
       如果是上一个 then 里面返回了一个 Promise 对象，
则这个 then 的回调处理函数就指向了上一个 then 中返回的 Promise 对象中的 resolve*/
new Promise((resolve,reject)=>{
	fs.readFile('./data/a.txt','utf8',(err,data)=>{
		if(err){
			return reject(err)
		}
		resolve(data)
	})
}).then((resolveData)=>{
	console.log(resolveData)   // './data/a.txt' 文件中的内容
},(rejectErr)=>{
 
}).then(data=>{
	console.log(data)  //undefined
	return [1,2,3]
}).then(data=>{
	console.log(data)  //[1,2,3]
         return new Promise((resolve,reject)=>{
fs.readFile('./data/a.txt','utf8',(err,data)=>{if(err){return reject(err)}resolve(data)})})}).then(data=>{console.log(data) // './data/a.txt' 文件中的内容})
(3)Promise.all()

Promise 构造函数有一个 all 方法all 方法需要接收一个数组作为参数数组中存储的多个 Promise 对象实例把多个 Promise 对象实例作为一个数组传递给 Promise.all([p1, p2, p3])然后可以通过 Promise.all() 的返回值：新的 Promise 对象再调用新的 Promise 对象的 then 方法拿结果同时 Promise.all 方法会等待所有的 异步任务执行结束了，然后将所有任务的执行结果都统一的放到一个数组中，然后传给自己的 then

function readFile(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}
 
Promise
  .all([readFile('./data/a.txt', 'utf8'), readFile('./data/b.txt', 'utf8'), readFile('./data/c.txt', 'utf8')])
  .then(data => {
    console.log(data)  // ['aaaa','bbbbb','cccccc'],每个元素是'./data/a.txt' ,'./data/b.txt','./data/c.txt' 
    //3个文件中的内容
  })
  .catch(err => {
    console.log(err)
  })
(4)PromiseObj.catch()

new Promise((resolve,reject)=>{
	reject('出错了')
})
.catch(err=>{
	console.log(err)  // 出错了
})
(5)PromiseObj.resolve()

将一个值，数字，字符串...转换为Promise对象

Promise.resolve(111)
.then(data=>{
	console.log(data) //111
})

(6)PromiseObj.reject()

Promise.reject('出错了')
.then(null,err=>{
	console.log(err)//出错了
})
// 等价于
new Promise((resolve,reject)=>{
	reject('出错了')
})
.then(null,err=>{
	console.log(err) //出错了
})
```

