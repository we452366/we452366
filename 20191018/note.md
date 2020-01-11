## Vue全家桶

### 面试题
- computed和watch有什么区别？
    - 都是基于new Watcher来实现的,computed内部具有缓存，如果内部没有变化，不会重新执行，而method没有缓存；watch每次值变化后，都能执行对应的回调
- angular1.0脏检查原理
```
    let dirty=true;
    function intiComputed(key,handler){
        let value;

    }
```

### 自定义指令
- 全局指令
```
    Vue.directive('',function(el,bindings,vnode){

    })
```
- 局部指令
```
    let vm=new Vue({
        el:'',
        directives:{
            bind(){

            },
            ...
        }
    })
```

- 自定义指令生命周期：
    - bind:
    - update:
    - inserted:
    - unbind:
    - componentUpdated:

### 动画
```
<transition></transition>
```
- css方式
```
```
- js方式
    - enter(el,done){}
    - 