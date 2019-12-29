## 随便科技

### css

### 使用css，让一个div消失在视野中，发挥想象力 ？
```
让元素div消失在视野中
1.position:absolute/relative/fixed  +  方位 top/bottom/left/right: -9999px
2.display:none
3.visibility:hidden
4.width:0 + overflow:hidden
  height:0 +  overflow:hidden
5.margin-top/bottom/left/right:-9999px;
6.background-color:transparent
7.opacity:0
8.transform: translateX(-9999px)/translateY(-9999px)/translate(-9999px,-9999px)
9.transform: scale(0)
```

### 请说明z-index的工作原理，适用范围？
```
> CSS 中的z-index属性控制重叠元素的垂直叠加顺序。z-index只能影响position值不是static的元素。

没有定义z-index的值时，元素按照它们出现在 DOM 中的顺序堆叠（层级越低，出现位置越靠上）。非静态定位的元素（及其子元素）将始终覆盖静态定位（static）的元素，而不管 HTML 层次结构如何。

层叠上下文是包含一组图层的元素。在一组层叠上下文中，其子元素的z-index值是相对于该父元素而不是 document root 设置的。每个层叠上下文完全独立于它的兄弟元素。如果元素 B 位于元素 A 之上，则即使元素 A 的子元素 C 具有比元素 B 更高的z-index值，元素 C 也永远不会在元素 B 之上.

每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会在父层叠上下文中按顺序进行层叠。少数 CSS 属性会触发一个新的层叠上下文，例如opacity小于 1，filter不是none，transform不是none。
```

### 如何使一个div里面的文字垂直居中，且该文字的大小根据屏幕大小自适应？
```
display:table
display:table-cell
```

### 不考虑其它因素，下面哪种的渲染性能比较高？1、box a{}；2、a{}
```
一. CSS选择器性能是如何消耗的？
工作原理：浏览器利用CSS选择器来匹配文档元素。

工作流程：例如 #hd .nav > a { padding-left: 15px }

　　1.在文档所有元素中寻找所有的 a 标签。

　　2.在1的结果中寻找其父元素的类名为“.nav”的元素。

　　3.在2的结果中寻找其父辈元素的ID为“hd”的元素。

　　4.在3的结果中增加样式。

 

二. 分析怎么提升CSS选择器的性能?
在工作流程中可以看出有两个方面可以提升性能：寻找的效率和寻找的次数

效率：选择器的搜索个数，个数越少性能越好。

次数：选择器的层数，层数越少性能越好。

 
三. 提升CSS选择器性能的方式
方式一（减少搜索个数）：选择效率高的选择器，参考如下建议多用类选择器少用标签选择器。

CSS选择器搜索个数从少到多的排序：
　　id选择器（#myid）
　　类选择器（.myclassname）
　　标签选择器（div,h1,p）
　　相邻选择器（h1+p）
　　子选择器（ul > li）
　　后代选择器（li a）
　　通配符选择器（*）
　　属性选择器（a[rel="external"]）
　　伪类选择器（a:hover, li:nth-child）

 

方式二（减少层数）：使用BEM（block_element-modifier）的命名方式。

BEM：块（block）、元素（element）、修饰符（modifier）

例如：

　　.hd{}

　　.hd_nav{}

　　.hd_nav_a{}

　　.hd_nav_a-link{}

　　.hd_nav_a-visited{}

 

方式三（减少层数）：使用面向属性的命名方式。

面向属性：以“样式属性的功能”来给选择器命名。

例如：

　　.l{ float: left }

　　.tc{ text-align:center; }

　　.auto{ margin-left:auto; margin-right:auto; }
```

### js原生部分

#### setTimeout与setInterval在不同浏览器下的差异
```
（一）IE系列中的setTimeout

首先，我们看看微软出的DHTML参考手册中是如何说的：

setTimeout Method
    Evaluates an expression after a specified number of milliseconds has elapsed.

Syntax
    iTimerID = window.setTimeout(vCode, iMilliSeconds [, sLanguage])

Parameters
    vCode    Required. Variant that specifies the function pointer or string that indicates
             the code to be executed when the specified interval has elapsed.
    iMilliSeconds   Required. Integer that specifies the number of milliseconds.
    sLanguage       Optional. String that specifies one of the following values:
                     JScript Language is JScript.
                     VBScript Language is VBScript.
                     JavaScript Language is JavaScript.

MSDN上关于setTimeout的说明：
        http://msdn.microsoft.com/en-us/library/ms536753(VS.85).aspx

也就是说，setTimeout接收3个参数，第3个参数表示脚本语言的类型，如果你再传入更多的参数，是无意义的。
因此，在IE中，以下两种都是对的。
JavaScript code
?
1
2
3
        setTimeout('alert(1)', 50);
 
        setTimeout('msgbox "终止、重试、忽略，您看着办吧。", vbAbortRetryIgnore + vbDefaultButton2, "告诉您"', 50, 'VBScript');



（二）Mozilla系列中的setTimeout

我们看看Mozilla官方网站上 Gecko DOM Reference 手册中是如何说的：
window.setTimeout
    Summary
        Executes a code snippet or a function after specified delay.

    Syntax
        var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);
        var timeoutID = window.setTimeout(code, delay);

前两个参数都一样，没差别，从第三个参数就不同了。
因为目前只有IE浏览器支持多种语言的脚本，其它浏览器只支持js脚本所以不需要传语言类型的参数。
Mozilla把传给setTimeout的第3个以及更后面的更多参数依次的传给前面的func做为参数。
Firefox, Opera, Safari, Chrome等等也都是如此。

但是注意到，Mozilla上说了他家的setTimeout有一个叫做"Lateness" argument的BUG.
        "Lateness" argument
                Functions invoked by setTimeout are passed an extra "lateness" argument in Mozilla,
                i.e., the lateness of the timeout in milliseconds. (See bug 10637 and bug 394769.)
这就是开头那个例子中，Firefox(3.0)下有一个乌龙数字的根源。

Mozilla上关于setTimeout的说明：
        https://developer.mozilla.org/en/DOM/window.setTimeout

（三）其它浏览器系列(Opera, Safari, Chrome)中的setTimeout
    和Mozilla系列中的基本一样，但是没有Mozilla系列中的多一个参数的BUG.


武林外传：使用setTimeout的小技巧

    (1)IE中给setTimeout中的调用函数传参数
        上面的分析可知，IE是不支持在setTimeout中给被调用的函数传参数的，为了浏览器世界的和谐，我们可以把函数调用参数包裹进新的匿名函数中。示例：
            function f(a){
                alert(a);
            }
            // setTimeout(f,50,'hello'); //用于非IE
            setTimeout(function(){f('hello')},50); //通用
            var str='hello';
            setTimeout(function(){f(str)},50); //通用

    (2)this问题
        setTimeout调用的函数被执行时的上下文是全局，而不再是调用setTimeout方法时的上下文。所以，setTimeout的第一个参数的函数被执行时其this是指向window的，如果需要保留调用setTimeout方法时的this，就需要把当时的this传进去。示例：
            function Person(name){
                this.name=name;
                var f=function(){alert('My name is '+this.name)};

                // setTimeout(f,50); //错误

                var THIS=this;
                setTimeout(function(){f.apply(THIS)},50); //正确，通用
                setTimeout(function(){f.call(THIS)},50); //正确，通用
            }
            new Person('Jack');
```

#### alert()底层是如何实现的？
```
JS BOM api 中 alert 的实现
GUI 中模态窗口阻塞其他代码运行原理
一个个来说

第一个比较简单。
首先它是目标平台的包装函数，也就是非JS原生 API。

这需要调用JS 引擎的包装方法来作，也就是JS引擎（一般是C++ Lib）会给出一些用来把目标平台业务API（函数）包装为可使用JS语法调用的机制。
比如 Qt C++ 方法：
QScriptValue ScriptBinding::alert(QScriptContext *context, QScriptEngine *interpreter)
{
    ...
 
    QMessageBox messageBox;
    messageBox.information(NULL,
                           "App Message:",
                           message,
                           QMessageBox::Yes, QMessageBox::Yes);
 
    return QScriptValue::UndefinedValue;
}
这个方法实际上是调用了一个GUI模态窗口，实现基于 Qt 的 alert 提示。
然后使用JS 引擎相关方法把它包装到JS的全局对象中。
// 获取JS引擎
QScriptEngine engine = new QScriptEngine();
 
// 获取JS全局环境
globalObject = engine->globalObject();
QScriptValue nativeMathod;
 
// 引擎包装一个新方法，执行这个方法时候将调用 C++ 的alert函数
nativeMathod = engine->newFunction(ScriptBinding::alert);
 
// 把这个包装好的alert方法放到JS全局环境中
globalObject.setProperty("alert", nativeMathod, QScriptValue::ReadOnly | QScriptValue::Undeletable);
这样，C++ 实现的 alert 方法就被包装到 js 中。在js 全局调用 alert 就可以谈出对话框。

第二个比较复杂，不好用既有代码表述。

尽量简单的来描述下。
基于 GUI 的系统呢，其 UI 部分会有个 EventLoop（真不想用这个词儿……） 或者 MessageLoop 线程来收发消息。毕竟用户操作基本上是异步的，总得响应操作事件，这个不难理解吧。
如果，开启模态窗口后续操作禁止了，那么有几种可能性：
执行线程终止
执行线程被 sleep
无视MessageLoop（也就是不响应用户操作事件）
前两个可想而知，执行线程终止或sleep，那就啥都别干了，好比同步AJAX 锁死界面了。
第三个也是锁死界面，但是有缓。
为啥呢，起码 开启的 alert UI 可以自己内部开个消息线程来接替主消息循环接收用户输入响应就好了。
都知道的，消息线程其实就是个有条件退出的死循环。等用户点击确定啊，关闭啊，它就到达退出条件了，然后把主消息循环恢复，主界面又可以响应用户操作了，然后关闭（擦除）自身UI就好了。
这里有个小细节，就是模态窗口阻塞代码的事儿。这不是绝对的（这里说的是浏览器JS实现的模态）。
比如：
BX9015: setTimeout 和 setInteval 在各浏览器中被对话框阻塞的情况不同

细节上来说，这可能取决于alert内消息循环实现，这个 while(true) 是否处于主代码执行之前，还是另开了线程来异步循环的。
如：
主UI代码
....
alert() 
  内部 
  while(true){
    ....
  }
主 UI 后续代码
一旦如此实现，可见，在alert 的内部消息循环有条件退出前，主代码会被阻塞。
```

### 你有对 Vue 项目进行哪些优化？
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