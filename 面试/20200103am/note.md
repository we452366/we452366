## 新氧

### css

#### 请简述一下css选择器
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

#### position有几种？分别是什么？有什么区别？
```
经过定位的元素，其position属性值必然是relative、absolute、fixed或sticky。

- static：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

- relative：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。

- absolute：不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

- fixed：不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。

- sticky：盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 table 时），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。position: sticky 对 table 元素的效果与 position: relative 相同。
```

#### 请简述一下盒模型
```
- 盒模型：内容(content)、填充(padding)、边界(margin)、 边框(border)
- 类型： IE 盒子模型、标准 W3C 盒子模型；
- 两种盒模型的主要区别是:标准盒模型的宽高是值内容宽高(content) 
- 而IE盒模型的宽高是指content+padding+border。
- 设置盒模型的方式是：设置box-sizing box-sizing:content-box  标准盒模型， box-sizing:border-box IE盒模型
```

#### 你了解浮动吗？怎么清除浮动？
```
> 浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。

CSS 的clear属性通过使用left、right、both，让该元素向下移动（清除浮动）到浮动元素下面。

如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题。

有一种 hack 的方法，是自定义一个.clearfix类，利用伪元素选择器::after清除浮动。另外还有一些方法，比如添加空的<div></div>和设置浮动元素父元素的overflow属性。与这些方法不同的是，clearfix方法，只需要给父元素添加一个类，定义如下：

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
值得一提的是，把父元素属性设置为overflow: auto或overflow: hidden，会使其内部的子元素形成块格式化上下文（Block Formatting Context），并且父元素会扩张自己，使其能够包围它的子元素。
```

#### 如何简单的实现一个图片的文字绕排？
https://jingyan.baidu.com/article/219f4bf785b0d0de442d38e1.html
```
    p {border:1px solid red;}
    img {float:left; margin:0 5px 5px 0;}
```

#### 如何实现一个div水平垂直居中？
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

#### 行内元素如何居中？
```
一.水平居中　　

　　行内元素和块级元素不同,对于行内元素,只需在父元素中设置text-align=center即可;

　　对于块级元素有以下几种居中方式:　　

　　1.将元素放置在table中,再将table的margin-left和margin-right设置成auto,将table居中,使在其之中的块级元素叶居中,但是这种方式不符合语义化标签的规范;　　

　　2.将块级元素转换行内元素(通过设置display:inline)后再居中.这种方式使居中元素变成行内元素而致使无法设置宽高;　　

　　3.设置父元素float:left,position:relative,left:50%;子元素float:left,position:relative,left:-50%,利用相对布局的方式居中.上面三种方式各有优劣,依使用情景具体选择.

二.垂直居中　　

　　1.对于知道高度的元素可以设置上下padding相等;　　

　　2.设置line-height和height相等　　

　　3.利用vertical-align,但是这属性只在tr,td中适用,故可将元素放置入table中在居中
```

### 原生js

#### 请简述一下事件机制
```
事件流：分为捕获阶段、处于目标阶段、冒泡阶段三个阶段

事件冒泡：从触发的对象开始，事件不断往上传递。
事件捕获：从dom树一直向下传递事件直到捕获为止。
事件绑定类型

dom0：通过element对象调用对应的事件属性绑定特定的事件，事件会在事件冒泡阶段被捕获。
let btn = document.getElementById("myBtn");
btn.onclick = function(){// 由于onclick是attr，所以可以通过.来获取
    console.log(this.id);    //"myBtn"
};
1
2
3
4
dom2：通过addEventListener来绑定事件、removeEventListener来移除事件。指定第三个参数为false的话，事件也是在冒泡阶段被触发。IE9、Firefox、Safari、Chrome 和 Opera 支持 DOM2 级事件处理程序。
let btn = document.getElementById("myBtn");
btn.addEventListener('click', function(event){
	console.log(this.id);    //"myBtn"
},false);
btn.addEventListener("click", function(){// 添加多个回调,触发的时候依次调用
    alert("Hello world!");
}, false);
1
2
3
4
5
6
7
对于ie8之前的可以使用attachEvent添加事件、detachEvent解除事件。
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){// 事件类型必须是onclick，跟dom2不一样
    alert("Clicked");
});
1
2
3
4
三者的区别

1、dom2、attachEvent可以为一个事件添加多个相应函数，彼此之间不会覆盖。dom0则不可以。
2、dom0的兼容性好，支持所有的浏览器。dom2不支持ie浏览器，所以对于ie浏览器事件处理使用attachEvent。由于IE只支持冒泡事件，所以attachEvent没有第三个参数
3、dom0在注销事件的时候，只要将对应的事件属性置为null即可。dom2调用removeEventListener函数的时候，参数要与addEventListener一样，也就是说，在addEventListener指定的函数的回调不能是一个匿名函数，不然在注销不到。因为两个函数对象是不一样的，虽然内容一样。
var btn = document.getElementById("myBtn");
var handler = function(){// 必须将回调函数显示声明
	alert(this.id);
};
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler, false);// 将函数的引用传递进removeEventListener中才能注销回调
1
2
3
4
5
6
对于attachEvent回调函数中的this对象是window，dom0的回调函数是当前捕获事件的对象。
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
alert(this === window); //true
});
1
2
3
4
浏览器事件兼容性处理

var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
		} 
	},
	getEvent: function(event){
    	return event ? event : window.event;// ie中获取事件对象通过window.event
	},
	getTarget: function(event){
    	return event.target || event.srcElement;
	},
	preventDefault: function(event){
    	if (event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function(event){
		if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
		}
	}
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
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
事件对象

如果将回调函数直接绑定到目标对象上，那么this、target、currentTarget都是一样的，都是目标对象
var btn = document.getElementById(“myBtn”);
btn.onclick = function(event){
console.log(event.currentTarget === this);
console.log(event.target === this);
};
如果是绑定到父级元素上，那么this 和 currentTarget 都等于父级元素，也即是回调函数被绑定的对象，target才是真正触发的对象。
document.body.onclick = function(event) {
console.log(event.currentTarget === document.body); // true
console.log(this === document.body); // true
console.log(event.target === document.getElementById(“myBtn”));// true
};
document加载事件回调

DOMContentLoaded：在dom树加载完成之后被触发，不等待css、js、img等下载
onload：等待页面的内容都加载完毕之后被触发
```

#### 请简述一下dom代理机制
https://www.jianshu.com/p/80dc1bf495d6
```
前言

本文主要介绍：

DOM事件级别
DOM事件流
DOM事件模型
事件代理
Event对象常见的方法和属性
一、DOM事件级别

针对不同级别的DOM，我们的DOM事件处理方式也是不一样的。

DOM级别一共可以分为4个级别：DOM0级「通常把DOM1规范形成之前的叫做DOM0级」，DOM1级，DOM2级和 DOM3级，而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。如下图所示：


DOM级别与DOM事件.jpg
1.DOM 0级事件

在了解DOM0级事件之前，我们有必要先了解下HTML事件处理程序，也是最早的这一种的事件处理方式，代码如下：

<button type="button" onclick="fn" id="btn">点我试试</button>

<script>
    function fn() {
        alert('Hello World');
    }
</script>
那有一个问题来了，那就是fn要不要加括号呢？

在html的onclick属性中,使用时要加括号，在js的onclick中,给点击事件赋值,不加括号。为什么呢？我们通过事实来说话：

// fn不加括号
<button type="button" onclick="fn" id="btn">点我试试</button>

<script>
    function fn() {
        alert('Hello World');
    }
    console.log(document.getElementById('btn').onclick);
    // 打印的结果如下：这个函数里面包括着fn，点击之后并没有弹出1
    /*
    ƒ onclick(event) {
        fn
    }
    */
</script>

// fn 加括号，这里就不重复写上面代码，只需要修改一下上面即可
<button type="button" onclick="fn()"  id="btn">点我试试</button>
<script>
// 打印的结果如下：点击之后可以弹出1
/*
ƒ onclick(event) {
    fn()
}
*/
</script>
上面的代码我们通过直接在HTML代码当中定义了一个onclick的属性触发fn方法，这样的事件处理程序最大的缺点就是HTML与JS强耦合，当我们一旦需要修改函数名就得修改两个地方。当然其优点就是不需要操作DOM来完成事件的绑定。

DOM0事件绑定，给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的。

那我们如何实现HTML与JS低耦合？这样就有DOM0级处理事件的出现解决这个问题。DOM0级事件就是将一个函数赋值给一个事件处理属性，比如：

<button id="btn" type="button"></button>

<script>
    var btn = document.getElementById('btn');
    
    btn.onclick = function() {
        alert('Hello World');
    }
    
    // btn.onclick = null; 解绑事件 
</script>
上面的代码我们给button定义了一个id，然后通过JS获取到了这个id的按钮，并将一个函数赋值给了一个事件处理属性onclick，这样的方法便是DOM0级处理事件的体现。我们可以通过给事件处理属性赋值null来解绑事件。DOM 0级的事件处理的步骤：先找到DOM节点，然后把处理函数赋值给该节点对象的事件属性。

DOM0级事件处理程序的缺点在于一个处理程序「事件」无法同时绑定多个处理函数，比如我还想在按钮点击事件上加上另外一个函数。

var btn = document.getElementById('btn');
    
btn.onclick = function() {
    alert('Hello World');
}
btn.onclick = function() {
    alert('没想到吧，我执行了，哈哈哈');
}
2.DOM2级事件

DOM2级事件在DOM0级事件的基础上弥补了一个处理程序无法同时绑定多个处理函数的缺点，允许给一个处理程序添加多个处理函数。也就是说，使用DOM2事件可以随意添加多个处理函数，移除DOM2事件要用removeEventListener。代码如下：

<button type="button" id="btn">点我试试</button>

<script>
    var btn = document.getElementById('btn');

    function fn() {
        alert('Hello World');
    }
    btn.addEventListener('click', fn, false);
    // 解绑事件，代码如下
    // btn.removeEventListener('click', fn, false);  
</script>
DOM2级事件定义了addEventListener和removeEventListener两个方法，分别用来绑定和解绑事件

target.addEventListener(type, listener[, useCapture]);
target.removeEventListener(type, listener[, useCapture]);
/*
    方法中包含3个参数，分别是绑定的事件处理属性名称（不包含on）、事件处理函数、是否在捕获时执行事件处理函数（关于事件冒泡和事件捕获下面会介绍）
*/
注：

IE8级以下版本不支持addEventListener和removeEventListener，需要用attachEvent和detachEvent来实现：

// IE8级以下版本只支持冒泡型事件,不支持事件捕获所以没有第三个参数
// 方法中包含2个参数，分别是绑定的事件处理属性名称（不包含on）、事件处理函数
btn.attachEvent('onclick', fn); // 绑定事件 
btn.detachEvent('onclick', fn); // 解绑事件 
3.DOM3级事件

DOM3级事件在DOM2级事件的基础上添加了更多的事件类型，全部类型如下：

UI事件，当用户与页面上的元素交互时触发，如：load、scroll
焦点事件，当元素获得或失去焦点时触发，如：blur、focus
鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
文本事件，当在文档中输入文本时触发，如：textInput
键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
同时DOM3级事件也允许使用者自定义一些事件。

DOM事件级别的发展使得事件处理更加完整丰富，而下一个问题就是之前提到的DOM事件模型。「事件冒泡和事件捕获」

二、DOM事件流

为什么是有事件流？

假如在一个button上注册了一个click事件，又在其它父元素div上注册了一个click事件，那么当我们点击button，是先触发父元素上的事件，还是button上的事件呢，这就需要一种约定去规范事件的执行顺序，就是事件执行的流程。

浏览器在发展的过程中出现了两种不同的规范

IE9以下的IE浏览器使用的是事件冒泡，先从具体的接收元素，然后逐步向上传播到不具体的元素。
Netscapte采用的是事件捕获，先由不具体的元素接收事件，最具体的节点最后才接收到事件。
而W3C制定的Web标准中，是同时采用了两种方案，事件捕获和事件冒泡都可以。
三、DOM事件模型

DOM事件模型分为捕获和冒泡。一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

（1）捕获阶段：事件从window对象自上而下向目标节点传播的阶段；

（2）目标阶段：真正的目标节点正在处理事件的阶段；

（3）冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。

上文中讲到了addEventListener的第三个参数为指定事件是否在捕获或冒泡阶段执行，设置为true表示事件在捕获阶段执行，而设置为false表示事件在冒泡阶段执行。那么什么是事件冒泡和事件捕获呢？可以用下图来解释：


事件冒泡与事件捕获.jpg
1.事件捕获

捕获是从上到下，事件先从window对象，然后再到document（对象），然后是html标签（通过document.documentElement获取html标签），然后是body标签（通过document.body获取body标签），然后按照普通的html结构一层一层往下传，最后到达目标元素。我们只需要将addEventListener的第三个参数改为true就可以实现事件捕获。代码如下：

<!-- CSS 代码 -->
<style>
    body{margin: 0;}
    div{border: 1px solid #000;}
    #grandfather1{width: 200px;height: 200px;}
    #parent1{width: 100px;height: 100px;margin: 0 auto;}
    #child1{width: 50px;height: 50px;margin: 0 auto;}
</style>

<!-- HTML 代码 -->
<div id="grandfather1">
    爷爷
    <div id="parent1">
        父亲
        <div id="child1">儿子</div>
    </div>
</div>

<!-- JS 代码 -->
<script>
    var grandfather1 = document.getElementById('grandfather1'),
        parent1 = document.getElementById('parent1'),
        child1 = document.getElementById('child1');
    
    grandfather1.addEventListener('click',function fn1(){
        console.log('爷爷');
    },true)
    parent1.addEventListener('click',function fn1(){
        console.log('爸爸');
    },true)
    child1.addEventListener('click',function fn1(){
        console.log('儿子');
    },true)

    /*
        当我点击儿子的时候，我是否点击了父亲和爷爷
        当我点击儿子的时候，三个函数是否调用
    */
    // 请问fn1 fn2 fn3 的执行顺序？
    // fn1 fn2 fn3 or fn3 fn2 fn1  
</script>
先来看结果吧：


事件捕获例子.png
当我们点击id为child1的div标签时，打印的结果是爷爷 => 爸爸 => 儿子，结果正好与事件冒泡相反。

2.事件冒泡

所谓事件冒泡就是事件像泡泡一样从最开始生成的地方一层一层往上冒。我们只需要将addEventListener的第三个参数改为false就可以实现事件冒泡。代码如下：

//html、css代码同上，js代码只是修改一下而已
var grandfather1 = document.getElementById('grandfather1'),
    parent1 = document.getElementById('parent1'),
    child1 = document.getElementById('child1');

grandfather1.addEventListener('click',function fn1(){
    console.log('爷爷');
},false)
parent1.addEventListener('click',function fn1(){
    console.log('爸爸');
},false)
child1.addEventListener('click',function fn1(){
    console.log('儿子');
},false)

/*
   当我点击儿子的时候，我是否点击了父亲和爷爷
   当我点击儿子的时候，三个函数是否调用
*/
// 请问fn1 fn2 fn3 的执行顺序？
// fn1 fn2 fn3 or fn3 fn2 fn1  
先来看结果吧：


事件冒泡例子.png
比如上图中id为child1的div标签为事件目标，点击之后后同时也会触发父级上的点击事件，一层一层向上直至最外层的html或document。

注：当第三个参数为false或者为空的时候，代表在冒泡阶段绑定。

四、事件代理(事件委托)

1.事件代理含义和为什么要优化？

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个宿舍同学；

在这里，取快递就是一个事件，每个同学指的是需要响应事件的 DOM 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。
那么利用事件冒泡或捕获的机制，我们可以对事件绑定做一些优化。
在JS中，如果我们注册的事件越来越多，页面的性能就越来越差，因为：

函数是对象，会占用内存，内存中的对象越多，浏览器性能越差
注册的事件一般都会指定DOM元素，事件越多，导致DOM元素访问次数越多，会延迟页面交互就绪时间。
删除子元素的时候不用考虑删除绑定事件
2.优点

减少内存消耗，提高性能
假设有一个列表，列表之中有大量的列表项，我们需要在点击每个列表项的时候响应一个事件

// 例4
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的，效率上需要消耗很多性能。借助事件代理，我们只需要给父容器ul绑定方法即可，这样不管点击的是哪一个后代元素，都会根据冒泡传播的传递机制，把容器的click行为触发，然后把对应的方法执行，根据事件源，我们可以知道点击的是谁，从而完成不同的事。

动态绑定事件
在很多时候，我们需要通过用户操作动态的增删列表项元素，如果一开始给每个子元素绑定事件，那么在列表发生变化时，就需要重新给新增的元素绑定事件，给即将删去的元素解绑事件，如果用事件代理就会省去很多这样麻烦。

2.如何实现

接下来我们来实现上例中父层元素 #list 下的 li 元素的事件委托到它的父层元素上：


<ul id="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>

<script>
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'li') {
        console.log('the content is: ', target.innerHTML);
    }
});
</script>
这是常规的实现事件委托的方法，但是这种方法有BUG，当监听的元素里存在子元素时，那么我们点击这个子元素事件会失效，所以我们可以联系文章上一小节说到的冒泡事件传播机制来解决这个bug。改进的事件委托代码：

<ul id="list">
    <li>1 <span>aaaaa</span></li>
    <li>2 <span>aaaaa</span></li>
    <li>3 <span>aaaaa</span></li>
    <li>4</li>
</ul>

<script>


// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    /* 从target（点击）元素向上找currentTarget（监听）元素，
    找到了想委托的元素就触发事件，没找到就返回null */
    while(target.tagName !== 'LI'){
    
        if(target.tagName === 'UL'){
            target = null
            break;
        }
        target = target.parentNode
    }
    if (target) {
    console.log('你点击了ul里的li')
    }
});
五、Event对象常见的方法和属性

1.event. preventDefault()

如果调用这个方法，默认事件行为将不再触发。什么是默认事件呢？例如表单一点击提交按钮(submit)刷新页面、a标签默认页面跳转或是锚点定位等。

使用场景1：使用a标签仅仅是想当做一个普通的按钮，点击实现一个功能，不想页面跳转，也不想锚点定位。

方法一

<a href="javascript:;">链接</a>
方法二

使用JS方法来阻止，给其click事件绑定方法，当我们点击A标签的时候，先触发click事件，其次才会执行自己的默认行为

<a id="test" href="http://www.google.com">链接</a>
<script>
    test.onclick = function(e){
        e = e || window.event;
        return false;
    }
</script>
方法三

<a id="test" href="http://www.google.com">链接</a>
<script>
    test.onclick = function(e){
        e = e || window.event;
        e.preventDefault();
    }
</script>
使用场景2：输入框最多只能输入六个字符，如何实现？

实现代码如下：

<input type="text" id='tempInp'>
<script>
    tempInp.onkeydown = function(ev) {
        ev = ev || window.event;
        let val = this.value.trim() //trim去除字符串首位空格（不兼容）
        // this.value=this.value.replace(/^ +| +$/g,'') 兼容写法
        let len = val.length
        if (len >= 6) {
            this.value = val.substr(0, 6);
            //阻止默认行为去除特殊按键（DELETE\BACK-SPACE\方向键...）
            let code = ev.which || ev.keyCode;
            if (!/^(46|8|37|38|39|40)$/.test(code)) {
                ev.preventDefault()
            }
        }
    }
</script>
2.event.stopPropagation() & event.stopImmediatePropagation()

event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。demo代码如下：

// 在事件冒泡demo代码的基础上修改一下
child1.addEventListener('click',function fn1(e){
    console.log('儿子');
    e.stopPropagation()
},false)
stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果。我们来看个例子：

<button id="btn">点我试试</button>
<script>
const btn = document.querySelector('#btn');
btn.addEventListener('click', event => {
  console.log('btn click 1');
  event.stopImmediatePropagation();
});
btn.addEventListener('click', event => {
  console.log('btn click 2');
});
document.body.addEventListener('click', () => {
  console.log('body click');
});
</script>
根据打印出来的结果，我们发现使用 stopImmediatePropagation后，点击按钮时，不仅body绑定事件不会触发，与此同时按钮的另一个点击事件也不触发。

3.event.target & event.currentTarget


event.png
从上面这张图片中我们可以看到，event.target指向引起触发事件的元素，而event.currentTarget则是事件绑定的元素。

总结

因此不必记什么时候e.currentTarget和e.target相等，什么时候不等，理解两者的究竟指向的是谁即可。

e.target 指向触发事件监听的对象「事件的真正发出者」。
e.currentTarget 指向添加监听事件的对象「监听事件者」。
```

#### 你都知道哪些跨域方式？请简述
```
- cors
服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

- jsonp
var script = document.createElement('script');  
script.src = "http://aa.xx.com/js/*.js";  
document.body.appendChild(script);

- postMessage
window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。

- window.name

- location.hash

- http-proxy

- nginx

- websocket

- iframe
基于iframe实现的跨域要求两个域具有aa.xx.com,bb.xx.com这种特点，也就是两个页面必须属于同一个顶级基础域（例如都是xxx.com，或是xxx.com.cn），使用同一协议（例如都是 http）和同一端口（例如都是80），这样在两个页面中同时添加document.domain，就可以实现父页面调用子页面的函数
```

#### 浏览器缓存有哪些？
```
- DNS缓存
主要就是在浏览器本地把对应的 IP 和域名关联起来，这样在进行DNS解析的时候就很快。

- MemoryCache
是指存在内存中的缓存。从优先级上来说，它是浏览器最先尝试去命中的一种缓存。从效率上来说，它是响应速度最快的一种缓存。内存缓存是快的，也是“短命”的。它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

- 浏览器缓存
浏览器缓存，也称Http缓存，分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。
    - 强缓存:强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。
    
    实现强缓存，过去我们一直用expires。当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段。像这样
    
    expires: Wed, 12 Sep 2019 06:12:18 GMT
    
    可以看到，expires 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。
    
    从这样的描述中大家也不难猜测，expires 是有问题的，它最大的问题在于对“本地时间”的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。
    
    考虑到 expires 的局限性，HTTP1.1 新增了Cache-Control字段来完成 expires 的任务。expires 能做的事情，Cache-Control 都能做；expires 完成不了的事情，Cache-Control 也能做。因此，Cache-Control 可以视作是 expires 的完全替代方案。在当下的前端实践里，我们继续使用 expires 的唯一目的就是向下兼容。

    cache-control: max-age=31536000

    在 Cache-Control 中，我们通过max-age来控制资源的有效期。max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

    Cache-Control 相对于 expires 更加准确，它的优先级也更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache-Control 为准。

    - 协商缓存:协商缓存依赖于服务端与浏览器之间的通信。协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端提示缓存资源未改动（Not Modified），资源会被重定向到浏览器缓存，这种情况下网络请求对应的状态码是 304。
    
    协商缓存的实现,从 Last-Modified 到 Etag,Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：

    Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT

    随后我们每次请求时，会带上一个叫 If-Modified-Since 的时间戳字段，它的值正是上一次 response 返回给它的 last-modified 值：

    If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT

    服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 Response Headers 中添加新的 Last-Modified 值；否则，返回如上图的 304 响应，Response Headers 不会再添加 Last-Modified 字段。

    使用 Last-Modified 存在一些弊端，这其中最常见的就是这样两个场景：

    我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。

    当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了。

    这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，Etag 作为 Last-Modified 的补充出现了。

    Etag 是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串可以是基于文件内容编码的，只要文件内容不同，它们对应的 Etag 就是不同的，反之亦然。因此 Etag 能够精准地感知文件的变化。

    Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能，这是它的弊端。因此启用 Etag 需要我们审时度势。正如我们刚刚所提到的——Etag 并不能替代 Last-Modified，它只能作为 Last-Modified 的补充和强化存在。

    Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。

- Service Worker Cache
Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，因此无法直接访问 DOM。这样独立的个性使得 Service Worker 的“个人行为”无法干扰页面的性能，这个“幕后工作者”可以帮我们实现离线缓存、消息推送和网络代理等功能。我们借助 Service worker 实现的离线缓存就称为 Service Worker Cache。

Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件.

- Push Cache
Push Cache 是指 HTTP2 在 server push 阶段存在的缓存。这块的知识比较新，应用也还处于萌芽阶段，应用范围有限不代表不重要——HTTP2 是趋势、是未来。在它还未被推而广之的此时此刻，我仍希望大家能对 Push Cache 的关键特性有所了解：
    - Push Cache 是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache。
    - Push Cache 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。
    - 不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。
```

#### H5新特性有哪些？
```
- 增强了图形渲染(canvas)
- 影音(video,audio)
- 数据存储(sessionStorage/localStorage)
- 语义化更好的元素，比如article、footer、header、nav、section
- 表单控件，calendar、date、time、email、url、search
- 新的技术，webworker(专用线程)、websocket(全双工通信)、Geolocation地理定位
```

#### 请你简述一下你都知道哪些浏览器端存储方式？
```
（1）Local Storage

（2）Session Storage

（3）IndexedDB

（4）Web SQL

（5）Cookie
```

#### sessionStorage和localStorage的区别是什么？请详述
```
- 相同点：都存储在客户端
- 不同点：
    - 存储大小：
        - cookie数据大小不能超过4k
        - sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大的多，可以达到5M或更大，就是为了解决cookie存储空间不足而诞生的
    - 有限时间：
        - localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
        - sessionStorage数据在当前浏览器窗口关闭后自动删除
        - cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
    - 数据域服务器之间的交互方式
        - cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
        - sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
```

#### 知道闭包吗？它有什么作用？
```
- 闭包是函数和声明该函数的词法环境的组合。(MDN定义)
A clousure is the combination of a function and the lexical environment within which that function was declared.
注：离散数学中是对集合间关系的一种描述
- ECMAScript支持闭包，因而js中的闭包表现为：外层函数调用后，外层函数变量被内层函数对象的[[scope]]引用着而导致外层函数的作用域对象AO无法释放(垃圾回收));
- js中闭包常见作用：<1>.实现共有变量，如：函数累加器;<2>.可以做缓存(存储结构);<3>.属性私有化;<4>.模块化开发，防止污染全局变量
- js闭包的缺点：比普通函数占有更多内存(多的是外层函数作用域对象AO始终存在),容易造成内存泄漏
```

#### 请简述一下声明提前(出题测试)
function 123
```
    function fun(a){
        alert(a);
        var a='123';
        function a(){
            alert(a);
        };
        alert(a)
    }
    fun(null);
```
```
js在执行的时候，是从上到下，从左到右，一行一行执行的，但是不知道在这之前还要做一些事情，js程序在正式执行之前，会将所有var声明的变量和function声明的函数，预读到所在作用域的顶部，但是对var 声明只是将声明提前，赋值仍然保留在原位置，function声明，会将函数名称和函数体都提前，而且先预声明变量再预定义函数。这个过程也被叫做，“预解析”或者“预编译”。

举例：（1）

console.log(a);      //不会出错，会输出undefined

var a=100;

console.log(a);     //100;
由于声明提前，所以代码会变成这样

var a; //声明提前

console.log(a);    //undefined

a=100;                //赋值任然留在原位置

console.log(a);    //100
注意1：声明提前仅能将声明提前到所在作用域的顶部

（2）

function  fn(){

console.log(a);    //undefined

var  a=100;   

console.log(a);    //100      };

fn();

console.log(a);    //  报引用错误！
上面的代码  其实会变成这样

function  fn(){

var  a;//仅仅提前到函数顶部

console.log(a);     //undefined

a=100;   

console.log(a);    //100    };

fn();

console.log(a);    //报引用错误
注意2：函数声明提前不同于var 变量声明提前，使用函数声明语句，函数名称和函数体均会被提前，也就是说可以在声明一个JavaScript函数之前调用它。

举个例子：

console.log(fn());     //2

function  fn(){

return2;  

}
（3）

练习题1

var  a=123;

function  a(){

return1    }

console.log(a);
解析1：这道题在弄明白什么是 “声明提前”后比较简单做！按照刚才讲到的概念，这道题会变成这样

var  a;

function  a() {

return  1    }

a=123;

console.log(a);
所以最后会输出  123



练习题2

function  a(){

return  1    };

var  a;

a();
解析2：完成这道题，还需要知道一件事情，如果未在var声明语句中给变量指定初始值，那么虽然声明这个变量，但在给它存入一个值之前，它的初始值就是undefined，但是多次声明同一变量无所谓！！！所以这道题的结果是 1，代码会预编译为：

var  a;    //初始值为undefined

function  a(){

    return1    };

a();
练习题3

function a(){

    return  1;  }

var  a=undefined;

a();
解析3：这道题，和第2题非常的相似，只需要明白这里 var a=undefined; 和 var a;是不同的，一个是声明变量同时进行赋值操作，只是赋的值是undefined，一个是单纯的声明变量。代码会预编译为：

var  a;     //初始值为undefined

function  a(){

return1   };

a=undefined;

a();
所以最后的结果会报错  a is not a function

练习题4

if( !("a"  in  window) ) {

var  a =1;    };

var  a;

alert(a);
解析4：首先说一句，在浏览器中，var声明的全局变量是属于window对象的属性。也就是说可以用  . 或者[ ]显示出来（window.变量名  或者  window[“变量名”]）。

in 运算符  是判断对象是否为数组/对象的元素/属性：

格式：（变量 in 对象）

注意：

当“对象”为数组时，“变量”指的是数组的“索引”；

当“对象”为对象时，“变量”指的是对象的“属性”；

这道题也就是再说，如果 window里没有属性a，就声明一个变量a，然后赋值为1，最后弹出一个警告框显示a，当我们把这些概念弄清楚，会发现这道题其实是这样的，

var  a;

if( !("a"  in  window) ) {

a =1;    };

alert(a);
这样看，我们能很清楚的看明白，在执行if语句之前，是已经声明了变量a的，它的初始值是undefined，所以window里是有属性a的，那么if语句执行的条件就不满足，无法对变量a进行赋值，所以最后也会弹出undefined。
```

#### 请你简述一下原型和原型链(出题测试)
```
    let obj={a:"123"}
    // 这个对象上都有什么？
    a: "123"
    __proto__:
    constructor: ƒ Object()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    hasOwnProperty: ƒ hasOwnProperty()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    toLocaleString: ƒ toLocaleString()
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__()
```
```
```
> 什么是原型链：只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被称为原型链
所有的实例有一个内部指针(prototype)，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。
```
```

### MVVM和MVC的区别？
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

#### 如何用git进行分支管理？
```
GitFlow可以用来管理分支。GitFlow工作流中常用的分支有下面几类：
- master分支：最为稳定功能比较完整的随时可发布的代码，即代码开发完成，经过测试，没有明显的bug，才能合并到 master 中。请注意永远不要在 master 分支上直接开发和提交代码，以确保 master 上的代码一直可用；
- develop分支；用作平时开发的主分支，并一直存在，永远是功能最新最全的分支，包含所有要发布 到下一个 release 的代码，主要用于合并其他分支，比如 feature 分支； 如果修改代码，新建 feature 分支修改完再合并到 develop 分支。所有的 feature、release 分支都是从 develop 分支上拉的。
- feature分支；这个分支主要是用来开发新的功能，一旦开发完成，通过测试没问题（这个测试，测试新功能没问题），我们合并回develop 分支进入下一个 release
- release分支；用于发布准备的专门分支。当开发进行到一定程度，或者说快到了既定的发布日，可以发布时，建立一个 release 分支并指定版本号(可以在 finish 的时候添加)。开发人员可以对 release 分支上的代码进行集中测试和修改bug。（这个测试，测试新功能与已有的功能是否有冲突，兼容性）全部完成经过测试没有问题后，将 release 分支上的代码合并到 master 分支和 develop 分支
- hotfix分支；用于修复线上代码的bug。**从 master 分支上拉。**完成 hotfix 后，打上 tag 我们合并回 master 和 develop 分支。
GitFlow主要工作流程
- 1.初始化项目为gitflow , 默认创建master分支 , 然后从master拉取第一个develop分支
- 2.从develop拉取feature分支进行编码开发(多个开发人员拉取多个feature同时进行并行开发 , 互不影响)
- 3.feature分支完成后 , 合并到develop(不推送 , feature功能完成还未提测 , 推送后会影响其他功能分支的开发)；合并feature到develop , 可以选择删除当前feature , 也可以不删除。但当前feature就不可更改了，必须从release分支继续编码修改

4.从develop拉取release分支进行提测 , 提测过程中在release分支上修改BUG
5.release分支上线后 , 合并release分支到develop/master并推送；合并之后，可选删除当前release分支，若不删除，则当前release不可修改。线上有问题也必须从master拉取hotfix分支进行修改；
6.上线之后若发现线上BUG , 从master拉取hotfix进行BUG修改；
7.hotfix通过测试上线后，合并hotfix分支到develop/master并推送；合并之后，可选删除当前hotfix ，若不删除，则当前hotfix不可修改，若补丁未修复，需要从master拉取新的hotfix继续修改；
8.当进行一个feature时 , 若develop分支有变动 , 如其他开发人员完成功能并上线 , 则需要将完成的功能合并到自己分支上，即合并develop到当前feature分支；
9.当进行一个release分支时 , 若develop分支有变动 , 如其他开发人员完成功能并上线 , 则需要将完成的功能合并到自己分支上，即合并develop到当前release分支 (!!! 因为当前release分支通过测试后会发布到线上 , 如果不合并最新的develop分支 , 就会发生丢代码的情况)；
GitFlow的好处
为不同的分支分配一个明确的角色，并定义分支之间如何交互以及什么时间交互；可以帮助大型项目理清分支之间的关系，简化分支的复杂度。
```

#### Object都有什么属性设置？
https://blog.csdn.net/qq_30523685/article/details/93724617
```
面向对象语言的的特性就是有类(class)的概念，通过类可以创建任意多个具有相同属性或方法的对象，然而 javascript 中没有类(class)的概念，所以它不是真正的面向对象

对象

由N组键值对组合起来的无序属性顺序的结合，其属性值可以是任意类型。

//采用生成一个 Object 的实例来创建一个对象

var obj = new Object();
obj.name = "大毛";
obj.eat = function(){
    console.log("吃鱼")
}
1
2
3
4
5
//采用字面量方式创建新对象

var obj = {
    name: "大毛",
    eat: function(){
        console.log("吃鱼")
    }
}
1
2
3
4
5
6
以上我我们利用 Object 的构造函数和字面量方式创建了单个对象，但，这种模式创建出来的对象有个明显的缺陷：

同一个接口创建多个对象，会有很多重复代码，那如何解决呢？带着这个问题，我们继续探究…

属性类型

数据属性
修改获取属性值时

[[Configurable]] ：是否能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能够把属性改为访问器属性。能够直接在对象上定义的属性，默认值是true。
[[Enumerable]] : 能否通过 for-in 循环返回属性。能够直接在对象上定义的属性，默认值是true。
[[Writable]] ： 能否修改属性的值，能够直接在对象上定义的属性，默认值是true。
[[Value]] ：属性的值，读取属性时，从这里读，写入的时候把新值保存在这里，默认是Undefined。
修改属性的默认特性，需要使用 Object.defineProperty() ,接受三个参数，属性所在对象、属性名称、描述符对象。描述符对象的属性必须是configurable、enumerable、writable、value。设置其中的一个或多个值。

Object.defineProperty() 是 IE8 最先实现的，但这个版本只能在DOM对象上使用，而且只能创建访问器属性，由于实现的不彻底，不建议在 IE8 使用。

var person = {}
Object.defineProperty(person,"name",{
	writeable:false, //不能修改属性值，严格模式下会报错，非严格忽略修改的值
	configurable:false,//不能删除该属性
	value:"Nic"
})
alert(person.name) //Nic
person.name = "Gre";
alert(person.name); //Nic
delete person.name;//返回false，不能够删除属性
alert(person.name); //Nic
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
访问器属性
访问器属性不包含数据值，他们包含一对 getter 和 setter 函数(但这2个函数不是必须)，在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值，在写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责如何处理新值。

访问器属性具体 4 个特性：

[[Configurable]] ：能否通过 detele 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为数据属性，对于直接在对象上定义的属性，默认值是 true。
[[Enumerable]] ：能否通过 for-in 循环返回属性列表，对于直接在对象上定义的属性，默认值是 true。
[[Get]] ：在读取属性时调用的函数，默认值是 Undefined。
[[Set]] ：在写入属性时调用的函数，默认值是 Undefined。
访问器属性不能直接定义，只能用 Object.defineProperty() 来定义。

var book = {
_year:2004,
edition:1
}
Oject.defineProperty(book,"year",{
	get:function(){
		return this._year;
	}
	set:function(){
		if(newValue > 2004){
			this._year = newValue;
			this.edition  += newValue - 2004;
		}
	}
})
book.year = 2005;
alert(book.edition); //2
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
_year 前面的下划线是一种常用的记号，表示只能通过对象方法访问的属性。而访问器属性 year 包含一个 getter 和 setter 函数。getter 函数返回 _year 属性的值，setter 函数则通过计算来确定正确的版本。因此 this.edition 会变成2，这是使用访问器属性的常见方式，设置一个属性的值会导致其他属性发生变化。

不一定非要同时指定这2个函数，只指定 getter 意味属性不能写，严格模式下写入会报错，非严格下忽略。只指定了 setter 函数属性不能读，严格模式下会报错，非严格下返回Undefined。

在不支持 Object.defineProperty()	方法的浏览器中不能修改 [[Configurable]] 和 [[Enumerable]]。

Object.defineProperies() 可以通过描述符一次定义多个属性。接受2个参数，一个对象的要添加的和修改的属性的对象。第二个是对象的属性与第一个对象中添加和修改的属性一一对应
这样定义的属性都是同一时间创建的。

var book = {}
Object.defineProperies(book,{
	_year:{
		value:2004
	}
	edition:{
		value:1
	}
	year:{
		get:function(){
			return this._year;
		}
		set:function(){
			if(newValue > 2004){
				this._year = newValue;
				this.edition  += newValue - 2004;
			}
		}
	}
})
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
读取属性特性
Object.getOwnPropertyDescriptor() 方法，可以取得属性的描述。接受2个参数，属性所在对象和读取描述符的属性名称。返回值是一个对象。

如果是访问器属性，这个对象的属性有，configurable、enumerable、get 和 set。
如果是数据属性，这个对象的属性有，confiurable、enmuerable、writable 和 value。

var obj = {}
obj.name = 22;
Object.getOwnPropertyDescriptor(obj,"name") 
// {value: 22, writable: true, enumerable: true, configurable: true}
```

#### 请你简述一下proxy以及有什么优势
```
- Proxy 的优势如下：
    - Proxy 可以直接监听对象而非属性；
    - Proxy 可以直接监听数组的变化；
    - Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
    - Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
    - Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

- Object.defineProperty 的优势如下：
    - 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
```
```
Vue 3.0 正走在发布的路上，Vue 3.0 的目标是让 Vue 核心变得更小、更快、更强大，因此 Vue 3.0 增加以下这些新特性：

（1）监测机制的改变

3.0 将带来基于代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪。这消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：

只能监测属性，不能监测对象

检测属性的添加和删除；

检测数组索引和长度的变更；

支持 Map、Set、WeakMap 和 WeakSet。

新的 observer 还提供了以下特性：

用于创建 observable 的公开 API。这为中小规模场景提供了简单轻量级的跨组件状态管理解决方案。
默认采用惰性观察。在 2.x 中，不管反应式数据有多大，都会在启动时被观察到。如果你的数据集很大，这可能会在应用启动时带来明显的开销。在 3.x 中，只观察用于渲染应用程序最初可见部分的数据。
更精确的变更通知。在 2.x 中，通过 Vue.set 强制添加新属性将导致依赖于该对象的 watcher 收到变更通知。在 3.x 中，只有依赖于特定属性的 watcher 才会收到通知。
不可变的 observable：我们可以创建值的“不可变”版本（即使是嵌套属性），除非系统在内部暂时将其“解禁”。这个机制可用于冻结 prop 传递或 Vuex 状态树以外的变化。
更好的调试功能：我们可以使用新的 renderTracked 和 renderTriggered 钩子精确地跟踪组件在什么时候以及为什么重新渲染。
（2）模板

模板方面没有大的变更，只改了作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。

同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方便习惯直接使用 api 来生成 vdom 。

（3）对象式的组件声明方式

vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易。

此外，vue 的源码也改用了 TypeScript 来写。其实当代码的功能复杂之后，必须有一个静态类型系统来做一些辅助管理。现在 vue3.0 也全面改用 TypeScript 来重写了，更是使得对外暴露的 api 更容易结合 TypeScript。静态类型系统对于复杂代码的维护确实很有必要。

（4）其它方面的更改

vue3.0 的改变是全面的，上面只涉及到主要的 3 个方面，还有一些其他的更改：

支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
基于 treeshaking 优化，提供了更多的内置功能。
```

#### 视频、音频是用的第三方还是自己创建的？怎么调用的？怎么存储视频、音频？
https://segmentfault.com/a/1190000017045863
```
@(音视频)[Audio|Video|MSE]

音视频随着互联网的发展，对音视频的需求越来越多，然而音视频无乱是播放还是编解码，封装对性能要求都比较高，那现阶段的前端再音视频领域都能做些什么呢。

[TOC]

音频或视频的播放

html5 audio

提起音视频的播放，我萌首先想到的是HTMLMediaElement，video播放视频，audio播放音频。举个栗子：

<audio controls autoplay loop="true" preload="auto" src="audio.mp3"></audio>
controls指定浏览器渲染成html5 audio.
autoplay属性告诉浏览器，当加载完的时候，自动播放.
loop属性循环播放.
preload当渲染到audio元素时，便加载音频文件.
移动端的浏览器并不支持autoplay和preload 属性，即不会自动加载音频文件，只有通过一些事件触发，比如touch、click事件等触发加载然后播放.
媒体元素还有一些改变音量，某段音频播放完成事件等，请阅读HTMLMediaElement.
当然如果你的网页是跑在WebView中，可以让客户端设置一些属性实现预加载和自动播放。
AudioContext

虽然使用html5的audio可以播放音频，但是正如你看到存在很多问题，同时我萌不能对音频的播放进行很好的控制，比如说从网络中获取到音频二进制数据，有的时候我萌想顺序播放多段音频，对于使用audio元素也是力不从心，处理起来并不优雅。
举个栗子：

function queuePlayAudio(sounds) {
    let index = 0;
    function recursivePlay(sounds, index) {
        if(sounds.length == index) return;
        sounds[index].play();
        sounds[index].onended = recursivePlay.bind(this, sounds, ++index);
    }
}
监听audio元素的 onended 事件，顺序播放。

为了更好的控制音频播放，我萌需要AudioContext.

AudioContext接口表示由音频模块连接而成的音频处理图，每个模块对应一个AudioNode。AudioContext可以控制它所包含的节点的创建，以及音频处理、解码操作的执行。做任何事情之前都要先创建AudioContext对象，因为一切都发生在这个环境之中。
可能理解起来比较晦涩，简单的来说，AudioContext 像是一个工厂，对于一个音频的播放，从音源到声音控制，到链接播放硬件的实现播放，都是由各个模块负责处理，通过connect 实现流程的控制。
点击查看

现在我萌便能实现音频的播放控制，比如从网络中获取。利用AJAX中获取 arraybuffer类型数据，通过解码，然后把音频的二进制数据传给AudioContext创建的BufferSourceNode，最后通过链接 destination 模块实现音频的播放。

   export default class PlaySoundWithAudioContext {
    constructor() {
            if(PlaySoundWithAudioContext.isSupportAudioContext()) {
                this.duration = 0;
                this.currentTime = 0;
                this.nextTime = 0;
                this.pending = [];
                this.mutex = false;
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }
        static isSupportAudioContext() {
            return window.AudioContext || window.webkitAudioContext;
        }

       play(buffer) {
            var source = this.audioContext.createBufferSource(); 
            source.buffer = buffer;                  
            source.connect(this.audioContext.destination); 
            source.start(this.nextTime);
            this.nextTime += source.buffer.duration;
        }

    addChunks(buffer) {
        this.pending.push(buffer);
        let customer = () => {
            if(!this.pending.length) return;
            let buffer = this.pending.shift();
            this.audioContext.decodeAudioData(buffer, buffer => {
            this.play(buffer);
            console.log(buffer)
            if(this.pending.length) {
                customer()
            }
            }, (err) => {
                console.log('decode audio data error', err);
            });
        }
        if(!this.mutex) {
            this.mutex = true;
            customer()
        }
       
    }

    clearAll() {
        this.duration = 0;
        this.currentTime = 0;
        this.nextTime = 0;
    }
}
AJAX调用

function xhr() {
    var XHR = new XMLHttpRequest();
   XHR.open('GET', '//example.com/audio.mp3');
  XHR.responseType = 'arraybuffer';
  XHR.onreadystatechange = function(e) {
      if(XHR.readyState == 4) {
         if(XHR.status == 200) {
       playSoundWithAudioContext.addChunks(XHR.response);
    }
      }
   }
  XHR.send();
}
使用Ajax播放对于小段的音频文件还行，但是一大段音频文件来说，等到下载完成才播放，不太现实，能否一边下载一边播放呢。这里就要利用 fetch 实现加载stream流。


fetch(url).then((res) => {
    if(res.ok && (res.status >= 200 && res.status <= 299)) {
        readData(res.body.getReader())
    } else {
        that.postMessage({type: constants.LOAD_ERROR})
    }
})

function readData(reader) {
    reader.read().then((result) => {
        if(result.done) {
            return;
        }
        console.log(result);
        playSoundWithAudioContext.addChunks(result.value.buffer);
    })
}
简单的来说，就是fetch的response返回一个readableStream接口，通过从中读取流，不断的喂给audioContext 实现播放，测试发现移动端不能顺利实现播放，pc端浏览器可以。

PCM audio

实现audioContext播放时，我萌需要解码，利用decodeAudioDataapi实现解码，我萌都知道，一般音频都要压缩成mp3，aac这样的编码格式，我萌需要先解码成PCM数据才能播放，那PCM 又是什么呢？我萌都知道，声音都是由物体振动产生，但是这样的声波无法被计算机存储计算，我萌需要使用某种方式去刻画声音，于是乎便有了PCM格式的数据，表示麦克风采集声音的频率，采集的位数以及声道数，立体声还是单声道。

Media Source Extensions

Media Source Extensions可以动态的给Audio和Video创建stream流，实现播放，简单的来说，可以很好的播放进行控制，比如再播放的时候实现 seek 功能什么的，也可以在前端对某种格式进行转换进行播放，并不是支持所有的格式的。
点击查看

通过将数据append进SourceBuffer中，MSE把这些数据存进缓冲区，解码实现播放。这里简单的举个使用MSE播放 audio的栗子：

export default class PlaySoundWithMSE{
    constructor(audio) {
        this.audio = audio;
        if(PlaySoundWithMSE.isSupportMSE()) {
            this.pendingBuffer = [];
            this._mediaSource = new MediaSource();
            this.audio.src = URL.createObjectURL(this._mediaSource);
            this._mediaSource.addEventListener('sourceopen', () => {
                this.sourcebuffer = this._mediaSource.addSourceBuffer('audio/mpeg');
                this.sourcebuffer.addEventListener('updateend', 
                this.handleSourceBufferUpdateEnd.bind(this));
            })
        }
    }

    addBuffer(buffer) {
        this.pendingBuffer.push(buffer);
    }

    handleSourceBufferUpdateEnd() {
        if(this.pendingBuffer.length) {
            this.sourcebuffer.appendBuffer(this.pendingBuffer.shift());
        } else {
            this._mediaSource.endOfStream();
        }
    }

    static isSupportMSE() {
        return !!window.MediaSource;
    }
}
HTML5 播放器

谈起html5播放器，你可能知道bilibili的flv.js,它便是依赖Media Source Extensions将flv编码格式的视频转包装成mp4格式，然后实现播放。
点击查看

从流程图中可以看到，IOController实现对视频流的加载，这里支持fetch的 stream能力，WebSocket等，将得到的视频流，这里指的是flv格式的视频流，将其转封装成MP4格式，最后将MP4格式的数据通过appendBuffer将数据喂给MSE,实现播放。

未来

上面谈到的都是视频的播放，你也看到，即使播放都存在很多限制，MSE的浏览器支持还不多，那在视频的编码解码这些要求性能很高的领域，前端能否做一些事情呢？
前端性能不高有很多原因，在浏览器这样的沙盒环境下，同时js这种动态语言，性能不高，所以有大佬提出把c++编译成js ,然后提高性能，或许你已经知道我要说的是什么了，它就是ASM.js，它是js的一种严格子集。我萌可以考虑将一些视频编码库编译成js去运行提高性能，其中就不得不提到的FFmpeg,可以考虑到将其编译成asm,然后对视频进行编解码。
```

#### 请简述下链表和数组的区别
```
1）数组在内存中是逐个存放的，也就是说倘若数组的第一个元素在地址A,则数组第二个元素就在地址A+1。

而链表则不是，链表每个节点没有相对固定的位置关系。某个节点在地址A其后的节点不一定是A+1,而在内存的其他空闲区域，呈现一种随机的状态。

2）数组一旦显式的被申明后，其大小就固定了，不能动态进行扩充。而链表则可以，可以动态生成节点并且添加到已有的链表后面。

3）链表灵活，但是空间和时间额外耗费较大；数组大小固定，元素位置固定，但是操作不灵活，且容易浪费空间，但是时间耗费较小，尤其是元素变化不大的时候效率很高。双向链表比单向的更灵活，但是空间耗费也更大

。。。。。

链表的特性是在中间任意位置添加删除元素的都非常的快，不需要移动其它的元素。 
链表顾名思义，要把各个元素链接起来才算撒。   
  通常链表每一个元素都要保存一个指向下一个元素的指针（单链表）。   
  双链表的化每个元素即要保存到下一个元素的指针，还要保存一个上一个元素的指针。   
  循环链表则把最后一个元素中保存下一个元素指针指向第一个元素。   
数组是一组具有相同类型和名称的变量的集合。这些变量称为数组的元素,每个数组元素都有一个编号,
这个编号叫做下标,我们可以通过下标来区别这些元素。数组元素的个数有时也称之为数组的长度。

数组查改方便,链表增删效率高。

```

#### 前后端分离是为了什么，请谈谈你的理解
https://blog.csdn.net/dream_cat_forever/article/details/80709503
```
一、前端

前后端分离已成为互联网项目开发的业界标准使用方式，通过nginx+tomcat的方式（也可以中间加一个nodejs）有效的进行解耦，并且前后端分离会为以后的大型分布式架构、弹性计算架构、微服务架构、多端化服务（多种客户端，例如：浏览器，车载终端，安卓，IOS等等）打下坚实的基础。这个步骤是系统架构从猿进化成人的必经之路。

核心思想是前端html页面通过ajax调用后端的restuful api接口并使用json数据进行交互。

在互联网架构中，名词解释：

Web服务器：一般指像nginx，apache这类的服务器，他们一般只能解析静态资源。

应用服务器：一般指像tomcat，jetty，resin这类的服务器可以解析动态资源也可以解析静态资源，但解析静态资源的能力没有web服务器好。

一般都是只有web服务器才能被外网访问，应用服务器只能内网访问。

二、术业有专攻（开发人员分离）

以前的JavaWeb项目大多数都是java程序员又当爹又当妈，又搞前端，又搞后端。

随着时代的发展，渐渐的许多大中小公司开始把前后端的界限分的越来越明确，前端工程师只管前端的事情，后端工程师只管后端的事情。正所谓术业有专攻，一个人如果什么都会，那么他毕竟什么都不精。

大中型公司需要专业人才，小公司需要全才，但是对于个人职业发展来说，我建议是分开。

1、对于后端java工程师：

把精力放在java基础，设计模式，jvm原理，spring+springmvc原理及源码，linux，mysql事务隔离与锁机制，mongodb，http/tcp，多线程，分布式架构，弹性计算架构，微服务架构，java性能优化，以及相关的项目管理等等。

后端追求的是：三高（高并发，高可用，高性能），安全，存储，业务等等。

2、对于前端工程师：

把精力放在html5，css3，jquery，angularjs，bootstrap，reactjs，vuejs，webpack，less/sass，gulp，nodejs，Google V8引擎，javascript多线程，模块化，面向切面编程，设计模式，浏览器兼容性，性能优化等等。

前端追求的是：页面表现，速度流畅，兼容性，用户体验等等。

术业有专攻，这样你的核心竞争力才会越来越高，正所谓你往生活中投入什么，生活就会反馈给你什么。并且两端的发展都越来越高深，你想什么都会，那你毕竟什么都不精。

通过将team分成前后端team，让两边的工程师更加专注各自的领域，独立治理，然后构建出一个全栈式的精益求精的team。

三、原始人时代（各种耦合）

几曾何时，我们的JavaWeb项目都是使用了若干后台框架，springmvc/struts + spring + spring jdbc/hibernate/mybatis 等等。

大多数项目在java后端都是分了三层，控制层，业务层，持久层。控制层负责接收参数，调用相关业务层，封装数据，以及路由&渲染到jsp页面。然后jsp页面上使用各种标签或者手写java表达式将后台的数据展现出来，玩的是MVC那套思路。

我们先看这种情况：需求定完了，代码写完了，测试测完了，然后呢？要发布了吧？你需要用maven或者eclipse等工具把你的代码打成一个war包，然后把这个war包发布到你的生产环境下的web容器里，对吧？

发布完了之后，你要启动你的web容器，开始提供服务，这时候你通过配置域名，dns等等相关，你的网站就可以访问了（假设你是个网站）。那我们来看，你的前后端代码是不是全都在那个war包里？包括你的js，css，图片，各种第三方的库，对吧？

好，下面在浏览器中输入你的网站域名（www.xxx.com），之后发生了什么？（这个问题也是很多公司的面试题）我捡干的说了啊，基础不好的童鞋请自己去搜。

浏览器在通过域名通过dns服务器找到你的服务器外网ip,将http请求发送到你的服务器，在tcp3次握手之后（http下面是tcp/ip），通过tcp协议开始传输数据，你的服务器得到请求后，开始提供服务，接收参数，之后返回你的应答给浏览器，浏览器再通过content-type来解析你返回的内容，呈现给用户。

那么我们来看，我们先假设你的首页中有100张图片，此时，用户的看似一次http请求，其实并不是一次，用户在第一次访问的时候，浏览器中不会有缓存，你的100张图片，浏览器要连着请求100次http请求（有人会跟我说http长连短连的问题，不在这里讨论），你的服务器接收这些请求，都需要耗费内存去创建socket来玩tcp传输（消耗你服务器上的计算资源）。

重点来了，这样的话，你的服务器的压力会非常大，因为页面中的所有请求都是只请求到你这台服务器上，如果1个人还好，如果10000个人并发访问呢（先不聊服务器集群，这里就说是单实例服务器），那你的服务器能扛住多少个tcp连接？你的带宽有多大？你的服务器的内存有多大？你的硬盘是高性能的吗？你能抗住多少IO？你给web服务器分的内存有多大？会不会宕机？

这就是为什么，越是大中型的web应用，他们越是要解耦。理论上你可以把你的数据库+应用服务+消息队列+缓存+用户上传的文件+日志+等等都扔在一台服务器上，你也不用玩什么服务治理，也不用做什么性能监控，什么报警机制等等，就乱成一锅粥好了。但是这样就好像是你把鸡蛋都放在一个篮子里，隐患非常大。如果因为一个子应用的内存不稳定导致整个服务器内存溢出而hung住，那你的整个网站就挂掉了。

如果出意外挂掉，而恰好这时你们的业务又处于井喷式发展高峰期，那么恭喜你，业务成功被技术卡住，很可能会流失大量用户，后果不堪设想。（注意：技术一定是要走在业务前面的，否则你将错过最佳的发展期哟，亲~）

此外，你的应用全部都耦合在一起，相当于一个巨石，当服务端负载能力不足时，一般会使用负载均衡的方式，将服务器做成集群，这样其实你是在水平扩展一块块巨石，性能加速度会越来越低，要知道，本身负载就低的功能or模块是没有必要水平扩展的，在本文中的例子就是你的性能瓶颈不在前端，那干嘛要水平扩展前端呢？？？还有发版部署上线的时候，我明明只改了后端的代码，为什么要前端也跟着发布呢？？？

正常的互联网架构，是都要拆开的，你的web服务器集群，你的应用服务器集群+文件服务器集群+数据库服务器集群+消息队列集群+缓存集群等等。

四、JSP的痛点

以前的javaWeb项目大多数使用jsp作为页面层展示数据给用户，因为流量不高，因此也没有那么苛刻的性能要求，但现在是大数据时代，对于互联网项目的性能要求是越来越高，因此原始的前后端耦合在一起的架构模式已经逐渐不能满足我们，因此我们需要需找一种解耦的方式，来大幅度提升我们的负载能力。

1、动态资源和静态资源全部耦合在一起，服务器压力大，因为服务器会收到各种http请求，例如css的http请求，js的，图片的等等。一旦服务器出现状况，前后台一起玩完，用户体验极差。

2、UI出好设计图后，前端工程师只负责将设计图切成html，需要由java工程师来将html套成jsp页面，出错率较高（因为页面中经常会出现大量的js代码），修改问题时需要双方协同开发，效率低下。

3、jsp必须要在支持java的web服务器里运行（例如tomcat，jetty，resin等），无法使用nginx等（nginx据说单实例http并发高达5w，这个优势要用上），性能提不上来。

4、第一次请求jsp，必须要在web服务器中编译成servlet，第一次运行会较慢。

5、每次请求jsp都是访问servlet再用输出流输出的html页面，效率没有直接使用html高（是每次哟，亲~）。

6、jsp内有较多标签和表达式，前端工程师在修改页面时会捉襟见肘，遇到很多痛点。

7、如果jsp中的内容很多，页面响应会很慢，因为是同步加载。

8、需要前端工程师使用java的ide（例如eclipse），以及需要配置各种后端的开发环境，你们有考虑过前端工程师的感受吗。

基于上述的一些痛点，我们应该把整个项目的开发权重往前移，实现前后端真正的解耦！

五、开发模式

以前老的方式是：

1、产品经历/领导/客户提出需求

2、UI做出设计图

3、前端工程师做html页面

4、后端工程师将html页面套成jsp页面（前后端强依赖，后端必须要等前端的html做好才能套jsp。如果html发生变更，就更痛了，开发效率低）

5、集成出现问题

6、前端返工

7、后端返工

8、二次集成

9、集成成功

10、交付

新的方式是：

1、产品经历/领导/客户提出需求

2、UI做出设计图

3、前后端约定接口&数据&参数

4、前后端并行开发（无强依赖，可前后端并行开发，如果需求变更，只要接口&参数不变，就不用两边都修改代码，开发效率高）

5、前后端集成

6、前端页面调整

7、集成成功

8、交付

六、请求方式

以前老的方式是：

1、客户端请求

2、服务端的servlet或controller接收请求（后端控制路由与渲染页面，整个项目开发的权重大部分在后端）

3、调用service,dao代码完成业务逻辑

4、返回jsp

5、jsp展现一些动态的代码

新的方式是：

1、浏览器发送请求

2、直接到达html页面（前端控制路由与渲染页面，整个项目开发的权重前移）

3、html页面负责调用服务端接口产生数据（通过ajax等等，后台返回json格式数据，json数据格式因为简洁高效而取代xml）

4、填充html，展现动态效果，在页面上进行解析并操作DOM。

总结一下新的方式的请求步骤：

大量并发浏览器请求—>web服务器集群(nginx)—>应用服务器集群(tomcat)—>文件/数据库/缓存/消息队列服务器集群

同时又可以玩分模块，还可以按业务拆成一个个的小集群，为后面的架构升级做准备。

七、前后分离的优势

1、可以实现真正的前后端解耦，前端服务器使用nginx。前端/WEB服务器放的是css，js，图片等等一系列静态资源（甚至你还可以css，js，图片等资源放到特定的文件服务器，例如阿里云的oss，并使用cdn加速），前端服务器负责控制页面引用&跳转&路由，前端页面异步调用后端的接口，后端/应用服务器使用tomcat（把tomcat想象成一个数据提供者），加快整体响应速度。（这里需要使用一些前端工程化的框架比如nodejs，react，router，react，redux，webpack）

2、发现bug，可以快速定位是谁的问题，不会出现互相踢皮球的现象。页面逻辑，跳转错误，浏览器兼容性问题，脚本错误，页面样式等问题，全部由前端工程师来负责。接口数据出错，数据没有提交成功，应答超时等问题，全部由后端工程师来解决。双方互不干扰，前端与后端是相亲相爱的一家人。

3、在大并发情况下，我可以同时水平扩展前后端服务器，比如淘宝的一个首页就需要2000+台前端服务器做集群来抗住日均多少亿+的日均pv。（去参加阿里的技术峰会，听他们说他们的web容器都是自己写的，就算他单实例抗10万http并发，2000台是2亿http并发，并且他们还可以根据预知洪峰来无限拓展，很恐怖，就一个首页。。。）

4、减少后端服务器的并发/负载压力。除了接口以外的其他所有http请求全部转移到前端nginx上，接口的请求调用tomcat，参考nginx反向代理tomcat。且除了第一次页面请求外，浏览器会大量调用本地缓存。

5、即使后端服务暂时超时或者宕机了，前端页面也会正常访问，只不过数据刷不出来而已。

6、也许你也需要有微信相关的轻应用，那样你的接口完全可以共用，如果也有app相关的服务，那么只要通过一些代码重构，也可以大量复用接口，提升效率。（多端应用）

7、页面显示的东西再多也不怕，因为是异步加载。

8、nginx支持页面热部署，不用重启服务器，前端升级更无缝。

9、增加代码的维护性&易读性（前后端耦在一起的代码读起来相当费劲）。

10、提升开发效率，因为可以前后端并行开发，而不是像以前的强依赖。

11、在nginx中部署证书，外网使用https访问，并且只开放443和80端口，其他端口一律关闭（防止黑客端口扫描），内网使用http，性能和安全都有保障。

12、前端大量的组件代码得以复用，组件化，提升开发效率，抽出来！

八、注意事项

1、在开需求会议的时候，前后端工程师必须全部参加，并且需要制定好接口文档，后端工程师要写好测试用例（2个维度），不要让前端工程师充当你的专职测试，推荐使用chrome的插件postman或soapui或jmeter，service层的测试用例拿junit写。ps：前端也可以玩单元测试吗？

2、上述的接口并不是java里的interface，说白了调用接口就是调用你controler里的方法。

3、加重了前端团队的工作量，减轻了后端团队的工作量，提高了性能和可扩展性。

4、我们需要一些前端的框架来解决类似于页面嵌套，分页，页面跳转控制等功能。（上面提到的那些前端框架）。

5、如果你的项目很小，或者是一个单纯的内网项目，那你大可放心，不用任何架构而言，但是如果你的项目是外网项目，呵呵哒。

6、 以前还有人在使用类似于velocity/freemarker等模板框架来生成静态页面，仁者见仁智者见智。

7、这篇文章主要的目的是说jsp在大型外网java web项目中被淘汰掉，可没说jsp可以完全不学，对于一些学生朋友来说，jsp/servlet等相关的java web基础还是要掌握牢的，不然你以为springmvc这种框架是基于什么来写的？

8、如果页面上有一些权限等等相关的校验，那么这些相关的数据也可以通过ajax从接口里拿。

9、对于既可以前端做也可以后端做的逻辑，我建议是放到前端，为什么？因为你的逻辑需要计算资源进行计算，如果放到后端去run逻辑，则会消耗带宽&内存&cpu等等计算资源，你要记住一点就是服务端的计算资源是有限的，而如果放到前端，使用的是客户端的计算资源，这样你的服务端负载就会下降（高并发场景）。类似于数据校验这种，前后端都需要做！

10、前端需要有机制应对后端请求超时以及后端服务宕机的情况，友好的展示给用户。

九、扩展阅读

1、其实对于js，css，图片这类的静态资源可以考虑放到类似于阿里云的oss这类文件服务器上（如果是普通的服务器&操作系统，存储在到达pb级的文件后，或者单个文件夹内的文件数量达到3-5万，io会有很严重的性能问题），再在oss上配cdn（全国子节点加速），这样你页面打开的速度像飞一样， 无论你在全国的哪个地方，并且你的nginx的负载会进一步降低。

2、如果你要玩轻量级微服务架构，要使用nodejs做网关，用nodejs的好处还有利于seo优化，因为nginx只是向浏览器返回页面静态资源，而国内的搜索引擎爬虫只会抓取静态数据，不会解析页面中的js，这使得应用得不到良好的搜索引擎支持。同时因为nginx不会进行页面的组装渲染，需要把静态页面返回到浏览器，然后完成渲染工作，这加重了浏览器的渲染负担。浏览器发起的请求经过nginx进行分发，URL请求统一分发到nodejs，在nodejs中进行页面组装渲染；API请求则直接发送到后端服务器，完成响应。

3、如果遇到跨域问题，spring4的CORS可以完美解决，但一般使用nginx反向代理都不会有跨域问题，除非你把前端服务和后端服务分成两个域名。JSONP的方式也被淘汰掉了。

4、如果想玩多端应用，注意要去掉tomcat原生的session机制，要使用token机制，使用缓存（因为是分布式系统），做单点，对于token机制的安全性问题，可以搜一下jwt。

5、前端项目中可以加入mock测试（构造虚拟测试对象来模拟后端，可以独立开发和测试），后端需要有详细的测试用例，保证服务的可用性与稳定性。

十、总结

前后端分离并非仅仅只是一种开发模式，而是一种架构模式（前后端分离架构）。千万不要以为只有在撸代码的时候把前端和后端分开就是前后端分离了，需要区分前后端项目。前端项目与后端项目是两个项目，放在两个不同的服务器，需要独立部署，两个不同的工程，两个不同的代码库，不同的开发人员。前后端工程师需要约定交互接口，实现并行开发，开发结束后需要进行独立部署，前端通过ajax来调用http请求调用后端的restful api。前端只需要关注页面的样式与动态数据的解析&渲染，而后端专注于具体业务逻辑。
```

#### 如何用原生js实现俄罗斯方块？数据结构会怎么设计？
https://blog.csdn.net/d1105260363/article/details/77509119
```
对于小白来说用js实现俄罗斯方块还是有难度的，网上找了很多代码看，有的很长难懂，有的短小精悍，但不只用到了js还用到了框架，对于还未接触框架的小白宝宝，也只能无奈自己是小白了，自己写不出来那就找一篇纯js代码，弄懂也是一种收获吧。so 接下来就是我的理解咯，有不对的地方请多多包涵

个人觉得思路还是很重要的，那我就先以我理解之后，来说说其思路

首先整个编程过程用到了六个数组吧，第一个是全局数组shapes,存放了7种俄罗斯方块的形状，之后的数组都是动态创建并赋值的，divs[]长度为4 存放要下落的方块，div2[]长度也是4用来存放预告方块的，对应的就有shape[]用来说明下落方块的形状是怎么样，shape2[]用来存放预告方块形状的，这两个形状都是随机产生的，还有一个隐形的数组用来存放显示界面中所有方块的，个人认为最难的就是理清显示界面和抽象数组之间的关系吧，先上一个思维导图让大家直观的理清思路，之后慢慢详解代码



           <style>        //设置好元素样式，到时候动态创建元素，直接设置其属性 根据类名确定样式

 .c {
margin: 1px;
width: 19px;
height: 19px;
background: red;
position: absolute;    //下落方块样式
}

.d {
margin: 1px;
width: 19px;
height: 19px;
background: gray;
position: absolute; //下落到不能下落方块样式 其实就改变了颜色
}

.f {
top: 0px;
left: 0px;
background: black;
position: absolute; //整个游戏显示界面
}

.e {
top: 0px;
background: #151515;
position: absolute;   //预告方块界面
}

.g {
width: 100px;
height: 20px;
color: white;
position: absolute;  //分数显示界面
}
</style>

开始JS代码

<script type="text/javascript">
var row = 18;
var col = 10;
var announcement = 6;
var size = 20;
var isOver = false;
var shapes = ("0,1,1,1,2,1,3,1;1,0,1,1,1,2,2,2;2,0,2,1,2,2,1,2;0,1,1,1,1,2,2,2;1,2,2,2,2,1,3,1;1,1,2,1,1,2,2,2;0,2,1,2,1,1,2,2").split(";");
var tetris;
var container;

最难理解的可能就是shapes数组 .split（";"）;是将数组以；分割成一个个数组值，每个数组值单号代表top值，双号代表left值代表一种方块形状 此处上图

function createElm(tag, css) {
var elm = document.createElement(tag);
elm.className = css;
document.body.appendChild(elm);
return elm;
}


function Tetris(css, x, y, shape) {
// 创建4个div用来组合出各种方块
var myCss = css ? css : "c";
this.divs = [createElm("div", myCss), createElm("div", myCss), createElm("div", myCss), createElm("div", myCss)];
if(!shape) {
this.divs2 = [createElm("div", myCss), createElm("div", myCss), createElm("div", myCss), createElm("div", myCss)];
this.score = createElm("div", "g");
this.score.style.top = 10 * size + "px";
this.score.style.left = (col - -1) * size + "px";
this.score.innerHTML = "score:0";
}
this.container = null;
this.refresh = function() {
this.x = (typeof(x) != 'undefined') ? x : 3;
this.y = (typeof(y) != 'undefined') ? y : 0;
// 如果有传参，优先使用参数的，如果有预告，优先使用预告，都没有就自己生成
if(shape)
this.shape = shape;
else if(this.shape2)
this.shape = this.shape2;
else
this.shape = shape ? shape : shapes[Math.floor((Math.random() * shapes.length - 0.000000001))].split(",");
this.shape2 = shapes[Math.floor((Math.random() * shapes.length - 0.000000001))].split(",");
if(this.container && !this.container.check(this.x, this.y, this.shape)) {
isOver = true;
alert("游戏结束");
} else {
this.show();
this.showScore();
this.showAnnouncement();
}
}
// 显示方块
this.show = function() {
for(var i in this.divs) {
this.divs[i].style.top = (this.shape[i * 2 + 1] - -this.y) * size + "px";//顶部中间开始
this.divs[i].style.left = (this.shape[i * 2] - -this.x) * size + "px";
}
}
// 显示预告
this.showAnnouncement = function() {
for(var i in this.divs2) {
this.divs2[i].style.top = (this.shape2[i * 2 + 1] - -1) * size + "px";//定位在显示区
this.divs2[i].style.left = (this.shape2[i * 2] - -1 - -col) * size + "px";
}
}
// 显示分数
this.showScore = function() {
if(this.container && this.score) {
this.score.innerHTML = "score:" + this.container.score;
}
}
// 水平移动方块的位置
this.hMove = function(step) {
if(this.container.check(this.x - -step, this.y, this.shape)) {
this.x += step;
this.show();
}
}
// 垂直移动方块位置
this.vMove = function(step) {
if(this.container.check(this.x, this.y - -step, this.shape)) {
this.y += step;
this.show();
} else {
this.container.fixShape(this.x, this.y, this.shape);
this.container.findFull();
this.refresh();
}
}
// 旋转方块
this.rotate = function() {
var newShape = [this.shape[1], 3 - this.shape[0], this.shape[3], 3 - this.shape[2], this.shape[5], 3 - this.shape[4], this.shape[7], 3 - this.shape[6]];
if(this.container.check(this.x, this.y, newShape)) {
this.shape = newShape;
this.show();
}
}
this.refresh();
}


function Container() {
this.init = function() {
// 绘制方块所在区域
var bgDiv = createElm("div", "f");
bgDiv.style.width = size * col + "px";
bgDiv.style.height = size * row + "px";
// 绘制预告所在区域
var bgDiv = createElm("div", "e");
bgDiv.style.left = size * col + "px";
bgDiv.style.width = size * announcement + "px";
bgDiv.style.height = size * row + "px";
// 清空积分
this.score = 0;
}
this.check = function(x, y, shape) {
// 检查边界越界
var flag = false;
var leftmost = col;
var rightmost = 0;
var undermost = 0;
for(var i = 0; i < 8; i += 2) {
// 记录最左边水平坐标
if(shape[i] < leftmost)
leftmost = shape[i];
// 记录最右边水平坐标
if(shape[i] > rightmost)
rightmost = shape[i];
// 记录最下边垂直坐标
if(shape[i + 1] > undermost)
undermost = shape[i + 1];
// 判断是否碰撞
if(this[(shape[i + 1] - -y) * 100 - -(shape[i] - -x)])
flag = true;
}
// 判断是否到达极限高度
for(var m = 0; m < 3; m++)
for(var n = 0; n < col; n++)
if(this[m * 100 + n])
flag = true;
if((rightmost - -x + 1) > col || (leftmost - -x) < 0 || (undermost - -y + 1) > row || flag)
return false;
return true;
}
// 用灰色方块替换红色方块，并在容器中记录灰色方块的位置
this.fixShape = function(x, y, shape) {
var t = new Tetris("d", x, y, shape);
for(var i = 0; i < 8; i += 2)
this[(shape[i + 1] - -y) * 100 - -(shape[i] - -x)] = t.divs[i / 2];
}
// 遍历整个容器，判断是否可以消除
this.findFull = function() {
var s = 0;
for(var m = 0; m < row; m++) {
var count = 0;
for(var n = 0; n < col; n++)
if(this[m * 100 + n])
count++;
if(count == col) {
s++;
this.removeLine(m);
}
}
this.score -= -this.calScore(s);
}
this.calScore = function(s) {
if(s != 0)
return s - -this.calScore(s - 1)
else
return 0;
}
// 消除指定一行方块
this.removeLine = function(row) {
// 移除一行方块
for(var n = 0; n < col; n++)
document.body.removeChild(this[row * 100 + n]);
// 把所消除行上面所有的方块下移一行
for(var i = row; i > 0; i--) {
for(var j = 0; j < col; j++) {
this[i * 100 - -j] = this[(i - 1) * 100 - -j]//数组中 消除行上的所有元素逐行下移 （等同于在数组改变位置）
if(this[i * 100 - -j])//如果此下标有元素 让其定位到要显示的位置
this[i * 100 - -j].style.top = i * size + "px";
}
}
}
}


function init() {
container = new Container();
container.init();
tetris = new Tetris();
tetris.container = container;
document.onkeydown = function(e) {
if(isOver) return;
var e = window.event ? window.event : e;
switch(e.keyCode) {
case 38: //up
tetris.rotate();
break;
case 40: //down
tetris.vMove(1);
break;
case 37: //left
tetris.hMove(-1);
break;
case 39: //right
tetris.hMove(1);
break;
}
}
setInterval("if(!isOver) tetris.vMove(1)", 500);
}
</script>
</head>


<body οnlοad="init()">
</body>


</html>
```

#### 看你写到了排序算法，你都了解哪些排序算法？快速排序算法复杂度是多少？什么时候适合快排，什么时候适合冒泡排序？
```
冒泡、选择、插入、归并、希尔、快速、堆、基数
O(nlogn)
要排序的数据已基本有序的情况下不适合快排
1. 当参加排序的数据规模n较大，关键字元素分布比较随机，并且不要求排序稳定性时，宜选择快速排序
2. 当参加排序的数据规模n较大，内存空间又允许，并且有排序稳定性要求，宜采用归并排序
3. 当参加排序的数据规模n较大，元素分布可能出现升序或逆序的情况，并且对排序稳定不要求时候，宜采用堆积排序方法或归并排序
4. 当参加排序的数据规模n较小(如小于100)，元素基本有序，或者分布也比较随机，并且排序稳定性要求时，宜采用排序算法
5. 当参加排序的数据规模n较小，对排序稳定性又不要求时，宜采用选择排序方法
```

#### 你都了解哪些web安全的知识？请简述
```
要做好防XSS、CSRF、SQL注入攻击.DDOS攻击。

- XSS概念:
译为跨站脚本攻击,具体是指攻击者在Web页面里插入恶意Script脚本，当用户浏览该网页时，Script代码会被执行，从而进行恶意攻击。

- XSS预防:
关键cookie字段设置httpOnly
输入检查,特殊字符 < > / &等,对其进行转义后存储

- CSRF概念：
本质上讲，是黑客将一个http接口中需要传递的所有参数都预测出来，然后不管以什么方式，他都可以根据他的目的来任意调用你的接口，对服务器实现CURD。

- CSRF 预防：
使用验证码，更高级用图灵测试

- SQL概念：
通常没有任何过滤，直接把参数存放到了SQL语句当中

- SQL预防：
根本上防止SQL注入的方法，就是参数化查询或者做词法分析。

- DDOS概念：
利用木桶原理，寻找利用系统应用的瓶颈；阻塞和耗尽；当前问题：用户的带宽小于攻击的规模，噪声访问带宽成为木桶的短板。

- DDOS预防：用软硬件结合的方式来防御是最有效的
```

#### 你对前端AI发展方向有什么了解？请简述
```
在2017年，一个叫做DeepLearning.js的工程诞生了，旨在没有API的干扰下在JavaScript中推动ML/DL的发展；但是又出现了速度的问题。都知道JS代码不能运行在GPU上。为了解决这个问题，引进WebGL。

2018年3月，TensorFlow.js发布！前端也可以进行机器学习啦！Google的TensorFlow团队发布等待多时的JavaScript框架，TensorFlow.js(之前也叫做DeepLearn.js)；TensorFlow.js提供两样东西：CoreAPI，来处理底层代码，在CoreAPI之上编写的LayerAPI，通过增加层级的抽象性使coding更容易。用户可以完全在浏览器定义、训练和运行机器学习模型。

目前AI在前端领域的一些应用案例有：

1. 人脸识别

2. 人脸比对

3. 物体检测

4. 手势检测

5. 视频跟踪

6. 图像美化

7. 人工智能已经能实现自动编写 HTML 和 CSS

https://blog.csdn.net/csdnnews/article/details/79372975

……

基于 JavaScript 的机器学习实例

实例1：（利用TensorFlow.js部署简单的AI版「你画我猜」）

一个简单的工具来识别手绘图像，并且输出当前图像的名称。该应用无需安装任何额外的插件，可直接在浏览器上运行。作者使用谷歌 Colab 来训练模型，并使用 TensorFlow.js 将它部署到浏览器上。



实例2：（浏览器中实时人体姿势估计）

TensorFlow.js版本的PoseNet，这是一种机器学习模型，允许在浏览器中进行实时人体姿势估计。PoseNet运行在TensorFlow.js上，任何拥有摄像头的PC或手机的人都可以在网络浏览器中体验这种技术。而且由于已经开源了这个模型，JavaScript开发人员可以用几行代码来使用这个技术。更重要的是，这实际上可以帮助保护用户隐私。由于TensorFlow.js上的PoseNet在浏览器中运行，因此任何姿态数据都不会留在用户的计算机上。



实例3：（Flappy-bird ）

FlappyLearning 是一个仅用800 行代码创建的 JavaScript 机器学习库，它让你可以像行家一样玩转 Flappy Bird 游戏。在这个库中所使用的 AI 技术被称为“ Neuroevolution” 神经进化，而它所应用算法的灵感则源于自然界生物神经系统的进化，并且它可以从每次成功或失败的迭代中进行动态的学习。另外，你只需要在浏览器中打开 index.html 就可以运行它了，非常简单。



前端机器学习框架

使用JavaScript 可以运行在浏览器和服务器端、甚至是桌面程序上。目前已经有不少简洁的库，可以将JavaScript、机器学习、DNN 甚至 NLP结合在一起，而且在浏览器端大多库会调用 WebGL 来做机器学习的计算。

（https://baijiahao.baidu.com、https://www.colabug.com/4857625.html）

1. TensorFlow.js (https://js.tensorflow.org/)

TensorFlow.js 是一个开源的基于硬件加速的 JavaScript 的库，支持在浏览器或者 NodeJs 中来运行深度学习，并且能支持现有的 Tensorflow 模型，由Google出品。可以说是前端深度学习框架 Deeplearn.js 的继任者。它提供一系列简洁和通俗易懂的API，用于训练、部署模型。而且因为可以运行在浏览器，所以可以直接通过URL就能分享你的程序：



通过摄像头来控制的吃豆人游戏

2. Brain.js (https://brain.js.org/)

Brain.js 是同样可以运行在浏览器和 NodeJs 服务器端、能为不同的任务提供不同类型的训练网络。特点是让定义、训练以及执行神经网络变得特别简单。个人觉得这个库比较适合入门。比如以下短短几行代码已涵盖创建、训练和执行神经网络，一目了然：





Brain.js 的色彩识别器

3. Synaptic.js (http://caza.la/synaptic)

Synaptic 可以运行在浏览器和 NodeJs 服务器端的神经网络库，你能够用它训练一层甚至是二层神经网络结构。该库包括一些内置的体系结构，如多层感知机（MLP）、长短时记忆网络、液体状态机和能够训练真实网络的训练器。



Synaptic image-filter perceptron

4. Machine learning tools (https://github.com/mljs/ml)

Machine Learning tools 是由 mljs组织开发的一组库，可以为 JavaScript 提供机器学习工具，包括监督和非监督学习、人工神经网络 (ANN)、回归算法，用于统计、数学等的支持库，类似于 Python 中的 scikit-learn。



5. compromise (http://compromise.cool/)

基本上是NLP自然语言处理库 - 前端 JavaScript 实现的首选，这个库加上自己的资料库压缩成min.js后文件大小可达到300k以下，这样运行在浏览器和 NodeJs 服务器端都问题不大，具体可以做的东西是训练自定义语义库：划分出分词，获取句子的各个词性，可以把句子变积极消极、分词等，比如以下例子：



JavaScript 虽然不是机器学习的最佳编程语言，不过随着 Web生态 和 人工智能技术近年来的不断发展完善，越来越多这样的机器学习工具库被研发和发布。对于一名Web的前端开发者而言，用 JavaScript 作为入门机器学习的桥梁是个不错的选择，它同样能帮助你开启机器学习之旅。

前端在机器学习方面的优缺点

优势：

①  从用户的角度来看，在浏览器中运行的ML意味着不需要安装任何库或驱动程序。只需打开网页，你的程序就可以运行了。

②  此外，基于框架TensorFlow.js，它已准备好使用GPU加速运行。TensorFlow.js自动支持WebGL，并在GPU可用时会加速代码。用户也可以通过移动设备打开你的网页，在这种情况下，模型可以利用传感器数据，例如陀螺仪或加速度传感器。一般来说，深层神经网络计算在GPU上运行的速度要比CPU快一个数量级。

③  所有数据都保留在客户端上，可以实现低延迟推理以及隐私保护程序。

④  在浏览器中完全由客户端运行的机器学习程序将会解锁新的机会，如交互式机器学习：https://github.com/tensorflow/tfjs-examples。

⑤  离线学习，用浏览器中收集的少量数据进行离线训练。这是快速训练精确模型的一种方法，只需使用少量数据。

障碍：

①  模型学习时前端计算能力障碍

浏览器及移动端有限的资源计算能力：由于模型的深度学习很难直接在浏览器中运行，因为这些模型不是专为在浏览器中运行而设计的，更不用说在移动端了。以现有的物体探测器为例：它们通常需要大量的计算资源才能以合理的fps运行，更不用说以实时速度运行了。

②  预训练模型加载到前端时等待时间较长障碍

在简单的Web应用程序中将几十兆至上百兆预训练模型权重加载到客户端浏览器是非常耗时的。这对于用户是无法接受的。

但是，随着JS引擎的计算能力不断增强，人工智能领域的不断发展，可以预见的是，在不久的将来，肯定能有一些简单的算法可以被移植到用户前端执行，这样既能减少请求，又能分担后端压力，。这一切并不是无稽之谈，为什么tensorflow.js会应运而生，正是因为JS的社区在不断壮大，JS这款便捷的语言也在得到更为普遍的使用。

这些问题正在得到解决和改善：

针对计算能力问题：

前端做算法能落实到生产环境吗？能真正地给业务带来价值吗？答案是：可以！首先先说一下前端目前可以进行高性能计算的三种方法：

1. asm.js

2. WebAssembly

3. GPU

所以，opencv就有了asm.js和WebAssembly版本的，我们可以在前端做cv算法。什么物体跟踪、图像处理、特征检测等等等，在前端做ok的，并且阿里也落地到了生产环境中。以及谷歌去年推出tensorflow.js支持利用gpu计算。

针对模型大小问题：

模型压缩，以及为Web训练高效的深度学习模型

（1）2018年09月；腾讯 AI Lab 开源世界首款自动化模型压缩框架PocketFlow

这是一款面向移动端AI开发者的自动模型压缩框架，集成了当前主流的模型压缩与训练算法，结合自研超参数优化组件实现了全程自动化托管式的模型压缩与加速。开发者无需了解具体算法细节，即可快速地将AI技术部署到移动端产品上，实现用户数据的本地高效处理。

（2）模型压缩开源库整理：



（3）谷歌MobileNet

一般的tensorflow模型动辄几百兆，在前端怎么跑呢？没关系，我们有MobileNet啊，MobileNet是针对于移动端模型提出的神经网络架构，能极大地减少模型参数量，同理也能用到浏览器端上。

（4）为Web训练高效的深度学习模型(https://www.jianshu.com/p/ef7e1c3f5aea)

这些模型通过设计一些基本原则可以在Web环境中运行进行。我们可以训练相当不错的图像分类-甚至物体检测模型，最终只有几兆字节大小甚至只有几千字节：



如通过增加每层卷积滤波器的数量或堆叠更多层简单地使你的网络更深入。

前端基于现有框架进行模型训练

用TensorFlow.js我们可以做什么？

TensorFlow 是GitHub 上的第一个机器学习平台，也是 GitHub 上的五大软件库之一，被许多公司和组织所使用，包括 GitHub 上与 TensorFlow 相关的超过 24,500 个不同的软件仓库。预编译的 TensorFlow 二进制文件已经在 180 多个国家被下载了超过 1000 万次，GitHub 上的源代码现在已经有超过 1200 个贡献者。

2018年3月31日TensorFlow 开发者峰会上，TensorFlow宣布重大更新：增加支持Java，并推出开源库TensorFlow.js，

如果你使用TensorFlow.js进行开发，可以考虑以下三种workflow：

你可以导入现有的预训练的模型进行推理。如果你有一个以前脱机训练好的现成的TensorFlow或Keras模型，就可以将其转换为TensorFlow.js格式，并加载到浏览器中进行推理。

你可以重新训练导入的模型。正如在上面的Pac-Man演示中，你可以使用迁移学习来增强现有模型，使用“ImageRetraining”技术，用浏览器中收集的少量数据进行离线训练。这是快速训练精确模型的一种方法，只需使用少量数据。

直接在浏览器中创建模型。你还可以使用TensorFlow.js，完全在浏览器中使用Java和high-level layers API进行定义、训练和运行模型。如果你熟悉Keras，那么应该会很熟悉high-level layers API。

1.tensorflow在发布了JS版本的工具库后，官网在线测试：



2. Tensorflow.js 图片训练（mnist ）



3. 如何利用TensorFlow.js部署简单的AI版「你画我猜」图像识别应用

4. 交互式机器学习：

结合我们自身业务，对落地场景进行初探：AI美图



通过Tensorflowjs及converter工具将Tensorflow模型或Keras模型转换为web_model模型；可以看到生成浏览器可以加载并读取的模型参数和权重文件。从用户的角度来看，在浏览器中运行的ML意味着不需要安装任何库或驱动程序。只需打开网页，程序就可以运行了。对于图片处理来说，不需要网络开销来传输和接受图片资源，实现了低延迟，弱网或断网情况下的离线运行。

在实现过程我们也遇到了一些问题，比如由于Tensorflowjs-converter支持有限，我们训练模型时用到encode和decode；由于不在Supported Tensorflow Ops列表，我们通过调整模型训练Ops来兼容。同时也付出了一些代价，模型从44K增加到几百K。

另外，将Tensorflow模型或Keras模型转换为web_model模型之后，会生成很多小的权重文件，在实际应用时，通过懒加载和预加载策略，可以在不影响首屏加载情况下，优化模型加载时间。
```