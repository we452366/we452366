## 桃知移动端1

### 单位
- 导包：px2rem

### 异步组件
- 高阶组件
```
    const 组件名 = (函数名1) =>{
        const component=()=>{

            loading:加载图
        }
    }
```

### 字体图标
```
    iconfont 图标名
```

### 封装utils中方法
- loadable.js
- ajaxRequest.js (基于axios封装，设置拦截器)

### Vuex
- 辅助函数：mapActions,mapState (使用createNameSpacedHelpers的函数来帮助辅助函数加前缀)
- store
    - modules
        - home.js
    - index.js
    - actions-type.js