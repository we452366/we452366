## 进程
## 线程
- 单线程：不适合cpu密集型 压缩、处理文件 会等待其他处理完之后再进行处理
- 处理高并发任务：浏览器webworker开启多线程 node中用子进程处理多并发(spawn) 处理cpu密集型任务

### child_process 
- spwan 读取大文件
    - stdio的类型 
        - 默认 'pipe' 处理文件输出
        - 'inheirt' 等价于 [0,1,2] 等价于 [process.stdin,process.stdout,process.err]
        - 'ipc' 进程间通信(Inter-Process Communication) 处理数据计算

- fork 可以使用ipc
    - 是对spwan的封装 对文件的操作可以用fork
    - silent

- execFile 
    - 基于spwan

- exec 默认exec 会启动一个shell
    - 基于spwan

### Cluster
- 守护进程 负载均衡