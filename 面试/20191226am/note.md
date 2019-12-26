## 用友(初面)

### 框架

#### Vue的生命周期有哪些？
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

### Vue怎么做seo？
```
1.SSR服务器渲染；
2.静态化；
3.预渲染prerender-spa-plugin；
4.使用Phantomjs针对爬虫做处理。
```

#### mounted和created的区别？
```
created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。

mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

其实两者比较好理解，通常created使用的次数多，而mounted通常是在一些插件的使用或者组件的使用中进行操作，比如插件chart.js的使用: var ctx = document.getElementById(ID);通常会有这一步，而如果你写入组件中，你会发现在created中无法对chart进行一些初始化配置，一定要等这个html渲染完后才可以进行，那么mounted就是不二之选。下面看一个例子（用组件）。
```

#### 怎么获取最新dom元素？
```
- $ref：在Vue中提供了一种特别的方式来获取元素：给元素加上个ref属性，那么就可以通过this.$refs.名字来获取到该元素
- $nextTick：前面知道了Vue的生命周期的钩子函数，其中需要注意的是在DOM挂载后，事件可能不能正常的触发，需要将其放入到$nextTick方法里：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```

#### watch和computed用过吗？区别是什么？
```
computed--适用于重新计算比较费时不用重复数据计算的环境。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。如果一个数据依赖于其他数据，那么把这个数据设计为computed
watch--像是一个 data 的数据监听回调，当依赖的 data 的数据变化，执行回调，在方法中会传入 newVal 和 oldVal。可以提供输入值无效，提供中间值 特场景。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。如果你需要在某个数据变化时做一些事情，使用watch。
method-- 跟前面的都不一样，我们通常在这里面写入方法，只要调用就会重新执行一次
```

#### 使用computed需要注意什么？
https://www.jianshu.com/p/57f82bcb1115
```
computed

核心： 依赖缓存而改变

基础用法：1.get：依赖缓存，监测data数据的变化；2.set:监测computed本身数据的变化 。3，关闭cache:每次访问都是最新的而非缓存；
注意：vuex传递的computed值必须通过watch才能监测到，set函数无法监测到

实现用computed代替watch的地方：

1.data => computed
data数据改变,computed因改变而改变;而不会用watch; √
监听data的变化
demo

<template>
  <div>
    <h4>测试computed</h4>
    <div>
      <input type="text" v-model="message" />
      <span>{{defdata}}</span>
    </div>
    <div>setter</div>

  </div>

</template>

<script>
   export default {
    data () {
       return {
         message: 'hello'
       }
     },
    computed: {
       def () {
         return 'dfd'
       },
       defdata () {
         console.log(this.message) // message被改变的时候，这里会被执行；并重新赋值defdata变量
         return 'dfd' +this.message
       }
     }
  }
</script>
2.Computed => data ×
computed不能监听computed的变化(注意：即使使用set，也改变不了computed的值，只能改变data;)
监听computd的变化用set/watch
demo computed不能监听computed的变化

<template>
  <div>
    <h4>测试computed</h4>
    <div>
      <input type="text" v-model="abc" />
      <span>{{def}}</span>
    </div>
    <div>setter</div>
  </div>

</template>

<script>
   export default {
    data () {
       return {
         message: 'hello'
       }
     },
    computed: {
       abc () {
         return 'abc'
       },
       def () {
         console.log(this.abc)  // 这里不会被执行并重新赋值def变量
         return 'dfd' +this.abc
       }
     }
  }
</script>
3.computed的get是设置监听data的数据；
<template>
  <div>
    <h4>测试computed的get</h4>
    <div>
      <input type="text" v-model="message" />
      <div>{{abc}}</div>
    </div>
  </div>

</template>

<script>
   export default {
    data () {
       return {
         message: 'hello'
       }
     },
    computed: {
       abc: {
         get () {
           // 监听data的变化，每次变化都会打印123
           console.log(123)
           // abc随着    data中的message的变化而变化
           return 'abc' + this.message
         }
       }
     }
  }
</script>

<style>
</style>
4.computed的set函数
set函数当computed属性重新赋值后，set里的操作会被调用。
注：需要改变computed的值的时候，就需要设置set函数

<template>
  <div>
    <h4>测试computed的set</h4>
    <div>
      <input type="text" v-model="abc" />
    </div>
  </div>

</template>

<script>
   export default {
    data () {
       return {
         message: 'hello'
       }
     },
    computed: {
       abc: {
         get () {
           return 'abc'
         },
         set (val) {
           //  只能在set函数里面打印改变后的值
           console.log('set', val)  // => 123
         }
       }
     },
     mounted () {
       this.abc = '123'
       // 在mounted 无法打印改变后的值
       console.log('mounted', this.abc) //=> abc
     }
  }
</script>

<style>
</style>
Cache :true 默认开启计算属性的缓存； 如果需要每次访问都是最新的则关闭缓存false;
demo
<template>
  <div>
    <h4>测试computed的缓存</h4>
    <div>{{now}}</div>
  </div>

</template>

<script>
   export default {
    data () {
       return {
         message: 'hello'
       }
     },
    computed: {
      now:{
        get:function(){
          return Date.now() + this.message
        },
        cache: true   // 默认是true
      }
    },
    mounted () {
      for(let i = 0 ;i<3;i++){
        console.log(this.now)  // 当false关闭缓存的时候，每次访问now是都是最新的的。 而为true的时候，则需要依赖的属性改变了才会更新时间；
      }
    }
  }
</script>

<style>
</style>
watch能用而computed的set不能用的地方；
vuex 接收 的computed ，用set监测不到变化，必须要用watch才可以生效；（原理：实质没有改变computd的值，只是改变了get的return值）
v-model 改变的computed，用watch监测不到变化，必须要用computed对象中的set函数方法才能监测得到（原理：相当于每次改变了computed的值）
写法规范：
vuex 传递的computed值
computed: {
     abc  () {
          return 'vuex
    }
 }
自身computed定义

computed: {
    abc: {
      get () {
          return 'computed'
      }
    }
}
```

#### vue-router有几种模式？你用过哪一种？
```
vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}

- hash模式：在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

hash 路由模式的实现主要是基于下面几个特性：

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

- history模式：history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.
```

#### 如何改成history模式？
```
- 前端修改mode为history
- 后端如果是node的话，需要
1.  新建server-proxy.js文件（dev和pro公用的proxy转发文件）
```
var proxy = {
  local:"http://localhost:9999",//mock环境
}
var config = {
  dev: {
      historyApiFallback: true,
      stats: { colors: true },
      hot: true,
      inline: true,
      progress: true,
      disableHostCheck:true,
      //contentBase:"./app/index",
      proxy: {
          '/api/mock': {
            target: proxy.local, //pathRewrite: {'^/column' : '/column'},                
              secure: false,
              changeOrigin: true
          }
      }
  },
  portPro: '10086' 

}
module.exports = config;
```
2.  新建 server-after-package.js ,打包后在当前目录就可以启动history模式，并做了proxy的转发。
```
console.time('start server-after-package need time')
const http = require('http')
const fs = require('fs')
var proxyhttp = require('express-http-proxy')
var express = require('express')
var app = express()
var proxy = require('./server-proxy')
app.set('roots', __dirname+'/dist')
app.use('/', express.static(app.get('roots')))
app.engine('html', require('ejs').renderFile)
for (var i in proxy.dev.proxy) {
    if (proxy.dev.proxy.hasOwnProperty(i)) {
        console.log(i, proxy.dev.proxy[i].target)
        app.use(i + '/*', proxyhttp(proxy.dev.proxy[i].target, {
            proxyReqPathResolver: function (req, res) {
                console.log(req.originalUrl)
                return req.originalUrl
            }
        }))
    }
}
app.use('*', function (req, res, next) {
  fs.readFile(app.get('roots')+'/index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(content)
  })
});
var server = app.listen(proxy.portPro, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('app listening at ' + require("os").hostname() + ' http://localhost:' + port)
    console.timeEnd('start server-after-package need time')
})
```
```

#### Vuex用过吗？知道它流程是怎么样的吗？
```
vuex是专门为Vue提供的全局状态管理框架，具体的概念和使用参见文档：https://vuex.vuejs.org/zh-cn/。本文从源码的角度进行分析。

完整Vuex注释参见仓库：https://github.com/yylgit/vuex

index.js是入口文件，导出了6个关键方法。

import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions } from './helpers'

export default {
  Store, //创建store对象的方法
  install, //安装vuex插件的方法
  version: '__VERSION__',
  mapState, //将store中的state映射到vue组件computed的方法
  mapMutations, //将store中的mutation映射到vue组件methods的方法
  mapGetters, //将store中的state映射到vue组件computed的方法
  mapActions //将store中的action映射到vue组件methods的方法
}
4.1 Vuex的装载

首先讲到install方法，我们安装vuex使用Vue.use方法，会将Vue传递给vuex的install方法并执行

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
但是如果在引入vuex之前已经将Vue挂在了window对象上的话，则不需要再调用Vue.use方法，相关源码如下:

store.js

export function install (_Vue) {
  if (Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// auto install in dist mode
//如果window上有Vue则自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
install方法中调用了applyMixin方法，该方法在mixin.js文件中，其中如果Vue的版本大于等于2时，将vuexInit 函数mixin到init或者beforeCreate生命周期函数中，1.x版本时，通过重写Vue.prototype._init方法，将vuexInit函数放在_init的options中，_init方法在Vue的构造函数中会调用。所以在每一个vue实例创建的时候都会调用vuexInit方法。

mixin.js

export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  /**
   * 如果是2.x.x以上版本，可以使用 hook 的形式进行注入，或使用封装并替换Vue对象原型的_init方法，实现注入。
   */
  //Vue2 通过Vue组件的init方法或者beforeCreate方法
  if (version >= 2) {
    const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    //因为Vue的构造函数会调用_init方法
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }
再看一下vuexInit方法，将store对象挂在每一个vue实例的$store属性上。

/**
   * Vuex init hook, injected into each instances init hooks list.
   * 初始化Vue根组件时传入的store设置到this.$store属性上，
   * 子组件从其父组件引用$store属性，层层嵌套进行设置。
   * 在任意组件中执行 this.$store 都能找到装载的那个store对象
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      //根组件
      this.$store = options.store
      //子组件
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
4.2 Store构造函数

安装了Vuex之后，我们将利用Store方法创建store对象，示例如下：

const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
那么下面就看看Store方法的构造函数中都做了什么事情。

声明变量
this._committing 标识是否利用commit改变state
this._actions 存放所有模块的action，其中key值已经加上命名空间
this._mutations 存放所有模块的mutation，其中key值已经加上命名空间
this._wrappedGetters 存放所有模块的getter，其中key值已经加上命名空间
this._modules 存放模块树
this._modulesNamespaceMap 存放有命名空间的模块与命名空间之间的map
this._subscribers 存放订阅state变化的函数
this._watcherVM 提供一个VM用于监听state和getter的变化
this.dispatch 绑定this为store的dispatch
this.commit 绑定this为store的dispatch
state 用于存放所有模块state树的rootState
installModule 安装模块的方法
resetStoreVM 设置store._vm
plugins.forEach安装插件
具体代码如下：

constructor (options = {}) {
    //已经执行安装函数进行装载；
    //支持Promise语法
    //必须用new操作符
    if (process.env.NODE_ENV !== 'production') {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `Store must be called with the new operator.`)
    }

    const {
      plugins = [],
      strict = false
    } = options

    let {
      state = {}
    } = options
    if (typeof state === 'function') {
      state = state()
    }

    // store internal state
    //是否正在commit
    this._committing = false
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options) // Vuex支持store分模块传入，存储分析后的modules
    this._modulesNamespaceMap = Object.create(null)  // 命名空间与对应模块的map
    this._subscribers = []   // 订阅函数集合，Vuex提供了subscribe功能
    this._watcherVM = new Vue()  // Vue组件用于watch监视变化

    // bind commit and dispatch to self
    const store = this
    const { dispatch, commit } = this

    //封装替换原型中的dispatch和commit方法，将this指向当前store对象,当该方法不是使用store调用时，this仍然指向store
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // strict mode
    this.strict = strict

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    // state对象，经过installModule之后已经成了rootState
    resetStoreVM(this, state)

    // apply plugins
    plugins.concat(devtoolPlugin).forEach(plugin => plugin(this))
  }
4.3 Store的模块树和命名空间

在构造函数中我们可以看到，开始处理options参数的是这行代码

this._modules = new ModuleCollection(options)
它就是根据我们传入的store参数去构造store模块树。

关于store的模块化和命名空间参见文档：https://vuex.vuejs.org/zh-cn/...

概括起来包括以下几点：

Vuex的store可以分模块，模块可以添加命名空间，添加了命名空间的模块有局部的上下文。
传给mutation的是局部的state。
传给action的是局部和全局的state和getter。
传给getter的是局部和全局的state和getter。
默认的commit和dispatch都是分发局部的mutation和action。
若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
对于模块树的构造，我们首先需要看一下模块节点的构造函数module/module.js

this._rawModule 存放原始的模块对象
this.state 指向this._rawModule.state或者是this._rawModule.state()
this._children 存放子模块
addChild,removeChild,getChild 添加，删除和获取子模块
forEachChild，forEachGetter，forEachAction，forEachMutation分别提供
遍历这几种元素的方法
update 提供更新rawModule的方法
namespaced 判断模块是否有命名空间
import { forEachValue } from '../util'

export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    //存放子模块
    this._children = Object.create(null)
    //存放原始的模块对象
    this._rawModule = rawModule
    const rawState = rawModule.state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }
    //判断模块是否有命名空间
  get namespaced () {
    return !!this._rawModule.namespaced
  }

  addChild (key, module) {
    this._children[key] = module
  }

  removeChild (key) {
    delete this._children[key]
  }

  getChild (key) {
    return this._children[key]
  }

  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
再看一下模块树的构造函数module/module-collection.js，

this.root，指向模块树的根模块
register，根据path和参数，构造模块，并且根据path挂载到root指向的模块树上，然后遍历参数的modules对象，递归调用register。
unregister，根据path从模块树上卸载模块
update,递归更新整个模块树
get 根据path从模块树上获取module，例如path为['a']，获取到a的module
getNamespace 获取模块树上某一个模块的命名空间
注意：
模块的命名空间只与模块设置的namespaced属性有关。没有设置namespaced属性的模块它的命名空间还是全局的。

import Module from './module'
import { assert, forEachValue } from '../util'

export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }

  //根据path从模块树上获取module，例如path为['a']，获取到a的module
  get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }
  //获取模块树上某一个模块的命名空间，如果所有模块的namespaced都为true，那么得到的命名空间就和path相同
  getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }
  //递归更新整个模块树
  update (rawRootModule) {
    update([], this.root, rawRootModule)
  }


  /**
   *根据path和参数，构造模块，并且根据path挂载到root
   *指向的模块树上，然后遍参数的modules对象，递归调用register。
   */
  register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    //根module
    if (path.length === 0) {
      this.root = newModule
    } else {
      //挂到父级module
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    //子module
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
  //根据path从模块树上卸载模块
  unregister (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    if (!parent.getChild(key).runtime) return

    parent.removeChild(key)
  }
}

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule)
  }

  // update target module
  targetModule.update(newModule)

  // update nested modules
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `[vuex] trying to add a new module '${key}' on hot reloading, ` +
            'manual reload is needed'
          )
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      )
    }
  }
}

function assertRawModule (path, rawModule) {
  ['getters', 'actions', 'mutations'].forEach(key => {
    if (!rawModule[key]) return

    forEachValue(rawModule[key], (value, type) => {
      assert(
        typeof value === 'function',
        makeAssertionMessage(path, key, type, value)
      )
    })
  })
}

function makeAssertionMessage (path, key, type, value) {
  let buf = `${key} should be function but "${key}.${type}"`
  if (path.length > 0) {
    buf += ` in module "${path.join('.')}"`
  }
  buf += ` is ${JSON.stringify(value)}.`

  return buf
}
4.4 模块的安装

上一节中，讲到了将构造的模块树存到了this._modules中，接下来开始遍历模块树进行安装

installModule(this, state, [], this._modules.root)
installModule方法做了如下几件事情：

如果模块有命名空间，将对应关系存入store._modulesNamespaceMap中
调用store._withCommit设置模块的state到state树上
创建模块的局部上下文 local
循环注册模块的mutation、action和getter到 store._mutations、store._actions和store._wrappedGetters中
遍历模块的子模块递归安装
具体代码如下：

//安装模块
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    //如果这个模块是有命名空间的，则将命名空间与模块之间的关系存入_modulesNamespaceMap
    store._modulesNamespaceMap[namespace] = module
  }

  //非根组件并且非热更新，热更新是用新的模块替换原来的模块
  if (!isRoot && !hot) {
    //根据path获取上一级state对象
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    //把模块的state设置在rootState树上
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  //创建命名空间下的context对象，包括state，getter，dispatch，commit
  const local = module.context = makeLocalContext(store, namespace, path)

  //注册模块的mutation，action和getter到store中
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  //递归安装子模块
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
模块的命名空间体现在了模块注册的的各个部分，首先是局部上下文的创建

const local = module.context = makeLocalContext(store, namespace, path)
上下文包括了四个部分

dispatch方法，如果命名空间是空字符串，则直接返回store.dispatch,如果有命名空间，并且调用dispath的时候第三个参数options.root！=true的情况下，就会在调用store.dispatch的时候type加上命名空间，这样就只调用命名空间下的action。
commit方法，与dispatch方法同理
getters对象，从从store.getters中筛选命名空间下的getters
state对象，根据path从store.state中找模块对应的state
如果没有命名空间的话，那么全局的上下文就是store中的这四个元素。

具体makeLocalContext方法如下：

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
//根据命名空间来生成局部的上下文，包括type加上namespace的dispatch，commit，还有根据namespace获取的局部state和getter
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      //在!options.root的情况下type添加命名空间
      if (!options || !options.root) {
        //在type前面加上namespace，只触发该namespace的actions
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      //在!options.root的情况下type添加命名空间
      if (!options || !options.root) {
         //在type前面加上namespace，只触发该namespace的mutation
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    //<2>local的state还是从store中取的state
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
其中还用到了如下方法：

makeLocalGetters方法


//生成命名空间下的getter，从store的getter中筛选前缀是namespace的属性
function makeLocalGetters (store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length
  Object.keys(store.getters).forEach(type => {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) return

    // extract local getter type
    const localType = type.slice(splitPos)

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: () => store.getters[type],
      enumerable: true
    })
  })

  return gettersProxy
}
unifyObjectStyle方法用于dispatch和commit方法参数的适配处理

 //参数的适配处理 
//可以只传一个对象参数，对象中有type，对象本身是payload,第二个参数是options
function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', `Expects string as the type, but found ${typeof type}.`)
  }

  return { type, payload, options }
}
getNestedState方法

//根据path获取state状态，注册state树的时候用到
function getNestedState (state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}
创建了上下文以后，就开始注册mutation、action、和getter。

注册mutaion的方法，可以看到

store._mutations[type]为数组，也就是说可以有多个key值相同的mutation
只传给mutation的是local.state，即不建议利用mutation操作命名空间之外的state
我们是直接在我们写的mutation中改变state，而不需要像redux中写reducer那样要返回一个新的对象，才能够触发订阅state变化的事件
store.state是get，不能直接修改，而local.state是从state对象上找的指针，所以可以向直接操作Vue中定义的data一样直接操作改变，而能触发响应。
//注册mutation，将mutation存入store._mutations，传入的type为模块namespace+mutation的key值
//store._mutations[type]为数组，也就是说可以有多个key值相同的mutation
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    //这里的handler是我们自己写的mutation函数，
    //最终调用mutation的时候传入的是局部的state。
    //这是最终改变state的地方
    //我猜想没有传入全局state的原因是不想让我们利用局部的mutation改变全局的state
    //而把全局的state传入了action，这样就可以在action中拿到全局的state作为payload
    //传入mutation
    handler(local.state, payload)
  })
}
注册action的方法

可以看到将上下文中的四项都传给了它，而且还传了store的getters和state，所以在action中可以调用store中的任何state和getters来触发该命名空间下和全局的action和mutation，复杂的组合逻辑都可以写到action函数中。
还可以看到store._actions中的函数返回的肯定都是Promise
//注册action到store._actions，传入的type为模块的namespace+action的key值
//store._actions[type]为数组，也就是说可以有多个key值相同的action
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload, cb) {
    //这里的handler是我们自己写的action函数
    //可以看到传入了局部的dispatch,commit,getter,state,还有全局的getter和state
    let res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    //如果action返回的结果不是Promise，也会包装成Promise，所以最后action返回的结果是Promsie
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
注册getter的方法

注册getter的时候如果重名以前面的为准
getter也都可以利用全局的state和getter来组合
//注册getter，同样type是模块的namespace+getter的key值
function registerGetter (store, type, rawGetter, local) {
  //getter不是数组，是唯一的函数，action和mutation是数组
  //如果已经有了则return，说明注册getter的时候如果重名以前面的为准
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    //传给getter的四个参数
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}
至此，模块的安装就告一段落，经历了installModule之后，Store的_actions,_mutations,_wrappedGetters,还有内部的state就都拥有了内容。

4.5 设置Store的VM对象

在构造函数中调用如下：

resetStoreVM(this, state)
resetStoreVM方法

设置store._vm为VM，其中将内部变量state作为data，将store._wrappedGetters作为计算属性，利用了VM的双向绑定和计算属性的缓存
设置store.getters，指向store._vm的计算属性，利用它的缓存
清空旧VM的数据并销毁
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    //将getter存到computed对象中，然后给_vm作为计算属性，利用了算属性的缓存机制
    computed[key] = () => fn(store)
    //设置store的getters,从_vm中取，也可以直接get： () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  //利用install module之后得到的rootState和store._wrappedGetters得到的计算属性
  //创建Vue对象作为store._vm
  store._vm = new Vue({
    data: {
      $$state: state   //this.state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
最终对外的store.state是通过getter来访问store._vm._data.$$state,实现了只读的效果。

//取得this._vm._data.$$state
  get state () {
    return this._vm._data.$$state
  }
 
  //不能直接给state赋值
  set state (v) {
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `Use store.replaceState() to explicit replace store state.`)
    }
  }
4.6 commit and dispatch方法

commit方法是store对象对外提供的执行mutation的方法

根据type从this._mutations中找到mutation并依次执行
遍历执行this._subscribers触发订阅state变化的函数
 //对外提供的触发mutation的方法
  commit (_type, _payload, _options) {
    // check object-style commit
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    //执行注册的mutation，
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    //触发订阅者
    this._subscribers.forEach(sub => sub(mutation, this.state))

    if (
      process.env.NODE_ENV !== 'production' &&
      options && options.silent
    ) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
      )
    }
  }
在执行mutation改变state的时候调用了_withCommit方法,它的作用是执行改变state的时候，保证store._committing === true。在resetStoreVM时，如果是设置了严格模式store.strict == true,则调用enableStrictMode方法，利用store._vm
的watch方法，监听state的变化，如果变化，则判断store._committing === true,如果不是则发出警告不要利用mutation之外的方法改变state。

/**
* 
* 保存执行时的committing状态将当前状态设置为true后进行本次提交操作，待操作完毕后，将committing状态还原为之前的状态
*/
 _withCommit (fn) {
   // 保存之前的提交状态
   const committing = this._committing
    // 进行本次提交，若不设置为true，直接修改state，strict模式下，Vuex将会产生非法修改state的警告
   this._committing = true
   // 执行state的修改操作
   fn()
   // 修改完成，还原本次修改之前的状态
   this._committing = committing
 }
}
function enableStrictMode (store) {
 store._vm.$watch(function () { return this._data.$$state }, () => {
   if (process.env.NODE_ENV !== 'production') {
     assert(store._committing, `Do not mutate vuex store state outside mutation handlers.`)
   }
 }, { deep: true, sync: true })
}
dispatch方法是store对象对外提供的执行action的方法，返回值是promise

  dispatch (_type, _payload) {
    // check object-style dispatch
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const entry = this._actions[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }
    //逐个执行action，返回promise
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }
4.7 订阅state变化的方法

store提供了两个订阅state变化的方法，一个是subscribe，一个是watch。

subscribe方法将订阅函数放在store._subscribers中，用于监听state的变化，其实是监听commit方法的执行，在上一节的commit代码中可以看到，只要执行commit方法就触发store._subscribers中函数的执行。

  //订阅state变化的方法
  subscribe (fn) {
    const subs = this._subscribers
    if (subs.indexOf(fn) < 0) {
      subs.push(fn)
    }
    return () => {
      const i = subs.indexOf(fn)
      if (i > -1) {
        subs.splice(i, 1)
      }
    }
  }
watch方法用来订阅我们对于store.state和store.getters自定义属性的变化，利用了store._watcherVM.$watch方法

  watch (getter, cb, options) {
    if (process.env.NODE_ENV !== 'production') {
      assert(typeof getter === 'function', `store.watch only accepts a function.`)
    }
    return this._watcherVM.$watch(() => getter(this.state, this.getters), cb, options)
  }
4.8 更新store的方法

replaceState替换store.state的方法

  //替换全局的state
  replaceState (state) {
    this._withCommit(() => {
      this._vm._data.$$state = state
    })
  }
registerModule在store中注册新模块的方法,适用于多业务线之间的配合，每一个业务线将自身的模块注册到sore中。

  registerModule (path, rawModule) {
    if (typeof path === 'string') path = [path]

    if (process.env.NODE_ENV !== 'production') {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(path.length > 0, 'cannot register the root module by using registerModule.')
    }

    //在模块树上进行注册
    this._modules.register(path, rawModule)
    //安装该模块
    installModule(this, this.state, path, this._modules.get(path))
    // reset store to update getters...
    //更新_vm，主要是更新VM的计算属性和store.getters
    resetStoreVM(this, this.state)
  }
resetStore重置store的方法，除了state不变以外，重新安装模块和重设store._vm

//重置store
function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  //state没有变，installModule的第五个参数为true，不会重置state
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}
hotUpdate热更新模块的方法,调用模块树的update方法，更新模块树，然后resetStore,不会更新state。

  //热更新store
  hotUpdate (newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  }
4.9 helpers.js

Vuex的入口文件除了导出Store和install方法之外，还导出了四个帮助我们在Vue中使用Vuex的方法mapState,mapMutations,mapGetters,mapActions，他们都放在helpers.js文件中，所以我们要分析下这个文件。

getModuleByNamespace利用存储在store._modulesNamespaceMap中namespace与module的关系，来获取module。
//根据命名空间获取模块
function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}
normalizeNamespace 是内部帮助函数，规范命名空间的函数，兼容不传namespace的情况，如果不传则是空字符串

//兼容没有命名空间的函数
function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}
normalizeMap是内部帮助函数，规范map的函数，可以接受数组或者对象，最后返回的对象是{key,val}形式
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
mapState函数，先调用normalizeNamespace函数规范命名空间参数，然后规范化传入的states对象，如果val是字符串则直接返回state[val]，如果val是函数，则传入state和getter返回函数执行结果。
export const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
mapGetters函数，同理是先规范化，然后把key值添加上namespace从this.$store.getters中取。
export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
mapMutations函数，同理先规范化，key值添加namespace，然后调用commit函数，触发mutation。
export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  normalizeMap(mutations).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedMutation (...args) {
      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      //调用commit方法执行mutation
      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
mapActions函数，同理先规范化，key值添加namespace，然后调用dispatch函数，触发action。
export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedAction (...args) {
      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      //调用dispatch方法执行action
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```

#### 你都用过vue中的哪些指令？
```
1. v-text
v-text主要用来更新textContent，可以等同于JS的text属性。

<span v-text="msg"></span>
这两者等价：

<span>{{msg}}</span>
2. v-html
双大括号的方式会将数据解释为纯文本，而非HTML。为了输出真正的HTML，可以用v-html指令。它等同于JS的innerHtml属性。

<div v-html="rawHtml"></div>
这个div的内容将会替换成属性值rawHtml，直接作为HTML进行渲染。

3. v-pre
v-pre主要用来跳过这个元素和它的子元素编译过程。可以用来显示原始的Mustache标签。跳过大量没有指令的节点加快编译。

<div id="app">
    <span v-pre>{{message}}</span>  //这条语句不进行编译
    <span>{{message}}</span>
</div>
最终仅显示第二个span的内容

4. v-cloak
这个指令是用来保持在元素上直到关联实例结束时进行编译。

<div id="app" v-cloak>
    <div>
        {{message}}
    </div>
</div>
<script type="text/javascript">
    new Vue({
      el:'#app',
      data:{
        message:'hello world'
      }
    })
</script>
在页面加载时会闪烁，先显示:

<div>
    {{message}}
</div>
然后才会编译为：

<div>
    hello world!
</div>
5. v-once
v-once关联的实例，只会渲染一次。之后的重新渲染，实例极其所有的子节点将被视为静态内容跳过，这可以用于优化更新性能。

<span v-once>This will never change:{{msg}}</span>  //单个元素
<div v-once>//有子元素
    <h1>comment</h1>
    <p>{{msg}}</p>
</div>
<my-component v-once:comment="msg"></my-component>  //组件
<ul>
    <li v-for="i in list">{{i}}</li>
</ul>
上面的例子中，msg,list即使产生改变，也不会重新渲染。

6. v-if
v-if可以实现条件渲染，Vue会根据表达式的值的真假条件来渲染元素。

<a v-if="ok">yes</a>
如果属性值ok为true，则显示。否则，不会渲染这个元素。

7. v-else
v-else是搭配v-if使用的，它必须紧跟在v-if或者v-else-if后面，否则不起作用。

<a v-if="ok">yes</a>
<a v-else>No</a>
8. v-else-if
v-else-if充当v-if的else-if块，可以链式的使用多次。可以更加方便的实现switch语句。

<div v-if="type==='A'">
    A
</div>
<div v-else-if="type==='B'">
    B
</div>
<div v-else-if="type==='C'">
    C
</div>
<div v-else>
    Not A,B,C
</div>
9. v-show

<h1 v-show="ok">hello world</h1>
也是用于根据条件展示元素。和v-if不同的是，如果v-if的值是false，则这个元素被销毁，不在dom中。但是v-show的元素会始终被渲染并保存在dom中，它只是简单的切换css的dispaly属性。

注意：v-if有更高的切换开销
v-show有更高的初始渲染开销。
因此，如果要非常频繁的切换，则使用v-show较好；如果在运行时条件不太可能改变，则v-if较好
10. v-for
用v-for指令根据遍历数组来进行渲染
有下面两种遍历形式

<div v-for="(item,index) in items"></div>   //使用in，index是一个可选参数，表示当前项的索引
<div v-for="item of items"></div>   //使用of
下面是一个例子，并且在v-for中，拥有对父作用域属性的完全访问权限。

<ul id="app">
    <li v-for="item in items">
        {{parent}}-{{item.text}}
    </li>
</ul>
<script type="text/javascript">
    var example = new Vue({
      el:'#app',
      data:{
        parent:'父作用域'
        items:[
          {text:'文本1'},
          {text:'文本2'}
        ]
      }
    })
</script>
会被渲染为：

<ul id="app">
    <li>父作用域-文本1</li>
    <li>父作用域-文本2</li>
</ul>
注意：当v-for和v-if同处于一个节点时，v-for的优先级比v-if更高。这意味着v-if将运行在每个v-for循环中
11. v-bind
v-bind用来动态的绑定一个或者多个特性。没有参数时，可以绑定到一个包含键值对的对象。常用于动态绑定class和style。以及href等。
简写为一个冒号【 ：】

<1>对象语法：

//进行类切换的例子
<div id="app">
    <!--当data里面定义的isActive等于true时，is-active这个类才会被添加起作用-->
    <!--当data里面定义的hasError等于true时，text-danger这个类才会被添加起作用-->
    <div :class="{'is-active':isActive, 'text-danger':hasError}"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true,  
            hasError: false
        }
    })
</script>
渲染结果：

<!--因为hasError: false，所以text-danger不被渲染-->
<div class = "is-active"></div>
<2>数组语法

<div id="app">
    <!--数组语法：errorClass在data对应的类一定会添加-->
    <!--is-active是对象语法，根据activeClass对应的取值决定是否添加-->
    <p :class="[{'is-active':activeClass},errorClass]">12345</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            activeClass: false,
            errorClass: 'text-danger'
        }
    })
</script>
渲染结果：

<!--因为activeClass: false，所以is-active不被渲染-->
<p class = "text-danger"></p>
<3>直接绑定数据对象

<div id="app">
    <!--在vue实例的data中定义了classObject对象，这个对象里面是所有类名及其真值-->
    <!--当里面的类的值是true时会被渲染-->
    <div :class="classObject">12345</div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            classObject:{
                'is-active': false,
                'text-danger':true
            }           
        }
    })
</script>
渲染结果：

<!--因为'is-active': false，所以is-active不被渲染-->
<div class = "text-danger"></div>
12. v-model
这个指令用于在表单上创建双向数据绑定。
v-model会忽略所有表单元素的value、checked、selected特性的初始值。因为它选择Vue实例数据做为具体的值。

<div id="app">
    <input v-model="somebody">
    <p>hello {{somebody}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            somebody:'小明'
        }
    })
</script>
这个例子中直接在浏览器input中输入别的名字，下面的p的内容会直接跟着变。这就是双向数据绑定。

v-model修饰符
<1> .lazy
默认情况下，v-model同步输入框的值和数据。可以通过这个修饰符，转变为在change事件再同步。

<input v-model.lazy="msg">
<2> .number
自动将用户的输入值转化为数值类型

<input v-model.number="msg">
<3> .trim
自动过滤用户输入的首尾空格

<input v-model.trim="msg">
13. v-on
v-on主要用来监听dom事件，以便执行一些代码块。表达式可以是一个方法名。
简写为：【 @ 】

<div id="app">
    <button @click="consoleLog"></button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        methods:{
            consoleLog:function (event) {
                console.log(1)
            }
        }
    })
</script>
事件修饰符

.stop 阻止事件继续传播
.prevent 事件不再重载页面
.capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件将只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用v-on:click.prevent.self会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
```

#### vue怎么阻止原生事件冒泡？
```
.stop修饰符
```

#### 使用过vue自定义指令吗？
```
- 定义全局的自定义变量
Vue.directive('color',{
  inserted(el){
//  各单位注意，这里的el获取的是标签元素，说白了就是可以直接操作DOM    console.log(el)
    el.style.color = "red"
  }
})

<div >前端伪大叔</div>
<div v-color>前端伪大叔</div>

- 组件内指令-只有自己组件可以使用
//  template
<div >前端伪大叔</div>
<div v-color>前端伪大叔</div>

//  script
directives:{
    color:{  
     inserted(el){
       el.style.color = 'cyan'
     }
   }
}
```

#### 有没有封装过vue组件？如何封装的？(场景：提到了左边树右边列表的组件封装)
1. 建立组件的模板，先把架子搭起来，写写样式，考虑好组件的基本逻辑。　　　　os：思考1小时，码码10分钟，程序猿的准则。
2. 准备好组件的数据输入。即分析好逻辑，定好 props 里面的数据、类型。(后面详解)
3. 准备好组件的数据输出。即根据组件逻辑，做好要暴露出来的方法。（后面详解）
4. 封装完毕了，直接调用即可。
```
这里使用的是 vue-cli 的webpack打包工具

首先准备好我们符合递归条件的数据

./build/mack/data.json

[
  {
    "id": 1,
    "name": "第一层",
    "children": [
      {
        "name": "第二层"
      },
      {
        "name": "第二层"
      },
      {
        "name": "第二层"
      }
    ]
  },
  {
    "id": 1,
    "name": "第一层",
    "children": [
      {
        "name": "第二层"
      },
      {
        "name": "第二层",
        "children": [
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          }
        ]
      },
      {
        "name": "第二层",
        "children": [
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          },
          {
            "name": "第三层",
            "children": [
              {
                "name": "第四层"
              },
              {
                "name": "第四层"
              },
              {
                "name": "第四层",
                "children": [
                  {
                    "name": "第五层"
                  },
                  {
                    "name": "第五层"
                  },
                  {
                    "name": "第五层"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
 
复制代码
创建接口

./webpack.dev.conf.js

devServer: {
    ...
    before: require('./mock/index')
  },
复制代码
./mock/index

const data = require('./data')
module.exports = function (app) {
  app.get('/data', (require, result) => {
    result.send(data)
  })
}
 
复制代码
简单封装 fetch工具 ./src/api.js

 
export async function request (url) {
  return fetch(url).then(res => {
    return res.json()
  }).then(data => data)
}
 
复制代码
封装组建

./src/components/accordion.vue

<template>
  <div class="show">
    <ul v-for="(item,index) in data" :key="index">
      <li @click="showhd(index,$event)" :class="[item.children?'color':'']">{{item.name}}</li>
      <Accordion v-if="item.children" :data="item.children"></Accordion>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  props: ['data'],
  methods: {
    showhd (id, e) {
      const dom = e.target.nextElementSibling
      if (dom.className === 'show') {
        dom.className = 'head'
      } else {
        dom.className = 'show'
      }
    }
  }
}
</script>
 
<style scoped>
  .ul {
    overflow: hidden;
  }
 
  .head {
    display: none;
  }
 
  .show {
    display: block;
  }
  .color{
    color: brown;
  }
</style>
 
复制代码
调用组建

./src/components/HelloWorld.vue

<template>
  <div id="app">
    <Accordion :data="this.data"></Accordion>
  </div>
</template>
<script>
import {request} from '../api/index'
import Accordion from './accordion'
export default {
  components: {Accordion},
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    request('/data').then(res => {
      this.data = res
    })
  }
}
</script>
<style>
</style>
```

#### 用过redux吗？知道dva和redux的区别吗？
https://www.cnblogs.com/shzj/p/11174802.html
```
【react】

定位：React 是一个用于构建用户界面的JavaScript库。

特点：它采用声明范式来描述应用，建立虚拟dom，支持JSX语法，通过react构建组件，能够很好的去复用代码；

缺点：react抽离了dom，使我们构建页面变得简单，但是对于一个大型复杂应用来说，只有dom层的便捷是不够的，如何组织、管理应用的代码，如何在组件件进行有效通信，这些它都没有解决；因此，它还需要一个前端架构才能应对大型应用；

【redux】

定位：它是将flux和函数式编程思想结合在一起形成的架构；

思想：视图与状态是一一对应的；所有的状态，都保存在一个对象里面；

API：

store：就是一个数据池，一个应用只有一个；　　
state：一个 State 对应一个 View。只要 State 相同，View 就相同。
action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置。
dispatch：它是view发出action的唯一方法；
reducer：view发出action后，state要发生变化，reducer就是改变state的处理层，它接收action和state，通过处理action来返回新的state；
subscribe：监听。监听state，state变化view随之改变；
【react-redux】

定位：react-redux是为了让redux更好的适用于react而生的一个库，使用这个库，要遵循一些规范；

主要内容

UI组件：就像一个纯函数，没有state，不做数据处理，只关注view，长什么样子完全取决于接收了什么参数（props）
容器组件：关注行为派发和数据梳理，把处理好的数据交给UI组件呈现；React-Redux规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
connect：这个方法可以从UI组件生成容器组件；但容器组件的定位是处理数据、响应行为，因此，需要对UI组件添加额外的东西，即mapStateToProps和mapDispatchToProps，也就是在组件外加了一层state；
mapStateToProps：一个函数， 建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。 它返回了一个拥有键值对的对象；
mapDispatchToProps：用来建立UI组件的参数到store.dispatch方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。
       以上，redux的出现已经可以使react建立起一个大型应用，而且能够很好的管理状态、组织代码，但是有个棘手的问题没有很好地解决，那就是异步；    

【redux-saga】：

定位：react中间件；旨在于更好、更易地解决异步操作（action）；redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护；

特点：通过 Generator 函数来创建，可以用同步的方式写异步的代码；

API：

Effect： 一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。所有的Effect 都必须被 yield 才会执行。
put：触发某个action，作用和dispatch相同；
【dva】

定位：dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。dva = React-Router + Redux + Redux-saga；

核心：

State：一个对象，保存整个应用状态；
View：React 组件构成的视图层；
Action：一个对象，描述事件
connect 方法：一个函数，绑定 State 到 View
dispatch 方法：一个函数，发送 Action 到 State
model：dva 提供 app.model 这个对象，所有的应用逻辑都定义在它上面。

model内容：

namespace：model的命名空间；整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成；
state：该命名空间下的数据池；
effects：副作用处理函数；
reducers：等同于 redux 里的 reducer，接收 action，同步更新 state；
subscriptions：订阅信息；
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

#### 知道dom-diff吗？有几种比较方式
https://blog.csdn.net/one_girl/article/details/81086289
```
DIFF算法在执行时有三个维度，分别是Tree DIFF、Component DIFF和Element DIFF，执行时按顺序依次执行，它们的差异仅仅因为DIFF粒度不同、执行先后顺序不同。 
```

#### 如何从0到1搭建前端，从技术选型等来说
```
1. 选择现成的项目模板还是自己搭建项目骨架

搭建一个前端项目的方式有两种：选择现成的项目模板、自己搭建项目骨架。

选择一个现成项目模板是搭建一个项目最快的方式，模板已经把基本的骨架都搭建好了，你只需要向里面填充具体的业务代码，就可以通过内置的工具与命令构建代码、部署到服务器等。

一般来说，一个现成的项目模板会预定义一定的目录结构、书写方式，在编写项目代码时需要遵循相应的规范；也会内置必要的工具，比如 .editorconfig、eslint、stylelint、prettier、husky、lint-staged 等；也会内置必要的命令（ package.json|scripts），比如 本地开发：npm run dev、 本地预览：npm run start、 构建：npm run build、 部署：npm run deploy 等。

社区比较好的项目模板：

react-boilerplate

ant-design-pro

vue-element-admin

react-starter-kit

create-react-app

create-lila-app（我自己用的，哈哈）

这些模板的使用又分为两种：使用 git 直接克隆到本地、使用命令行创建。

（使用现有模板构建的项目，可以跳过第 2 ～ 7 步）

1.1 使用 git 直接克隆到本地

这是一种真正意义上的模板，可以直接到模板项目的 github 主页，就能看到整个骨架，比如 react-boilerplate、ant-design-pro、vue-element-admin、react-starter-kit。

以 react-boilerplate 为例，克隆到本地：

git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git <你的项目名字>

切换到目录下：

cd <你的项目名字>

一般来说，接下来运行 npm run install 安装项目的依赖后，就可以运行；有些模板可能有内置的初始化命令，比如 react-boilerplate：

npm run setup

启动应用：

npm start

这时，就可以在浏览器中预览应用了。

1.2 使用命令行创建

这种方式需要安装相应的命令，然后由命令来创建项目。

以 create-react-app 为例，安装命令：

npm install -g create-react-app

创建项目：

create-react-app my-app

运行应用：

cd my-app

npm start

1.3 自己搭建项目骨架

如果你需要定制化，可以选择自己搭建项目的骨架，但这需要开发者对构建工具如 webpack、 npm、 node及其生态等有相当的了解与应用，才能完美的把控整个项目。

下面将会一步一步的说明如何搭建一个定制化的项目骨架。

2. 选择合适的规范来写代码

js 模块化的发展大致有这样一个过程 iife=>commonjs/amd=>es6，而在这几个规范中：

iife: js 原生支持，但一般不会直接使用这种规范写代码

amd: requirejs 定义的加载规范，但随着构建工具的出现，便一般不会用这种规范写代码

commonjs: node 的模块加载规范，一般会用这种规范写 node 程序

es6: ECMAScript2015 定义的模块加载规范，需要转码后浏览器才能运行

这里推荐使用 es6 的模块化规范来写代码，然后用工具转换成 es5 的代码，并且 es6 的代码可以使用 Tree shaking 功能。

参考：

IIFE(Immediately-invoked function expression)

Tree shaking

webpack - tree-shaking

webpack 如何优雅的使用tree-shaking（摇树优化）

3. 选择合适的构建工具

对于前端项目来说，构建工具一般都选用 webpack， webpack 提供了强大的功能和配置化运行。如果你不喜欢复杂的配置，可以尝试 parcel。

参考：

webpack 之外的另一种选择：parcel

4. 确定是单页面应用（SPA）还是多页面应用

因为单页面应用与多页面应用在构建的方式上有很大的不同，所以需要从项目一开始就确定，使用哪种模式来构建项目。

4.1 多页面应用

传统多页面是由后端控制一个 url 对应一个 html 文件，页面之间的跳转需要根据后端给出的 url 跳转到新的 html 上。比如：

http://www.example.com/page1 -> path/to/page1.html

http://www.example.com/page2 -> path/to/page2.html

http://www.example.com/page3 -> path/to/page3.html

这种方式的应用，项目里会有多个入口文件，搭建项目的时候就需要对这种多入口模式进行封装。另外，也可以选择一些封装的多入口构建工具，如 lila。

4.2 单页面应用

单页面应用（single page application），就是只有一个页面的应用，页面的刷新和内部子页面的跳转完全由 js 来控制。

一般单页面应用都有以下几个特点：

本地路由，由 js 定义路由、根据路由渲染页面、控制页面的跳转

所有文件只会加载一次，最大限度重用文件，并且极大提升加载速度

按需加载，只有真正使用到页面的时候，才加载相应的文件

这种方式的应用，项目里只有一个入口文件，便无需封装。

参考：

单页面应用（SPA）、按需加载

5. 选择合适的前端框架与 UI 库

一般在搭建项目的时候就需要定下前端框架与 UI 库，因为如果后期想更换前端框架和 UI 库，代价是很大的。

比较现代化的前端框架：

react

vue

angular

一些不错的组合：

jquery + bootstrap：比较经典的

react + ant-design、material-ui、Semantic-UI： react 的组合

vue + element、iview、vux、mint-ui： vue 的组合

参考：

前端最受欢迎的 UI 框架

6. 定好目录结构

一个好的目录结构对一个好的项目而言是非常必要的。

一个好的目录结构应当具有以下的一些特点：

解耦：代码尽量去耦合，这样代码逻辑清晰，也容易扩展

分块：按照功能对代码进行分块、分组，并能快捷的添加分块、分组

编辑器友好：需要更新功能时，可以很快的定位到相关文件，并且这些文件应该是很靠近的，而不至于到处找文件

比较推荐的目录结构：

多页面应用

|-- src/ 源代码目录

   |-- page1/ page1 页面的工作空间（与这个页面相关的文件都放在这个目录下）

       |-- index.html html 入口文件

       |-- index.js js 入口文件

       |-- index.(css|less|scss) 样式入口文件

       |-- html/ html 片段目录

       |-- (css|less|scss)/ 样式文件目录

       |-- mock/ 本地 json 数据模拟

       |-- images/ 图片文件目录

       |-- components/ 组件目录（如果基于 react, vue 等组件化框架）

       |-- ...

   |-- sub-dir/ 子目录

       |-- page2/ page2 页面的工作空间（内部结构参考 page1）

           |-- ...

   |-- ...

|-- html/ 公共 html 片段

|-- less/ 公共 less 目录

|-- components/ 公共组件目录

|-- images/ 公共图片目录

|-- mock/ 公共 api-mock 文件目录

|-- ...

单页面应用

|-- src/ 源代码目录

   |-- page1/ page1 页面的工作空间

       |-- index.js 入口文件

       |-- services/ service 目录

       |-- models/ model 目录

       |-- mock/ 本地 json 数据模拟

       |-- images/ 图片文件目录

       |-- components/ 组件目录（如果基于 react, vue 等组件化框架）

       |-- ...

   |-- module1/ 子目录

       |-- page2/ page2 页面的工作空间（内部结构参考 page1）

   |-- ...

|-- images/ 公共图片目录

|-- mock/ 公共 api-mock 文件目录

|-- components/ 公共组件目录  

|-- ...

参考：

目录结构优化

7. 搭建一个好的脚手架

搭建一个好的脚手架，能够更好的编写代码、构建项目等。

可以查看 搭建自己的前端脚手架 了解一些基本的脚手架文件与工具。

比如：

|-- /                              项目根目录

   |-- src/                       源代码目录

   |-- package.json               npm 项目文件

   |-- README.md                  项目说明文件

   |-- CHANGELOG.md               版本更新记录

   |-- .gitignore                 git 忽略配置文件

   |-- .editorconfig              编辑器配置文件

   |-- .npmrc                     npm 配置文件

   |-- .npmignore                 npm 忽略配置文件

   |-- .eslintrc                  eslint 配置文件

   |-- .eslintignore              eslint 忽略配置文件

   |-- .stylelintrc               stylelint 配置文件

   |-- .stylelintignore           stylelint 忽略配置文件

   |-- .prettierrc                prettier 配置文件

   |-- .prettierignore            prettier 忽略配置文件

   |-- .babelrc                   babel 配置文件

   |-- webpack.config.js          webpack 配置文件

   |-- rollup.config.js           rollup 配置文件

   |-- gulpfile.js                gulp 配置文件

   |-- test/                      测试目录

   |-- docs/                      文档目录

   |-- jest.config.js             jest 配置文件

   |-- .gitattributes             git 属性配置

.editorconfig: 用这个文件来统一不同编辑器的一些配置，比如 tab 转 2 个空格、自动插入空尾行、去掉行尾的空格等，http://editorconfig.org

eslint、stylelint、prettier: 规范化代码风格、优化代码格式等

husky、lint-staged: 在 git 提交之前对代码进行审查，否则不予提交

.gitlab-ci.yml: gitlab ci 持续集成服务

参考：

搭建自己的前端脚手架

怎样提升代码质量

CSS 模块化

css 的弱化与 js 的强化

本地化接口模拟、前后端并行开发

到这里为止，一个基本的项目骨架就算搭建好了。

8. 使用版本控制系统管理源代码（git）

项目搭建好后，需要一个版本控制系统来管理源代码。

比较常用的版本管理工具有 git、svn，现在一般都用 git。

一般开源的项目可以托管到 http://github.com，私人的项目可以托管到 https://gitee.com、https://coding.net/，而企业的项目则需要自建版本控制系统了。

自建版本控制系统主要有 gitlab、gogs、gitea： gitlab 是由商业驱动的，比较稳定，社区版是免费的，一般建议选用这个； gogs,gitea 是开源的项目，还不太稳定，期待进一步的更新。

所以， git + gitlab 是不错的配合。

9. 编写代码

编写代码时， js 选用 es6 的模块化规范来写（如果喜欢用 TypeScript，需要加上 ts-loader），样式可以用 less、scss、 css 来写。

写 js 模块文件时，注释可以使用 jsdoc 的规范来写，如果配置相应的工具，可以将这些注释导出接口文档。

因为脚手架里有 husky、lint-staged 的配合，所以每次提交的代码都会进行代码审查与格式优化，如果不符合规范，则需要把不规范的代码进行修改，然后才能提交到代码仓库中。

比如 console.log(haha.hehe); 这段代码就会遇到错误，不予提交：

640?wx_fmt=png

这个功能定义在 package.json 中：

{

 "devDependencies": {             工具依赖

   "babel-eslint": "^8.2.6",

   "eslint": "^4.19.1",

   "husky": "^0.14.3",

   "lint-staged": "^7.2.0",

   "prettier": "^1.14.0",

   "stylelint": "^9.3.0",

   "eslint-config-airbnb": "^17.0.0",

   "eslint-config-prettier": "^2.9.0",

   "eslint-plugin-babel": "^5.1.0",

   "eslint-plugin-import": "^2.13.0",

   "eslint-plugin-jsx-a11y": "^6.1.0",

   "eslint-plugin-prettier": "^2.6.2",

   "eslint-plugin-react": "^7.10.0",

   "stylelint-config-prettier": "^3.3.0",

   "stylelint-config-standard": "^18.2.0"

 },

 "scripts": {                     可以添加更多命令

   "precommit": "npm run lint-staged",

   "prettier": "prettier --write \"./**/*.{js,jsx,css,less,sass,scss,md,json}\"",

   "eslint": "eslint .",

   "eslint:fix": "eslint . --fix",

   "stylelint": "stylelint \"./**/*.{css,less,sass,scss}\"",

   "stylelint:fix": "stylelint \"./**/*.{css,less,sass,scss}\" --fix",

   "lint-staged": "lint-staged"

 },

 "lint-staged": {                 对提交的代码进行检查与矫正

   "**/*.{js,jsx}": [

     "eslint --fix",

     "prettier --write",

     "git add"

   ],

   "**/*.{css,less,sass,scss}": [

     "stylelint --fix",

     "prettier --write",

     "git add"

   ],

   "**/*.{md,json}": [

     "prettier --write",

     "git add"

   ]

 }

}

如果你想禁用这个功能，可以把 scripts 中 "precommit" 改成 "//precommit"

如果你想自定 eslint 检查代码的规范，可以修改 .eslintrc,.eslintrc.js 等配置文件

如果你想自定 stylelint 检查代码的规范，可以修改 .stylelintrc,.stylelintrc.js 等配置文件

如果你想忽略某些文件不进行代码检查，可以修改 .eslintignore,.stylelintignore 配置文件

参考：

搭建自己的前端脚手架

10. 组件化

当项目拥有了一定量的代码之后，就会发现，有些代码是很多页面共用的，于是把这些代码提取出来，封装成一个组件，供各个地方使用。

当拥有多个项目的时候，有些组件需要跨项目使用，一种方式是复制代码到其他项目中，但这种方式会导致组件代码很难维护，所以，一般是用另一种方式：组件化。

组件化就是将组件独立成一个项目，然后在其他项目中安装这个组件，才能使用。

一般组件化会配合私有 npm 仓库一起用。

|-- project1/ 项目1

   |-- package.json

|-- project2/ 项目2

   |-- package.json    

|-- component1/ 组件1

   |-- package.json

|-- component2/ 组件2

   |-- package.json

在 project1 中安装 component1，component2 组件：

# package.json

{

 "dependencies": {

   "component1": "^0.0.1",

   "component2": "^0.0.1"

 }

}

import compoennt1 from 'compoennt1';

import compoennt2 from 'compoennt2';

如果想要了解怎样写好一个组件（ npmpackage），可以参考 从 1 到完美，写一个 js 库、node 库、前端组件库。

参考：

组件化

私有 npm 仓库

从 1 到完美，写一个 js 库、node 库、前端组件库

11. 测试

测试的目的在于能以最少的人力和时间发现潜在的各种错误和缺陷，这在项目更新、重构等的过程中尤其重要，因为每当更改一些代码后，你并不知道这些代码有没有问题、会不会影响其他的模块。如果有了测试，运行一遍测试用例，就知道更改的代码有没有问题、会不会产生影响。

一般前端测试分以下几种：

单元测试：模块单元、函数单元、组件单元等的单元块的测试

集成测试：接口依赖（ajax）、I/O 依赖、环境依赖（localStorage、IndexedDB）等的上下文的集成测试

样式测试：对样式的测试

E2E 测试：端到端测试，也就是在实际生产环境测试整个应用

一般会用到下面的一些工具：

jest

enzyme

cypress

selenium

puppeteer

另外，可以参考 聊聊前端开发的测试。

12. 构建

一般单页面应用的构建会有 npm run build 的命令来构建项目，然后会输出一个 html 文件，一些 js/css/images... 文件，然后把这些文件部署到服务器就可以了。

多页面应用的构建要复杂一些，因为是多入口的，所以一般会封装构建工具，然后通过参数传入多个入口：

npm run build -- page1 page2 dir1/* dir2/all --env test/prod

page1,page2 确定构建哪些页面； dir1/*, dir2/all 某个目录下所有的页面； all,* 整个项目所有的页面

有时候可能还会针对不同的服务器环境（比如测试机、正式机）做出不同的构建，可以在后面加参数

-- 用来分割 npm 本身的参数与脚本参数，参考 npm - run-script 了解详情

多页面应用会导出多个 html 文件，需要注意这些导出的 html 不要相冲突了。

当然，也可以用一些已经封装好的工具，如 lila。

13. 部署

在构建好项目之后，就可以部署到服务器了。

传统的方式，可以用 ftp,sftp 等工具，手动传到服务器，但这种方式比较笨拙，不够自动化。

自动化的，可以用一些工具部署到服务器，如 gulp、gulp-ssh，当然也可以用一些封装的工具，如 md-sync、lila 等

以 md-sync 为例：

npm install md-sync --save-dev

md-sync.config.js 配置文件：

module.exports = [

 {

   src: './build/**/*',

   remotePath: 'remotePath',

   server: {

     ignoreErrors: true,

     sshConfig: {

       host: 'host',

       username: 'username',

       password: 'password'

     }

   },

 },

 {

   src: './build/**/*.html',

   remotePath: 'remotePath2',

   server: {

     ignoreErrors: true,

     sshConfig: {

       host: 'host',

       username: 'username',

       password: 'password'

     }

   },

 },

];

在 package.json 的 scripts 配置好命令：

"scripts": {

 "deploy": "md-sync"

}

npm run deploy

另外，一般大型项目会使用持续集成 + shell 命令（如 rsync）部署。

14. 持续集成测试、构建、部署

一般大型工程的的构建与测试都会花很长的时间，在本地做这些事情的话就不太实际，这就需要做持续集成测试、构建、部署了。

持续集成工具用的比较多的：

jenkins

gitlab ci

jenkins 是通用型的工具，可以与 github、bitbucket、gitlab 等代码托管服务配合使用，优点是功能强大、插件多、社区活跃，但缺点是配置复杂、使用难度较高。

gitlab ci 是 gitlab 内部自带的持续集成功能，优点是使用简单、配置简单，但缺点是不及 jenkins 功能强大、绑定 gitlab 才能使用。

以 gitlab 为例（任务定义在 .gitlab-ci.yml 中）：

stages:

 - install

 - test

 - build

 - deploy

# 安装依赖

install:

 stage: install

 only:

   - dev

   - master

 script:

   - npm install

# 运行测试用例

test:

 stage: test

 only:

   - dev

   - master

 script:

   - npm run test

# 编译

build:

 stage: build

 only:

   - dev

   - master

 script:

   - npm run clean

   - npm run build

# 部署服务器

deploy:

 stage: deploy

 only:

   - dev

   - master

 script:

   - npm run deploy

以上配置表示只要在 dev 或 master 分支有代码推送，就会进行持续集成，依次运行：

npm install

npm run test

npm run clean

npm run build

npm run deploy

最终完成部署。如果中间某个命令失败了，将停止接下的命令的运行，并将错误报告给你。

这些操作都在远程机器上完成。

到这里为止，基本上完成了一个项目的搭建、编写、构建。

15. 清理服务器上过期文件

现在前端的项目基本上都会用 webpack 打包代码，并且文件名（ html 文件除外）都是 hash化的，如果需要清除过期的文件而又不想把服务器上文件全部删掉然后重新构建、部署，可以使用 sclean 来清除过期文件。

16. 收集前端错误反馈

当用户在用线上的程序时，怎么知道有没有出 bug；如果出 bug 了，报的是什么错；如果是 js 报错，怎么知道是那一行运行出了错？

所以，在程序运行时捕捉 js 脚本错误，并上报到服务器，是非常有必要的。

这里就要用到 window.onerror 了：

window.onerror = (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {

 const data = {

   title: document.getElementsByTagName('title')[0].innerText,

   errorMessage,

   scriptURI,

   lineNumber,

   columnNumber,

   detailMessage: (errorObj && errorObj.message) || '',

   stack: (errorObj && errorObj.stack) || '',

   userAgent: window.navigator.userAgent,

   locationHref: window.location.href,

   cookie: window.document.cookie,

 };

 post('url', data); // 上报到服务器

};

线上的 js 脚本都是压缩过的，需要用 sourcemap 文件与 source-map 查看原始的报错堆栈信息，可以参考 细说 js 压缩、sourcemap、通过 sourcemap 查找原始报错信息 了解详细信息。
```

### 原生js

#### 知道原型链吗？请简述一下原型链
```
> 什么是原型链：只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被称为原型链
所有的实例有一个内部指针(prototype)，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。
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

#### js实现继承的方式有几种？
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

#### new都做了过程？
```
- 创建(或者说构造)一个全新的对象
- 这个对象会被执行[[prototype]]连接
- 这个新对象会绑定到函数调用的this
- 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象
```

#### es6都用过哪些？
```
- let 和 const
- Set 和 Map数据结构
- Class
- 模板字符串
- 箭头函数
- Itertor 和 for of 遍历索引数组和类数组对象 
- ... 参数增强和打散数组
- 解构 数组/对象/参数
- Promise
- Symbol 基本类型
- Reflect
- Proxy
- Decorator 装饰器
- es6 module es6模块
```

#### 简述箭头函数的区别
```
主要区别在this指向问题
- 普通函数的this 指向调用它的那个对象，例如 obj.func ,那么func中的this就是obj
- 箭头函数不能作为构造函数，不能使用new，没有this，arguments箭头函数，箭头函数的this永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()（或者说箭头函数中的this指向的是定义时的this，而不是执行时的this）
```

#### 事件执行机制了解吗？
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

#### async await了解吗？怎么处理异常
```
async/await 中的异常处理很让人混乱。尽管有很多种方式来应对async 函数的异常，但是连经验丰富的开发者有时候也会搞错。

假设你有一个叫做run()的异步函数。在本文中，我会描述 3 种方式来处理run()的异常情形： try/catch, Go 语言风格, 函数调用的时候使用 catch()(即run().catch())。 我会跟你解释为什么其实几乎只需要catch()就足够。

try/catch

当你第一次使用async/await, 你可能尝试使用try/catch将每一个 async 操作包围起来。如果你await一个被 reject 的 Promise，JavaScript 会抛出一个可以被捕获的错误。

run();

async function run() {
    try {
        await Promise.reject(new Error("Oops!"));
    } catch (error) {
        error.message; // "Oops!"
    }
}
try/catch 能够捕获非异步的异常。

run();

async function run() {
    const v = null;
    try {
        await Promise.resolve("foo");
        v.thisWillThrow;
    } catch (error) {
        // "TypeError: Cannot read property 'thisWillThrow' of null"
        error.message;
    }
}
所以，只需要将所有的代码逻辑都用 try/catch包围起来就可以搞定？也不完全正确。下面的代码会抛出unhandled promise rejection. await将一个被拒绝的 promise 转换为可捕获的错误，但是 return 不行。

run();

async function run() {
    try {
        // 注意这里是return,不是await
        return Promise.reject(new Error("Oops!"));
    } catch (error) {
        // 代码不会执行到这里
    }
}
也不可能使用 return await来绕开。

还有一个缺点就是使用了try/catch 之后，就很难用.的语法来进行 Promise 链式组合了。

使用 Go 的语法

另一个常见的方式就是使用then()将一个本来需要用catch()来捕获并处理的 Promise 转换为普通的 Promise。然后像 Go 语言中一样，使用if(err)来处理异常。

run();

async function throwAnError() {
    throw new Error("Oops!");
}

async function noError() {
    return 42;
}

async function run() {
    // The `.then(() => null, err => err)` 来匹配正常/异常的情况。如果正常情况，返回`null`；如果异常，返回`err`
    let err = await throwAnError().then(() => null, err => err);
    if (err != null) {
        err.message; // 'Oops'
    }

    err = await noError().then(() => null, err => err);
    err; // null
}
如果你真的想要同时返回 error 和正确的值，你可以完全假装在用 Go 语言。

run();

async function throwAnError() {
    throw new Error("Oops!");
}

async function noError() {
    return 42;
}

async function run() {
    // The `.then(v => [null, v], err => [err, null])` pattern
    // 你可以使用数组解构来匹配err和返回值
    let [err, res] = await throwAnError().then(
        v => [null, v],
        err => [err, null]
    );
    if (err != null) {
        err.message; // 'Oops'
    }

    err = await noError().then(v => [null, v], err => [err, null]);
    err; // null
    res; // 42
}
使用 Go 语言风格的错误处理并不能摆脱return无法捕获的情况。而且还让整个代码更加的复杂，如果忘记if(err != null)，就会出问题。

总的来说，有两大缺点：

代码极度重复，每一个地方都少不了if (err != null) ，真的很累，而且容易漏掉；
run()函数中的非异步的错误也无法处理；
总的来说，它并没有比try/catch好多少。

在函数调用的时候使用catch()

try/catch 和 Go 语言风格的异常处理都有各自的使用场景，但是处理所有异常最好的方法是在run()函数的后面使用catch()，像这样:run().catch()。换句话说，用一个catch()来处理run函数中的所有错误，而不是针对run里面的每一种情况都去写代码做相应的处理。

run()
    .catch(function handleError(err) {
        err.message; // Oops!
    })
    // 在handleError中处理所有的异常
    // 如果handleError出错，则退出。
    .catch(err => {
        process.nextTick(() => {
            throw err;
        });
    });

async function run() {
    await Promise.reject(new Error("Oops!"));
}
记住，async 函数总是返回 promise。只要函数中有异常，Promise 会 reject。而且，如果一个 async 函数返回的是一个 reject 的 Promise，那么这个 Promise 依然会继续被 reject。

run()
    .catch(function handleError(err) {
        err.message; // Oops!
    })
    .catch(err => {
        process.nextTick(() => {
            throw err;
        });
    });

async function run() {
    // 注意：这里使用了return，而不是await
    return Promise.reject(new Error("Oops!"));
}
为什么使用run().catch()而不是将整个run()函数用try/catch包起来呢？我们首先来考虑一个情况：如果try/catch的catch部分有异常，我们应该如何处理呢？只有一个方法：在catch里面接着使用try/catch。所以，run().catch()的模式使得异常处理变得非常简洁。

总结

我们最好是全局的有一个 errorHandler 来处理那些没有考虑到的异常，比如使用run().catch(handleError)，而不是在run()函数里面所有可能出错的地方加上try/catch。
```

#### 知道jsonp吗？请简述jsonp的原理
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

### 工程化

#### webpack怎么抽离公共代码？
```
- commons-chunk-plugin：提取公共代码
```

### 怎么配置单页应用？怎么配置多页应用
```
- 单页应用可以理解为 webpack 的标准模式，直接在 entry 中指定单页应用的入口即可
- 多页应用的话，可以使用 webpack 的 AutoWebPlugin 来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范
```

### 如何提高webpack的构建速度
```
- 多入口情况下，使用CommonsChunkPlugin来提取公共代码
- 通过externals配置来提取常用库
- 利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
- 使用Happypack 实现多线程加速编译
- 使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度
- 使用Tree-shaking和Scope Hoisting来剔除多余代码
```

### 有哪些常见的Loader？他们是解决什么问题的
```
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- slint-loader：通过 SLint 检查 JavaScript 代码
- babel-loader：把 ES6 转换成 ES5
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
```

### 场景题

#### 后端返回大数据量，每个字段显示都有动画展示，如何优化用户体验？你会怎么做？
```
- 分次加载数据
- 滚动加载数据
```