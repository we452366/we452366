## 中信银行

### html

#### html中有哪些块级元素？有哪些行内元素？
```
- 行内元素

一个行内元素只占据它对应标签的边框所包含的空间
一般情况下，行内元素只能包含数据和其他行内元素

b, big, i, small, tt
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
a, bdo, br, img, map, object, q, script, span, sub, sup
button, input, label, select, textarea

- 块级元素

占据一整行，高度、行高、内边距和外边距都可以改变，可以容纳块级标签和其他行内标签

header,form,ul,ol,table,article,div,hr,aside,figure,canvas,video,audio,footer
```

#### img标签中alt是做什么用的？
```
- img的alt属性
如果无法显示图像，浏览器将显示alt指定的内容

- 元素title属性
在鼠标移到元素上时显示title的内容
```

#### src和href的区别是什么？
```
- href
href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系
若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

- src
src表示引用资源，替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。
当浏览器解析到src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载），直到将该资源加载、编译、执行完毕，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。
```

### css

#### 如何兼容css？
https://www.jianshu.com/p/a6f52fe96e6e
```
1、CSS Hack

我们为了让页面形成统一的效果，要针对不同的浏览器/版本而写css的过程就叫做CSS hack
(1)IE条件注释法

即在正常代码之外添加判别IE浏览器或对应版本的条件注释，符合条件的浏览器或者版本号才会执行里面的代码。

<!--格式-->
<!--lt是小于   gt是大于    lte是小于等于    gte是不小于   ！是不等于-->

<!--[if IE]>
    你想要执行的代码
<![endif]-->

<!--[if lt IE8]>
    你想要执行的代码
<![endif]-->

<!--[if ! IE 8]>
    你想要执行的代码
<![endif]-->
<!--示例1-->
<!--[if lte IE 8]>
<link rel="stylesheet" type="text/css" href="base.css"/>
<![endif]-->

1.png


2.png
(2)CSS属性前缀法

即给css的属性添加前缀，比如*可以被IE6/IE7识别，但_只能被IE6识别，IE6-IE10都可以识别"\9"，IE6不能识别！important ，Firefox不能识别 * _ \9

说明：

在标准模式中

"-" 减号是IE6专有的hack

"\9" IE6-IE10 都生效

"\0" IE8-IE10 都生效，是IE8-IE10的hack

"\9\0" 只对IE9-IE10 生效

<!--示例2-->
        <style>
            h1{
                color: #FF0000;     /* all */
                color: #222\9;   /* IE */
                *color: #333;    /* IE6/IE7 */
                _color:#444;     /* IE6 */
            }
        </style>

3.png


4.png


5.png


6.png

IEtester：http://www.ietester.cn/ 测试兼容的
(3)选择器前缀法

IE6 可识别 *div{color:red}

IE7 可识别 *+{color:red}

@media screen \9{...} 只对IE6/IE7生效

@media \0screen {body {background:blue}} 只对IE6/7/8有效

。。。。。

<!--示例3-->
        <style>
            *h2{
                color:orange;
            }
        </style>
2、浏览器私有属性

-moz 代表Firefox浏览器私有属性
-ms 代表IE浏览器私有属性
-webkit 代表chrome、Safari私有属性
-o 代表Opera私有属性
注意：对于私有属性，要把标准写法放到最后，兼容性写法放到前面

我们经常会在某个CSS的属性前添加一些前缀，比如：-webkit-，-moz-，-ms-，这些就是浏览器的私有属性。

为什么会出现私有属性呢？这是因为制定HTML和CSS标准的组织w3c动作是很慢的。

通常，有W3C组织成员提出一个新属性，比如说圆角border-radius，大家都觉得很好，但w3c制定标准，要走很复杂的程序、审查等，而浏览器市场推广时间紧，如果一个属性已经够成熟了，就会在浏览器中加入支持。
但是为避免日后w3c公布标准时有所变更，会加入一个私有前缀，比如 -webkit- border-radius，通过这种方式来提前支持新属性，等到日后w3c公布了标准，border-radius的标准写法确立之后，再让新版的浏览器支持border-radius这种写法。
<!--示例4-->
.box{
                width: 300px;
                height: 300px;
                -webkit-border-radius: 150px;
                -moz-border-radius: 150px;
                -ms-border-radius:150px;
                -o-border-radius: 150px;
                border-radius: 150px;
                background-color: royalblue;
            }
3、浏览器CSS样式初始化

针对不同浏览器渲染效果的不同，可以进行浏览器css样式初始化，也就是加一个reset.css文件

/*淘宝的reset.css*/
blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul {margin:0;padding:0}
body,button,input,select,textarea { font:12px/1.5 tahoma,arial,'Hiragino Sans GB',\5b8b\4f53,sans-serif}
h1,h2,h3,h4,h5,h6 {font-size:100%}
address,cite,dfn,em,var {font-style:normal}
code,kbd,pre,samp {font-family:courier new,courier,monospace}
small {font-size:12px}
ol,ul {list-style:none}
a {text-decoration:none}
a:hover {text-decoration:underline}
sup {vertical-align:text-top}
sub {vertical-align:text-bottom}
legend {color:#000}
fieldset,img {border:0}
button,input,select,textarea {font-size:100%}
table {border-collapse:collapse;border-spacing:0}
```

#### css中选择器有哪几种？选择器的优先级是什么？(出题:div>span和#s1谁的优先级高？div>span和.s1谁的优先级高？)
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
```
选择器权值的计算，不会超过自己的最大数量级
100个元素(1)元素选择器相加，也不会大于10
    #s1高
    .s1高
```

#### css3有哪些新特性？
https://segmentfault.com/a/1190000010780991
```
2.过渡

过渡，是我在项目里面用得最多的一个特性了！也相信是很多人用得最多的一个例子！我平常使用就是想让一些交互效果（主要是hover动画），变得生动一些，不会显得那么生硬！好了，下面进入正文！

引用菜鸟教程的说法：CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。要实现这一点，必须规定两项内容：指定要添加效果的CSS属性指定效果的持续时间。

2-1语法

transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
栗子1

/*宽度从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒，0.2秒后执行过渡*/
transition：width,.5s,ease,.2s
栗子2

/*所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒*/
transition：all,.5s
上面栗子是简写模式，也可以分开写各个属性（这个在下面就不再重复了）

transition-property: width;
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
2-2实例-hover效果

clipboard.png

上面两个按钮，第一个使用了过渡，第二个没有使用过渡，大家可以看到当中的区别，用了过渡之后是不是没有那么生硬，有一个变化的过程，显得比较生动。
当然这只是一个最简单的过渡栗子，两个按钮的样式代码，唯一的区别就是，第一个按钮加了过渡代码transition: all .5s;

2-3实例-下拉菜单

clipboard.png

上面两个菜单，第一个没有使用过渡，第二个使用过渡，大家明显看到区别，使用了过渡看起来也是比较舒服！代码区别就是有过渡的ul的上级元素(祖先元素)有一个类名（ul-transition）。利用这个类名，设置ul的过渡.ul-transition ul{transform-origin: 0 0;transition: all .5s;}

可能大家不知道我在说什么！我贴下代码吧

html

<div class="demo-hover demo-ul t_c">
    <ul class="fllil">
        <li>
            <a href="javascript:;">html</a>
            <ul>
                <li><a href="#">div</a></li>
                <li><a href="#">h1</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">js</a>
            <ul>
                <li><a href="#">string</a></li>
                <li><a href="#">array</a></li>
                <li><a href="#">object</a></li>
                <li><a href="#">number</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">css3</a>
            <ul>
                <li><a href="#">transition</a></li>
                <li><a href="#">animation</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">框架</a>
            <ul>
                <li><a href="#">vue</a></li>
                <li><a href="#">react</a></li>
            </ul>
        </li>
    </ul>
    <div class="clear"></div>
</div>
<div class="demo-hover demo-ul ul-transition t_c">
    <ul class="fllil">
        <li>
            <a href="javascript:;">html</a>
            <ul>
                <li><a href="#">div</a></li>
                <li><a href="#">h1</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">js</a>
            <ul>
                <li><a href="#">string</a></li>
                <li><a href="#">array</a></li>
                <li><a href="#">object</a></li>
                <li><a href="#">number</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">css3</a>
            <ul>
                <li><a href="#">transition</a></li>
                <li><a href="#">animation</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">框架</a>
            <ul>
                <li><a href="#">vue</a></li>
                <li><a href="#">react</a></li>
            </ul>
        </li>
    </ul>
    <div class="clear"></div>
</div>
css

.demo-ul{margin-bottom: 300px;}
    .demo-ul li{
        padding: 0 10px;
        width: 100px;
        background: #f90;
        position: relative;
    }
    .demo-ul li a{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .demo-ul li ul{
        position: absolute;
        width: 100%;
        top: 40px;
        left: 0;
        transform: scaleY(0);
        overflow: hidden;
    }
    .ul-transition ul{
        transform-origin: 0 0;
        transition: all .5s;
    }
    .demo-ul li:hover ul{
        transform: scaleY(1);
    }
    .demo-ul li ul li{
        float: none;
        background: #0099ff;

}
上面两个可以说是过渡很基础的用法，过渡用法灵活，功能也强大，结合js，可以很轻松实现各种效果（焦点图，手风琴）等，以及很多意想不到的效果。这个靠大家要去挖掘！

3.动画

动画这个平常用的也很多，主要是做一个预设的动画。和一些页面交互的动画效果，结果和过渡应该一样，让页面不会那么生硬！

3-1.语法

animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）
栗子1

/*执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear;
栗子2

/*2秒后开始执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear 2s;
栗子3

/*无限执行logo2-line动画，每次运动时间2秒，运动曲线为 linear，并且执行反向动画*/
animation: logo2-line 2s linear alternate infinite;
还有一个重要属性

animation-fill-mode : none | forwards | backwards | both;
/*none：不改变默认行为。    
forwards ：当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。    
backwards：在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。 
both：向前和向后填充模式都被应用。  */      
3-2.logo展示动画

clipboard.png

这个是我用公司logo写的动画，没那么精细

代码如下

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="reset.css">
</head>
<style>
.logo-box{
    width: 600px;
    margin: 100px auto;
    font-size: 0;
    position: relative;
}
.logo-box div{
    display: inline-block;
}
.logo-box .logo-text{
    margin-left: 10px;
}
.logo-box .logo1{
    animation: logo1 1s ease-in 2s;
    animation-fill-mode:backwards;
}
.logo-box .logo-text{
    animation: logoText 1s ease-in 3s;
    animation-fill-mode:backwards;
}
.logo-box .logo2{
    position: absolute;
    top: 20px;
    left: 20px;
    animation: logo2-middle 2s ease-in;
}
.logo-box .logo2 img{
    animation: logo2-line 2s linear;
}
@keyframes logo1 {
    0%{
        transform:rotate(180deg);
        opacity: 0;
    }
    100%{
        transform:rotate(0deg);
        opacity: 1;
    }
}
@keyframes logoText {
    0%{
        transform:translateX(30px);
        opacity: 0;
    }
    100%{
        transform:translateX(0);
        opacity: 1;
    }
}
@keyframes logo2-line {
    0% { transform: translateX(200px)}
    25% { transform: translateX(150px)}
    50% { transform: translateX(100px)}
    75% { transform: translateX(50px)}
    100% { transform: translateX(0); }
}

@keyframes logo2-middle {
    0% { transform: translateY(0);     }
    25% { transform: translateY(-100px);     }
    50% { transform: translateY(0);     }
    75% { transform: translateY(-50px);     }
    100% { transform: translateY(0); }
}
</style>
<body>
<div class="logo-box">
<div class="logo1"><img src="logo1.jpg"/></div>
<div class="logo2"><img src="logo2.jpg"/></div>
<div class="logo-text"><img src="logo3.jpg"/></div>
</div>

<div class="wraper"><div class="item"></div></div>

</body>
</html>
下面让大家看一个专业级别的

clipboard.png

代码如下

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
    body {
        font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
        overflow: hidden;
        background: #fff;
    }

    .center {
        margin: 80px auto;
    }

    .so {
        display: block;
        width: 500px;
        height: 156px;
        background: #ffffff;
    }
    .so .inner {
        width: 500px;
        height: 156px;
        position: absolute;
    }
    .so .inner * {
        position: absolute;
        animation-iteration-count: infinite;
        animation-duration: 3.5s;
    }
    .so .inner .name {
        position: absolute;
        font-size: 54px;
        left: 130px;
        top: 95px;
    }
    .so .inner .name .b {
        font-weight: bold;
    }
    .so .inner .stack-box {
        top: 100px;
        width: 115px;
        height: 56px;
    }
    .so .inner .box {
        width: 115px;
        height: 56px;
        left: 0px;
    }
    .so .inner .box div {
        background: #BCBBBB;
    }
    .so .inner .box .bottom {
        bottom: 0px;
        left: 0px;
        width: 115px;
        height: 12px;
    }
    .so .inner .box .left {
        bottom: 11px;
        left: 0px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .right {
        bottom: 11px;
        left: 103px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .top {
        top: 0px;
        left: 0px;
        width: 0;
        height: 12px;
    }
    .so .inner .stack {
        left: 22px;
        top: 22px;
    }
    .so .inner .stack .inner-item {
        background: #F48024;
        width: 71px;
        height: 12px;
    }
    .so .inner .stack .item {
        transition: transform 0.3s;
        width: 291px;
    }
    .so .inner .stack div:nth-child(1) {
        transform: rotate(0deg);
    }
    .so .inner .stack div:nth-child(2) {
        transform: rotate(12deg);
    }
    .so .inner .stack div:nth-child(3) {
        transform: rotate(24deg);
    }
    .so .inner .stack div:nth-child(4) {
        transform: rotate(36deg);
    }
    .so .inner .stack div:nth-child(5) {
        transform: rotate(48deg);
    }
    .so .inner .box {
        animation-name: box;
    }
    .so .inner .box .top {
        animation-name: box-top;
    }
    .so .inner .box .left {
        animation-name: box-left;
    }
    .so .inner .box .right {
        animation-name: box-right;
    }
    .so .inner .box .bottom {
        animation-name: box-bottom;
    }
    .so .inner .stack-box {
        animation-name: stack-box;
    }
    .so .inner .stack {
        animation-name: stack;
    }
    .so .inner .stack .inner-item {
        animation-name: stack-items;
    }
    .so .inner .stack .item:nth-child(1) {
        animation-name: stack-item-1;
    }
    .so .inner .stack .item:nth-child(2) {
        animation-name: stack-item-2;
    }
    .so .inner .stack .item:nth-child(3) {
        animation-name: stack-item-3;
    }
    .so .inner .stack .item:nth-child(4) {
        animation-name: stack-item-4;
    }
    .so .inner .stack .item:nth-child(5) {
        animation-name: stack-item-5;
    }
    @keyframes stack {
        0% {
            left: 22px;
        }
        15% {
            left: 22px;
        }
        30% {
            left: 52px;
        }
        50% {
            left: 52px;
        }
        80% {
            left: 22px;
        }
    }
    @keyframes stack-item-1 {
        0% {
            transform: rotate(12deg * 0);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 0);
        }
    }
    @keyframes stack-item-2 {
        0% {
            transform: rotate(12deg * 1);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 1);
        }
    }
    @keyframes stack-item-3 {
        0% {
            transform: rotate(12deg * 2);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 2);
        }
    }
    @keyframes stack-item-4 {
        0% {
            transform: rotate(12deg * 3);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 3);
        }
    }
    @keyframes stack-item-5 {
        0% {
            transform: rotate(12deg * 4);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 4);
        }
    }
    @keyframes stack-items {
        0% {
            width: 71px;
        }
        15% {
            width: 71px;
        }
        30% {
            width: 12px;
        }
        50% {
            width: 12px;
        }
        80% {
            width: 71px;
        }
    }
    @keyframes box {
        0% {
            left: 0;
        }
        15% {
            left: 0;
        }
        30% {
            left: 30px;
        }
        50% {
            left: 30px;
        }
        80% {
            left: 0;
        }
    }
    @keyframes box-top {
        0% {
            width: 0;
        }
        6% {
            width: 0;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        59% {
            width: 0;
        }
    }
    @keyframes box-bottom {
        0% {
            width: 115px;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        80% {
            width: 115px;
        }
    }
    @keyframes box-right {
        15% {
            left: 103px;
        }
        30% {
            left: 44px;
        }
        50% {
            left: 44px;
        }
        80% {
            left: 103px;
        }
    }
    @keyframes stack-box {
        0% {
            transform: rotate(0deg);
        }
        30% {
            transform: rotate(0deg);
        }
        40% {
            transform: rotate(135deg);
        }
        50% {
            transform: rotate(135deg);
        }
        83% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<body>
<div class="so center">
    <div class="inner">
        <div class="stack-box">
            <div class="stack">
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
                <div class="item">
                    <div class="inner-item"></div>
                </div>
            </div>
            <div class="box">
                <div class="bottom"></div>
                <div class="left"></div>
                <div class="right"></div>
                <div class="top"></div>
            </div>
        </div>
        <div class="name">
            stack<span class="b">overflow</span>
        </div>
    </div>
</div>
</body>
</html>
3-3.loading效果

clipboard.png

这个代码实在太多了，大家直接上网址看吧。css3-loading

3-4.音乐震动条

clipboard.png

代码如下

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>纯CSS3模拟跳动的音符效果</title>
  <style>
    *{margin:0;padding:0;list-style: none;}
    body{background-color: #efefef;}
    .demo-music {
      position: absolute;
      width: 100%;
      height: 200px;
      top: 120px;
      zoom: 1.5;
    }

    .demo-music .music {
      width: 80px;
      height: 50px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-40px, -25px);
      transform: translate(-40px, -25px);
      position: absolute;
    }

    .demo-music #waves {
      width: 80px;
      height: 50px;
      position: absolute;
      top: 12px;
      left: 12px;
    }

    .demo-music #waves li {
      position: relative;
      float: left;
      height: 100%;
      width: 12%;
      overflow: hidden;
      margin-right: 1px;
    }

    .demo-music #waves li span {
      position: absolute;
      bottom: 0;
      display: block;
      height: 100%;
      width: 100px;
      background: #09f;
    }

    .demo-music #waves .li1 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }

    .demo-music #waves .li2 span {
      animation: waves 0.9s linear 0s infinite alternate;
      -webkit-animation: waves 0.9s linear 0s infinite alternate;
    }

    .demo-music #waves .li3 span {
      animation: waves 1s linear 0s infinite alternate;
      -webkit-animation: waves 1s linear 0s infinite alternate;
    }

    .demo-music #waves .li4 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }

    .demo-music #waves .li5 span {
      animation: waves 0.7s linear 0s infinite alternate;
      -webkit-animation: waves 0.7s linear 0s infinite alternate;
    }

    .demo-music #waves .li6 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }
    @-webkit-keyframes waves {
      10% {
        height: 20%;
      }
      20% {
        height: 60%;
      }
      40% {
        height: 40%;
      }
      50% {
        height: 100%;
      }
      100% {
        height: 50%;
      }
    }

    @keyframes waves {
      10% {
        height: 20%;
      }
      20% {
        height: 60%;
      }
      40% {
        height: 40%;
      }
      50% {
        height: 100%;
      }
      100% {
        height: 50%;
      }
    }
  </style>
</head>
<body>
  <div class="demo-music">
    <div class="music">
      <ul id="waves" class="movement">
        <li class="li1"><span class="ani-li"></span></li>
        <li class="li2"><span class="ani-li"></span></li>
        <li class="li3"><span class="ani-li"></span></li>
        <li class="li4"><span class="ani-li"></span></li>
        <li class="li5"><span class="ani-li"></span></li>
        <li class="li6"><span class="ani-li"></span></li>
      </ul>
      <div class="music-state"></div>
    </div>
    </div>
</body>
</html>
4.形状转换

这一部分，分2d转换和3d转换。有什么好玩的，下面列举几个！

4-1.语法

transform:适用于2D或3D转换的元素
transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0)

4-2.实例

transform:rotate(30deg);

clipboard.png

transform:translate(30px,30px);

clipboard.png

transform:scale(.8);

clipboard.png

transform: skew(10deg,10deg);

clipboard.png

transform:rotateX(180deg);

clipboard.png

transform:rotateY(180deg);

clipboard.png

transform:rotate3d(10,10,10,90deg);

clipboard.png

5.选择器

css3提供的选择器可以让我们的开发，更加方便！这个大家都要了解。下面是css3提供的选择器。

clipboard.png

图片来自w3c。这一块建议大家去w3c看（CSS 选择器参考手册），那里的例子通俗易懂。我不重复讲了。
提供的选择器里面，基本都挺好用的。但是我觉得有些不会很常用，比如，:root，:empty，:target，:enabled，:checked。而且几个不推荐使用，网上的说法是性能较差[attribute*=value]，[attribute$=value]，[attribute^=value]，这个我没用过，不太清楚。

6.阴影

以前没有css3的时候，或者需要兼容低版本浏览器的时候，阴影只能用图片实现，但是现在不需要，css3就提供了！

6-1.语法

box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
6-1.栗子

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title></title> 
<style> 
div
{
    width:300px;
    height:100px;
    background:#09f;
    box-shadow: 10px 10px 5px #888888;
}
</style>
</head>
<body>

<div></div>

</body>
</html>
运行效果

clipboard.png

7.边框

7-1.边框图片

7-1-1.语法

border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

7-1-2.栗子

边框图片（来自菜鸟教程）

clipboard.png

代码

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<style>
.demo {
    border: 15px solid transparent;
    padding: 15px;   
    border-image: url(border.png);
    border-image-slice: 30;
    border-image-repeat: round;
    border-image-outset: 0;
}
</style>
</head>
<body>
    <div class="demo"></div>
</body>
</html>
效果

clipboard.png

有趣变化

clipboard.png

clipboard.png

那个更好看，大家看着办

7-2.边框圆角

7-2-1.语法

border-radius: n1,n2,n3,n4;
border-radius: n1,n2,n3,n4/n1,n2,n3,n4;
/*n1-n4四个值的顺序是：左上角，右上角，右下角，左下角。*/
7-2-2.栗子

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title></title> 
<style> 
div
{
    border:2px solid #a1a1a1;
    padding:10px 40px; 
    background:#dddddd;
    text-align:center;
    width:300px;
    border-radius:25px 0 25px 0;
}
</style>
</head>
<body>
<div>border-radius</div>
</body>
</html>
运行结果

clipboard.png

8.背景

这一块主要讲css3提供背景的三个属性

background-clip

制定背景绘制（显示）区域

默认情况（从边框开始绘制）

clipboard.png

从padding开始绘制（显示），不算border,，相当于把border那里的背景给裁剪掉！（background-clip: padding-box;）

clipboard.png

只在内容区绘制（显示），不算padding和border，相当于把padding和border那里的背景给裁剪掉！（background-clip: content-box;）

clipboard.png

background-origin

引用菜鸟教程的说法：background-Origin属性指定background-position属性应该是相对位置

下面的div初始的html和css代码都是一样的。如下
html

<div>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
</div>
css

div
{
    border:10px dashed black;
    padding:35px;
    background:url('logo.png') no-repeat,#ccc;
    background-position:0px 0px;
}
下面看下，background-origin不同的三种情况

图片描述

background-size

这个相信很好理解，就是制定背景的大小
下面的div初始的html和css代码都是一样的。如下
html

<div>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
</div>
css

div
{
    border:1px dashed black;
    padding:35px;
    background:url('test.jpg') no-repeat;
}
clipboard.png

多张背景图

这个没什么，就是在一张图片，使用多张背景图片，代码如下！
html

<p>两张图片的背景</p>
<div>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
</div>
css

div
{
    border:1px dashed black;
    padding:35px;
    background-size: contain;
    background:url('test.jpg') no-repeat left,url(logo.png) no-repeat right;
}
clipboard.png

9.反射

这个也可以说是倒影，用起来也挺有趣的。

9-1.语法

-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片
9-2.下倒影

html

<p>下倒影</p>
<p class="reflect-bottom-p"><img src="test.jpg" class="reflect-bottom"></p>
css

.reflect-bottom-p {
    padding-bottom: 300px;
}
        
.reflect-bottom {
    -webkit-box-reflect: below;
}   
clipboard.png

9-2.右倒影（有偏移）

clipboard.png

html

<p>右倒影同时有偏移</p>
<p><img src="test.jpg" class="reflect-right-translate"></p>
css

.reflect-right-translate {
    -webkit-box-reflect: right 10px;
}
9-3.下倒影（渐变）

clipboard.png

html

<p>下倒影（渐变）</p>
<p class="reflect-bottom-p"><img src="test.jpg" class="reflect-bottom-mask"></p>
css

reflect-bottom-mask {
    -webkit-box-reflect: below 0 linear-gradient(transparent, white);
}
9-3.下倒影（图片遮罩）

使用的图片

clipboard.png

clipboard.png

html

<p>下倒影（png图片）</p>
<p class="reflect-bottom-p"><img src="test.jpg" class="reflect-bottom-img"></p>
css

.reflect-bottom-img {
    -webkit-box-reflect: below 0 url(shou.png);
}
10.文字

换行

语法：word-break: normal|break-all|keep-all;
栗子和运行效果

clipboard.png

语法：word-wrap: normal|break-word;
栗子和运行效果

clipboard.png

超出省略号这个，主要讲text-overflow这个属性，我直接讲实例的原因是text-overflow的三个写法，clip|ellipsis|string。clip这个方式处理不美观，不优雅。string只在火狐兼容。
clipboard.png

超出省略号

这个其实有三行代码，禁止换行，超出隐藏，超出省略号
html

<div>This is some long text that will not fit in the box</div>
css

div
{
    width:200px; 
    border:1px solid #000000;
    overflow:hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;
}
运行结果

clipboard.png

多行超出省略号

超出省略号。这个对于大家来说，不难！但是以前如果是多行超出省略号，就只能用js模拟！现在css3提供了多行省略号的方法！遗憾就是这个暂时只支持webkit浏览器！

代码如下

<!DOCTYPE html>
<html>    
<head>
<meta charset="utf-8"> 
<title></title> 
<style> 
div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
</head>
<body>

<div>这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏</div>


</body>
</html>
效果图

clipboard.png

这样发现边框贴着难看，要撑开一点，但是撑开上下边框不要使用padding!因为会出现下面这个效果。

clipboard.png

正确姿势是这样写

<style> 
div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:30px;
    height:60px;
}
</style>
运行结果

clipboard.png

这样写，就算在不是webkit内核的浏览器，也可以优雅降级（高度=行高*行数（webkit-line-clamp））！

clipboard.png

文字阴影

语法：text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。
栗子：text-shadow: 0 0 10px #f00;
效果

clipboard.png

11.颜色

这个其实就是css3提供了新的颜色表示方法。

rgba

一个是rgba（rgb为颜色值，a为透明度）

color: rgba(255,00,00,1);
background: rgba(00,00,00,.5);
clipboard.png

hsla

h:色相”，“s：饱和度”，“l：亮度”，“a：透明度”
这个我姿势了解过，没用过，这里简单给一个例子

color: hsla( 112, 72%, 33%, 0.68);
background-color: hsla( 49, 65%, 60%, 0.68);
clipboard.png

12.渐变

css3的渐变可以说是一大亮点，提供了线性渐变，径向渐变，圆锥渐变（w3c和菜鸟教程都没有提及，是我从一篇文章了解到，但是我自己在谷歌浏览器尝试，却是一个无效的写法！大家如果知道怎么用，请告知！感谢）
渐变这一部分，由于用法灵活，功能也强大，这个写起来很长，写一点又感觉没什么意思，我这里贴几个链接教程给大家，在文章我不多说了，毕竟我也是从那几个地方学的，他们写得也是比我好，比我详细！

CSS3 Gradient
再说CSS3渐变——线性渐变
再说CSS3渐变——径向渐变
神奇的 conic-gradient 圆锥渐变（这篇就是看我看到圆锥渐变的文章）

13.Filter（滤镜）

css3的滤镜也是一个亮点，功能强大，写法也灵活。

栗子代码如下

<p>原图</p>
<img src="test.jpg" />
<p>黑白色filter: grayscale(100%)</p>
<img src="test.jpg" style="filter: grayscale(100%);"/>
<p>褐色filter:sepia(1)</p>
<img src="test.jpg" style="filter:sepia(1);"/>
<p>饱和度saturate(2)</p>
<img src="test.jpg" style="filter:saturate(2);"/>
<p>色相旋转hue-rotate(90deg)</p>
<img src="test.jpg" style="filter:hue-rotate(90deg);"/>
<p>反色filter:invert(1)</p>
<img src="test.jpg" style="filter:invert(1);"/>
<p>透明度opacity(.5)</p>
<img src="test.jpg" style="filter:opacity(.5);"/>
<p>亮度brightness(.5)</p>
<img src="test.jpg" style="filter:brightness(.5);"/>
<p>对比度contrast(2)</p>
<img src="test.jpg" style="filter:contrast(2);"/>
<p>模糊blur(3px)</p>
<img src="test.jpg" style="filter:blur(3px);"/>
<p>阴影drop-shadow(5px 5px 5px #000)</p>
<img src="test.jpg" style="filter:drop-shadow(5px 5px 5px #000);"/>
clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

14.弹性布局

这里说的弹性布局，就是flex；这一块要讲的话，必须要全部讲完，不讲完没什么意思，反而会把大家搞蒙！讲完也是很长，所以，这里我也只贴教程网址。博客讲的很好，很详细！

Flex 布局教程：语法篇
Flex 布局教程：实例篇

15.栅格布局

栅格化布局，就是grid；这一块和flex一样，要讲就必须讲完。这块的内容和flex差不多，也有点长，这里我也贴链接，这个链接讲得也很详细！

Grid布局指南

16.多列布局

这一块，我也是了解过，我觉得多列应该还是挺有用的。虽然我没在项目中用过，下面我简单说下！举个例子！这个属性，建议加私有前缀，兼容性有待提高！
html

<div class="newspaper">
当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。
</div>
css

.newspaper
{
    column-count: 3;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-rule:2px solid #000;
    -webkit-column-rule:2px solid #000;
    -mox-column-rule:2px solid #000;
}    
clipboard.png

17.盒模型定义

box-sizing这个属性，网上说法是：属性允许您以特定的方式定义匹配某个区域的特定元素。

这个大家看着可能不知道在说什么，简单粗暴的理解就是：box-sizing:border-box的时候，边框和padding包含在元素的宽高之内！如下图

图片描述

box-sizing:content-box的时候，边框和padding不包含在元素的宽高之内！如下图

图片描述

18.媒体查询

媒体查询，就在监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式！在做响应式的网站里面，是必不可少的一环！不过由于我最近的项目都是使用rem布局。所以媒体查询就没怎么用了！但是，媒体查询，还是很值得一看的！说不定哪一天就需要用上了！

栗子代码如下

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title></title> 
<style>
body {
    background-color: pink;
}
@media screen and (max-width: 960px) {
    body {
        background-color: darkgoldenrod;
    }
}
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
</style>
</head>
<body>

<h1>重置浏览器窗口查看效果！</h1>
<p>如果媒体类型屏幕的可视窗口宽度小于 960 px ，背景颜色将改变。</p>
<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>

</body>
</html>
运行效果

clipboard.png

19.混合模式

混合模式，就像photoshop里面的混合模式！这一块，我了解过，在项目上没用过，但是我觉得这个应该不会没有用武之地！
css3的混合模式，两个（background-blend-mode和mix-blend-mode）。这两个写法和显示效果都非常像！区别就在于background-blend-mode是用于同一个元素的背景图片和背景颜色的。mix-blend-mode用于一个元素的背景图片或者颜色和子元素的。看以下代码，区别就出来了！

这一块图片很多，大家看图片快速扫一眼，看下什么效果就好！
background-blend-mode

代码

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <style>
        div{
            width: 480px;
            height: 300px;
            background:url('test.jpg')no-repeat,#09f;
        }
    </style>
    <body>
        <!---->
        
        <p>原图</p>
        <div></div>
        <p>multiply正片叠底</p>
        <div style="background-blend-mode: multiply;"></div>
        <p>screen滤色</p>
        <div style="background-blend-mode: screen;"></div>
        <p>overlay叠加</p>
        <div style="background-blend-mode: overlay;"></div>
        <p>darken变暗</p>
        <div style="background-blend-mode: darken;"></div>
        <p>lighten变亮</p>
        <div style="background-blend-mode: lighten;"></div>
        <p>color-dodge颜色减淡模式</p>
        <div style="background-blend-mode: color-dodge;"></div>
        <p>color-burn颜色加深</p>
        <div style="background-blend-mode: color-burn;"></div>
        <p>hard-light强光</p>
        <div style="background-blend-mode: hard-light;"></div>
        <p>soft-light柔光</p>
        <div style="background-blend-mode: soft-light;"></div>
        <p>difference差值</p>
        <div style="background-blend-mode: difference;"></div>
        <p>exclusion排除</p>
        <div style="background-blend-mode: exclusion;"></div>
        <p>hue色相</p>
        <div style="background-blend-mode: hue;"></div>
        <p>saturation饱和度</p>
        <div style="background-blend-mode: saturation;"></div>
        <p>color颜色</p>
        <div style="background-blend-mode: color;"></div>
        <p>luminosity亮度</p>
        <div style="background-blend-mode: luminosity;"></div>
    </body>
</html>
运行效果

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

mix-blend-mode

代码

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <style>
        div{
            padding: 20px;
            width: 480px;
            background: #09f;
        }
    </style>
    <body>
        <p>原图</p>
        <div><img src="test.jpg"/></div>
        <p>multiply正片叠底</p>
        <div><img src="test.jpg" style="mix-blend-mode: multiply;"/></div>
        <p>screen滤色</p>
        <div><img src="test.jpg" style="mix-blend-mode: screen;"/></div>
        <p>overlay叠加</p>
        <div><img src="test.jpg" style="mix-blend-mode: overlay;"/></div>
        <p>darken变暗</p>
        <div><img src="test.jpg" style="mix-blend-mode: darken;"/></div>
        <p>lighten变亮</p>
        <div><img src="test.jpg" style="mix-blend-mode: lighten;"/></div>
        <p>color-dodge颜色减淡模式</p>
        <div><img src="test.jpg" style="mix-blend-mode: color-dodge;"/></div>
        <p>color-burn颜色加深</p>
        <div><img src="test.jpg" style="mix-blend-mode: color-burn;"/></div>
        <p>hard-light强光</p>
        <div><img src="test.jpg" style="mix-blend-mode: hard-light;"/></div>
        <p>soft-light柔光</p>
        <div><img src="test.jpg" style="mix-blend-mode: soft-light;"/></div>
        <p>difference差值</p>
        <div><img src="test.jpg" style="mix-blend-mode: difference;"/></div>
        <p>exclusion排除</p>
        <div><img src="test.jpg" style="mix-blend-mode: exclusion;"/></div>
        <p>hue色相</p>
        <div><img src="test.jpg" style="mix-blend-mode: hue;"/></div>
        <p>saturation饱和度</p>
        <div><img src="test.jpg" style="mix-blend-mode: saturation;"/></div>
        <p>color颜色</p>
        <div><img src="test.jpg" style="mix-blend-mode: color;"/></div>
        <p>luminosity亮度</p>
        <div><img src="test.jpg" style="mix-blend-mode: luminosity;"/></div>
    </body>
</html>
运行效果

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png

clipboard.png
```

#### bootstrap和element-ui有什么区别？
```
element-ui 基于vue 的ui组件库，里面也有自定义主题，可以随意修改，如果考虑用vue 搭建后台管理，建议使用。
bootstrap是基于原生html+js开发，比较适合配合jQuery
```

### 原生js

#### 如何实现一个表格中某一个单元格中由按钮，点击表格跳到详情页？点击按钮弹出弹出框？
```
事件代理
```

#### 你对jQuery怎么看？它和原生js有什么区别？
https://www.cnblogs.com/hyesc/articles/7586782.html
```
1、入口函数的不同

　　js：window.onload = function(){内部放js}　　　

　　实质就是一个事件，拥有事件的三要素，事件源，事件，事件处理程序。等到所有内容，以及我们的外部图片之类的文件加载完了之后，才会去执行。只能写一个入口函数。

　　jQuery:$(function(){})　　或者　　$(document).ready(function(){})

　　是在 html所有标签都加载之后，就回去执行。可以写多个。

2、获取元素的方式不同

　　js：常用的以下几个，除了id，其他的结果都是伪数组

复制代码
    document.getElementsByTagName("a")
    document.getElementById("demo")
    document.getElementsByClassName("class")　　有兼容性问题
    document.getElementsByTagName("*")　　获得所有的标签，用来遍历
　　html5新增选择器
　　document.querySelector(selector) 可以通过CSS选择器的语法找到DOM元素，返回
　　　　第一个满足选择器条件的元素 一个dom对象
　　document.querySelectorAll('.item');返回所有满足该条件的元素 一个元素类型是dom类
　　　　型的数组
　　
复制代码
　　jQuery：

　　　$(" ")　　通过和css雷同的选择器方式来获取元素。得到的是jquery对象（dom元素的数组，外加其他一些成员）

。即使写的是id，唯一的，得到的对象都不是单一的。

本质上jquery方式和qs方式都是获取DOM数组， 只不过jquery会多一些其他成员，

DOM数组的每一个成员注册事件不能像jquery一样直接注册， 必须分别给每个元素注册

 

3、DOM对象和jquery对象的相互转换　

　　jQuery对象转换成DOM对象:

　　　　方式一：$(“#btn”)[0]

　　　　方式二：$(“#btn”).get(0)得到dom对象。   

　　　　eq（0）得到jquery对象

　　DOM对象转换成jQuery对象：

　　$(document) -> 把DOM对象转成了jQuery对象

　　var btn = document.getElementById(“btn”);

　　btn -> $(btn);　　　　$(this)

　　Jquery得到的元素类型都是对象，内容是伪数组，无论是不是唯一的元素。

4、事件处理程序不同　

复制代码
　　js：
　　document.getElementById(“id”).onclick = function(){　// 语句　}
　　document.getElementById(“id”).addEventListener("click",function(){})
　　onclick，onfoucs，onblur，fouce（自动获得），select（自动选择文本域内容），onmouseover，onmouseout，
　　oninput/onpropertychange用户输入事件，onchange(下拉菜单select内容发生改变时发生事件，如果内容为几，那么做出什么反应)
　　


　　jquery
　　$(“#id”).click(function(){ 　　　　// 语句 　　});
　　
复制代码
 

 

5、设置类

　　js：document.getElementById(“btn”).className = "wrong1 wrong2"

　　可以同时设置多个类名。

　　classList属性（是数组），方法add 　　remove　　contains　　toggle

　　jquery：

6、设置value

7、设置内容，html和text

　　js：document.getElementById(“btn”).innerHTML = "内容不能为空"

　　可以是文本，可以是<p>内容不能为空</p>。

　　jquery：

8、属性

 　　js：object.getAttribute(attribute)　　获取元素属性

　　　　object.setAttrbute(attribute，value)　　设置元素属性

　　　　

9、节点操作

　　js:　　childNodes属性　　　element.childNodes　　所有子元素，包括元素节点，文本节点，　属性节点，甚至包括空格等，所以这个不怎么用。

　　　　　　nodeType属性　　node.nodeType返回结果是数字。1代表元素节点，2属性节点，3文本节点，

　　　　以上这两个属性都不建议使用，建议直接使用children。

 10、对数组的增删改查

　　js：

　　　　增：push()最后追加　　返回新的长度。

　　　　　　unshift ()　　开头添加，返回新的长度。即操作后如果输出，结果是长度，不是新数组。

　　　　删：pop()删除最后一个，并返回删掉的值，此方法无参数。

　　　　　　shift()删除第一个元素，并返回删掉的值，无参数。

　　　　连接数组：concat()　　连接两个或多个。它不会改变现有的数组，而仅仅会返回被连接数组的一个副本

　　　　　　　　　aa.concat(bb);     结果：  [1,3,5,“a”,”b”,”c”];

　　　　转换：join() 数组转字符串　　arrayObject.join([separator])  ，返回新字符串，原数组不会有任何变化。

　　　　　　　split() 字符串转数组　　　返回新数组，原字符串没有变化

　　　　　　stringObject.split(separator,howmany)    两个参数均是可选的，默认是逗号分隔，第二个指定数组最大长度。
```

#### 你都知道哪些web安全问题？如何防范？
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

### 框架

#### Vue/React/Angular和jQuery有什么区别？
https://www.cnblogs.com/zhuzhenwei918/p/7447434.html
```
前端当前最火的三大框架当属vue、react以及angular了。 但是在做项目的时候，我们怎么去选择呢？  这里做一个比较，希望大家可以有一个比较清晰的认识。

　　

vue与react
　　vue和react是当前最火的两个前端框架，vue的发展很快，但是目前来说，react的生态系统会更强大，世界上使用这个框架的人也很多。 另外，react是facebook官方维护的， 而vue是尤雨溪本人维护的。 并且在其他周边库，如react的react-rouer和redux，是react社区在维护的。 而vue的vuex和vue-router都是尤雨溪在维护的。 

 

1、都在使用 Virtual DOM， 当然，不得不说，vue的虚拟DOM一定是从react这里模仿的，但是好的东西就是需要被模仿的，而没有必要重复的造轮子，所以没毛病。使用虚拟DOM的好处就很多了，比如通过虚拟DOM结合diff算法，我们可以很好地解决DOM操作的性能问题，即 生成虚拟DOM的时间 + diff算法时间 + patch时间 < 修改DOM省下来的时间，当然，如果某一天DOM操作很快，那么就不存在这个问题了。react可能就会被其他框架取代了。 另外， 使用虚拟DOM，可以使得JavaScript的应用不仅仅局限于网页，还可以是ios、安卓等，因为在react中没有用到html，用到的时jsx，虚拟dom，最后生成的可以是用在网页上的html，也可以是用在安卓和ios的控件，所以，react-native的大火也就可想而知了。 、

 

2、都提供了响应式（Reactive）和组件化（Composable）的视图组件。

　　　react和vue中的组件都是核心， 是整个框架的灵魂，之前我们使用的都是以页面为基本单位的，但是却不知道组件的好处。 

　　    首先通过组件化以后，这个组件就是可复用的了，比如如果使用传统方式写一个网站，如果标题和结尾都是一样的，那我们可能会不断的复制、粘贴，但是呢，如果使用了组件化的思想，只需要写好组件，然后在需要的地方插入组件即可。 

　　    又比如vue中的单文件组件，我们写一个组件，就知道是什么含义，并且css和js都可以写在一个文件里， css通过属性 scoped 可以防止css的类名污染。 而对于template也可以放心的使用，不用担心重复的问题。

　　　基于react的UI库ant.design，我们还可以直接调用这些组件，大大地加快了前端开发的速度和效率，所以，组件的使用，绝对是前端的一小步，历史的一大步。 

 

 

3、都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

　　   即vue和react都是专注于视图的框架，只是在局部区域，vue提供了双向数据绑定，这样更有利于我们处理表单等问题，而react在这方面就有了一定的劣势。。

　　　而如果希望做大型的项目，对于vue来说，就可以使用vue-router，来构建大型网站的路由； 状态复杂，不好管了，我们就使用vuex； 所以，这也就是官网所说的渐进式的框架 了 。同样的，react也是可以直接使用的，包括react-router和redux，方便我们构建大型应用。   只是前者的周边库是由尤雨溪维护，后者是由react庞大的社区维护的。

 

 

4、vue比react更容易上手。

　　   这一点是毋庸置疑的，为什么这么说呢？ 因为对于vue，无论你是使用webpack还是broserify， vue-cli都可以很好地满足你的开发任务。

　　　学习vue，我们只需要掌握中级的html、css、js即可，在head中引入一个vue.js库，就可以直接使用了。并且对于数据双向绑定、指定等都可以很好地体现。

　　　但是react的学习会更加复杂一些，react需要有ES6的基础，因为react组件的创建多是使用es6的class来创建的，所以会更加麻烦一些，并且对于JSX语法，还是有一定的学习成本的。 

　　　因此我们说vue更容易上手。

 

 

5、 性能都很好。

　　  vue和react都采用了虚拟DOM的方式，所以在性能方面是非常地接近的，这个无需多说， 

 

 

6、vue的优化做的要比react好一些。

　　在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 shouldComponentUpdate 方法。同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。 然而，使用 PureComponent 和 shouldComponentUpdate 时，需要保证该组件的整个子树的渲染输出都是由该组件的 props 所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致。这使得 React 中的组件优化伴随着相当的心智负担。

　　而在做vue相关的项目时，我们只需要关注于业务逻辑，而不需要去操心是否会产生不必要的组件渲染，因为vue已经把这些麻烦的东西很好的解决了。 

 

7、vue和react同样都支持本地渲染。

　　React Native 能使你用相同的组件模型编写有本地渲染能力的 APP（iOS 和 Android）。能同时跨多平台开发，对开发者是非常棒的。相应地，Vue 和 Weex 会进行官方合作，Weex 是阿里的跨平台用户界面开发框架，Weex 的 JavaScript 框架运行时用的就是 Vue。这意味着在 Weex 的帮助下，你使用 Vue 语法开发的组件不仅仅可以运行在浏览器端，还能被用于开发 iOS 和 Android 上的原生应用。

　　一句话： 你写的组件不仅可以跑在浏览器的网页上，也可以泡在安卓和ios的app里。 

 

 

8、 react更为繁荣。

　　react社区还是非常繁荣的，所以在知名度方面react也是更胜一筹，使用react和react-native的开发人员还是很多的，这也是vue需要学习和进步的地方。

 

 

9、 vue写起来更加流畅、方便， react语法更简单、扩展更强大。 

　　  在这一方面，react和vue的出发点似乎是不一样的，但是我还是比较喜欢vue的写法。 比如，对于列表循环，使用vue，直接在标签上写 v-for 即可，然后就可以直接循环了，而react需要通过一个数组的map，然后在return，在形式上来说，vue的写法还是更加舒服一点。 另外，由于vue局部的数据双向绑定，所以vue在处理表单这一块也是游刃有余，非常方便，而react仅仅是处理一个表单，就需要添加很多无关的代码，这个还是非常别扭的。 

　      可以看得出来，vue提供了更多的api，可以做更多的事情，但是， 这也体现了react的优点，即非常简单，提供的api很少，它只帮我们做了虚拟DOM的工作，其他的事情可以让我们自由的发挥，所以从这个角度来说，react还是更加简单一些的。    

 

 

10、 vue的文档更加好。

　　虽然react也有中文文档，但是vue的文档更新的更频繁，并且写的很好，我们可以很容易地学习。 毕竟大佬是中国的，还是很不错的，推荐初学者学习、使用。

 

 11、 无论是vue还是react我们都不需要触碰DOM。 

　　就这两者而言，我们都关心虚拟DOM，而不用去触碰DOM，这些都是vue帮助我们处理好的了。因为dom的操作是费时的，所以通过vue，我们可以很好地解决这些问题，尽可能少的减少DOM。 一般来说，对于一个项目，我们使用了vue或者是react，jquery基本上就是不需要的了。如果真的需要，看看到底哪里做的不对。

 

 

 12、vue对于事件的清除优于react。 

　　在vue中，事件绑定之后，可以在组件销毁的同时事件接触绑定，无需我们自己去手动清除； 而react却不是这样的，react需要我们在 componentDidMount 的时候绑定，在 componentWillUnMount 的时候接触绑定，否则会出现问题，尤其是添加在 document 上面的事件 。 

 

 

　　

 

 

 

 

vue与angular
　　两者都是数据双向绑定的框架，我也只是看了看angular的api，没有真正的用过，所以对于angular只能有一个简单的比较   

 

1、 angular和vue都使用了指令。

　　指令是一个比较方便的操作， 而vue作者的指令的灵感也都是从angular而来的，所以vue总体来说还是react和angular的结合体，他把两者的优点做了结合，把缺点去除，所以，vue是个好东西，可惜不完全是原创，但是也足够让我们敬佩了。

 

2、 vue比angular的设计更简单。

　　在api上，虽然vue比react复杂一些，但是angular更加复杂。 

 

3、 vue更容易上手。

　　在vue和react的比较中，我们就知道vue对于小白来说很容易就可以上手了， 而angular还要学习typescript等等，上手难度较大。 

 

4、angular的双向数据绑定不容易控制。

　　在vue中，局部使用数据双向绑定，但是全局而言使用的数据单向绑定。 而angular使用的确实数据双向绑定，所以vue更容易管理状态。

 

5、 性能上来说vue更好一些。 

　　因为vue不需要使用angular的脏检查，一些vue都已经给你做好了。 在 AngularJS 中，当 watcher 越来越多时会变得越来越慢，因为作用域内的每一次变化，所有 watcher 都要重新计算。并且，如果一些 watcher 触发另一个更新，脏检查循环（digest cycle）可能要运行多次。AngularJS 用户常常要使用深奥的技术，以解决脏检查循环的问题。有时没有简单的办法来优化有大量 watcher 的作用域。Vue 则根本没有这个问题，因为它使用基于依赖追踪的观察系统并且异步队列更新，所有的数据变化都是独立触发，除非它们之间有明确的依赖关系。

 

 

 

 

 

 

 react与angular

1、 两者的社区基础都很好。 

　　react是facebook的，angular是谷歌的，所以，我们不用担心其社区基础。

 

2、 angular是一个真正的框架，react是一个库。

　　react不是框架。 angular自身就继承了各种插件，所以，我们不需要再过多的考虑，它已经提供给你了各种解决办法，而react是比较轻的，只是解决了其中的某个痛点而已。

 

　　

3、就性能而言，react更好。

　　react提出了虚拟DOM这个关键，很好地提升了性能，这一点要比angular强大。

 

 

 

 

 三大框架与jQuery的对比
　　尽管三大框架目前都是非常流行的，但是不得不说，jQuery的使用还是大多数（90%），但是选择三大框架还是选择jQuery？ 

如果你要做单页面应用，那么你就选择三大框架； 如果你要做多页应用，你就选择jQuery。 
如果你的数据都是在在服务器端进行修改的，那么毫无疑问，使用三大框架你也没法管理数据，所以使用jQuery； 但是，如果你的数据都是在客户端的，即前端需要处理大量的数据，那么这时就需要选用三大框架了，比如vue的store仓库、比如react的store，他们对于数据的存储都有很好的管理能力。  单项数据流更使得应用便于管理，如react的store -> view -> action -> store -> view -> action。。。 如此循环往复的单项数据流。
如果你要频繁的手动操作DOM，那么选择jQuery，毕竟jQuery封装了大量的兼容性的DOM操作api； 而如果你的项目是数据驱动的，那么选择vue、react，因为你只要给定数据，就可以使得页面得到渲染了， 而不需要操作dom，或者说，有了react，dom操作就不存在了。
```

#### Vue中是如何实现双向数据绑定的？
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