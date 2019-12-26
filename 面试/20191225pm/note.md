## 字节跳动-懂车帝(初面)

### 框架

#### 看你项目有小程序经验，请你简述一下小程序的实现原理是什么？
https://www.jianshu.com/p/fd9ea1b57f8d
```
微信小程序

项目结构


项目结构
上图为微信小程序的项目结构，pages下面包含了小程序中的每一个页面，每一个页面由页面结构，页面样式，页面配置和逻辑代码四部分组成。

页面结构
页面结构文件为index.wxml，通过微信自定义的标签来写。

页面逻辑
页面逻辑通过JavaScript来书写。

页面样式表
类似CSS文件，来定义页面内元素的样式。

页面配置
页面内的权限等配置信息。

微信小程序的技术选型

小程序的定位特点是轻，快，针对这两个特点，在技术选型上，微信进行了一些考量。

渲染界面的技术

用纯客户端原生技术来渲染
缺点：无法动态打包，动态下发。

用纯 Web 技术来渲染
缺点：如果我们用纯 Web 技术来渲染小程序，在一些有复杂交互的页面上可能会面临一些性能问题，这是因为在 Web 技术中，UI渲染跟 JavaScript 的脚本执行都在一个单线程中执行，这就容易导致一些逻辑任务抢占UI渲染的资源。

介于客户端原生技术与 Web 技术之间的，互相结合各自特点的技术来渲染
从渲染底层来看，PhoneGap与微信 JS-SDK 是类似的，它们最终都还是使用浏览器内核来渲染界面。而 RN 则不同，虽然是用 Web 相关技术来编写，同样是利用了 JavaScript 解释执行的特性，但 RN 在渲染底层是用客户端原生渲染的。我们选择类似于微信 JSSDK 这样的 Hybrid 技术，即界面主要由成熟的 Web 技术渲染，辅之以大量的接口提供丰富的客户端原生能力。同时，每个小程序页面都是用不同的WebView去渲染，这样可以提供更好的交互体验，更贴近原生体验，也避免了单个WebView的任务过于繁重。

微信没有选择RN的原因

RN 所支持的样式是 CSS 的子集，会满足不了 Web 开发者日渐增长的需求，而对 RN 的改造具有不小的成本和风险。

RN 现有能力下还存在的一些不稳定问题，比如性能、Bug等。RN 是把渲染工作全都交由客户端原生渲染，实际上一些简单的界面元素使用 Web 技术渲染完全能胜任，并且非常稳定。

RN 存在一些不可预期的因素，比如之前出现的许可协议问题

原生组件的渲染方式

在安卓则是往 WebView 的 window 对象注入一个原生方法，最终会封装成 WeiXinJSBridge 这样一个兼容层，主要提供了调用（invoke）和监听（on）这两种方法。开发者插入一个原生组件，一般而言，组件运行的时候被插入到 DOM 树中，会调用客户端接口，通知客户端在哪个位置渲染一块原生界面。在后续开发者更新组件属性时，同样地，也会调用客户端提供的更新接口来更新原生界面的某些部分。

Web渲染带来的问题与解决

提供干净纯粹的JavaScript执行环境
由于JavaScript的灵活性和浏览器的功能丰富，会导致很多不可控的隐私，因此，微信提供了一个单纯的JS执行环境，通过对于其中的控件也进行了自定义。因此完全采用这个沙箱环境不能有任何浏览器相关接口，只提供纯JavaScript 的解释执行环境，那么像HTML5中的ServiceWorker、WebWorker特性就符合这样的条件，这两者都是启用另一线程来执行 JavaScript。但是考虑到小程序是一个多 WebView 的架构，每一个小程序页面都是不同的WebView 渲染后显示的，在这个架构下我们不好去用某个WebView中的ServiceWorker去管理所有的小程序页面。得益于客户端系统有JavaScript 的解释引擎（在iOS下是用内置的 JavaScriptCore框架，在安卓则是用腾讯x5内核提供的JsCore环境），我们可以创建一个单独的线程去执行 JavaScript，在这个环境下执行的都是有关小程序业务逻辑的代码，也就是我们前面一直提到的逻辑层。而界面渲染相关的任务全都在WebView线程里执行，通过逻辑层代码去控制渲染哪些界面，那么这一层当然就是所谓的渲染层。这就是小程序双线程模型的由来。

标签自定义
为了防止标签定义带来的一些问题，微信自定义了一套标签语言，WXML，这套标签语言经过编译之后，最终会生成Html。

渲染与逻辑的分离

上面是小程序的渲染技术的选型，在选型之后，由于渲染和逻辑不再同一个浏览器执行，一个在纯JS环境中，一个通过WebView渲染，因此小程序的运行环境分成渲染层和逻辑层，WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。

小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由Native转发，小程序的通信模型如图所示。


逻辑渲染分离
数据驱动视图变化

在开发UI界面过程中，程序需要维护很多变量状态，同时要操作对应的UI元素。随着界面越来越复杂，我们需要维护很多变量状态，同时要处理很多界面上的交互事件，整个程序变得越来越复杂。通常界面视图和变量状态是相关联的，如果有某种“方法”可以让状态和视图绑定在一起（状态变更时，视图也能自动变更），那我们就可以省去手动修改视图的工作。

小程序的逻辑层和渲染层是分开的两个线程。在渲染层，宿主环境会把WXML转化成对应的JS对象，在逻辑层发生数据变更的时候，我们需要通过宿主环境提供的setData方法把数据从逻辑层传递到渲染层，再经过对比前后差异，把差异应用在原来的Dom树上，渲染出正确的UI界面。


通过setData把msg数据从“Hello World”变成“Goodbye”，产生的JS对象对应的节点就会发生变化，此时可以对比前后两个JS对象得到变化的部分，然后把这个差异应用到原来的Dom树上，从而达到更新UI的目的，这就是“数据驱动”的原理。


数据驱动变化

数据驱动变化原理
事件的处理

UI界面的程序需要和用户互动，例如用户可能会点击你界面上某个按钮，又或者长按某个区域，这类反馈应该通知给开发者的逻辑层，需要将对应的处理状态呈现给用户。由于WebView现在具备的功能只是进行渲染，因此对于事件的分发处理，微信进行了特殊的处理，将所有的事件拦截后，丢到逻辑层交给JavaScript进行处理。


时间拦截与派发
事件的派发处理，具备事件捕获和冒泡两种机制。通过native传递给JSCore，通过JS来响应响应的事件之后，对Dom进行修改，改动会体现在虚拟Dom上，然后再进行真实的渲染。


事件冒泡
数据通信

小程序是基于双线程模型，那就意味着任何数据传递都是线程间的通信，也就是都会有一定的延时。这不像传统Web那样，当界面需要更新时，通过调用更新接口UI就会同步地渲染出来。在小程序架构里，这一切都会变成异步。

异步会使得各部分的运行时序变得复杂一些。比如在渲染首屏的时候，逻辑层与渲染层会同时开始初始化工作，但是渲染层需要有逻辑层的数据才能把界面渲染出来，如果渲染层初始化工作较快完成，就要等逻辑层的指令才能进行下一步工作。因此逻辑层与渲染层需要有一定的机制保证时序正确，

在每个小程序页面的生命周期中，存在着若干次页面数据通信。逻辑层向视图层发送页面数据（data和setData的内容），视图层向逻辑层反馈用户事件。


渲染生命周期
通过Json的方式进行数据的传递，提高性能的方式就是减少交互的数据量。

缓存机制

小程序宿主环境会管理不同小程序的数据缓存，不同小程序的本地缓存空间是分开的，每个小程序的缓存空间上限为10MB，如果当前缓存已经达到10MB，再通过wx.setStorage写入缓存会触发fail回调。

小程序的本地缓存不仅仅通过小程序这个维度来隔离空间，考虑到同一个设备可以登录不同微信用户，宿主环境还对不同用户的缓存进行了隔离，避免用户间的数据隐私泄露。

由于本地缓存是存放在当前设备，用户换设备之后无法从另一个设备读取到当前设备数据，因此用户的关键信息不建议只存在本地缓存，应该把数据放到服务器端进行持久化存储。

支付宝小程序

支付宝小程序简介

支付宝小程序的实现和微信小程序的实现方式大致是相同的，因此这里主要针对两者的差异性的地方。

支付宝小程序目录结构



项目目录结构
支付宝小程序业务架构图



小程序业务架构
在渲染引擎上面，支付宝小程序不仅提供 JavaScript+Webview 的方式，还提供 JavaScript+Native 的方式，在对性能要求较高的场景，可以选择 Native 的渲染模式，给用户更好的体验。

运行时架构

小程序编程模型是分为多个页面，每个页面有自己的 template、CSS 和 JS，实际在运行的时候，业务逻辑的 JS 代码是运行在独立的 JavaScript 引擎中，每个页面的 template 和 CSS 是运行在各自独立的 webview 里面，页面之间是通过函数 navigateTo 进行页面的切换。

每个 webview 里面的页面和公共的 JavaScript 引擎里面的逻辑的交互方式是通过消息服务，页面的一些事件都会通过这个消息通道传给 JavaScript 引擎运行环境，这个运行环境会响应这个事件，做一些 API 调用，可调到客户端支付宝小程序提供的一些能力，处理之后会把这个数据再重新发送给对应的页面渲染容器来处理，把数据和模板结合在一起来，在产生最终的用户界面。


小程序运行时
支付宝小程序虚拟机隔离

通常的做法是在 WebView 里面运行 render 的代码，然后另起一个线程运行 serviceworker，当 serviceworker 需要更新 dom 的时候把事件和数据通过 messagechannel 发送给 render 线程来执行，当业务需要传递到 render 层数据量较大，对象较复杂时，交互的性能就会比较差，因此针对这种情况我们提出一个优化的解决方案。

该方案将原始的 JS 虚拟机实例 (即 Isolate) 重新设计成了两个部分：Global Runtime 和 Local Runtime。

Global Runtime 部分是存放共享的装置和数据，全局一个实例。

Local Runtime 是存放实例自身相关的模块和私有数据，这些不会被共享。

在新的隔离模型下，webview 里面的 v8 实例就是一个 Local Runtime，worker 线程里面的 v8 实例也是一个 Local Runtime，在 worker 层和 render 层交互时，setData 对象的会直接创建在 Shared Heap 里面，因此 render 层的 Local Runtime 可以直接读到该对象，并且用于 render 层的渲染，减少了对象的序列化和网络传输，极大的提升了启动性能和渲染性能。


首屏速度优化


首屏启动流程
由于小程序启动是受到生命周期的控制，从 onLaunch -> onLoad -> onShow -> onReady -> 用户操作 -> 离开首页这个流程，在这个过程中的任意一个环节都有可能被客观或者主观的原因打断，也就有可能导致保存的离线页面不准确，在启动的时候给用户呈现错误的页面。

所以对于首页离线缓存渲染的效果，保存页面的时机很重要，我们提供让开发者可以配置的时机，配置的时机有两个：渲染完成和离开首页前。对于渲染完成就是首页渲染完成，用户还未执行任何的操作前把页面保存下来作为离线缓存的页面。离开首页前就是指用户在首页执行了一系列的操作后，跳转到其他页面前用户看到的页面保存下来作为离线缓存的页面。


首屏启动流程生命周期
对于闪屏问题发生的场景是因为缓存页面和真实渲染的页面是分离的，是两个独立的页面，缓存页面是静态的页面，真实的页面是通过 js 动态创建的页面，所以常规的做法就是当真实页面创建完成后替换缓存的页面，这样的情况下就会发生闪屏。


首页防闪屏直出
针对这个问题，我们是采用虚拟 dom 来解决，在加载缓存页面的时候把缓存页面放入初始的虚拟 dom 里面，真实页面创建后产生的虚拟 dom 跟缓存页面的虚拟 dom 进行 dom diff，把变化的内容通过 patch 传给浏览器内核，渲染对应的页面，这样就可以只更新局部有变化的页面内容，避免了整个页面的更新，也保证内容的准确性和实时性。


小程序下载加载流程
支付宝采用UC浏览器内核优势

1.图片内存：针对低端机，做了更严格的图片缓存限制，在保持性能体验的情况下，进一步限制图片缓存的使用；多个 webview 共用图片缓存池；全面支持 webp、apng 这种更节省内存和 size 的图片格式。

2.渲染内存：Webview 在不可见的状态下，原生的内存管理没有特殊处理，UC 内核会将不可见 webview 的渲染内存释放；渲染内存的合理设置与调优，避免滚动性能的下降和占用过多内存。

3.JS 内存：更合理地处理 v8 内存 gc，在启动时延时执行 full gc，避免影响启动的耗时。

4.峰值内存管理：系统在内存紧张时，会通知内核，UC 内核能够在系统低内存时释放非关键内存占用的模块，避免出现 oom，也避免过度释放带来的渲染黑块；在部分 oom 的情况，规避原生内核主动崩溃的逻辑，在内存极低的情况，部分功能不可用，而不是崩溃。

对我们的启示

小程序存储管理
增加小程序的存储，包括内存和磁盘，可以缓存部分数据，增加页面直出速度。同时对于磁盘的管理，按照小程序账号双重维度进行划分。

第三方业务接入能力限制
在支持第三方的接入之后，按照现有方式将会导致对于安全和第三方的行为完全不可控，可以参考微信，支付宝方式采用自定义标记语言的方式对标记语言做限制，并提供纯净的JS环境来进行JS环境的执行，WebView只负责渲染。

首屏速度
参考支付宝方案，在加载的时候，现将老的页面呈现给用户，然后在新页面完成之后，计算差值，再进行显示。

Native绘制结合
Native绘制采用通过JS和Native通信的方式，将Native控价加入到布局的制定区域。

网络请求发送托管
网络请求等全部交由Native托管，更好的控制网络请求，监控网络请求。
```

#### 你用过dva吗？请简述一下dva的实现原理
> dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。
```
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {connect,Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import createRootSaga from './createRootSaga';
import createReducers from './createReducers';
import {createHashHistory} from 'history';
import {routerMiddleware,connectRouter,ConnectedRouter} from 'connected-react-router';
import {prefix} from './utils';
export {connect}

export default function(opts){
    const app = {
        _models:[],//存放着所有的模型
        model,//添加模型的方法
        _router:null,//此处存放着路由定义
        router,//定义路由的方法
        start
    }
    function model(model){
        app._models.push(model);
    }
    function router(routerConfig){
        app._router = routerConfig;
    }
    function start(selector){
        let history = opts.history||createHashHistory();
        let rootReducer = createReducers(app._models,history,opts.extraReducers);//router
        let finalReducer = function(state,action){
            let newRootReducer = opts.onReducer(rootReducer);
            let newState = newRootReducer(state,action);
            if(opts.onStateChange){
                 opts.onStateChange(newState);
            }
            return newState;
        }
        let sagaMiddleware = createSagaMiddleware();
        let rootSaga = createRootSaga(app._models,opts.onError||function(){},opts.onEffect);
        if(opts.onAction){
            if(!Array.isArray(opts.onAction)){
                opts.onAction=[opts.onAction];
            }
        }else {
         opts.onAction=[]
        }
        let newCreateStore = createStore;
        if(opts.extraEnhancers){
            newCreateStore = opts.extraEnhancers(createStore);
        }
        let store = newCreateStore(finalReducer,opts.initialState||undefined,
        applyMiddleware(routerMiddleware(history),sagaMiddleware,...opts.onAction));
        sagaMiddleware.run(rootSaga);//开始启动rootSaga执行
        let App = app._router({history});
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {App}
                </ConnectedRouter>
            </Provider>
            ,document.querySelector(selector));
    }
    return app;
}
```

#### 使用过redux吗？请简述一下redux的实现原理
```
// bindActionCreator
    export default function bindActionCreator(actions,dispatch){
        let newActions={};
        for(let key in actions){
            newActions[key]=()=>dispatch(actions[key].apply(null,arguments));
        }
        return newActions;
    }
    // combineReducers
    export default combineReducers=reducers=>(state={},action)=>Object.keys(reducers).reduce((currentState,key)=>{
        currentState[key]=reducers[key](state[key],action);
        return currentState;
    },{});
    // createStore
    export default function createStore(reducer,enhancer){
        if(typeof enhancer !== 'undefined'){
            return enhancer(createStore)(reducer);
        }
        let state=null;
        const listeners=[];
        const subscribe=(listener)=>{
            listeners.push(listener);
        }
        const getState=()=>state;
        const dispatch=(action)=>{
            state=reducer(state,action);
            listeners.forEach((listener)=>listener())
        };
        dispatch({});
        return {getState,dispatch,subscribe}
    }
    // applyMiddleware
    export default function applyMiddleware(...middlewares){
        return (createStore)=>(reducer)=>{
            const store=createStore(reducer);
            let dispatch=store.dispatch;
            let chain=[];

            const middlewareAPI={
                getState:store.getState,
                dispatch:(action)=>dispatch(action)
            }
            chain=middlewares.map(middleware=>middleware(middlewareAPI));
            dispatch=compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch
            }
        }
    }
    // compose
    export default function compose(...funcs){
        return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
    }
```

#### 看你主要技术栈是vue，请简述一下vuex和redux在实现上有哪些区别？
https://segmentfault.com/a/1190000010305496
```
一 全局状态管理框架的产生

Redux和Vuex都是全局状态管理框架，我觉得他们的出现有四个原因：

第一，是SPA，如果不是SPA，多页面之间也就不存在复杂的交互，每打开一个页面代表新的生命周期，页面之间的交互可以利用window对象和URL参数，当然也存在一个页面的组件之间有复杂的交互，但是Redux和Vuex确实是更适用于SPA的场景，页面作为组件，页面之间可以共同管理数据状态，更像是一个应用，Redux和Vuex管理着这个应用的所有状态。
第二，是组件化，我认为组件化有两种，第一种是与业务逻辑无关的，可以复用的组件，第二种是业务逻辑的组件，提取出来是为了代码的可维护性，可读性。组件化之后，一个页面可能有几个甚至十几个组件组成，而且还可能出现几层嵌套的情况，这就产生了组件之间共同管理状态的场景。
第三，是复杂的交互逻辑，有了SPA有了组件化，再出现复杂的交互逻辑，需要多页面多组件之间的数据共享。如果是同一页面内，在没有管理框架的时候我们都是把共享状态放在根组件，然后将利用属性下传状态和管理方法，或者利用全局事件的方式。全局事件多了管理混乱，传属性的话，可能出现代码重复，并且也是管理不规范。
第四，是数据与视图的绑定，数据驱动视图的更新的方式，使得数据的管理至关重要，数据决定了视图的展示，所以对于数据的管理需要一套规范。
二 Redux源码分析

具体的使用和概念参见Redux中文文档 http://cn.redux.js.org//index...。本文从源码的角度进行分析。

2.1 redux源码的结构介绍

index.js:源码的入口文件，集合导出其余5个文件的功能。
createStore.js: 创建store对象的方法，接受reducer和initState。
applyMiddle.js: 应用中间件的方法，该方法接受中间件数组，起到包装store的dispatch方法的作用，在action到达reducer之前可以做一些操作。
combineReducers.js: 组合reducer的方法，将多个reducer组合成一个reducer，redux中对于state的划分就是利用reducer的划分， combineReducers方法将多个reducer合成一个reducer方法，也将多个reducer的state合成一个全局的state，每一个reducer只能操作自身的state。
bindActionCreators.js: 提供了一个帮助方法，对actionCreator方法利用dispatch再进行一次包装，包装成的方法可以直接触发dispatch。
2.2 createStore.js文件

createStore.js文件提供了创建store的方法,下面只显示一些加了注释的关键代码部分。

currentState: 内部的state对象
currentReducer: 接受action的reducer对象
currentListener: 存放监听函数的数组
getState: 闭包方法获取内部的state
subscribe: 提供订阅监听的方法
dispatch: 接受action,将action传递给reducer，将返回值付给state，并且触发监听函数的方法
replaceReducer: 替换reducer的方法。
export default function createStore(reducer, preloadedState, enhancer) {
  
  var currentReducer = reducer
  var currentState = preloadedState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false

  //获取state的方法
  function getState() {
    return currentState
  }

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
  //提供订阅监听的方法
  function subscribe(listener) {

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  //将action和currentState传入currentReducer，并将返回值赋值给currentState
  function dispatch(action) {
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    //调用监听函数
    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }

  //整体替换reduer
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

 

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
2.3 combineReducers.js文件

提供了组合reducer的方法，将多个reducer组合成一个reducer，redux中对于state的划分就是利用reducer的划分， combineReducers方法将多个reducer合成一个reducer方法，也将多个reducer的state合成一个全局的state，每一个reducer只能操作自身的state。

finalReducers: 最终的reducers对象
finalReducerKeys: 最终的reducers的key值数组
combination: 最终返回的组合的reducer方法
关键的combination代码中，可以得到几点心得：

1 每一个reducer只能拿到自己的子state
2 全局的state是由子state组成的，如果初始的state是空的话，那么只有在reducer被第一次调用的时候才会赋值
3 如果想改变state，因为是值比较，所以在reducer中需要返回新的state对象，同时如果全局的state变化，也会返回新的对象

//接受reduers对象，
export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  //最后返回的组合reducer函数，接受初始的state和action
  return function combination(state = {}, action) {

    var hasChanged = false
    //新的全局state
    var nextState = {}
    //遍历每一个reducer
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      //该reducer上的子state，如果创建store的时候没有传state，则是空的
      var previousStateForKey = state[key]
      //真正调用reducer函数返回state的地方
      //可以看到reducer中的state只是自己的state，不是全局的state
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      //将返回的新state放入新的全局nextState
      nextState[key] = nextStateForKey
      //是否改变比较的是state的值，所以我们在写reducer的时候，如果需要改变state
      //应该返回一个新的对象，如果没有改变的话，应该返回传给reducer的旧state对象
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    //如果有一个子state变化，那么就返回新的state对象，这里也是返回的新对象nextState，而不是
    //在原来的state上进行修改
    return hasChanged ? nextState : state
  }
}
2.4 applyMiddleware.js文件

提供可以插入中间件的方法，应用中间件的目的是包装dispatch，在action传递给dispatch执行之前，需要经过中间件的层层处理，进行一些业务上的处理，决定action的走向。

import compose from './compose'

/**
中间件的格式
({dispatch, getState}) =>{
    return next =>{
        return action =>{
        
        }
    }
}
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    //拿到store
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      //这里包一下dispatch的原因是，让传给中间件的dispatch是包装了中间件之后的dispatch，而不是原始的dispatch
      //如果写成dispatch:diapatch，那么当dispatch变化时，这里的dispatch还是原始的dispatch
      dispatch: (action) => dispatch(action) 
    }
    
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    /*
      chain链中的元素格式
      next =>{
        return action =>{
        
        }
      }
    */

    //利用compose函数拿到包装了中间件的dispatch
    dispatch = compose(...chain)(store.dispatch) 

    return {
      ...store,
      dispatch
    }
  }
}
2.5 compose.js文件，提供了组合中间件的方法

/**
* compose函数最终返回的结果
* (...args) => middle1(middle2(middle3(...args))).
* 其中middle的格式
* next =>{
     return action =>{
     
     }
   }
*/
export default function compose(...funcs) {
 if (funcs.length === 0) {
   return arg => arg
 }

 if (funcs.length === 1) {
   return funcs[0]
 }
 
 const last = funcs[funcs.length - 1]
 const rest = funcs.slice(0, -1)
 //从右向左递归调用
 return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}
2.6 bindActionCreators.js文件，提供了绑定actoinCreator的方法

//添加dispatch的方法
function bindActionCreator(actionCreator, dispatch) {
  //返回的函数，接受参数，传递给actionCreator调用，actionCreator返回标准的action，然后返回dispatch的结果
  return (...args) => dispatch(actionCreator(...args))
}

//将actionCreators绑定上dispatch，key还是actionCreators的key，但是多做了一层dispatch
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
以上是Redux中6个文件的分析，下面就写一个简单的例子，看一下redux最基本的使用,理解下redux。

2.7 redux简单demo

store.js

import {createStore} from 'redux';
//创建action的方法
export function createAction(type, payload) {
    return {
        type,
        payload
    }
}
//初始的state
const initialState = {
    time: new Date().getTime()
}
//reducer函数
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'NOW_TIME':
            return {
                ...state,
                time: action.payload
            }
        default:
            return state;
    }
}

let store;
//获取store的方法
export function getStore() {
    if(store) return store;
    return store = createStore(reducer);
}
testRedux.js react-native的一段代码

'use strict';

import React, { Component } from 'react';

import {
      StyleSheet,
      View,
      Text
} from 'react-native';
import MtButton from '@scfe/react-native-button';
import {getStore, createAction} from './store';
//获取到store
const store = getStore();
class TestRedux extends Component {
    constructor(props) {
          super(props);
        let state = store.getState();
          this.state = {
              time: state.time
          };
          //这里订阅state的变化，state变化之后拿到新的state，然后重新setState，更新视图
          store.subscribe(()=>{
              let state = store.getState();
              this.setState({
                  time: state.time
              });
          });
    }
    //调用dispatch的方法
    _sendAction() {
        let action = createAction('NOW_TIME', new Date().getTime());
        store.dispatch(action);
    }
      render() {
        return (
              <View style={styles.container}>
                  <Text>{this.state.time}
                  </Text>
                <MtButton text="发出action" onPress={this._sendAction.bind(this)} /> 
              </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    }
});

export default TestRedux;
当然我们在实际生产中肯定不会这样用，还需要依赖react-redux、create-action等必要的模块，下面就继续看一下相关的模块。

三 Redux相关库源码分析

3.1 react-actions

react-actions提供了一种灵活的创建符合FSA标准action的方法,其中的createAction.js是我们生产中常用的文件,关键代码如下：

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;

var _identity = require('lodash/identity');

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * 
 * @param type  action中的type，String类型
 * @param payloadCreator  创建action中的payload的函数
 * @param metaCreator  创建action中的payload的函数
 */
function createAction(type, payloadCreator, metaCreator) {
  // _identity2.default 函数返回第一个参数
  var finalPayloadCreator = typeof payloadCreator === 'function' ? payloadCreator : _identity2.default;

  //调用createAction返回一个actionHandler函数，再调用actionHandler才返回action对象
  var actionHandler = function actionHandler() {
    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;

    //最终返回的action对象
    var action = {
      type: type
    };

    //如果在createAction中传payloadCreator和metaCreator函数，那么在actionHandler中传的参数将传递给
    //payloadCreator和metaCreator函数，并且将payloadCreator的返回结果当做action的payload，将metaCreator的返回结果当做action的meta
    var payload = hasError ? arguments.length <= 0 ? undefined : arguments[0] : finalPayloadCreator.apply(undefined, arguments);
    if (!(payload === null || payload === undefined)) {
      action.payload = payload;
    }

    if (hasError) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true;
    }
    //将metaCreator的返回结果当做action的meta
    if (typeof metaCreator === 'function') {
      action.meta = metaCreator.apply(undefined, arguments);
    }
    //返回action
    return action;
  };

  actionHandler.toString = function () {
    return type.toString();
  };

  return actionHandler;
}
3.2 createAction方法使用实例

types.js 通常我们把action的type统一放在一起

export const GET_POI_INFO = 'GET_POI_INFO'
export const CHANGE_POI_STATUS = 'CHANGE_POI_STATUS'
actions.js actions.js用于调用createAction产生actionHandler。

import {createAction} from 'redux-actions';
import * as types from './actioins';
/**
 * 需要利用payloadCreator接收参数产生payload的action，这里payload返回的是一个Promise,
 * 接下来会讲到redux-promise中间件用于处理payload是promise的情况，
 * 实现了在createAction的时候能够处理异步产生action的情况
 * */
export const getPoiInfo = createAction(types.GET_POI_INFO, async(poiId)=> {
    return await poiService.getPoiInfo(poiId)
        .then(data=> {
            if (data == null) throw 'poi info is null';
            return data;
        });
});
//不需要利用payloadCreator产生payload的action
export const changePoiStatus = createAction(types.CHANGE_POI_STATUS);
3.3 redux-promise

redux-promise中间件是用于解决异步的action。

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = promiseMiddleware;

var _fluxStandardAction = require('flux-standard-action');

function isPromise(val) {
  return val && typeof val.then === 'function';
}

//_ref接收的参数对象有两个 {getState,dispatch}
function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      //如果不是标准的action
      if (!_fluxStandardAction.isFSA(action)) {
        //如果是action是promise，直接dispatch这个promise的结果，如果不是promise交给下一个中间件
        return isPromise(action) ? action.then(dispatch) : next(action);
      }
      //如果payload是promise，则把promise的结果作为这个action的payload，然后dispatch这个action
      //否则交给下一个中间件
      return isPromise(action.payload) ? action.payload.then(function (result) {
        return dispatch(_extends({}, action, { payload: result }));
      }, function (error) {
        return dispatch(_extends({}, action, { payload: error, error: true }));
      }) : next(action);
    };
  };
}

module.exports = exports['default'];

dispatch(new Promise(){
  resolve(action)
})
有了reduex-promise中间件以后我们就可以让action的payload是promise，然后promise的返回值是paylaod或者直接action就是一个promise，直接dispatch promise的返回值

3.4 react-redux

以上都是redux本身相关的库，react-redux是把redux更好的结合应用于react的库。
index.js 入口文件，向外提供了Provider和connect两个对象。

Provider 是一个react的组件，接受store作为属性，然后放在context中，提供给子组件。我们把它作为根组件使用。
Provider.js

import { Component, PropTypes, Children } from 'react'
import storeShape from '../utils/storeShape'
import warning from '../utils/warning'


 //继承react的组件
export default class Provider extends Component {
  //利用context传递store，子组件在构造函数中可以通过context.store拿到store
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  //渲染唯一的子组件
  render() {
    const { children } = this.props
    return Children.only(children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { store } = this
    const { store: nextStore } = nextProps
    //store变化时给出警告
    if (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
}
connect 方法实现将自定义将store中的state映射到组件的props上，把createAction方法包装成dispatch的方法挂在组件的props上，并且监听store中state的变化，更新组件的props。
connect.js

调用connect最终会返回包装的组件，在组件mounted的时候调用trySubscribe，订阅store中state的变化，在handleChange方法中通过this.setState({ storeState })触发重新渲染组件，在render中，调用

updateStatePropsIfNeeded
updateDispatchPropsIfNeeded
updateMergedPropsIfNeeded
三个方法将更新最终的this.mergeProps

import { Component, createElement } from 'react'
import storeShape from '../utils/storeShape'
import shallowEqual from '../utils/shallowEqual'
import wrapActionCreators from '../utils/wrapActionCreators'
import warning from '../utils/warning'
import isPlainObject from 'lodash/isPlainObject'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
//更新属性 4
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})


export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }
//更新属性 3
  const finalMergeProps = mergeProps || defaultMergeProps
  const { pure = true, withRef = false } = options
  const checkMergedEquals = pure && finalMergeProps !== defaultMergeProps

  // Helps track hot reloading.
  const version = nextVersion++

  //connect函数返回的包装组件的方法
  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    function checkStateShape(props, methodName) {
      if (!isPlainObject(props)) {
        warning(
          `${methodName}() in ${connectDisplayName} must return a plain object. ` +
          `Instead received ${props}.`
        )
      }
    }

    //计算mergeProps
    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps')
      }
      return mergedProps
    }

    class Connect extends Component {
      shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      constructor(props, context) {
        super(props, context)
        this.version = version
        //获取store
        this.store = props.store || context.store

        invariant(this.store,
          `Could not find "store" in either the context or ` +
          `props of "${connectDisplayName}". ` +
          `Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "store" as a prop to "${connectDisplayName}".`
        )

        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }
       //计算stateProps
      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }

        const state = store.getState()
        //获取state中的内容为props
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'

        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1

        if (isFactory) {
          return this.computeStateProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }
      //计算dispatchProps
      computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props)
        }

        const { dispatch } = store
        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?
          this.finalMapDispatchToProps(dispatch, props) :
          this.finalMapDispatchToProps(dispatch)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps')
        }
        return dispatchProps
      }

      configureFinalMapDispatch(store, props) {
        const mappedDispatch = mapDispatch(store.dispatch, props)
        const isFactory = typeof mappedDispatch === 'function'

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1

        if (isFactory) {
          return this.computeDispatchProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps')
        }
        return mappedDispatch
      }

      //更新stateProps的地方
      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props)
        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
          return false
        }

        this.stateProps = nextStateProps
        return true
      }
      //更新dispatchProps的地方
      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)
        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false
        }

        this.dispatchProps = nextDispatchProps
        return true
      }

      //更新mergeProps的地方
      updateMergedPropsIfNeeded() {
        //mergeProps由 this.stateProps, this.dispatchProps, this.props 组成
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
          return false
        }

        this.mergedProps = nextMergedProps
        return true
      }

      isSubscribed() {
        return typeof this.unsubscribe === 'function'
      }
      
      //订阅store中state的变化
      trySubscribe() {
        //
        if (shouldSubscribe && !this.unsubscribe) {
          //订阅store的state变化
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

      componentDidMount() {
        ////订阅store的state变化
        this.trySubscribe()
      }

      componentWillReceiveProps(nextProps) {
        if (!pure || !shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      //store变化调用的方法
      handleChange() {
        if (!this.unsubscribe) {
          return
        }

        //reducer每次返回的state也是新的对象
        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        if (pure && prevStoreState === storeState) {
          return
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
          if (!haveStatePropsChanged) {
            return
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value
          }
          this.haveStatePropsBeenPrecalculated = true
        }

        this.hasStoreStateChanged = true
        //设置state重新渲染组件
        this.setState({ storeState })
      }

      

      render() {
        
        if (withRef) {
          // this.mergedProps  是最终给组件的属性
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          // this.mergedProps  是最终给组件的属性
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }

        return this.renderedElement
      }
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}
四 Vuex源码分析

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
5 Redux与Vuex的对比

1
Redux改变state的方法是在reducer中返回新的state对象，
Vuex是在mutation中直接改变state

2
state变化触发视图的更新，在Redux中是需要自己去监听，然后重新setState，
在Vuex中是直接利用了VM的数据响应

3 Vuex将改变state的方法进行了细分，分成mutation和action，更利于写复杂的逻辑，还直接处理了异步的情况，而Redux中需要在中间件中处理
```

#### 在vue中由哪些生命周期？
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

#### vue中如何获取更新后的dom节点？
```
- $refs
- this.$nextTick
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

#### v-if和v-for谁的优先级高？如何同时使用？不要多套一层
```
放在计算属性遍历
computed: {
activeUsers: function () {
return this.users.filter(function (user) {
return user.isActive
})
}
}
```

#### v-for中key的作用
```
> key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和 oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。

所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}

强制替换元素，从而可以触发组件的生命周期钩子或者触发过渡。因为当key改变时，Vue认为一个新的元素产生了，从而会新插入一个元素来替换掉原有的元素。

<transition> <span :key="text">{{text}}</span> </transition>、

--这里如果text发生改变，整个<span>元素会发生更新，因为当text改变时，这个元素的key属性就发生了改变，在渲染更新时，Vue会认为这里新产生了一个元素，而老的元素由于key不存在了，所以会被删除，从而触发了过渡。
同理，key属性被用在组件上时，当key改变时会引起新组件的创建和原有组件的删除，此时组件的生命周期钩子就会被触发。
```

#### vue全家桶你都用过哪些？
```
- vuex
- vue-Router
- axios
- element-ui
....
```

#### 你提到了Vue Router，那么它有几种模式？是如何实现的？(提到了abstract模式使用场景)你提到了hash模式和history模式，那么如何获取路由跳转后的参数？如何实现的？
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

#### 采用history模式，在node服务器端需要如何配置？
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

#### 你都用过哪些es6语法？
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

#### 你提到了箭头函数，箭头函数有哪些特点？
```
主要区别在this指向问题
- 普通函数的this 指向调用它的那个对象，例如 obj.func ,那么func中的this就是obj
- 箭头函数不能作为构造函数，不能使用new，没有this，arguments箭头函数，箭头函数的this永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()（或者说箭头函数中的this指向的是定义时的this，而不是执行时的this）
```

#### 你提到了箭头函数的this，请指出下列选项中的this分别代表谁？
都是obj
```
    const obj={
        a:()=>console.log(this)
    }

    ① obj.a()
    ② const test=obj.a;
       test();
    ③  const test2={}
        obj.a.call(test2)
```

#### 你提到了vue3中用到了proxy，简述一下你对proxy的理解，vue3和vue2有哪些不同？
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

### 原生js

#### 你都知道哪些跨域方式？
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

#### 你提到了jsonp，请简述一下jsonp原理
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

#### 你提到了cors，请简述一下它是如何实现跨域的？
```
一、简介
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。
整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。
二、两种请求
浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
只要同时满足以下两大条件，就属于简单请求。
（1) 请求方法是以下三种方法之一：
HEAD
GET
POST
（2）HTTP的头信息不超出以下几种字段：
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
凡是不同时满足上面两个条件，就属于非简单请求。
浏览器对这两种请求的处理，是不一样的。
三、简单请求
3.1 基本流程
对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。
下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
上面的头信息中，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。
（1）Access-Control-Allow-Origin
该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
（2）Access-Control-Allow-Credentials
该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
（3）Access-Control-Expose-Headers
该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。
3.2 withCredentials 属性
上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

Access-Control-Allow-Credentials: true
另一方面，开发者必须在AJAX请求中打开withCredentials属性。

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。
但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

xhr.withCredentials = false;
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
四、非简单请求
4.1 预检请求
非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
下面是一段浏览器的JavaScript脚本。

var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
上面代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header。
浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，"预检"请求的头信息包括两个特殊字段。
（1）Access-Control-Request-Method
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
（2）Access-Control-Request-Headers
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。
4.2 预检请求的回应
服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

Access-Control-Allow-Origin: *
如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。

XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
服务器回应的其他CORS相关字段如下。

Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
（1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
（2）Access-Control-Allow-Headers
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
（3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。
（4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
4.3 浏览器的正常请求和回应
一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
下面是"预检"请求之后，浏览器的正常CORS请求。

PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
上面头信息的Origin字段是浏览器自动添加的。
下面是服务器正常的回应。

Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。
五、与JSONP的比较
CORS与JSONP的使用目的相同，但是比JSONP更强大。
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
```

#### 你都知道浏览器的缓存策略吗？请详述
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

#### 你提到了cookie，请简述一下cookie的原理。所有cookie大小限制都是5kb吗？哪些不是？
```
一、浏览器允许每个域名所包含的cookie数：

　　Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每个域名50个cookie。

　　Firefox每个域名cookie限制为50个。

　　Opera每个域名cookie限制为30个。

　　Safari/WebKit貌似没有cookie限制。但是如果cookie很多，则会使header大小超过服务器的处理的限制，会导致错误发生。

　　注：“每个域名cookie限制为20个”将不再正确！

二、当很多的cookie被设置，浏览器如何去响应。

　　除Safari（可以设置全部cookie，不管数量多少），有两个方法：

　　最少最近使用（leastrecentlyused(LRU)）的方法：当Cookie已达到限额，自动踢除最老的Cookie，以使给最新的Cookie一些空间。InternetExplorer和Opera使用此方法。

　　Firefox很独特：虽然最后的设置的Cookie始终保留，但似乎随机决定哪些cookie被保留。似乎没有任何计划（建议：在Firefox中不要超过Cookie限制）。

三、不同浏览器间cookie总大小也不同：

　　Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。

　　Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。

　　InternetExplorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。

注：多字节字符计算为两个字节。在所有浏览器中，任何cookie大小超过限制都被忽略，且永远不会被设置。
```
||IE6.0|IE7.0/8.0|Opera|FF|Safari|Chrome|
|cookie个数|每个域为20个|每个域为50个|每个域为30个|每个域为50个|没有个数限制|每个域为53个|
|cookie总大小|4096个字节|4096个字节|4096个字节|4096个字节|4096个字节|4096个字节|

#### 以下情况能否获取到localStorage？
都不能访问，有同源策略
```
    在toutiao.com/a/b的localStorage中有一个a=1
    ① toutiao/a/d 
    ② toutiao/d/c
    ③ dev.toutiao/a/b
```

### css

#### 你都用过哪些css预处理器？
```
- sass或scss
- less
- stylus
```

#### 你提到了sass，请简述一下sass的使用方法
```
- 定义变量$
- @mixin
- @include
```

#### 你知道css module吗？请详述
```
CSS Modules 能最大化地结合现有 CSS 生态和 JS 模块化能力，API 简洁到几乎零学习成本。发布时依旧编译出单独的 JS 和 CSS。它并不依赖于 React，只要你使用 Webpack，可以在 Vue/Angular/jQuery 中使用。

CSS Modules 内部通过 ICSS 来解决样式导入和导出这两个问题。分别对应 :import 和 :export 两个新增的伪类。

:import("path/to/dep.css") {
  localAlias: keyFromDep;
  /* ... */
}
:export {
  exportedKey: exportedValue;
  /* ... */
}
但直接使用这两个关键字编程太麻烦，实际项目中很少会直接使用它们，我们需要的是用 JS 来管理 CSS 的能力。结合 Webpack 的 css-loader 后，就可以在 CSS 中定义样式，在 JS 中导入。

启用 CSS Modules

// webpack.config.js
css?modules&localIdentName=[name]__[local]-[hash:base64:5]
加上 modules 即为启用，localIdentName 是设置生成样式的命名规则。
也可以这样设置：

         test: /\.less$/,
         use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]-[hash:base64:5]',
                    },
                },
               ],
        },
样式文件Button.css：

.normal { /* normal 相关的所有样式 */ }
.disabled { /* disabled 相关的所有样式 */ }
/* components/Button.js */
import styles from './Button.css';

console.log(styles);

buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
生成的 HTML 是

<button class="button--normal-abc53">Submit</button>
注意到 button--normal-abc53 是 CSS Modules 按照 localIdentName 自动生成的 class 名。其中的 abc53 是按照给定算法生成的序列码。经过这样混淆处理后，class 名基本就是唯一的，大大降低了项目中样式覆盖的几率。同时在生产环境下修改规则，生成更短的class名，可以提高CSS的压缩率。

上例中 console 打印的结果是：

Object {
  normal: 'button--normal-abc53',
  disabled: 'button--disabled-def884',
}
CSS Modules 对 CSS 中的 class 名都做了处理，使用对象来保存原 class 和混淆后 class 的对应关系。

通过这些简单的处理，CSS Modules 实现了以下几点：

所有样式都是 local 的，解决了命名冲突和全局污染问题
class 名生成规则配置灵活，可以此来压缩 class 名
只需引用组件的 JS 就能搞定组件所有的 JS 和 CSS
依然是 CSS，几乎 0 学习成本
样式默认局部
使用了 CSS Modules 后，就相当于给每个 class 名外加加了一个 :local，以此来实现样式的局部化，如果你想切换到全局模式，使用对应的 :global。

.normal {
  color: green;
}

/* 以上与下面等价 */
:local(.normal) {
  color: green; 
}

/* 定义全局样式 */
:global(.btn) {
  color: red;
}

/* 定义多个全局样式 */
:global {
  .link {
    color: green;
  }
  .box {
    color: yellow;
  }
}
Compose 来组合样式
对于样式复用，CSS Modules 只提供了唯一的方式来处理：composes 组合

/* components/Button.css */
.base { /* 所有通用的样式 */ }

.normal {
  composes: base;
  /* normal 其它样式 */
}

.disabled {
  composes: base;
  /* disabled 其它样式 */
}

import styles from './Button.css';

buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
生成的 HTML 变为

<button class="button--base-daf62 button--normal-abc53">Submit</button>
由于在 .normal 中 composes 了 .base，编译后会 normal 会变成两个 class。

composes 还可以组合外部文件中的样式。

/* settings.css */
.primary-color {
  color: #f40;
}

/* components/Button.css */
.base { /* 所有通用的样式 */ }

.primary {
  composes: base;
  composes: primary-color from './settings.css';
  /* primary 其它样式 */
}
对于大多数项目，有了 composes 后已经不再需要 Sass/Less/PostCSS。但如果你想用的话，由于 composes 不是标准的 CSS 语法，编译时会报错。就只能使用预处理器自己的语法来做样式复用了。

class 命名技巧
CSS Modules 的命名规范是从 BEM 扩展而来。

clipboard.png

BEM 把样式名分为 3 个级别，分别是：

Block：对应模块名，如 Dialog
Element：对应模块中的节点名 Confirm Button
Modifier：对应节点相关的状态，如 disabled、highlight
综上，BEM 最终得到的 class 名为 dialog__confirm-button--highlight。使用双符号 __ 和 -- 是为了和区块内单词间的分隔符区分开来。虽然看起来有点奇怪，但 BEM 被非常多的大型项目和团队采用。我们实践下来也很认可这种命名方法。

CSS Modules 中 CSS 文件名恰好对应 Block 名，只需要再考虑 Element 和 Modifier。BEM 对应到 CSS Modules 的做法是：

/* .dialog.css */
.ConfirmButton--disabled {
}
你也可以不遵循完整的命名规范，使用 camelCase 的写法把 Block 和 Modifier 放到一起：

/* .dialog.css */
.disabledConfirmButton {
}
模块化命名实践:MBC 【仅供参考参考】
M:module 模块（组件）名
B:block 元素块的功能说明
C:custom 自定义内容
如何实现CSS，JS变量共享
注：CSS Modules 中没有变量的概念，这里的 CSS 变量指的是 Sass 中的变量。
上面提到的 :export 关键字可以把 CSS 中的 变量输出到 JS 中。下面演示如何在 JS 中读取 Sass 变量：

/* config.scss */
$primary-color: #f40;

:export {
  primaryColor: $primary-color;
}
/* app.js */
import style from 'config.scss';

// 会输出 #F40
console.log(style.primaryColor);
CSS Modules 使用技巧
CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

不使用选择器，只使用 class 名来定义样式
不层叠多个 class，只使用一个 class 把所有样式定义好
所有样式通过 composes 组合来实现复用
不嵌套
上面两条原则相当于削弱了样式中最灵活的部分，初使用者很难接受。第一条实践起来难度不大，但第二条如果模块状态过多时，class 数量将成倍上升。
一定要知道，上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做。听起来有些矛盾，由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本。初期使用中肯定需要一些折衷。幸运的是，CSS Modules 这点做的很好：

如果我对一个元素使用多个 class 呢？

没问题，样式照样生效。
如何我在一个 style 文件中使用同名 class 呢？

没问题，这些同名 class 编译后虽然可能是随机码，但仍是同名的。
如果我在 style 文件中使用伪类，标签选择器等呢？

没问题，所有这些选择器将不被转换，原封不动的出现在编译后的 css 中。也就是说 CSS Modules 只会转换 class 名和 id 选择器名相关的样式。
但注意，上面 3 个“如果”尽量不要发生。

CSS Modules 结合 React 实践
首先，在 CSS loader中开启CSS Module：

  {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]',
        },
  },
在 className 处直接使用 css 中 class 名即可。

/* dialog.css */
.root {}
.confirm {}
.disabledConfirm {}
import classNames from 'classnames';
import styles from './dialog.css';

export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabledConfirm]: this.state.disabled
    });

    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
注意，一般把组件最外层节点对应的 class 名称为 root。这里使用了 classnames 库来操作 class 名。
如果你不想频繁的输入 styles.xx，可以试一下 react-css-modules，它通过高阶函数的形式来避免重复输入 styles.xx。

React 中使用CSS Module,可以设置
5.几点注意

1.多个class的情况

// 可以使用字符串拼接
className = {style.oneclass+' '+style.twoclass}

//可以使用es6的字符串模板
className = {`${style['calculator']} ${style['calculator']}`} 
2.如果class使用的是连字符可以使用数组方式style['box-text']

3.一个class是父组件传下来的
如果一个class是父组件传下来的，在父组件已经使用style转变过了，在子组件中就不需要再style转变一次，例子如下:

//父组件render中
 <CalculatorKey className={style['key-0']}   onPress={() => this.inputDigit(0)}>0</CalculatorKey>

//CalculatorKey 组件render中
 const { onPress, className, ...props } = this.props;
        return (
            <PointTarget onPoint={onPress}>
                <button className={`${style['calculator-key']} ${className}`} {...props}/>
            </PointTarget>
        )
子组件CalculatorKey接收到的className已经在父组件中style转变过了

4.显示undefined
如果一个class你没有在样式文件中定义，那么最后显示的就是undefined，而不是一个style过后的没有任何样式的class, 这点很奇怪。

6.从Vue 来看CSS 管理方案的发展

/* HTML */
<template>
  <h1 @click="clickHandler">{{ msg }}</h1>
</template>

/* script */
<script>
module.exports = {
  data: function() {
    return {
      msg: 'Hello, world!'
    }
  },
  methods:{
    clickHandler(){
      alert('hi');
    }
  }
}
</script>

/* scoped CSS */
<style scoped>
h1 {
  color: red;
  font-size: 46px;
}
</style>
在Vue 元件档，透过上面这样的方式提供了一个template (HTML)、script 以及带有scoped 的style 样式，也仍然可以保有过去HTML、CSS 与JS 分离的开发体验。但本质上仍是all-in-JS 的变种语法糖。

值得一提的是，当style标签加上scoped属性，那么在Vue元件档经过编译后，会自动在元件上打上一个随机的属性 data-v-hash，再透过CSS Attribute Selector的特性来做到CSS scope的切分，使得即便是在不同元件档里的h1也能有CSS样式不互相干扰的效果。当然开发起来，比起JSX、或是inline-style等的方式，这种折衷的作法更漂亮。
```

#### 你知道css in js吗？请详述
```
将一些常用的 CSS 属性封装成函数，用起来非常方便，充分体现使用 JavaScript 语言写 CSS 的优势。

我觉得这个库很值得推荐，这篇文章的主要目的，就是想从这个库来看怎么使用 CSS in JS。
首先，加载 polished.js。

const polished = require('polished');
如果是浏览器，插入下面的脚本。

<script src="https://unpkg.com/polished@1.0.0/dist/polished.min.js">
</script>
polished.js目前有50多个方法，比如clearfix方法用来清理浮动。

const styles = {
  ...polished.clearFix(),
};
上面代码中，clearFix就是一个普通的 JavaScript 函数，返回一个对象。

polished.clearFix()
// {
//  &::after: {
//    clear: "both",
//    content: "",
//    display: "table"
//  }
// }
"展开运算符"（...）将clearFix返回的对象展开，便于与其他 CSS 属性混合。然后，将样式对象赋给 React 组件的style属性，这个组件就能清理浮动了。

ReactDOM.render(
  <h1 style={style}>Hello, React!</h1>,
  document.getElementById('example')
);
从这个例子，大家应该能够体会polished.js的用法。

下面再看几个很有用的函数。
ellipsis将超过指定长度的文本，使用省略号替代（查看完整代码）。

const styles = {
  ...polished.ellipsis('200px')
}

// 返回值
// {
//   'display': 'inline-block',
//   'max-width': '250px',
//   'overflow': 'hidden',
//   'text-overflow': 'ellipsis',
//   'white-space': 'nowrap',
//   'word-wrap': 'normal'
// }
hideText用于隐藏文本，显示图片。

const styles = {
  'background-image': 'url(logo.png)',
  ...polished.hideText(),
};

// 返回值
// {
  'background-image': 'url(logo.png)',
  'text-indent': '101%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
}
hiDPI指定高分屏样式。

const styles = {
 [polished.hiDPI(1.5)]: {
   width: '200px',
 }
};

// 返回值
//'@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
// only screen and (min--moz-device-pixel-ratio: 1.5),
// only screen and (-o-min-device-pixel-ratio: 1.5/1),
// only screen and (min-resolution: 144dpi),
// only screen and (min-resolution: 1.5dppx)': {
//  'width': '200px',
//}
retinaImage为高分屏和低分屏设置不同的背景图。

const styles = {
 ...polished.retinaImage('my-img')
};

// 返回值
//   backgroundImage: 'url(my-img.png)',
//  '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
//   only screen and (min--moz-device-pixel-ratio: 1.3),
//   only screen and (-o-min-device-pixel-ratio: 1.3/1),
//   only screen and (min-resolution: 144dpi),
//   only screen and (min-resolution: 1.5dppx)': {
//    backgroundImage: 'url(my-img_2x.png)',
//  }

polished.js提供的其他方法如下，详细用法请参考文档。
normalize()：样式表初始化
placeholder()：对 placeholder 伪元素设置样式
selection()：对 selection 伪元素设置样式
darken()：调节颜色深浅
lighten()：调节颜色深浅
desaturate()：降低颜色的饱和度
saturate()：增加颜色的饱和度
opacify()：调节透明度
complement()：返回互补色
grayscale()：将一个颜色转为灰度
rgb()：指定红、绿、蓝三个值，返回一个颜色
rgba()：指定红、绿、蓝和透明度四个值，返回一个颜色
hsl()：指定色调、饱和度和亮度三个值，返回一个颜色
hsla()：指定色调、饱和度、亮度和透明度三个值，返回一个颜色
mix()：混合两种颜色
em()：将像素转为 em
rem()：将像素转为 rem
目前，polished.js只是1.0版，以后应该会有越来越多的方法。

polished.js还有一个特色：所有函数默认都是柯里化的，因此可以进行函数组合运算，定制出自己想要的函数。

import { compose } from 'ramda';
import { lighten, desaturate } from 'polished';

const tone = compose(lighten(10), desaturate(10))
```

#### 你都知道position有哪些值？它们的区别是什么？
```
经过定位的元素，其position属性值必然是relative、absolute、fixed或sticky。

- static：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

- relative：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。

- absolute：不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

- fixed：不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。

- sticky：盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 table 时），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。position: sticky 对 table 元素的效果与 position: relative 相同。
```

#### 请看下面的页面，当div2的position分别为relative，relative且top=0，relative且top=20px时div2的位置，上边的position全部换成absolute又是什么效果？
```
- position:relative
    - 无：div2位置不变
    - 'top=0':div2位置不变
    - 'top=20px':距离div1为20px

- position:absolute
    - 无：div2不显示
    - 'top=0':div2不显示
    - 'top=20px':div2不显示
```