## node

### http

#### URI和URL

##### URI
URI(Uniform Resource Identifier)是统一资源标识符,在某个规则下能把这个资源独一无二标示出来，比如人的身份证号

- Uniform 不用根据上下文来识别资源指定的访问方式
- Resource 可以标识的任何东西
- Identifier 表示可标识的对象

##### URL

#### header 规范
统一资源定位符，表示资源的地点，URL时使用浏览器访问WEB页面时需要输入的网页地址

- Uniform 不用根据上下文来识别资源指定的访问方式
- Resource 可以标识的任何东西
- Location 定位

URL的格式:
- 协议类型
- 登录信息
- 服务器地址
- 服务器端口号
- 带层次的文件路径
- 查询字符串
- 片段标识符

#### HTTP
- 请求的一方叫客户端，响应的一方叫服务器端
- 通过请求和响应达成通信
- HTTP是一种不保存状态的协议

##### 请求报文
- 请求行
    - 方法
        - GET 获取资源
        - POST 向服务器端发送数据，传输实体主体
        - PUT 传输文件
        - HEAD 获取报文首部
        - DELETE 删除文件
        - OPTIONS 询问支持的方法
        - TRACE 追踪路径
        - 协议/版本号
        - URL

- 请求头
    - 通用首部(General Header)
    - 请求首部(Request Header)
    - 响应首部(Response Header)
    - 实体首部(Entity Header Fields)

- 请求体

##### 响应报文
- 响应行

- 响应头

- 响应体

##### 编码
HTTP可以在传输的过程中通过编码提升传输效率，但是会消耗更多的CPU时间。

###### 编码压缩
发送文件时可以先用ZIP压缩功能后再发送文件

- gzip
- compress
- deflate
- identify

###### 分割发送的分块传输编码
请求的实体在尚未传输完成前浏览器不能显示。所以在传输大容量数据时，通过把数据分割成多块，能让浏览器逐步显示页面。

###### 多部分对象集合
一份报文主体中可以包含多类型实体。
使用boundary字符串来划分多部分对象指明的各类实体。在各个实体起始行之前插入--标记,多部分对象集合最后插入--标记

- multiparty/form-data 上传表单时使用multiparty/form-data
- multipart/byteranges 206(Particial Content) 状态码(Partical Content)响应报文中包含多个范围时使用

###### 获取部分内容的范围请求
为了实现中断恢复下载的需求，需要能下载指定下载的实体范围

- 请求头中的Range来指定 资源的byte范围
- 响应会返回状态码206响应报文
- 对于多重范围的范围请求，响应会在首部字段Content-Type中标明multipart/byteranges
- byte范围的指定形式如下：
    - 5001~10000字节
    - 从5001字节之后全部的
    - 从一开始到3000字节和5000~7000字节的多重范围

##### 内容协商
- 首部字段
    - Accept
    - Accept-Charset
    - Accept-Encoding
    - Accept-Language
    - Content-Language

- 协商类型
    - 服务器驱动
    - 客户端驱动协商
    - 透明协商

##### 状态码
状态码负责表示客户端请求的返回结果、标记服务器端是否正常、通知出现的错误
- 101 websocket 双向通信
- 200 (OK 客户端发过来的数据被正常处理 成功
- 204 (Not Content 正常响应，没有实体 没有响应体
- 206 (Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容 断点续传
- 301 (Moved Permanently) 永久重定向
- 302 (Found) 临时重定向，规范要求方法名不变，但是都会改变
- 303 (See Other) 和302类似，但必须用GET方法
- 304 (Not Modified) 状态未改变 配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since) 缓存 只能服务端设置
- 307 (Temporary Redirect) 临时重定向，不该改变请求方法
- 400 (Bad Request) 请求报文语法错误
- 401 (unauthorized) 需要认证 没登录没有权限
- 403 (Forbidden) 服务器拒绝访问对应的资源 登录后没有权限
- 404 (Not Found) 服务器上无法找到资源 没有资源
- 405 请求方法不存在或不支持
- 500 (Internal Server Error)服务器故障
- 502 负载均衡
- 503 (Service Unavailable) 服务器处于超负载或正在停机维护

##### 发送请求的方式
- 浏览器 默认get请求
- postman
- 命令行 mac curl

##### 请求方法 
RestfulApi 根据不同的动作 做对应的处理

- get 获取资源
- post 新增资源
- put 上传文件 修改(restful)
- delete 删除资源
- options 跨域出现 复杂请求时出现 仅是get/post都是简单请求 但加上自定义头header就会变成复杂请求

##### 传输数据
浏览器
- 请求行 url
- 请求头 自定义header
- 请求体 提交的数据

#### Web服务器

##### 虚拟主机(Virtual Host)
一台HTTP服务器上搭建多个Web站点,客户端发送请求时必须在Host首部完整指定主机名或域名的URL

##### 通信转发程序:代理、网关

##### 代理
代理就是客户端和服务器的中间人

- 为啥使用代理
    - 利用缓存技术减少网络流量
    - 组织内部针对网站进行访问控制
    - 获取访问日志

- 代理的分类
    - 缓存代理 会预先把资源副本保存在服务器上
    - 透明代理 不对报文进行任何加工

##### 网关
接收从客户端发送来的数据时，会转发给其他服务器处理，再由自己返回

- 使通信线路上的服务器提供非HTTP协议服务
- 提高通信安全性

#### 首部

##### 通用首部字段
- Cache-Control 控制缓存行为
- Connection 链接的管理
- Date 报文日期
- Pragma 报文指令
- Trailer 报文尾部的首部
- Trasfer-Encoding 指定报文主体的传输编码方式
- Upgrade 升级为其他协议
- Via 代理服务器信息
- Warning 错误通知

##### 请求首部字段
- Accept 用户代理可处理的媒体类型
- Accept-Charset 优先的字符集
- Accept-Encoding 优先的编码
- Accept-Langulage 优先的语言
- Authorization Web认证信息
- Expect 期待服务器的特定行为
- From 用户的电子邮箱地址
- Host 请求资源所在的服务器
- If-Match 比较实体标记
- If-Modified-Since 比较资源的更新时间
- If-None-Match 比较实体标记
- If-Range 资源未更新时发送实体Byte的范围请求
- If-Unmodified-Since 比较资源的更新时间(和If-Modified-Since相反)
- Max-Forwards 最大传输跳数
- Proxy-Authorization 代理服务器需要客户端认证
- Range 实体字节范围请求
- Referer 请求中的URI的原始获取方
- TE 传输编码的优先级
- User-Agent HTTP客户端程序的信息

##### 响应首部字段
- Accept-Ranges 是否接受字节范围
- Age 资源的创建时间
- ETag 资源的匹配信息
- Location 客户端重定向至指定的URI
- Proxy-Authenticate 代理服务器对客户端的认证信息
- Retry-After 再次发送请求的时机
- Server 服务器的信息
- Vary 代理服务器缓存的管理信息
- www-Authenticate 服务器对客户端的认证

##### 实体首部字段
- Allow 资源可支持的HTTP方法
- Content-Encoding 实体的编码方式
- Content-Language 实体的自然语言
- Content-Length 实体的内容大小(字节为单位)
- Content-Location 替代对应资源的URI
- Content-MD5 实体的报文摘要
- Content-Range 实体的位置范围
- Content-Type 实体主体的媒体类型
- Expires 实体过期时间
- Last-Modified 资源的最后修改时间

#### HTTP服务器
HTTP全称是超文本传输协议，构建于TCP之上，属于应用层协议。

##### 创建HTTP服务器
let server  = http.createServer([requestListener]);
server.on('request',requestListener);

- requestListener 当服务器收到客户端的连接后执行的处理
    - http.IncomingMessage 请求对象
    - http.ServerResponse对象 服务器端响应对象

##### 启动HTTP服务器
server.listen(port,[host],[backlog],[callback]);
server.on('listening',callback);

- port 监听的端口号
- host 监听的地址
- backlog 指定位于等待队列中的客户端连接数

let http = require('http');
let server = http.createServer(function(req,res){
}).listen(8080,'127.0.0.1',function(){console.log('服务器端开始监听!')});

##### 关闭HTTP服务器
server.close();
server.on('close',function(){});

let http = require('http');
let server = http.createServer(function(req,res){
});
server.on('close',function(){
    console.log('服务器关闭');
});
server.listen(8080,'127.0.0.1',function(){
    console.log('服务器端开始监听!')
    server.close();
});

##### 监听服务器错误
server.on('error',function(){
    if(e.code == 'EADDRINUSE'){
         console.log('端口号已经被占用!);   
    }
});

##### connection
let server = http.createServer(function(req,res){
});
server.on('connection',function(){
    console.log(客户端连接已经建立);
});

##### setTimeout
设置超时时间，超时后不可再复用已经建立的连接，需要发请求需要重新建立连接。默认超时时间时2分钟

server.setTimeout(msecs,callback);
server.on('timeout',function(){
    console.log('连接已经超时');
});

##### 获取客户端请求信息
- request
    - method 请求的方法
    - url 请求的路径
    - headers 请求头对象
    - httpVersion 客户端的http版本
    - socket 监听客户端请求的socket对象

let http = require('http');
let fs = require('fs');
let server = http.createServer(function(req,res){
if(req.url != '/favicon.ico'){
let out = fs.createWriteStream(path.join(__dirname,'request.log'));
out.write('method='+req.method);
out.write('url='+req.url);
out.write('headers='+JSON.stringify(req.headers));
out.write('httpVersion='+req.httpVersion);
}
}).listen(8080,'127.0.0.1);

let http = require('http');
let fs = require('fs');
let server = http.createServer(function(req,res){
  let body = [];
  req.on('data',function(data){
    body.push(data);
  });
  req.on('end',function(){
      let result = Buffer.concat(body);
      console.log(result.toString());
  });
}).listen(8080,'127.0.0.1);

##### querystring
querystring模块用来转换URL字符串和URL中的查询字符串

- parse方法用来把字符串转换成对象
querystring.parse(str,[sep],[eq],[options]);

- stringify方法用来把对象转换成字符串
querystring.stringify(obj,[sep],[eq]);

- querystring
url.parse(urlStr,[parseQueryString]);

- href 被转换的原URL字符串
- protocal 客户端发出请求时使用的协议
- slashes 在协议与路径之间是否使用了//分隔符
- host URL字符串中的完整地址和端口号
- auth URL字符串中的认证部分
- hostname URL字符串中的完整地址
- port URL字符串中的端口号
- pathname URL字符串的路径，不包含查询字符串
- search 查询字符串，包含?
- path 路径，包含查询字符串
- query 查询字符串，不包含起始字符串?
- hash 散列字符串，包含#

##### 发送服务器响应流
http.ServerResponse对象表示响应对象

###### writeHead
response.writeHead(statusCode,[reasonPhrase],[headers]);

- content-type 内容类型
- location 将客户端重定向到另外一个URL地址
- content-disposition 指定一个被下载的文件名
- content-length 服务器响应内容的字节数
- set-cookie 在客户端创建Cookie
- content-encoding 指定服务器响应内容的编码方式
- cache-cache 开启缓存机制
- expires 用于制定缓存过期时间
- etag 指定当服务器响应内容没有变化不重新下载数据

###### Header
设置、获取和删除Header

response.setHeader('Content-Type','text/html;charset=utf-8');
response.getHeader('Content-Type');
response.removeHeader('Content-Type');
response.headersSent 判断响应头是否已经发送

###### headersSent
判断响应头是否已经发送

let http = require('http');
let server = http.createServer(function(req,res){
  console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
  res.writeHead(200,'ok);
  console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
});

###### sendDate
不发送Date

res.sendDate = false;

###### write
可以使用write方法发送响应内容

response.write(chunk,[encoding]);
response.end([chunk],[encoding]);

###### timeout
可以使用setTimeout方法设置响应让超时时间，如果在指定时间内不响应，则触发timeout事件

response.setTimeout(msecs,[callback]);
response.on('timeout',callback);

###### close
在响应对象的end方法被调用之前，如果连接中断，将触发http.ServerResponse对象的close事件

response.on('close',callback);

###### parser
net
onconnection

_http_server.js
连接监听
connectionListenerInternal
socketOnData
onParserExecuteCommon
parserOnIncoming

#### HTTP客户端

##### 向其他网站请求数据
let req = http.request(options,callback);
req.on('request',callback);
request.write(chunk,[encoding]);
request.end([chunk],[encoding]);

- host 指定目标域名或主机名
- hostname 指定目标域名或主机名，如果和host都指定了，优先使用hostname
- port 指定目标服务器的端口号
- localAddress 本地接口
- socketPath 指定Unix域端口
- method 指定HTTP请求的方式
- path 指定请求路径和查询字符串
- headers 指定客户端请求头对象
- auth 指定认证部分
- agent 用于指定HTTP代理，在Node.js中，使用http.Agent类代表一个HTTP代理，默认使用keep-alive连接，同时使用http.Agent对象来实现所有的HTTP客户端请求

let http = require('http');
let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
let req = http.request(options, function (res) {
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('响应内容', chunk);
    });
});
req.end();

##### 取消请求
可以使用abort方法来终止本次请求

req.abort();

##### 监听error事件
如果请求过程中出错了，会触发error事件

request.on('error',function(err){});

##### socket
建立连接过程中，为该连接分配端口时，触发socket事件

req.on('socket',function(socket){
  socket.setTimeout(1000);
  socket.on('timeout',function(){req.abort()});
});

##### get
可以使用get方法向服务器发送数据

http.get(options,callback);

##### addTrailers
可以使用response对象的addTrailers方法在服务器响应尾部追加一个头信息

let http = require('http');
let path = require('path');
let crypto = require('crypto');


let server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Transfer-Encoding': 'chunked',
        'Trailer': 'Content-MD5'
    });
    let rs = require('fs').createReadStream(path.join(__dirname, 'msg.txt'), {
        highWaterMark: 2
    });
    let md5 = crypto.createHash('md5');
    rs.on('data', function (data) {
        console.log(data);
        res.write(data);
        md5.update(data);
    });
    rs.on('end', function () {
        res.addTrailers({
            'Content-MD5': md5.digest('hex')
        });
        res.end();
    });
}).listen(8080);
let http = require('http');
let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
let req = http.request(options, function (res) {
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('响应内容', chunk);
    });
    res.on('end', function () {
        console.log('trailer', res.trailers);
    });
});
req.end();

##### 制作代理服务器
let http = require('http');
let url = require('url');
let server = http.createServer(function (request, response) {
    let {
        path
    } = url.parse(request.url);
    let options = {
        host: 'localhost',
        port: 9090,
        path: path,
        headers: request.headers
    }
    let req = http.get(options, function (res) {
        console.log(res);
        response.writeHead(res.statusCode, res.headers);
        res.pipe(response);
    });
    req.on('error', function (err) {
        console.log(err);
    });
    request.pipe(req);
}).listen(8080);

### https

#### http通信有什么问题?
- 窃听 - 对称加密
- 传递密钥 - 非对称加密
- 安全速度 - 非对称加密+对称加密
- 中间人攻击 - 证书
- 证书伪造 - 消息摘要
- 摘要伪造 - 数字签名

##### 可能被窃听
- HTTP 本身不具备加密的功能,HTTP 报文使用明文方式发送
- 由于互联网是由联通世界各个地方的网络设施组成,所有发送和接收经过某些设备的数据都可能被截获或窥视。(例如大家都熟悉的抓包工具:Wireshark),即使经过加密处理,也会被窥视是通信内容,只是可能很难或者无法破解出报文的信息而已

##### 认证问题
- 无法确认你发送到的服务器就是真正的目标服务器(可能服务器是伪装的)
- 无法确定返回的客户端是否是按照真实意图接收的客户端(可能是伪装的客户端)
- 无法确定正在通信的对方是否具备访问权限,Web 服务器上某些重要的信息，只想发给特定用户即使是无意义的请求也会照单全收。无法阻止海量请求下的 DoS 攻击（Denial of Service，拒绝服务攻击）。

##### 可能被篡改
请求或响应在传输途中，遭攻击者拦截并篡改内容的攻击被称为中间人攻击（Man-in-the-Middle attack，MITM）。

#### HTTPS如何解决上述三个问题?
HTTPS是在通信接口部分用 TLS(Transport Layer Security)协议。

#### SSL 和 TLS 的区别
- 传输层安全性协议（英语：Transport Layer Security，缩写作 TLS），及其前身安全套接层（Secure Sockets Layer，缩写作 SSL）是一种安全协议，目的是为互联网通信，提供安全及数据完整性保障。
- 网景公司（Netscape）在1994年推出首版网页浏览器，网景导航者时，推出HTTPS协议，以SSL进行加密，这是SSL的起源。
- IETF将SSL进行标准化，1999年公布第一版TLS标准文件。随后又公布RFC 5246 （2008年8月）与 RFC 6176 （2011年3月）。以下就简称SSL
- TLS是SSL的标准. HTTPS 就是 HTTP + SSL

#### SSL 协议
HTTPS 协议的主要功能基本都依赖于 TLS/SSL 协议，TLS/SSL 的功能实现主要依赖于三类基本算法：散列函数 、对称加密和非对称加密，其利用非对称加密实现身份认证和密钥协商，对称加密算法采用协商的密钥对数据加密，基于散列函数验证信息的完整性。

##### 对称加密
- 常见的有 AES-CBC、DES、3DES、AES-GCM等，相同的密钥可以用于信息的加密和解密，掌握密钥才能获取信息，能够防止信息窃听，通信方式是1对1；
- 对称加密需要共享相同的密码，密码的安全是保证信息安全的基础，服务器和多 个客户端通信，需要维持多个密码记录，且缺少修改密码的机制；
- 优点：算法公开、计算量小、加密速度快、加密效率高。
- 缺点：交易双方都使用同样钥匙，安全性得不到保证。

##### 非对称加密技术
- 即常见的 RSA 算法，还包括 ECC、DH 等算法，算法特点是，密钥成对出现，一般称为公钥(公开)和私钥(保密)，公钥加密的信息只能私钥解开，私钥加密的信息只能公钥解开。因此掌握公钥的不同客户端之间不能互相解密信息，只能和掌握私钥的服务器进行加密通信，服务器可以实现1对多的通信，客户端也可以用来验证掌握私钥的服务器身份。
- 非对称加密的特点是信息传输一对多，服务器只需要维持一个私钥就能够和多个客户端进行加密通信，但服务器发出的信息能够被所有的客户端解密，且该算法的计算复杂，加密速度慢。

##### 完整性验证算法
- 常见的有 MD5、SHA1、SHA256，该类函数特点是函数单向不可逆、对输入非常敏感、输出长度固定，针对数据的任何修改都会改变散列函数的结果，用于防止信息篡改并验证数据的完整性；
- 在信息传输过程中，散列函数不能单独实现信息防篡改，因为明文传输，中间人可以修改信息之后重新计算信息摘要，因此需要对传输的信息以及信息摘要进行加密；

##### 工作方式
结合三类算法的特点，TLS 的基本工作方式是
- 客户端使用非对称加密与服务器进行通信，实现身份验证并协商对称加密使用的密钥
- 然后对称加密算法采用协商密钥对信息以及信息摘要进行加密通信，不同的节点之间采用的对称密钥不同，从而可以保证信息只能通信双方获取。

##### SSL协议构成
- 第一层是记录协议(Record Protocol), 用于定义传输格式。
- 第二层握手协议(Handshake Protocol),它建立在SSL记录协议之上,用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。

##### HTTPS协议改进过程
1. 针对窃听风险
黑客可以嗅探通信内容 

对称加密算法的特点是加密和解密是使用同一个密钥，加解密速度快，典型的对称加密算法有DES、AES等。使用对称加密，客户端和服务端双方拥有相同的密钥，信息得到安全传输。 此种方式的缺点是：

- 客户端、服务器双方都需要维护大量的密钥，维护成本很高；
- 因每个客户端、服务器的安全级别不同，密钥容易泄露；

2. 安全传递密钥
非对称加密算法的特点加密和解密分别使用不同的密钥, 相对来说加解密速度较慢，典型的非对称加密算法有RSA、DSA等。客户端用公钥对请求内容加密，服务器使用私钥对内容解密，反之亦然。 此种方式的缺点是：
- 公钥是公开的，所以针对私钥加密的信息，黑客截获后可以使用公钥进行解密，获取其中的内容；
- 公钥并不包含服务器的信息，使用非对称加密算法无法确保服务器身份的合法性，存在中间人攻击的风险，服务器发送给客户端的公钥可能在传送过程中被中间人截获并篡改；
- 使用非对称加密在数据加密解密过程需要消耗一定时间，降低了数据传输效率；

客户端C和服务器S进行通信，中间节点M截获了二者的通信； 节点M自己计算产生一对公钥pub_M和私钥 pri_M； C向S请求公钥时，M把自己的公钥pub_M发给了C； C 使用公钥pub_M加密的数据能够被M解密，因为M掌握对应的私钥 pri_M，而 C 无法根据公钥信息判断服务器的身份，从而 C 和 M 之间建立了“可信”加密连接; 中间节点 M 和服务器S之间再建立合法的连接，因此 C 和 S 之间通信被M完全掌握，M 可以进行信息的窃听、篡改等操作。

##### SSL密钥协商的过程如下
1. client_hello过程
客户端发起请求，以明文传输请求信息，包含版本信息，加密套件候选列表，压缩算法候选列表，随机数，扩展字段等信息，相关信息如下：

- 版本信息: 支持的最高TSL协议版本version，从低到高依次 SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2，当前基本不再使用低于 TLSv1 的版本
- 加密套件候选列表(cipher suite): 认证算法 Au (身份验证)、密钥交换算法 KeyExchange(密钥协商)、对称加密算法 Enc (信息加密)和信息摘要 Mac(完整性校验);
- 压缩算法候选列表:支持的压缩算法 compression methods 列表，用于后续的信息压缩传输;
- 随机数:随机数就是上图里的RNc,用于后续生成协商密钥;
- 协商数据:支持协议与算法的相关参数以及其它辅助信息等，常见的 SNI 就属于扩展字段，后续单独讨论该字段作用。

2. server_hello 过程
- 服务端返回协商的信息结果，包括选择使用的协议版本version，选择的加密套件 cipher suite，选择的压缩算法 compression method、随机数 RNs等，其中随机数用于后续的密钥协商;
- 服务器证书链,用于身份校验和密钥交换
- 通知客户端server-hello结束,请求客户端的证书和密钥

3. 证书校验，协商最后通信密钥
- 客户端验证服务端证书的合法性，如果验证通过才会进行后续通信，否则根据错误情况不同做出提示和操作，合法性验证包括如下：
    - 证书链的可信性 trusted certificate path
    - 证书是否吊销 revocation
    - 有效期 expiry date，证书是否在有效时间范围;
    - 域名 domain，核查证书域名是否与当前的访问域名匹配，匹配规则后续分析; b. 客户端发送客户端证书,公钥服务端验证(过程同客户端验证) c. 客户端hash所有之前的消息,发送hash值和摘要,用客户端的私钥加密发送给服务端,服务端用客户端的公钥解密,验证了服务端获取的客户端的公钥和算法是正确的 d. 客户端生成pms,用服务端的公钥加密后发送给服务端 e. 客户端和服务端同时计算出最终会话密钥(MS)

4. 验证协商密钥
- Client发送ChangeCipherSpec，指示Server从现在开始发送的消息都是加密过的 b. Client发送Finishd，包含了前面所有握手消息的hash，可以让server验证握手过程是否被第三方篡改 c. 服务端发送ChangeCipherSpec，指示Client从现在开始发送的消息都是加密过的 d. Server发送Finishd，包含了前面所有握手消息的hash，可以让client验证握手过程是否被第三方篡改，并且证明自己是Certificate密钥的拥有者，即证明自己的身份

5. HTTPS完整建立连接过程,如下图
- 首先建立tcp握手连接
- 进行ssl协议的握手密钥交换(Handshake protocal)
- 然后通过共同约定的密钥开始通信

##### 证书
证书的作用就是,我和服务端通信,我怎么知道这个服务端是我要真正通信的服务端呢

1. 申请和发放证书流程如下

- 服务方 Server 向第三方机构CA提交公钥、组织信息、个人信息(域名)等信息并申请认证;
- CA通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法，是否拥有域名的所有权等;
- 如信息审核通过，CA会向申请者签发认证文件-证书。证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA的信息、有效时间、证书序列号等信息的明文，同时包含一个签名; 签名的产生算法：首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA的私钥对信息摘要进行加密，密文即签名;
- 客户端 Client 向服务器 Server 发出请求时，Server 返回证书文件;
- 客户端 Client 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即公钥合法;
- 客户端还会验证证书相关的域名信息、有效时间等信息; 客户端会内置信任CA的证书信息(包含公钥)，如果CA不被信任，则找不到对应 CA的证书，证书也会被判定非法。

2. 证书链
- 服务器证书 server.pem 的签发者为中间证书机构 inter，inter 根据证书 inter.pem 验证 server.pem 确实为自己签发的有效证书
- 中间证书 inter.pem 的签发 CA 为 root，root 根据证书 root.pem 验证 inter.pem 为自己签发的合法证书;
- 客户端内置信任 CA 的 root.pem 证书，因此服务器证书 server.pem 的被信任。
- 服务器证书、中间证书与根证书在一起组合成一条合法的证书链，证书链的验证是自下而上的信任传递的过程。

##### 让你的网站支持https
实战申请Let's Encrypt永久免费SSL证书过程教程及常见问题

git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
chmod 777 ./letsencrypt-auto
./letsencrypt-auto certonly --standalone --email zhang_renyang@126.com -d itnewhand.com

/etc/letsencrypt/live/itnewhand.com/fullchain.pem
/etc/letsencrypt/live/itnewhand.com/privkey.pem
生成证书时要先停掉nginx

#### https服务器
- HTTPS使用https协议，默认端口号443；
- HTTPS需要向证书授证中心申请证书；
- HTTPS服务器与客户端之间传输是经过SSL安全加密后的密文数据； 在创建HTTPS服务器之前，服务器首先需要创建公钥、私钥及证书，步骤如下 创建公钥、私钥及证书

##### 创建私钥
openssl genrsa -out privatekey.pem 1024

##### 创建证书签名请求
openssl req -new -key privatekey.pem -out certrequest.csr

##### 获取证书，线上证书需要经过证书授证中心签名的文件；下面只创建一个学习使用证书
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

##### 创建pfx文件
openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx

##### 创建服务器
创建HTTPS服务器同HTTP服务器大致相同，需要增加证书，创建HTTPS服务器时通过options参数设置。
https.createServer(options,[requestListener]);

- pfx 私钥、公钥以及证书
- key 私钥
- passphrase 为私钥指定密码
- cert 公钥
- ca 证书，用于指定一组证书，默认属性值为几个著名的证书授权中心,例如VerlSign
- crl 指定证书吊销主

import https from 'https';
import fs from 'fs';

var pk = fs.readFileSync('privatekey.pem'),
    pc = fs.readFileSync('certificate.pem');

var opts = {
    key: pk,
    cert: pc
};

var server = https.createServer(opts);
opts参数为一个对象，用于指定创建HTTPS服务器时配置的各种选项，下面只描述几个必要选项：

|属性名|说明|
|:-|:-|
|pff|用于指定从pfx文件读取出的私钥、公钥以及证书（指定该属性后，无需再指定key、cert、ca）|
|key|用于指定后缀名为pem的文件，读出私钥|
|cert|用于指定后缀名为pem的文件，读出公钥|
|ca|用于指定一组证书，默认值为几个著名的证书授证中心|

##### 创建HTTPS客户端
在https模块中，可以使用request方法向其它使用HTTPS协议的网站请求数据
let req = https.request(options,callback);

- host 指定域名或目标主机的IP地址
- hostname 指定域名或目标主机的IP地址
- port 端口号
- method 指定请求方法名
- path 指下请求路径及查询字符串
- headers 客户端请求头对象
- auth 指定认证信息部分
- agent 指定用户代理,指定false则从连接池中挑选一个连接状态为关闭的https.Agent对象
- pfx 指定私钥、公钥和证书
- key 指定私钥
- cert 公钥
- ca 一组证书

const options = {
        hostname: 'localhost',
        port: 1443,
        path: '/',
        method: 'post',
        key: fs.readFileSync('privatekey.pem'),
        cert: fs.readFileSync('certificate.pem'),
        rejectUnhauthorized: false,
        agent: false // 从连接池中指定挑选一个当前连接状态为关闭的https.Agent
    },
    req = https.request(options);

// 或者
const options = {
        hostname: 'localhost',
        port: 1443,
        path: '/',
        method: 'post',
        key: fs.readFileSync('privatekey.pem'),
        cert: fs.readFileSync('certificate.pem'),
        rejectUnhauthorized: false,
    };
// 显示指定https.Agent对象
options.agent = new https.Agent(options);
var req = https.request(options);

### cookie

#### cookie是什么
- HTTP1.0中协议是无状态的，但在WEB应用中，在多个请求之间共享会话是非常必要的，所以出现了Cookie
- cookie是为了辩别用户身份，进行会话跟踪而存储在客户端上的数据

#### 使用步骤

##### 服务器发送cookie
客户端第一次访问服务器的时候服务器通过响应头向客户端发送Cookie,属性之间用分号空格分隔
Set-Cookie:name=zfpx; Path=/

##### 客户端接收保存cookie
客户端接收到Cookie之后保存在本地

##### 客户端发送cookie
以后客户端再请求服务器的时候会把此Cookie发送到服务器端

Cookie:name=zfpx

#### cookie重要属性
|属性|说明|
|:-|:-|
|name=value|键值对，可以设置要保存的 Key/Value|
|Domain|域名，默认是当前域名|
|maxAge|最大失效时间(毫秒),设置在多少后失效|
|secure|当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效|
|Path|表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个Cookie|
|Expires|过期时间(秒)，在设置的某个时间点后该 Cookie 就会失效，如 expires=Money, 05-Dec-11 11:11:11 GMT|
|httpOnly|如果在COOKIE中设置了httpOnly属性，则通过程序(JS脚本)将无法读取到COOKIE信息，防止XSS攻击产生|

#### 在express中向客户端发送cookie

##### 设置cookie
 res.cookie(name,value,[,options]);

|参数|chrome对应属性|类型|说明|示例|
|:-|:-|:-|:-|:-|
|domain|Domain|String|域名，默认是当前域名|{domain:'a.zfpx.cn'}|
|path|Path|String|路径，默认是/|{path:'/visit'}|
|expires|Expires|Date|过期时间，如果没以有指定或为0表示当前会话有效|{expires:new Date(Date.now()+20*1000)}|
|maxAge|Max-Age|Number|有效时间(单位是毫秒)|{maxAge:20*1000}|
|httpOnly|HTTP|Boolean|不能通过浏览器javascript访问|{httpOnly:true}|
|secure|Secure|String|只通过https协议访问||

##### 获取cookie

使用cookie-parser中间件

$ npm install cookie-parser --save

app.use(require('cookie-parser')());    //使用中间件
response.cookie(key,value)              //在响应中向客户端设置cookie
request.cookies                         //获取请求中的cookie对象
response.clearCookie('username')        //清除cookie

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
/**
 * 如果要加密的话 cookieParser里要指定密码，而且signed要等于true res.cookie('name','zfpx',{signed:true});
 */
app.use(cookieParser('zfpx'));
app.get('/write',function(req,res){
    //1.普通设置
    //res.cookie('name','value');

    //2.设置域名
    //res.cookie('name','zfpx',{domain:'a.zfpx.cn'});

    //3.设置路径
    //res.cookie('name','zfpx',{path:'/visit'});

    //4.过期时间
    //res.cookie('name','zfpx',{expires:new Date(Date.now()+20*1000)});//毫秒
    //res.cookie('name','zfpx',{maxAge:20*1000});//过期时间 毫秒

    //httpOnly true还是false无意义 document.cookie取不到
    //res.cookie('name','zfpx',{httpOnly:true});
    res.cookie('age','123',{signed:true});
    res.end('ok');
});

app.get('/read',function(req,res){
    console.log(req.signedCookies);
    res.send(req.cookies);
});

//记录这是客户端的第几次访问
app.get('/visit',function(req,res){
    res.cookie('count',isNaN(req.cookies.count)?0:parseInt(req.cookies.count)+1);
    res.send(req.cookies);
});


app.listen(9090);

##### cookie原理解析
function cookieParser(secret){
  return function cookieParser(req, res, next){
    req.secret = secret;  
    if (!req.headers.cookie) {
        return next();
    }
    req.cookies =  require('querystring').parse(req.headers.cookie,'; ','=');
    if(req.secret){
        req.signedCookies = {};
        for(let attr in req.cookies){
                let val = req.cookies[attr];
                req.signedCookies[attr] = unsign(val, secret);
            }
        }
    }
    next();
  }
}

function cookie(name, val, options) {
    var opt = options || {};
    val = encodeURIComponent(val);
    if(opt.secret){
        var secret = this.req.secret;
        val = sign(val,this.secret);
    }

    var pairs = [name + '=' + value];

    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + Math.floor(maxAge));
    }

    if (opt.domain) {
        pairs.push('Domain=' + opt.domain);
    }

    if (opt.path) {
        pairs.push('Path=' + opt.path);
    }

    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly=true');
    if (opt.secure) pairs.push('Secure=true');

    return pairs.join('; ');
}

var crypto = require('crypto');
exports.sign = function(val, secret){
  return val + '.' + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');
};

exports.unsign = function(val, secret){
  var str = val.slice(0, val.lastIndexOf('.'))
    , mac = exports.sign(str, secret);
  return mac == val ? str : false;
};

#### 权限控制
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.set('view engine','html');
app.engine('html',require('ejs').__express);
app.set('views',__dirname);

app.use(cookieParser());

function checkUser(req,res,next){
    if(req.cookies && req.cookies.username)
      next();
    else
      res.redirect('/');
}

//进入登录页
app.get('/',function(req,res){
    res.render('index');
});

//登录
app.get('/login',function(req,res){
    res.cookie('username',req.query.username,{httpOnly:true});
    res.redirect('/user');
});

//用户页面
app.get('/user',checkUser,function(req,res){
    res.render('user',{username:req.cookies.username});
});

//用户退出
app.get('/logout',function(req,res){
    res.clearCookie('username');//清除cookie
    res.redirect('/');
});

app.listen(8080);

#### cookie使用注意事项
- 可能被客户端篡改，使用前验证合法性
- 不要存储敏感数据，比如用户密码，账户余额
- 使用httpOnly保证安全
- 尽量减少cookie的体积
- 设置正确的domain和path，减少数据传输

### session

#### 什么是session
- session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上
- 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

#### cookie与session区别
- cookie数据存放在客户的浏览器上，session数据放在服务器上。
- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面,应当使用COOKIE
- 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie
将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中

#### session实现
- 在服务器端生成全局唯一标识符session_id
- 在服务器内存里开辟此session_id对应的数据存储空间
- 将session_id作为全局唯一标示符通过cookie发送给客户端
- 以后客户端再次访问服务器时会把session_id通过请求头中的cookie发送给服务器
- 服务器再通过session_id把此标识符在服务器端的数据取出

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
//存放会话数据 key卡号 value就是卡号对应的数据对象
var sessions = {};
//与客户端约定的会话ID
var SESSION_KEY = 'connect.sid'
//当用户访问根目录的时候 执行对应的回调函数
app.get('/',function(req,res){
    res.setHeader('Content-Type','text/html;charset=utf-8');
   // 1. 先取出cookie中的sessionId 卡号
    var sessionId = req.cookies[SESSION_KEY];
    // 如果有卡号的，也就是有ID的话 老顾客
    if(sessionId){
        //取出此卡号对应的信息，余额
        var sessionObj = sessions[sessionId];
        if(sessionObj){
            //扣掉10块钱
            sessionObj.balance = sessionObj.balance -10;
            res.send('欢迎你老顾客，你卡上还剩'+sessionObj.balance);
        }else{
            genId(res);
        }
    //如果没有的话就是新顾客
    }else{
        genId(res);
    }
    function genId(res){
        //由店家生成一个唯一的卡号
        var id = Date.now()+''+Math.random();
        //要在店家的小本上记录一下此卡号对应的余额
        sessions[id] = {balance:100};
        //把这个卡发给顾客带回家
        res.cookie(SESSION_KEY,id);
        //告诉 用户送他一张卡
        res.send('欢迎你新顾客，送你一张价值100元的剪发卡');
    }
});

app.listen(9090);

#### session中间件
$ npm install express-session

|参数|描述|
|:-|:-|
|name|设置 cookie 中，保存 session 的字段名称，默认为 connect.sid|
|store|session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等|
|secret|通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改|
|cookie|设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: '/', httpOnly: true, secure: false, maxAge: null })|
|genid|产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包|
|rolling|每个请求都重新设置一个 cookie，默认为 false|
|saveUninitialized|是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid|
|resave|是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟|

#### 实现sesion计数器
let express = require('express');
let session = require('express-session');
let path = require('path');
let FileStore = require('./filestore')(session);
let app = express();
app.use(session({
    secret: 'zfpx',
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        root: path.join(__dirname, 'sessions'),
        maxAge: 1000,
        gc: 1
    })
}));
app.get('/visit', function (req, res) {
    let visit = req.session.visit;
    if (visit) {
        visit = visit + 1;
    } else {
        visit = 1;
    }
    req.session.visit = visit;
    res.send(`欢迎你的第${visit}次光临`);
});
app.listen(8080);

#### session实现权限
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('uuid');
var app = express();
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.set('views', __dirname);
app.use(require('cookie-parser')());

app.use(session({secret: 'zfpx',
    resave: true,
    saveUninitialized: true}));

/**
 * curl -v -H "cookie: username=customer" http://localhost:8080/user
 */

function checkUser(req, res, next) {
    if (req.session && req.session.username)
        next();
    else
        res.redirect('/');
}

//进入登录页
app.get('/', function (req, res) {
    res.render('index');
});

//登录
app.get('/login', function (req, res) {
    req.session.username = req.query.username;
    res.redirect('/user');
});

//用户页面
app.get('/user', function (req, res) {
    console.log(req.session);
    res.render('user', {username: req.session.username});
});

//用户退出
app.get('/logout', function (req, res) {
    req.session.usrename = null;
    res.redirect('/');
});

app.listen(8080);

#### 自定义存储位置
|方法|含义|
|:-|:-|
|get|获取sessoin|
|set|设置session|
|destroy|销毁session|

##### 保存到文件中
let util = require('util');
let mkdirp = require('mkdirp');
let fs = require('fs');
const path = require('path');

function createFileStore(session) {
    const Store = session.Store;
    util.inherits(FileStore, Store);
    function FileStore(options) {
        let { dir = path.resolve(__dirname, 'sessions') } = options || {};
        this.dir = dir;
        mkdirp(this.dir);
    }
    FileStore.prototype.resolve = function (sessionId) {
        return path.join(this.dir, `${sessionId}.json`);
    }
    FileStore.prototype.get = function (sessionId, callback) {
        fs.readFile(this.resolve(sessionId), 'utf8', (err, data) => {
            if (err) return callback(err);
            callback(err, JSON.parse(data));
        });
    }

    FileStore.prototype.set = function (sessionId, session, callback) {
        fs.writeFile(this.resolve(sessionId), JSON.stringify(session), callback);
    }

    FileStore.prototype.destroy = function (sessionId, callback) {
        fs.unlink(this.resolve(sessionId), callback);
    }
    return FileStore;
}

module.exports = createFileStore;
//FileStore

##### 保存到Redis数据库中
let util = require('util');
var redis = require("redis");
function createRedisStore(session) {
    const Store = session.Store;
    util.inherits(RedisStore, Store);
    function RedisStore(options = {}) {
        this.client = redis.createClient(options.port || 6379, options.host || 'localhost');
    }
    RedisStore.prototype.get = function (sessionId, callback) {
        this.client.get(String(sessionId), (err, data) => {
            callback(err, JSON.parse(data));
        });
    }

    RedisStore.prototype.set = function (sessionId, session, callback) {
        this.client.set(sessionId, JSON.stringify(session), callback);
    }

    RedisStore.prototype.destroy = function (sessionId, callback) {
        this.client.del(sessionId, callback);
    }
    return RedisStore;
}

module.exports = createRedisStore;
//FileStore