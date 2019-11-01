## 桃知移动端2

### 轮播图
- 轮播图接口
- 页面创建created定义一些公共数据，这些属性不需要动态监控

### tab转场效果
- routes中加索引，在meta备注中
```
    meta:{
        idx:0
    }
```
- 转场时清除请求，页面变化去调用vuex中存储的cancel，需要router中的钩子方法$beforeEach
> 拦截器：
```
    // 请求拦截器
    new axios.CancelToken(function(c){
        // Vuex
    })
```
> 路由钩子:
```
    // 取消token
    cancelToken:(to,from,next)=>{
        // 清除token 从store中调用commit方法依次执行types的取出token方法
        store.commit(types.CLEAR_TOKEN)
        next()
    },
    // 全局校验
    permission:(to,from,next)=>{

    }
    
```

### Vuex
- 存储token依次取消，发布订阅

### 登录
- 将用户名存入Vuex中
- 将token存储到localstorage中
> 存储token
```
    localStorage.setItem('token',data.token)
```
> 获取token，每次发送登录请求的时候都带上token
```
    localStorage.getItem('token')
```