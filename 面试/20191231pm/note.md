## 百车宝

### 笔试题

#### 你使用过哪些方法，来提高微信小程序的应用速度？
```
- 提高页面加载速度
- 用户行为预测
- 减少默认 data 的大小
- 组件化方案
```
https://www.jianshu.com/p/3bf92e8075a8
```
一、提高页面加载速度

在小程序这个环境下，怎样提高页面加载速度呢? 这个问题很大，我把问题具体一下，如何缩短从用户点击某个链接，到打开新页面的这段时间? 这里抛一个核心关键点：

从页面响应用户点击行为，开始跳转，到新页面onload事件触发，存在一个延迟，这个延迟大概在100-300ms之间(安卓响应比ios慢些)。

这个延迟说短不短，我们可以利用这段时间，预先发起新页面所需要的网络请求。这样一来，就节省了100-300ms(或者一个网络请求的时间)。

知道有这个gap后，代码如何实现呢?

说白了，就是实现一个在A页面预加载B页面数据的功能。但而这种跨页面的调用，很容易把逻辑搞复杂，将不同页面的逻辑耦合在一起。所以，我们希望将预加载的逻辑隐藏于无形中，不增加任何的页面间耦合，以及开发复杂度。

下面以腾讯视频小程序为例，讲解下技术实现。

小程序首页：


当用户点击海报图后，会执行以下代码(就一行)：


接下来程序会加载播放页：


播放页主要代码：


可以看到，不管是外部页面的调用还是实际逻辑的实现都非常简洁。在第二个页面中，我们扩展了Page的生命周期函数，增加了onNavigate方法。该方法在页面即将被创建但还没开始创建的时候执行。

老司机也许会发现这里有点蹊跷。在首页点击的时候，播放页根本就没有创建，对象都不存在，怎么访问到里面的方法呢?

这里就要说下微信的页面机制。

在小程序启动时，会把所有调用Page()方法的object存在一个队列里(如下图)。每次页面访问的时候，微信会重新创建一个新的对象实例(实际上就是深拷贝)。

也就是说，在A页面在执行点击响应事件的时候，B页面的实例还没创建，这时候调用的onNavigate方法，实际上是Page对象的原型(小程序启动时候创建的那个)。

而接下来马上要被创建的B页面，又是另外一个object。所以，在onNavigate和onLoad方法中，this指针指的不是同一个对象，不能把临时数据存储在当前object身上。因此我们封装了一对全局的缓存方法，$put()和$take()。


为了通用性，Page上用到的公共的方法，比如$route、$put、$take都定义在了一个Page的基类里面。基类还同时保存了所有页面的list，这样就可以做到根据页面名调用具体页面的onNavigate方法。 当然，并不是每个页面都需要实现onNavigate方法，对于没有定义onNavigate方法的，$route函数会跳过预加载环节，直接跳转页面。所以对于开发者来说，不需要关心别的页面实现了什么，对外看来完全透明。

二、用户行为预测

在上面的例子中，我们实现了用户主动点击页面，提前加载下一页面数据的方法。而在某些场景下，用户的行为可以预测，我们可以在用户还没点击的时候就预加载下个页面的数据。让下个页面秒开，进一步提升体验的流畅性。

继续以腾讯视频小程序为例，主界面分为3个页卡(大部分小程序都会这么设计)，通过简单的数据分析，发现进入首页的用户有50%会访问第二个页卡。所以预加载第二个页卡的数据可以很大程度提高用户下个点击页面的打开速度。

同样，先看看代码实现。 首页预加载频道页的姿势：


频道页的实现方法：


跟第一个例子类似，这里定义了一个$preLoad()方法，同时给Page扩展了一个onPreload事件。页面调用$preLoad()后，基类会自动找到该页面对应的onPreload函数，通知页面执行预加载操作。 跟第一个例子不同，这里预加载的数据会保存在storage内，因为用户不一定会马上访问页面，而把数据存在全局变量会增加小程序占用的内存。微信会毫不犹豫的把内存占用过大的小程序给杀掉。

也许对于大部分有app开发经验的同学来说，更普遍的做法是先让页面展示上次缓存的数据，再实时拉取新数据，然后刷新页面。这个方法在小程序上也许体验并不太好，原因是小程序的性能以及页面渲染速度都不如原生app。将一个大的data传输给UI层，是一个很重的操作。因此不建议采用这种方法。

三、减少默认data的大小

刚刚说到，页面打开一个新页面时微信会深拷贝一个page对象，因此，应该尽量减少默认data的大小，以及减少对象内的自定义属性。有图有真相：


以一个100个属性的data对象为测试用例，在iphone6上，页面的创建时间会因此增加150ms。

四、组件化方案

微信没有提供小程序的组件化方案(相信一定在实现中)。但开谈不说组件化，写再多代码也枉然。这里演示一个简单的组件化实现。

以腾讯视频播放页为例，页面定义如下：


其中，P()函数是自定义的基类。这是一个非常有用的东西，可以把所有通用的逻辑都写在基类里面，包括pv统计，来源统计，扩展生命周期函数，实现组件化等。

函数第一个参数是页面名称，作为页面的key。第二个是page对象，其中扩展了一个comps数组，里面就是所有要加载的组件。

以播放器组件/comps/player/index.js为例：


组件的定义跟一个普通Page对象一模一样，有data属性，onLoad、onShow等事件，也有页面响应的回调方法。wxml模板里定义的事件和js事件一一对应。

基类做的事情，就是把这些组件对象的属性和方法复制到Page对象上(浅拷贝)。其中data属性会merge到一起。而微信预定义的生命周期函数(包括自己扩展的)，则封装成队列按序执行。比如当系统调用onLoad方法时，实际上是执行了所有组件的onLoad方法，最后再执行Page的onLoad。

以上是代码部分，至于wxml模板和wxss部分，就要手工import过去了。

wxml：


wxss：


五、其他

虽然小程序已经足够小巧，但启动速度还是有那么2-3秒，无法做到秒开。楼主尝试对小程序的启动时间做优化，但没有找到多少有价值的优化点。单个页面的初始化只需要1-2ms。也许大部分时间消耗在了微信跟服务器端通信的过程中。

所幸，腾讯提供了一个可以自主进行服务器性能测试的环境，用户只需要填写域名和简单的几个参数就可以获知自己的服务器性能情况，目前在腾讯WeTest平台可以免费使用。
```

#### 怎么解决小程序的异步请求问题？
```
小程序支持大部分 ES6 语法
1、在返回成功的回调里面处理逻辑
2、Promise 异步
```
https://blog.csdn.net/qq_16646819/article/details/81235550
```
小程序一般需要用token，去识别用户身份，每次获取到token之后，再进行下一步操作。再获取到token之后，将token同步缓存，

app.js:

login: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (wx.getStorageSync('token')) {
                resolve(wx.getStorageSync('token'))
            } else {
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            wx.request({
                                url: that.baseUrl + 'tt/wx/' + res.code,
                                header: {
                                    'content-type': 'application/json',
                                    'cld.stats.page_entry': that.globalData.scene,
                                    'version': that.globalData.version
                                },
                                method: 'GET',
                                success: function (e) {
                                    if (e.statusCode == 200) {
                                        that.globalData.token = e.data.token;
                                        wx.setStorageSync('token', e.data.token);
                                        resolve(e.data.token)
                                    }
                                },
                                fail: () => {
 
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            }
        })
    },
在调用login方法的时候先判断本地有没有缓存的token，如果有直接返回，没有的话再从后台通过接口获取，获取之后token之后同步缓存。

在首页index.js，页面onload的时候需要加载新闻列表，因为小程序所有请求都是异步加载，直接从缓存取token,有可能取不到，这样可以再index.js里面这样写，具体的封装请求方法，在我的另一篇博客里面有方法，这里不多做叙述。

app.login().then(() => {
   api.request(api.Url.newsList, 'POST', {
    type: 1,
    page:1
    }).then(res => {
        console.log('success:', res)
    }).catch(res => {
      console.log("fail:", res)
    }).finallly(()=>{
        console.log("finallly:", 结束)
    })
});
这样的话就会避免取不到token的情况，之所以在login方法先判断是否存在token缓存，一是避免不必要的请求，二是避免重复请求
```

#### 小程序和Vue写法的区别？
https://segmentfault.com/a/1190000015684864
```
一、生命周期

先贴两张图：

vue生命周期

clipboard.png

小程序生命周期

clipboard.png

相比之下，小程序的钩子函数要简单得多。

vue的钩子函数在跳转新页面时，钩子函数都会触发，但是小程序的钩子函数，页面不同的跳转方式，触发的钩子并不一样。

onLoad: 页面加载
一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
onShow: 页面显示
每次打开页面都会调用一次。
onReady: 页面初次渲染完成
一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。详见生命周期
onHide: 页面隐藏
当navigateTo或底部tab切换时调用。
onUnload: 页面卸载
当redirectTo或navigateBack的时候调用。
数据请求

在页面加载请求数据时，两者钩子的使用有些类似，vue一般会在created或者mounted中请求数据，而在小程序，会在onLoad或者onShow中请求数据。

二、数据绑定

VUE:vue动态绑定一个变量的值为元素的某个属性的时候，会在变量前面加上冒号：，例：

<img :src="imgSrc"/>
小程序：绑定某个变量的值为元素属性时，会用两个大括号括起来，如果不加括号，为被认为是字符串。例：

<image src="{{imgSrc}}"></image>
三、列表渲染

直接贴代码，两者还是有些相似
vue：

<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
小程序：


Page({
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

<text wx:for="{{items}}">{{item}}</text>
四、显示与隐藏元素

vue中，使用v-if 和v-show控制元素的显示和隐藏

小程序中，使用wx-if和hidden控制元素的显示和隐藏

五、事件处理

vue：使用v-on:event绑定事件，或者使用@event绑定事件,例如:

<button v-on:click="counter += 1">Add 1</button>
<button v-on:click.stop="counter+=1">Add1</button>  //阻止事件冒泡
小程序中，全用bindtap(bind+event)，或者catchtap(catch+event)绑定事件,例如：

<button bindtap="noWork">明天不上班</button>
<button catchtap="noWork">明天不上班</button>  //阻止事件冒泡
六、数据双向绑定

1.设置值

在vue中,只需要再表单元素上加上v-model,然后再绑定data中对应的一个值，当表单元素内容发生变化时，data中对应的值也会相应改变，这是vue非常nice的一点。

<div id="app">
    <input v-model="reason" placeholder="填写理由" class='reason'/>
</div>

new Vue({
  el: '#app',
  data: {
   reason:''
  }
})
但是在小程序中，却没有这个功能。那怎么办呢？
当表单内容发生变化时，会触发表单元素上绑定的方法，然后在该方法中，通过this.setData({key:value})来将表单上的值赋值给data中的对应值。
下面是代码，可以感受一下:

<input bindinput="bindReason" placeholder="填写理由" class='reason' value='{{reason}}' name="reason" />

Page({
data:{
    reason:''
},
bindReason(e) {
    this.setData({
      reason: e.detail.value
    })
  }
})
当页面表单元素很多的时候，更改值就是一件体力活了。和小程序一比较，vue的v-model简直爽的不要不要的。

2.取值

vue中，通过this.reason取值

小程序中，通过this.data.reason取值

clipboard.png

七、绑定事件传参

在vue中，绑定事件传参挺简单，只需要在触发事件的方法中，把需要传递的数据作为形参传入就可以了，例如：

<button @click="say('明天不上班')"></button>

new Vue({
  el: '#app',
  methods:{
    say(arg){
    consloe.log(arg)
    }
  }
})
在小程序中，不能直接在绑定事件的方法中传入参数，需要将参数作为属性值，绑定到元素上的data-属性上，然后在方法中，通过e.currentTarget.dataset.*的方式获取，从而完成参数的传递，很麻烦有没有...

<view class='tr' bindtap='toApprove' data-id="{{item.id}}"></view>
Page({
data:{
    reason:''
},
toApprove(e) {
    let id = e.currentTarget.dataset.id;
  }
})
clipboard.png

八、父子组件通信

1.子组件的使用

在vue中，需要：

编写子组件
在需要使用的父组件中通过import引入
在vue的components中注册
在模板中使用
//子组件 bar.vue
<template>
  <div class="search-box">
    <div @click="say" :title="title" class="icon-dismiss"></div>
  </div>
</template>
<script>
export default{
props:{
    title:{
       type:String,
       default:''
      }
    }
},
methods:{
    say(){
       console.log('明天不上班');
       this.$emit('helloWorld')
    }
}
</script>

// 父组件 foo.vue
<template>
  <div class="container">
    <bar :title="title" @helloWorld="helloWorld"></bar>
  </div>
</template>

<script>
import Bar from './bar.vue'
export default{
data(){
    return{
        title:"我是标题"
    }
},
methods:{
    helloWorld(){
        console.log('我接收到子组件传递的事件了')
    }
},
components:{
    Bar
}
</script>
在小程序中，需要：

编写子组件
在子组件的json文件中，将该文件声明为组件
{
  "component": true
}
在需要引入的父组件的json文件中，在usingComponents填写引入组件的组件名以及路径
"usingComponents": {
    "tab-bar": "../../components/tabBar/tabBar"
  }
在父组件中，直接引入即可
<tab-bar currentpage="index"></tab-bar>
具体代码:
// 子组件
<!--components/tabBar/tabBar.wxml-->
<view class='tabbar-wrapper'>
  <view class='left-bar {{currentpage==="index"?"active":""}}' bindtap='jumpToIndex'>
    <text class='iconfont icon-shouye'></text>
    <view>首页</view>
  </view>
  <view class='right-bar {{currentpage==="setting"?"active":""}}' bindtap='jumpToSetting'>
    <text class='iconfont icon-shezhi'></text>
    <view>设置</view>
  </view>
</view>
2.父子组件间通信

在vue中

父组件向子组件传递数据，只需要在子组件通过v-bind传入一个值，在子组件中，通过props接收，即可完成数据的传递，示例:

// 父组件 foo.vue
<template>
  <div class="container">
    <bar :title="title"></bar>
  </div>
</template>
<script>
import Bar from './bar.vue'
export default{
data(){
    return{        
        title:"我是标题"
    }
},
components:{
    Bar
}
</script>

// 子组件bar.vue
<template>
  <div class="search-box">
    <div :title="title" ></div>
  </div>
</template>
<script>
export default{
props:{
    title:{
       type:String,
       default:''
      }
    }
}
</script>
子组件和父组件通信可以通过this.$emit将方法和数据传递给父组件。

在小程序中

父组件向子组件通信和vue类似，但是小程序没有通过v-bind，而是直接将值赋值给一个变量，如下：

<tab-bar currentpage="index"></tab-bar>

此处， “index”就是要向子组件传递的值
在子组件properties中，接收传递的值

properties: {
    // 弹窗标题
    currentpage: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'index'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  }
子组件向父组件通信和vue也很类似，代码如下:

//子组件中
methods: {   
    // 传递给父组件
    cancelBut: function (e) {
      var that = this;
      var myEventDetail = { pickerShow: false, type: 'cancel' } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail) //myevent自定义名称事件，父组件中使用
    },
}

//父组件中
<bar bind:myevent="toggleToast"></bar>

// 获取子组件信息
toggleToast(e){
    console.log(e.detail)
}
如果父组件想要调用子组件的方法

vue会给子组件添加一个ref属性，通过this.$refs.ref的值便可以获取到该子组件，然后便可以调用子组件中的任意方法，例如：

//子组件
<bar ref="bar"></bar>

//父组件
this.$ref.bar.子组件的方法
小程序是给子组件添加id或者class，然后通过this.selectComponent找到子组件，然后再调用子组件的方法,示例：

//子组件
<bar id="bar"></bar>

// 父组件
this.selectComponent('#id').syaHello()
小程序父组件改变子组件样式

1.父组件将style传入子组件
2.父组件传入变量控制子组件样式
3.在父组件样式中，在子组件类名前面加上父组件类名

<view class='share-button-container' bindtap='handleShareBtn'>
   <share-button  product="{{goodProduct}}" type="1" back-color="#fff" fore-color="#9e292f" bind:error="on_error" />
</view>

.share-button-container .button--btn-navigator__hover{
  background: #fff;
}
小程序和vue在这点上太相似了，有木有。。。
```

#### H5中viewport-fit做什么用的？
https://www.cnblogs.com/sunshq/p/10076719.html
```
iPhone X 配备一个覆盖整个手机的全面屏，顶部的“刘海”为相机和其他组件留出了空间。然而结果就是会出现一些尴尬的情景：网站被限制在一个“安全区域”，在两侧边缘会出现白条儿。移除这个白条儿也不难，给 body 设置一个 background-color 就可以搞定。或者，可以添加 viewport-fit=cover meta 标签，将整个网站扩展到整个屏幕。
`<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`
图0：iPhone X 的刘海和 CSS

然后就由你来决定被安全区域制约的重叠区了。有一些新的 CSS 可以助你一臂之力。Stephen Radford 文档：

为了处理这些需求，iOS 11 的 Safari 引入了一些 constant 来处理 viewport-fit=cover 属性。

safe-area-inset-top
safe-area-inset-right
safe-area-inset-left
safe-area-inset-bottom
这些值可以应用到 margin、padding 上，也可以应用到绝对定位的 top 或 left 上。

在网页的 container 上添加如下代码：

`padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);`
```

#### <span></span>绑定了click事件，嵌入ios app后点击无效，如何解决？
```
1. 给需要绑定事件的元素添加一个css cursor: pointer ，事件依然用click事件。
.farmGoods{
    cursor:pointer;
 }

2. 第二种解决方案是将click事件替换为touchstart事件，或者click事件与touchstart事件并存。
$(document).on("touchstart",".farmGoods",function(){
     alert('111');
 });

3. 换标签
```

#### 以下代码输出的结果：

1. 答案：2
```
    let s=new Set();
    s.add([1]);
    s.add([1]);
    console.log(s.size);
```

2. 答案：undefined
```
    let map=new Map();
    map.set([5],'测试问题');
    let con=map.get([5]);
    console.log(con);
```

3. 答案：1 2 4 3
```
    const promise=new Promise((resolve,reject)=>{
        console.log(1);
        resolve();
        console.log(2)
    });
    promise.then(()=>{
        console.log(3);
    });
    console.log(4);
```

### 原生js

#### 媒体查询实现响应式页面的原理是什么？
```
@media 是非常有用的。 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面，这对调试来说是一个极大的便利
媒体类型
all         用于所有设备
print       用于打印机和打印预览
screen      用于电脑屏幕，平板电脑，智能手机等。（最常用）
speech      应用于屏幕阅读器等发声设备
媒体功能
max-width   定义输出设备中的页面最大可见区域宽度
min-width   定义输出设备中的页面最小可见区域宽度
实例
@media screen and (max-width: 300px) {//文档宽度小于等于300px时body背景是亮蓝色
    body {
        background-color:lightblue;
    }
}
@media screen and (min-width: 300px){//文档宽度大于等于300px时body背景是亮蓝色
    body {
        background-color:lightblue;
    }
}
@media screen and (min-width:300px) and (max-width:500px) {//文档宽度大于等于300px小于等于500px时加载css代码
    /* CSS 代码 */
}
```

#### 构建H5页面需要考虑哪些因素？
```
一、内存的评估

其实内存的评估主要用于评估项目美术资源的使用程度，相比代码和配置占用的内存量，美术资源才是大头。这一步对于我们程序来说非常重要，因为策划不懂，设计为了效果不会去考虑美术量是否过大。但是再我们没有经历过完整项目之前，我们怎么知道要做一个怎样的限制呢？很简单，我们只需要去看看市面上当红H5产品，F12看看他的美术资源，地图有多少格，每张多大，人物动画，技能特效等等资源有多大！基本上就可以换算出大概的内存占用量。然后再用较为低端的手机跑一跑，看看是否有浏览器崩溃的情况。因为崩溃往往是内存爆了！一句话总结 内存的评估主要是告诉策划和美术，我们的地图最大能多大，我们的人物动作几个合适几帧合适，ui资源得多复用多9宫格！因为这些决定了你的游戏能在多低端的手机上成功运行！

二、drawcall的评估

这一指标影响了渲染性能，直接影响你的游戏卡不卡，当然前提是你的代码逻辑没什么坑自己的地方！简单的评估同样可以参考市面上的当红产品，看看他们最多同屏多少个角色，多少个特效，UI面板的多少。虽然cacheAsBitmap可以减少drawcall，但是那也是用内存来换的性能，意味着如果使用不合理又会对内存带来压力。所以游戏中同屏对象的数量限制你也需要实践来进行评测。一句话总结 drawcall的评估，主要是为了在低端机上也能流畅的运行，告诉策划我们能不能多武将多美人，怪物能不能一堆一堆的出现，地图块多大尺寸合适！这些决定了你的游戏能在多低端的手机上不卡顿！

三、引擎的选择

目前市面上最流行的H5引擎就是egret和layabox了，传说中layabox的性能要优于egret，由于egret的工具更加完善一点，所以当初选择了egret。但是发现开发过程中，为了方便项目的使用。序列帧动画生成工具，地图编辑器等等工具都是自己开发的。所以说虽然egret工具很多，但是发现对于自己来说使用价值不大。建议大家以引擎稳定性和性能为主要考虑条件。最简单的性能评估，就是使用两个引擎跑同样的demo看各个数据。这个demo主要用于评估引擎的渲染性能和执行性能，比如drawcall极限测试，cacheAsBitmap极限测试，资源加载效率测试等等。 毕竟引擎帮我们做的最多的其实就是渲染和资源加载这一块。一句话总结 性能的重要性要大于工具是否使用方便，因为方便的工具往往是自己根据项目定制开发！引擎的选择绝对不是看几篇别人的广告帖子贴出来的参数就决定了，必须自己去实践对比！
```

#### jsonp的原理是什么？如何判断后台返回的是json还是jsonp？
```
1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>）；

3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；

4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

8、ajax 的核心是通过 XmlHttpRequest 获取非本页内容，而 jsonp 的核心则是动态添加 <script> 标签来调用服务器提供的 js 脚本。

9、jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。
```
https://www.jianshu.com/p/f46dd756873e
```
判断有没有callback参数，其实json和jsonp本质上都是字符串，只是jsonp是外层包裹了一层函数。

json

下面是jquery的ajax请求，数据类型为json,它是以json格式在前后台进行数据的传输，它与局限性就是不能跨域请求，这是为了网络数据的安全所制定的规则。

$.ajax({
            type: "post", // 数据提交类型
            url: "danmu.php",// 请求地址 同源服务器/浏览器安全设置
            data: {word:"abc",username:"ltt"}, // 发送数据
            dataType: "json", // 返回数据的类型
            async: true, // 是否异步，true为异步
            // success为数据加载完成后的回调函数
            success: function(data){
                var show = document.getElementById('show');
                for(i in data){
                    show.innerHTML += data[i]+"<br>";
                }
                console.log(data);
            }       
        });
这是后台部分，首先判断前台是否请求数据，如果请求了，就将前台需要的数据返回给前台。
注意：返回给前台的数据一定要转成json格式的，通过json_encode将数组转换成json格式

<?php
    if(!empty($_POST['word'])){
        $arr = [];
        $word = htmlspecialchars($_POST['word']);
        $username = htmlspecialchars($_POST['username']);
        $arr[] = $word;
        $arr[] = $username;
        $fp = fopen("danmu.txt","a+");
        fwrite($fp,$word."\n");
        fclose($fp);
        echo json_encode(array($word));
    }
?>
由于json不能跨域请求，于是就有了jsonp

jsonp

大家都知道script标签是可以跨域请求的，jsonp的原理就是通过script的src，将函数作为src请求地址的参数来传递数据，所以jsonp只有get一种传输方式。
下面是jsonp的数据交互，首先定义一个回调函数，定义dataType类型为jsonp,将函数作为参数传输给后台，它与json相比是多了一层函数。

<script type="text/javascript">
        // 自定义的回调函数
        function show(val){
            document.getElementById("show").src=val[0].src;
        }
        $.ajax({
            type:"get",
            url:"myphp.php",
            dataType:"jsonp", // 现在时jsonp请求，这个时候，jquery使用的是script标签发送请求
            jsonp:"callmyphp", // 后台用来接受函数名的变量名
            jsonpCallback:"show",// 自定义的回调函数名
            async:true,
        });
至于什么时候用json什么时候用jsonp？我就一个原则，能使用json的时候都是用json，只有必须要跨域请求时才使用jsonp
```

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