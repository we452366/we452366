## 百车宝

### 笔试题

#### 你使用过哪些方法，来提高微信小程序的应用速度？

#### 怎么解决小程序的异步请求问题？

#### 小程序和Vue写法的区别？

#### H5中viewport-fit做什么用的？

#### <span></span>绑定了click事件，嵌入ios app后点击无效，如何解决？

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

#### 构建H5页面需要考虑哪些因素？

#### jsonp的原理是什么？如何判断后台返回的是json还是jsonp？

#### 如何兼容css？