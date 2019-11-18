## React全家桶

### 正则匹配

> 正向前瞻：匹配后面满足表达式exp的位置；负向前瞻：匹配后面不满足表达式exp的位置；正向后顾：匹配前面满足表达式exp的位置(js不支持)；负向后顾：匹配前面不满足表达式exp的位置(js不支持)

#### path-to-regexp

> path-to-regexp模块中pathToRegExp函数会将路径进行正则匹配

```
    let pathToRegExp=require('path-to-regexp');
    let regexp=pathToRegExp('/路径名',[],{end:true/false})
```

### 实现Link
- Link.tsx

### 实现Switch
- Switch.tsx

### 实现Redirect
- Redirect.tsx

### 路由参数
> 增加对params的match匹配

### 受保护路由
> 利用重定向进行保护

### 自定义导航
- MenuLink.tsx

### withRouter
- withRouter.tsx

### 阻止跳转
- Prompt.tsx

### BrowserRouter
- BrowserRouter.tsx

## Redux

### Redux应用场景
> Redux是中央数据源，数据在组件中是单向流动的

### Redux设计思想
- dispatch:行为action派发给store，而不是直接通知其他组件
- store:Redux将整个状态存储到一个地方
- reducer

### Redux三大原则
- state被存储在object tree中，该树只存在唯一一个store中
- state只读，触发action来改变state
- 单一数据源

### Redux源码
