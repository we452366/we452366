## Vue的生命周期

### 生命周期
钩子函数：到某个时期会执行的回调函数
每个实例都有一套操作属性的方法，以$开头，有$on、$emit、$off、$mount、$destory、$listeners、$attrs、$bus
- beforeCreate:希望给每个组件增加一些特定的属性
- created:每个组件实例已经实现了数据劫持，属性和计算属性也挂载到了实例，但不能获取到真实的dom元素
- beforeMount:调用render，template会隐式调用render
- Mounted:当前组件挂载完成，可以拿到真实dom
- beforeUpdate:增加一些数据更新，不会导致视图多次更新，更新的数据需要应用到视图，才能看到
- updated:不要再去更新数据，可能会发生死循环
- beforeDestory:事件的溢出，清空定时器等
- destoryed:销毁

### 组件
使用：导入->注册->当前模板中使用
单向数据流：
- 父子组件通信
    - 父=>子：父组件数据通过子组件属性传递 子组件属性可为props:[]，内部会将数组中的值挂到this的属性中，子组件属性也可为props:{}，来进行类型校验,{type:'',default:'',required:''}，其中type如果是对象或数组，校验必须为函数，如：default:()=>({a:1})
    - 子=>父：父组件中调用的子组件上绑定属性，利用$on来向下传递属性值,on事件简写为"@事件名='父组件中的函数名'",在子组件中使用$emit向父组件传递修改的数据

- 所有通信方法：
    - props emit
    - $parent $children
    - $attrs $listeners
    - provide inject
    - ref
    - enventbus

- 封装组件
    - 导航组件 vee-menu => vee-menu-item + vee-submenu
        - 循环递归在组件中命名name可以循环
    - 弹层组件 Message
        - 放在整个页面的下边，需要在document下appendChild

### render函数
template不灵活，递归，有功能缺陷，重复操作
- render函数组件：
    ```
        export default {
            props:{

            },
            render(h){ // h=>createElement的简写 vnode虚拟节点
                createElement()
                // render中的this指代的是我们当前组件的实例
                return h('‘,{},this.$slots.default)
            }
        }
    ```

- render的jsx：

- 作用域插槽slot-scope：
借助函数组件可以自定义行为，但很麻烦，可以用作用域插槽将组件内容共享出来 可以复用

### vue的dom-diff算法
虚拟dom就是一个普通的js对象，包含type，key，props，children，text，DOMElement
- 模板解析出来虚拟dom对象
- h.js:对应vue中的h函数，用于返回vnode
- vnode.js：h.js中调用vnode函数将非vnode对象转换为vnode对象，出口isVnode用于判断是否是虚拟结点，出口isSameVnode用于判断是否是相同的结点，类型相同并且key相同
- patch.js：将vnode对象patch打补丁到真实dom上，出口mount函数将虚拟dom挂到root上，出口patch函数用于新老虚拟结点打补丁
    - createDOMElementFromVnode函数将虚拟dom结点封装成一个真实dom结点
    - updateProperties函数用于更新属性，新节点中没有的属性置为空，老节点有而新节点没有的属性删除
    - updateChildren函数用于比较新老子元素，设置了四个指针oldStartIndex,oldEndeIndex,newStartIndex,newEndIndex，对特殊情况进行了优化如abcd变化bcda，abcd变化为abcdef