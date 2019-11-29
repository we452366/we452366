## React全家桶

### redux-saga
> redux-saga是处理异步任务的一个中间件。它是一个接收事件，并可触发新事件的过程管理者。

#### 工作原理
- saga采用Generator函数来yield Effects(包含指令的文本对象)
- Generator函数可以暂停执行，再次执行的时候从上次暂停的地方继续执行
- Effect是一个简单的对象，该对象包含了一些给middleware解释执行的信息
- 通过使用effects API如fork、call、take、put、cancel等来创建Effect

#### redux-saga分类
- worker saga:做实际的工作，如调用API，进行异步请求，获取异步封装结果
- watcher saga:监听被dispatch的actions，当接收到action或者知道其被触发时，调用worker执行任务
- root saga:立即启动saga的唯一入口