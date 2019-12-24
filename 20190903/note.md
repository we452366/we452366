## node

### stream

#### 流的概念
> 流是一组有序的，有起点和终点的字节数据传输手段；它不关心文件的整体内容，只关注是否从文件中读到了数据，以及读到数据之后的处理；流是一个抽象接口，被 Node 中的很多对象所实现。比如HTTP 服务器request和response对象都是流。

#### 可读流createReadStream
- 监听data事件
- 监听end事件
- 监听error事件
- 监听open事件
- 监听close事件

#### 可写流createWriteStream
- write方法
- end方法
- drain方法
- finish方法

#### pipe方法
- pipe
- unpipe
- cork
- uncork

#### Node.js 中有四种基本的流类型：
- Readable - 可读的流 (例如 fs.createReadStream())
- Writable - 可写的流 (例如 fs.createWriteStream())
- Duplex - 可读写的流 (例如 net.Socket)
- Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate())

#### 流中的数据有两种模式,二进制模式和对象模式
- 二进制模式, 每个分块都是buffer或者string对象
- 对象模式, 流内部处理的是一系列普通对象

> 所有使用 Node.js API 创建的流对象都只能操作 strings 和 Buffer对象。但是，通过一些第三方流的实现，你依然能够处理其它类型的 JavaScript 值 (除了 null，它在流处理中有特殊意义)。 这些流被认为是工作在 “对象模式”（object mode）。 在创建流的实例时，可以通过 objectMode 选项使流的实例切换到对象模式。试图将已经存在的流切换到对象模式是不安全的。

#### 可读流的两种模式
- flowing
    - 在 flowing 模式下， 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用
    - 所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换到 flowing 模式：
        - 监听 'data' 事件
        - 调用 stream.resume() 方法
        - 调用 stream.pipe() 方法将数据发送到 Writable

- paused
    - 在 paused 模式下，必须显式调用 stream.read() 方法来从流中读取数据片段
    - 可读流可以通过下面途径切换到 paused 模式：
        - 如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法实现。
        - 如果存在管道目标，可以通过取消 'data' 事件监听，并调用 stream.unpipe() 方法移除所有管道目标来实现。

> 如果 Readable 切换到 flowing 模式，且没有消费者处理流中的数据，这些数据将会丢失。 比如， 调用了 readable.resume() 方法却没有监听 'data' 事件，或是取消了 'data' 事件监听，就有可能出现这种情况。

#### 缓存区
- Writable 和 Readable 流都会将数据存储到内部的缓冲器（buffer）中。这些缓冲器可以 通过相应的 writable._writableState.getBuffer() 或 readable._readableState.buffer 来获取。

- 缓冲器的大小取决于传递给流构造函数的 highWaterMark 选项。 对于普通的流， highWaterMark 选项指定了总共的字节数。对于工作在对象模式的流， highWaterMark 指定了对象的总数。

- 当可读流的实现调用stream.push(chunk)方法时，数据被放到缓冲器中。如果流的消费者没有调用stream.read()方法， 这些数据会始终存在于内部队列中，直到被消费。

- 当内部可读缓冲器的大小达到 highWaterMark 指定的阈值时，流会暂停从底层资源读取数据，直到当前 缓冲器的数据被消费 (也就是说， 流会在内部停止调用 readable._read() 来填充可读缓冲器)。

- 可写流通过反复调用 writable.write(chunk) 方法将数据放到缓冲器。 当内部可写缓冲器的总大小小于 highWaterMark 指定的阈值时， 调用 writable.write() 将返回true。 一旦内部缓冲器的大小达到或超过 highWaterMark ，调用 writable.write() 将返回 false 。

- stream API 的关键目标， 尤其对于 stream.pipe() 方法， 就是限制缓冲器数据大小，以达到可接受的程度。这样，对于读写速度不匹配的源头和目标，就不会超出可用的内存大小。

- Duplex 和 Transform 都是可读写的。 在内部，它们都维护了 两个 相互独立的缓冲器用于读和写。 在维持了合理高效的数据流的同时，也使得对于读和写可以独立进行而互不影响。

#### 可读流的三种状态
> 在任意时刻，任意可读流应确切处于下面三种状态之一：
    - readable._readableState.flowing = null
    - readable._readableState.flowing = false
    - readable._readableState.flowing = true

- 若 readable._readableState.flowing 为 null，由于不存在数据消费者，可读流将不会产生数据。 在这个状态下，监听 'data' 事件，调用 readable.pipe() 方法，或者调用 readable.resume() 方法， readable._readableState.flowing 的值将会变为 true 。这时，随着数据生成，可读流开始频繁触发事件。

- 调用 readable.pause() 方法， readable.unpipe() 方法， 或者接收 “背压”（back pressure）， 将导致 readable._readableState.flowing 值变为 false。 这将暂停事件流，但 不会 暂停数据生成。 在这种情况下，为 'data' 事件设置监听函数不会导致 readable._readableState.flowing 变为 true。

- 当 readable._readableState.flowing 值为 false 时， 数据可能堆积到流的内部缓存中。

#### readable
> 'readable' 事件将在流中有数据可供读取时触发。在某些情况下，为 'readable' 事件添加回调将会导致一些数据被读取到内部缓存中。

- 当到达流数据尾部时， 'readable' 事件也会触发。触发顺序在 'end' 事件之前。
- 事实上， 'readable' 事件表明流有了新的动态：要么是有了新的数据，要么是到了流的尾部。 对于前者， stream.read() 将返回可用的数据。而对于后者， stream.read() 将返回 null。

#### 自定义可读流
> 为了实现可读流，引用Readable接口并用它构造新对象
    - 我们可以直接把供使用的数据push出去。
    - 当push一个null对象就意味着我们想发出信号——这个流没有更多数据了。

#### 可写流
> 为了实现可写流，我们需要使用流模块中的Writable构造函数。 我们只需给Writable构造函数传递一些选项并创建一个对象。唯一需要的选项是write函数，该函数揭露数据块要往哪里写。
    - chunk通常是一个buffer，除非我们配置不同的流。
    - encoding是在特定情况下需要的参数，通常我们可以忽略它。
    - callback是在完成处理数据块后需要调用的函数。这是写数据成功与否的标志。若要发出故障信号，请用错误对象调用回调函数

#### 管道流
```
const stream = require('stream')

var index = 0;
const readable = stream.Readable({
    highWaterMark: 2,
    read: function () {
        process.nextTick(() => {
            console.log('push', ++index)
            this.push(index+'');
        })
    }
})

const writable = stream.Writable({
    highWaterMark: 2,
    write: function (chunk, encoding, next) {
        console.log('写入:', chunk.toString())
    }
})

readable.pipe(writable);
```

#### 实现双工流
> 有了双工流，我们可以在同一个对象上同时实现可读和可写，就好像同时继承这两个接口。 重要的是双工流的可读性和可写性操作完全独立于彼此。这仅仅是将两个特性组合成一个对象。

```
const {Duplex} = require('stream');
const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },
    read(size) {
        this.push((++this.index)+'');
        if (this.index > 3) {
            this.push(null);
        }
    }
});

inoutStream.index = 0;
process.stdin.pipe(inoutStream).pipe(process.stdout);
```

#### 实现转换流
> 转换流的输出是从输入中计算出来的；对于转换流，我们不必实现read或write的方法，我们只需要实现一个transform方法，将两者结合起来。它有write方法的意思，我们也可以用它来push数据。

```
const {Transform} = require('stream');

const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```

#### 对象流
> 默认情况下，流处理的数据是Buffer/String类型的值。有一个objectMode标志，我们可以设置它让流可以接受任何JavaScript对象。

```
const {Transform} = require('stream');
let fs = require('fs');
let rs = fs.createReadStream('./users.json');
rs.setEncoding('utf8');
let toJson = Transform({
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        this.push(JSON.parse(chunk));
        callback();
    }
});
let jsonOut = Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        console.log(chunk);
        callback();
    }
});
rs.pipe(toJson).pipe(jsonOut)
```

#### unshift
> readable.unshift() 方法会把一块数据压回到Buffer内部。 这在如下特定情形下有用： 代码正在消费一个数据流，已经"乐观地"拉取了数据。 又需要"反悔-消费"一些数据，以便这些数据可以传给其他人用。

```
const {Transform} = require('stream');
const { StringDecoder } = require('string_decoder');
let decoder = new StringDecoder('utf8');
let fs = require('fs');
let rs = fs.createReadStream('./req.txt');

function parseHeader(stream, callback) {
    let header = '';
    rs.on('readable',onReadable);
    function onReadable() {

        let chunk;
        while(null != (chunk = rs.read())){
            const str = decoder.write(chunk);
            if(str.match(/\r\n\r\n/)){
                const split = str.split(/\r\n\r\n/);
                console.log(split);
                header+=split.shift();
                const remaining = split.join('\r\n\r\n');
                const buf = Buffer.from(remaining,'utf8');
                rs.removeListener('readable', onReadable);
                if(buf.length){
                    stream.unshift(buf);
                }
                callback(null,header,rs);
            }else{
                header += str;
            }
        }
    }
}
parseHeader(rs,function(err,header,stream){
    console.log(header);
    stream.setEncoding('utf8');
    stream.on('data',function (data) {
        console.log('data',data);
    });
});
```

#### 通过流读取数据
> 用Readable创建对象readable后，便得到了一个可读流。如果实现_read方法，就将流连接到一个底层数据源。流通过调用_read向底层请求数据，底层再调用流的push方法将需要的数据传递过来。当readable连接了数据源后，下游便可以调用readable.read(n)向流请求数据，同时监听readable的data事件来接收取到的数据。

- read
- push
- end
- doRead
- howMuchToRead