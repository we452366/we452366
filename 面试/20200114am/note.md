## 中国联通网络研究院

### 网络

#### 请你简述一下对http的理解
```
HTTP协议是超文本传输协议（HTTP，HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议。所有的 WWW（万维网） 文件都必须遵守这个标准。设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。（百度百科）

在 HTTP/1.0 中默认使用短连接。也就是说，客户端和服务器每进行一次 HTTP 操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个 HTML 或其他类型的 Web 页中包含有其他的 Web 资源（如 JavaScript 文件、图像文件、CSS 文件等），每遇到这样一个 Web 资源，浏览器就会重新建立一个 HTTP 会话。

而从 HTTP/1.1 起，默认使用长连接，用以保持连接特性。使用长连接的 HTTP 协议，会在响应头加入这行代码：Connection:keep-alive


在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive 不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如 Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。

HTTP 协议的长连接和短连接，实质上是 TCP 协议的长连接和短连接

- http1.0与1.1对比：
    - http 1.0 对于每个连接都得建立一次连接, 一次只能传送一个请求和响应, 请求就会关闭, http1.0 没有 Host 字段
    - 而 http1.1 在同一个连接中可以传送多个请求和响应, 多个请求可以重叠和同时进行, http1.1 必须有 host 字段
    - http1.1 中引入了 ETag 头, 它的值 entity tag 可以用来唯一的描述一个资源. 请求消息中可以使用 If-None-Match 头域来匹配资源的 entitytag 是否有变化
    - http1.1 新增了 Cache-Control 头域(消息请求和响应请求都可以使用), 它支持一个可扩展的指令子集
    - http1.0 中只定义了 16 个状态响应码, 对错误或警告的提示不够具体. http1.1 引入了一个 Warning 头域, 增加对错误或警告信息的描述. 且新增了 24 个状态响应码

- http1.x与2.x对比：
    - **二进制格式**:http1.x 是文本协议，而 http2.0 是二进制以帧为基本单位，是一个二进制协议，一帧中除了包含数据外同时还包含该帧的标识：Stream Identifier，即标识了该帧属于哪个 request,使得网络传输变得十分灵活。
    - **多路复用**: 一个很大的改进，原先 http1.x 一个连接一个请求的情况有比较大的局限性，也引发了很多问题，如建立多个连接的消耗以及效率问题。
    - http1.x 为了解决效率问题，可能会尽量多的发起并发的请求去加载资源，然而浏览器对于同一域名下的并发请求有限制，而优化的手段一般是将请求的资源放到不同的域名下来突破这种限制。
    - 而 http2.0 支持的多路复用可以很好的解决这个问题，多个请求共用一个 TCP 连接，多个请求可以同时在这个 TCP 连接上并发，一个是解决了建立多个 TCP 连接的消耗问题，一个也解决了效率的问题。那么是什么原理支撑多个请求可以在一个 TCP 连接上并发呢？基本原理就是上面的二进制分帧，因为每一帧都有一个身份标识，所以多个请求的不同帧可以并发的无序发送出去，在服务端会根据每一帧的身份标识，将其整理到对应的 request 中。
    - **header 头部压缩**:主要是通过压缩 header 来减少请求的大小，减少流量消耗，提高效率。因为之前存在一个问题是，每次请求都要带上 header，而这个 header 中的数据通常是一层不变的。
    - 支持服务端推送
```

#### 三次握手是什么？客户端向服务器端发送请求是同步的还是异步的？
https://blog.csdn.net/qq_39290490/article/details/81784324
```
- 建立 TCP 连接需要三次握手:三次握手: 首先 Client 端发送连接请求报文，Server 段接受连接后回复 ACK 报文，并为这次连接分配资源。Client 端接收到 ACK 报文后也向 Server 段发生 ACK 报文，并分配资源，这样 TCP 连接就建立了。
  - 第一步: 客户机的 TCP 先向服务器的 TCP 发送一个连接请求报文. 这个特殊的报文中不含应用层数据, 其首部中的 SYN 标志位被置 1. 另外, 客户机会随机选择一个起始序号 seq=x(连接请求报文不携带数据,但要消耗掉一个序号)
  - 第二步: 服务器端的 TCP 收到连接请求报文后, 若同意建立连接, 就向客户机发送请求, 并为该 TCP 连接分配 TCP 缓存和变量. 在确认报文中,SYN 和 ACK 位都被置为 1, 确认号字段的值为 x+1, 并且服务器随机产生起始序号 seq=y(确认报文不携带数据, 但也要消耗掉一个序号). 确认报文同样不包含应用层数据.
  - 第三步: 当客户机收到确认报文后, 还要向服务器给出确认, 并且也要给该连接分配缓存和变量. 这个报文的 ACK 标志位被置为 1, 序号字段为 x+1, 确认号字段为 y+1
- 四次挥手
  - 第一步: 客户机打算关闭连接,就向其 TCP 发送一个连接释放报文,并停止再发送数据,主动关闭 TCP 连接, 该报文的 FIN 标志位被置 1, seq=u, 它等于前面已经传送过的数据的最后一个字节的序号加 1(FIN 报文即使不携带数据,也要消耗掉一个序号)
  - 第二步: 服务器接收连接释放报文后即发出确认, 确认号是 ack=u+1, 这个报文自己的序号是 v, 等于它前面已传送过的数据的最后一个自己的序号加 1. 此时, 从客户机到服务器这个方向的连接就释放了, TCP 连接处于半关闭状态. 但服务器若发送数据, 客户机仍要接收, 即从服务器到客户机的连接仍未关闭.
  - 第三步: 若服务器已经没有了要向客户机发送的数据, 就通知 TCP 释放连接, 此时其发出 FIN=1 的连接释放报文
  - 第四步: 客户机收到连接释放报文后, 必须发出确认. 在确认报文中, ACK 字段被置为 1, 确认号 ack=w+1, 序号 seq=u+1. 此时, TCP 连接还没有释放掉, 必须经过等待计时器设置的时间 2MSL 后, A 才进入到连接关闭状态.
```
会阻塞
```
服务器初始化 
（1）调用socket,创建文件描述符 
（2）调用bind,将文件描述符与ip/port连接起来。若端口号已被占用，则bind失败 
（3）调用listen，声明该文件描述符是服务器的一个文件描述符，为之后的accept做准备 
（4）调用accept,并处于阻塞状态，等待客户端连接 
建立连接 
（1）调用socket，创建文件描述符 
（2）调用connect，向服务器发起连接请求。 
（3）connect会发送一个请求SYN段并阻塞等待服务器应答（第一次） 
（4）服务器收到SYN，会给客户端发送一个确认应答的同时发送一个请求（SYN+ACK），表示同意建立连接（第二次） 
（5）客户端收到客户端发的SYN+ACK段，表明客户端连接已建立成功，进入ESTABLISHED状态，从connect()。客户端再向服务器发送一个ACK段，服务器收到后则服务器端连接也建立成功，服务器也进入ESTABLISHED状态。 
 
数据传输 
（1）连接建立成功后，在同一连接、同一时刻，通信双方可同时写数据（全双工） 
（2）服务器端从accept（）返回后调用read()开始读数据，若没有数据则阻塞等待 
（3）客户端调用write（）向服务器发送数据请求，客户端收到之后调用read（）处理请求，此过程服务器调用read（）阻塞等待 
（4）服务器调用write（）将处理好的请求发送给客户端，再次调用read（）等待下一个请求 
（5）客户端收到后从read（）返回，发送下一条请求，如此循环下去

断开连接 
（1）没有数据处理了，则客户端调用close（）关闭连接，给服务器端发送一个断开连接请求FIN段（第一次） 
（2）服务器收到客户端的FIN段，给客户端发送一个确认应答ACK段表明同意断开连接，客户端收到ACK段并调用read（）返回0，表明客户端连接已断开（第二次） 
（3）read（）返回0之后，服务器知道客户端已断开连接，它也调用close（）关闭连接，给客户端发送一个断开连接请求FIN段（第三次） 
（4）客户端接收到服务器端发送的FIN段，给服务器一个确认应答ACK段，表明同意断开连接。客户端进入TIME_WAIT状态，服务器收到客户端的ACK后则服务器断开连接。 


总结： 
1.为什么是三次握手而不是两次或四次握手？ 
（1）如果是两次握手，则客户端发送连接请求SYN，服务器端接收连接请求并给客户端发送一个ACK进入ESTABLISHED状态，服务器端认为连接建立成功。有可能服务器端发送的ACK在传输过程中丢了，客户端没有收到ACK从而认为连接没有建立成功。客户端认为连接没有建立成功则会不停的发送连接请求，而服务器认为连接成功则需要文虎相应的资源来管理连接，但这个连接无意义，服务器在维护的时候会浪费服务器资源。造成空间与时间上的浪费，从而造成内存泄漏的问题。四次握手问题同二次握手。 
（2）三次握手的最后一次传送数据有可能也会造成丢包问题，但是此时客户端认为连接建立成功而服务器认为连接建立没成功，对服务器没有太大的消耗。客户端给服务器端发送数据，服务器端不进行接收。 
三次握手已经满足需求就不需要更多次的握手。 
（3）建立连接是双方的事情，双方都需要建立连接再互相确认，有点像四次握手。但是因为因为TCP能捎带应答，所以服务器向客户端的请求建立连接的SYN以及对客户端的ACK可以一起发送，从而导致了三次握手。 
2.为什么是四次挥手？ 
* 释放连接是两方的事情，双方发送断开连接请求后还需要确认，而且服务器对客户端的ACK以及FIN不能合并，所以是四次挥手 
* 服务器端对客户端的FIN及ACK不能合并是因为客户端断开连接表明客户端没有数据发送给服务器了，不带表服务器没有数据发给客户端，则服务器向客户端发送ACK之后到服务器发送FIN之间有时间间隔，所以两步骤不能合并 
3.为什么有TIME_WAIT状态？ 
如服务器端将最后一个断开连接请求发送之后，客户端收到FIN后给服务器端发送一个确认应答ACK，但在传输过程中可能会丢包，这个ACK没有被服务器收到。当服务器在一定时间内没有收到ACK时会重新发送请求，所以客户端需要一个TIME_WAIT时间等待，解决丢包重传问题。一个TIME_WAIT的时间是2MSL。 
哪一方先断开连接就先进入TIME_WAIT等待时间。
```

#### 浏览器输入一个地址都经历哪些过程？
```
1.浏览器通过DNS将url地址解析为ip(如果有缓存直接返回缓存，否则递归解析)
2.通过DNS解析得到了目标服务器的ip地址后，与服务器建立TCP连接。
    - ip协议：选择传输路线，负责找到
    - tcp协议：三次握手，分片，可靠传输，重新发送的机制
3.浏览器通过http协议发送请求(增加http的报文信息)头 体 行
4.服务器接收请求后，查库，读文件，拼接好返回的http响应
5.浏览器收到html，开始渲染
6.解析html为dom，解析css为css-tree，最终生成render-tree阻塞渲染
7.遍历渲染树开始布局，计算每个节点的位置大小信息
8.将渲染树每个节点绘制到屏幕
9.加载js文件，运行js脚本
10.relow(样式)和repaint(位置)
```

#### 常见的浏览器内核都有哪些？
```
- Trident内核：IE、MaxThon、TT、The World、360、搜狗浏览器等。[又称MSHTML]
- Gecko内核：Netscape6及以上版本、FF、MozillaSuite、SeaMonkey等
- Presto内核：Opera7及以上。[Opera内核原为Presto，现为Blink]
- Webkit内核：Safari、Chrome等。[Chrome的Blink(webkit的分支)]
```

#### Chrome浏览器和IE浏览器性能有哪些差别？Chrome做了哪些优化？
```
> 主要分成两部分：渲染引擎(layout engine 或 rendering engine)和js引擎

渲染引擎：负责取得网页的内容(HTML、XML、图像等等)、整理讯息(例如加入css等)，以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网格内容的应用程序都需要内核

js引擎：解析和执行javascript来实现网页的动态效果

最开始渲染引擎和js引擎并没有区分很明确，后来js引擎越来越独立

- 浏览器组成：
从原理构成上分为七个模块，分别是 User Interface（用户界面）、 Browser engine（浏览器引擎） 、 Rendering engine（渲染引擎） 、 Networking（网络） 、 JavaScript Interpreter（js解释器） 、 UI Backend（UI后端） 、Date Persistence（数据持久化存储）

其中，最重要的是渲染引擎（内核）和 JavaScript 解释器（JavaScript引擎）

浏览器内核主要负责 HTML 、CSS 的解析，页面布局、渲染与复合层合成; JavaScript 引擎负责 JavaScript 代码的解释与执行
```

#### 浏览器是如何解析并渲染页面的？
https://blog.csdn.net/cuew1987/article/details/9878945
```
四、渲染树的构建
	当DOM被构建时，浏览器构建另一个渲染树，这棵树上的可视化元素将被按正确的顺序显示。这是文档的可视化表示。
	目的在于使可视化元素按他们的顺序渲染他们的内容。
	在Firefox中，这些元素在渲染树中称作“帧”，webkit使用术语渲染器或者渲染对象，一个渲染器知道如何去布局和绘制它自己和它的孩子。
	Webkits 渲染对象类，基于渲染器的类有以下定义：
	class RenderObject{
		virtual void layout();
		virtual void paint(PaintInfo);
		virtual void rect repaintRect();
		Node* node;  //the DOM node
		RenderStyle* style;  // the computed style
		RenderLayer* containgLayer; //the containing z-index layer
	}
	每个渲染一个矩形区域，通常对应一个节点的CSS盒子，也被描述在CSS2.0规则，它包含了几何信息，如宽、高和位置。
	盒子的类型受与节点相关的“display”样式属性影响，下面是webkit代码，根据显示属性决定什么类型的渲染器应该创建
	一个DOM节点。
	RenderObject* RenderObject::createObject(Node* node, RenderStyle* style){
		Document* doc = node->document();
		RenderArena* arena = doc->renderArena();
		...
		RenderObject* o = 0;
		switch (style->display()) {
			case NONE:
				break;
			case INLINE:
				o = new (arena) RenderInline(node);
				break;
			case BLOCK:
				o = new (arena) RenderBlock(node);
				break;
			case INLINE_BLOCK:
				o = new (arena) RenderBlock(node);
				break;
			case LIST_ITEM:
				o = new (arena) RenderListItem(node);
				break;
		   ...
		}
		return o;
	}
	考虑到元素类型，例如表单控件和表格有特殊的帧。Chrome浏览器中input表单控件，浏览器Computed Style中显示display：inline-block; table->display:table
	thead->display: table-header-group;tr->display: table-row;tbody->display: table-row-group;th/td->display: table-cell;
	在webkit中，如果一个元素想创建一个特殊的渲染器，它将重写“createRender”方法，渲染器指向包含非几何信息的样式对象。
	
	1.渲染树关联到DOM树
		渲染器和DOM元素相对应，但是不是一一对应关系，不可见的元素将不会插入到渲染树，
		例如“head”元素，该元素的显示属性会设置为“none”，将不会显示到渲染树，（设置visibility：hidden的元素会出现在DOM树）。
		有些DOM元素会对应几个可见对象（渲染器），通常这些元素有着复杂的结构，不能被描述成单一的矩形，
		例如“select”元素
		有三个渲染器——一个显示area，一个下拉框，一个下拉按钮。此外，当文本被分隔成多行时，因为宽度不足显示在一行，
		那个新行将作为一个额外的渲染器被添加。
		另一个例子，好几个渲染器打破了HTML。根据CSS规范，一个行内元素必须包含唯一的块元素或者仅内联元素，在混合内容的情况下
		匿名块渲染器将会被创建并包裹那个内联元素。
		
		一些渲染器对象和一个DOM节点对应，但是不是在树中的同一个地方，浮动和绝对定位的元素是脱离了流，被放置到渲染树
		不同的地方，并映射到真实的帧。应该是一个占位符框架。
		下图：4.1.1 渲染树和对应的DOM树




		
	2.流构造树
	在Firefox中，这个介绍被注册为一个DOM更新监听器。介绍委派帧创建到“FrameConstructor”和构造解析样式（样式计算），并创建了一个框架。
	在Webkit,解释样式的过程和创建一个渲染器被称为“attachment”.每一个DOM节点有一个“attach”方法，attachment是同步的，
	节点插入到DOM树会调用该新节点的“attach”方法。
	
	在渲染树根节点，HTML和body 标签处理结果，根渲染队形对应到CSS规范中叫做包含块——包含所有的其他块的最顶端块。
	它的尺寸是视口-在浏览器窗口的显示区域尺寸。火狐称它为ViewPortFrame、Webkit称为RenderView。这是该文档节点的渲染对象。其余的构造树作为一个DOM节点插入。 
	关于这个主题，请参阅CSS2 - http://www.w3.org/TR/CSS21/intro.html处理模型
	3.样式计算
		构建渲染树需要去计算每个可见渲染对象的属性，即计算每个元素的样式属性。样式包括来自各种样式表、内联样式
		和可见属性在HTML标签中的，后来被翻译成匹配的CSS样式属性。
		样式表的起源是浏览器的默认的样式表，风格表的页面作者和用户样式表提供 - 这些样式表提供用户的浏览器
		（浏览器让你定义自己喜欢的风格。在Firefox中，例如，这是通过放置一个样式表在“火狐配置文件”文件夹）中。
		
		样式计算带来了一些困难：
			a)样式数据是一个非常大的结构，列举多种样式属性，这可能会导致内存问题。
			b)查找每个元素的匹配规则可能会导致性能问题，如果它不优化。遍历整个规则列表中的每个元素找到匹配的是一个沉重
			的任务。选择器可以有复杂的结构，可能会导致匹配过程开始于一个看似前途的道路被证明是徒劳的，必须尝试另一条路径。 
			例如-这种混合选择器：
			div div div div{
			...
			}
			这意味着规则应用到三个div的后代div元素，选择树上一条特定的路径去检查，这可能需要遍历节点树，最后却发现它只是两个div的后代，
			并不使用该规则，然后则需要沿着另一条路径去尝试
			c)应用规则涉及到相当复杂的级联规则，规则定义的规则的层次。
		让我们来看看浏览器是如何面对这些问题：
		1)共享样式数据
			webkit节点引用样式对象（渲染样式），某些情况下，这些对象可以被节点间共享，这些节点需要是兄弟或是表兄弟节点，并且：
			这些元素必须处于相同的鼠标状态（比如不能一个处于hover，而另一个不是）
			不能有元素具有id
			标签名必须匹配
			class属性必须匹配
			对应的属性必须相同
			链接状态必须匹配
			焦点状态必须匹配
			不能有元素被属性选择器影响
			元素不能有行内样式属性
			不能有生效的兄弟选择器，webcore在任何兄弟选择器相遇时只是简单的抛出一个全局转换，
			并且在它们显示时使整个文档的样式共享失效，这些包括＋选择器和类似:first-child和:last-child这样的选择器。
		2)Firefox的规则树
			Firefox用两个树用来简化样式计算－规则树和样式上下文树，webkit也有样式对象，
			但它们并没有存储在类似样式上下文树这样的树中，只是由Dom节点指向其相关的样式。
			如下图：4.3.2 Firefox样式上下文




			样式上下文包含最终值，这些值是通过以正确顺序应用所有匹配的规则，并将它们由逻辑值转换为具体的值，
			例如，如果逻辑值为屏幕的百分比，则通过计算将其转化为绝对单位。样式树的使用确实很巧妙，
			它使得在节点中共享的这些值不需要被多次计算，同时也节省了存储空间。
			
			所有匹配的规则都存储在规则树中，一条路径中的底层节点拥有最高的优先级，这棵树包含了所找到的 
			所有规则匹配的路径（译注：可以取巧理解为每条路径对应一个节点，路径上包含了该节点所匹配的所有规则）。
			规则树并不是一开始就为所有节点进行计算，而是 在某个节点需要计算样式时，才进行相应的计算并将计算后的路径添加到树中。
			我们将树上的路径看成辞典中的单词，假如已经计算出了如下的规则树：如图4.3.2.1




			假如需要为内容树中的另一个节点匹配规则，现在知道匹配的规则（以正确的顺序）为B-E-I，因为我们已经计算出了路径A-B-E-I-L，
			所以树上已经存在了这条路径，剩下的工作就很少了。
 
			现在来看一下树如何保存。
			a)结构化
			样式上下文按结构划分，这些结构包括类似border或color这样的特定分类的样式信息。一个结构中的所有特性不是继承的就是非继承的，对继承的特性，
			除非元素自身有定义，否则就从它的parent继承。非继承的特性（称为reset特性）如果没有定义，则使用默认的值。
			样式上下文树缓存完整的结构（包括计算后的值），这样，如果底层节点没有为一个结构提供定义，则使用上层节点缓存的结构。
			b)使用规则树计算样式上下文
			当为一个特定的元素计算样式时，首先计算出规则树中的一条路径，或是使用已经存在的一条，然后使 用路径中的规则去填充新的样式上下文，
			从样式的底层节点开始，它具有最高优先级（通常是最特定的选择器），遍历规则树，直到填满结构。如果在那个规则节点 
			没有定义所需的结构规则，则沿着路径向上，直到找到该结构规则。
 
			如果最终没有找到该结构的任何规则定义，那么如果这个结构是继承型的，则找到其在内容树中的parent的结构，
			这种情况下，我们也成功的共享了结构；如果这个结构是reset型的，则使用默认的值。
 
			如果特定的节点添加了值，那么需要做一些额外的计算以将其转换为实际值，然后在树上的节点缓存该值，使它的children可以使用。
 
			当一个元素和它的一个兄弟元素指向同一个树节点时，完整的样式上下文可以被它们共享。
 
			来看一个例子：假设有下面这段html
			<html>
				<body>
					<div class="err" id="div1">
						<p>
						  this is a <span class="big"> big error </span>
						  this is also a
						  <span class="big"> very  big  error</span> error
						</p>
					</div>
					<div class="err" id="div2">another error</div>
				</body>
			</html>
			以及下面的规则：
			1.	div {margin:5px;color:black}
			2.	.err {color:red}
			3.	.big {margin-top:3px}
			4.	div span {margin-bottom:4px}
			5.	#div1 {color:blue}
			6.	#div2 {color:green}
			
			简化下问题，我们只填充两个结构——color和margin，color结构只包含一个成员－颜色，margin结构包含四边。
			如下图4.3.2.2，生成的规则树，.3.2.3 上下文树






			假设我们解析html，遇到第二个div标签，我们需要为这个节点创建样式上下文，并填充它的样式结构。
 
			我们进行规则匹配，找到这个div匹配的规则为1、2、6，我们发现规则树上已经存在了一条我们可以使用的
			路径1、2，我们只需为规则6新增一个节点添加到下面（就是规则树中的F）。
 
			然后创建一个样式上下文并将其放到上下文树中，新的样式上下文将指向规则树中的节点F。
 
			现在我们需要填充这个样式上下文，先从填充margin结构开始，既然最后一个规则节点没有添加margin结构，
			沿着路径向上，直到找到缓存的前面插入节点计算出的结构，我们发现B是最近的指定margin值的节点。
			因为已经有了color结构的定义，所以不能使用缓存的结构，既然color只有一个属性，也就不需要沿着路径向上填充其他属性。
			计算出最终值（将字符串转换为RGB等），并缓存计算后的结构。
 
			第二个span元素更简单，进行规则匹配后发现它指向规则G，和前一个span一样，既然有兄弟节点指向同一个节点，
			就可以共享完整的样式上下文，只需指向前一个span的上下文。
 
			因为结构中包含继承自parent的规则，上下文树做了缓存（color特性是继承来的，但Firefox将其视为reset并在规则树中缓存）。
 
			例如，如果我们为一个paragraph的文字添加规则：
 
			p {font-family:Verdana;font size:10px;font-weight:bold}
 
			那么这个p在内容树中的子节点div，会共享和它parent一样的font结构，这种情况发生在没有为这个div指定font规则时。
 
			Webkit中，并没有规则树，匹配的声明会被遍历四次，先是应用非important的高优先级属性（之所以先应用这些属性，
			是因为其他的依赖于它们－比如display），其次是高优先级important的，接着是一般优先级非important的，最后是一般优先级important的规则。
			这样，出现多次的属性将被按照正确的级联顺序进行处理，最后一个生效。
 
			总结一下，共享样式对象（结构中完整或部分内容）解决了问题1和3，Firefox的规则树帮助以正确的顺序应用规则。
		3)对规则进行处理以简化匹配过程
		样式规则有几个来源：
		· 外部样式表或style标签内的css规则
		p {color:blue}
		· 行内样式属性
		<p bgcolor="blue" />
		· html可视化属性（映射为相应的样式规则）
		后面两个很容易匹配到元素，因为它们所拥有的样式属性和html属性可以将元素作为key进行映射。
		就像前面问题2所提到的，css的规则匹配可能很狡猾，为了解决这个问题，可以先对规则进行处理，以使其更容易被访问。
		解析完样式表之后，规则会根据选择符添加一些hash映射，映射可以是根据id、class、标签名或是任何不属于这些分类的综合映射。
		如果选择符为id，规则将被添加到id映射，如果是class，则被添加到class映射，等等。
		这个处理是匹配规则更容易，不需要查看每个声明，我们能从映射中找到一个元素的相关规则，这个优化使在进行规则匹配时减少了95＋％的工作量。
		来看下面的样式规则：
		p.error {color:red}
		#messageDiv {height:50px}
		div {margin:5px}
		第一条规则将被插入class映射，第二条插入id映射，第三条是标签映射。
		下面这个html片段：
		<p class="error">an error occurred </p>
		<div id=" messageDiv">this is a message</div>
		我们首先找到p元素对应的规则，class映射将包含一个“error”的key，找到p.error的规则，div在id映射和标签映射中都有相关的规则，
		剩下的工作就是找出这些由key对应的规则中哪些确实是正确匹配的。
		例如，如果div的规则是table div {margin:5px}
		这也是标签映射产生的，因为key是最右边的选择符，但它并不匹配这里的div元素，因为这里的div没有table祖先。
		Webkit和Firefox都会做这个处理。
		4)在正确的级联顺序应用规则
		样式对象拥有对应所有可见属性的属性，如果特性没有被任何匹配的规则所定义，那么一些特性可以从parent的样式对象中继承，另外一些使用默认值。
		这个问题的产生是因为存在不止一处的定义，这里用级联顺序解决这个问题。
			a)样式表的级联顺序
			一个样式属性的声明可能在几个样式表中出现，或是在一个样式表中出现多次，
			因此，应用规则的顺序至关重要，这个顺序就是级联顺序。根据css2的规范，级联顺序为（从低到高）：
				1. 浏览器声明
				2. 用户声明
				3. 作者的一般声明
				4. 作者的important声明
				5. 用户important声明
				浏览器声明是最不重要的，用户只有在声明被标记为important时才会覆盖作者的声明。
				具有同等级别的声明将根据specifity以及它们被定义时的顺序进行排序。
				Html可视化属性将被转换为匹配的css声明，它们被视为最低优先级的作者规则。
			b)Specifity
			Css2规范中定义的选择符specifity如下：
 
			· 如果声明来自style属性，而不是一个选择器的规则，则计1，否则计0（＝a）
			· 计算选择器中id属性的数量（＝b）
			· 计算选择器中class及伪类的数量（＝c）
			· 计算选择器中元素名及伪元素的数量（＝d）
			连接a－b－c－d四个数量（用一个大基数的计算系统）将得到specifity。这里使用的基数由分类中最高的基数定义。
			例如，如果a为14，可以使用16进制。不同情况下，a为17时，则需要使用阿拉伯数字17作为基数，
			这种情况可能在这个选择符时发生html body div div …（选择符中有17个标签，一般不太可能）。
			 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
			 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
			 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
			 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
			 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
			 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
			 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
			 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
			 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
			 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
			c)排序规则
			规则匹配后，需要根据级联顺序对规则进行排序，webkit先将小列表用冒泡排序，
			再将它们合并为一个大列表，webkit通过为规则复写“>”操作来执行排序：
			static bool operator >(CSSRuleData& r1, CSSRuleData& r2)
			{
				int spec1 = r1.selector()->specificity();
				int spec2 = r2.selector()->specificity();
				return (spec1 == spec2) : r1.position() > r2.position() : spec1 > spec2; 
			}
	4.循序渐进的过程
	webkit使用一个标志位标识所有顶层样式表都已加载，如果在attch时样式没有完全加载，
	则放置占位符，并在文档中标记，一旦样式表完成加载就重新进行计算。
```

#### 浏览器是如何解析DOM树的？
https://blog.csdn.net/cuew1987/article/details/9155249
```

三、解析和DOM树的构建
	1、解析：
	由于解析渲染引擎是一个非常重要的过程，我们将会一步步的深入，现在让我们来介绍解析。
	解析一个文档，意味着把它转换为一个有意义的结构——代码可以了解和使用的东西，解析 的结果通常是一个树的节点集合，用来表示文档结构，它被称为解析树或者语法树。
	例子：
	解析表达式“2+3-1”，返回树如下图3.1
 





		1)、语法：
		解析是基于文档所遵循的语法规则——书写所用的语言或格式——来进行的。每一种可以解析的格式必须由确定的语法与词汇组成。这被称之为上下文无关语法。 人类语言并非此种语言，所以不能用常规的解析技术来解析。
 
		2)、解析器——分析器组合：
		解析器有两个处理过程——词法分析与语法分析。
		词法分析负责把输入切分成符号序列，符号是语言的词汇——由该语言所有合法的单词组成。语法分析是对该语言语法法则的应用。
		解析器通常把工作分给两个组件——词法分析程序（有时被叫分词器）负责把输入切分成合法符号序列，解析器负责按照语法规则分析文档结构和构建语法树。
		词法分析程序知道如何过滤像空格，换行之类的无关字符。如下图3.1.2

 

		解析过程是迭代的。解析器通常会从词法分析器获取新符号并尝试匹配句法规则。如果匹配成功，就在句法树上创建相应的节点，并继续从词法分析器获取下一个符号。
		如果没有匹配的规则，解析器会内部保存这个符号，并继续从词法分析器获取符号，直到内部保存的所有符号能够成功匹配一个规则。
		如果最终无法匹配，解析器会抛出异常。这意味着文档无效，含有句法错误。
 
		3)、转换：
		多数情况下，解析树并非是最终结果，解析经常被用于转换——输入文档转换为另一种格式，比如一个编译器要把源码编译成机器码，首先会解析成解析树，然后再转换成机器码，如下图3.1.3




		4)、解析示例：
		在图3.1中，我们构建了一个数学表达式解析树，让我们来试着定义一个简单的数学语言并看看解析是如何进行的。
		词汇：我们的语言可以包含整数、加号和减号。
		语法：
			1>.语法由表达式、术语和操作符组成
			2>.我们的语言能包含任何数字类型的表达式
			3>.表达式定义为术语紧跟着操作符，再跟另外一个术语。
			4>.操作符为一个加号和一个减号
			5>.术语是一个整数或者表达式
		现在让我们来分析输入“2+3-1”：
		第一个符合规则的子字符串是”2″，根据规则#5它是一个术语。第二个匹配是”2 + 3″，符合第二条规则——一个术语紧跟一个操作符再跟另外一个术语。下一个匹配出现在输入结束时。”2 + 3 – 1″是一个表达式，因为我们已知“2+3”是一个术语，所以符合第二条规则。 “2 + + “不会匹配任何规则，所以是无效的输入。
 
		5)、词法与句法的合法性定义：
		词汇通常用正则表达式来表示。
		比如我们的语言可以定义为:
		INTEGER :0|[1-9][0-9]*
		PLUS : +
		MINUS: -
		如你所见，整型是由正则表达式定义的。
		句法常用BNF格式定义，我们的语言被定义为：
		expression :=  term  operation  term
		operation :=  PLUS | MINUS
		term := INTEGER | expression
		我们说过常规解析器只能解析上下文无关语法的语言。这种语言的一个直觉的定义是它的句法可以用BNF完整的表达。其规范定义请参考 http://en.wikipedia.org/wiki/Context-free_grammar
 
		6)、解析器的类型：
		解析器有两种基本类型——自上而下解析器和自下而上解析器。主观上可以认为自上而下的解析器从上层句法结构开始尝试匹配句法；自下而上的则从输入开始，慢慢转换成句法规则，从底层规则开始，直到上层规则全部匹配。
		让我们看看这两种解析器将怎样解析我们的例子：
		自上而下解析器从上层规则开始，它会把”2 + 3″定义为表达式，然后定义”2 + 3 – 1″为表达式(定义表达式的过程中也会匹配其它规则，但起点是最高级别规则)。
		自下而上的解析器会扫描输入，直到有匹配的规则，它会把输入替换成规则。这样一直到输入结束。部分匹配的规则会放入解析堆栈。如下图：3.1.6



 

		7)自动创建解析器
		有一些工具可以为你创建解析器，它们通常称为解析器生成器。你只需要提供语法——词汇与句法规则——它就能生成一个可以工作的解析器。创建解析器需要对解析器有深入的了解，并且手动创建一个优化的解析器并不容易，所以解析器生成工具很有用。
		Webkit使用两款知名的解析器生成工具：Flex用于创建词法分析器，Bison用于创建解析器 (你也许会看到它们以Lex和Yacc的名字存在)。Flex的输入文件是符号的正则表达式定义，Bison的输入文件是BNF格式的句法定义。
 
	2.HTML解析器：
	HTML解析器的工作是解析HTML标记到解析树
		1)HTML语法定义
		HTML的词汇与句法定义在w3c组织创建的规范中。当前版本是HTML4，HTML5的工作正在进行中。
		2)不是上下文无关语法
		在对解析器的介绍中看到，语法可以用类似BNF的格式规范地定义。不幸的是所有常规解析器的讨论都不适用于HTML（我提及它们并不是为了娱乐，它们可以用于解析CSS和JavaScript）。HTML无法用解析器所需的上下文无关的语法来定义。过去HTML格式规范由DTD (Document Type Definition)来定义，但它不是一个上下文无关语法。
		HTML与XML相当接近。XML有许多可用的解析器。HTML还有一个XML变种叫XHTML，那么它们主要区别在哪里呢？区别在于HTML应用更加”宽容”，它容许你漏掉一些开始或结束标签等。它整个是一个“软”句法，不像XML那样严格死板。 总的来说这一看似细微的差别造成了两个不同的世界。一方面这使得HTML很流行，因为它包容你的错误，使网页作者的生活变得轻松。另一方面，它使编写语法格式变得困难。所以综合来说，HTML解析并不简单，现成的上下文相关解析器搞不定，ＸＭＬ解析器也不行。
		3)HTML DTD
		HTML的定义使用DTD文件。这种格式用来定义SGML族语言，它包含对所有允许的元素的定义，包括它们的属性和层级关系。如我们前面所说，HTML DTD构不成上下文无关语法。
		DTD有几种不同类型。严格模式完全尊守规范，但其它模式为了向前兼容可能包含对早期浏览器所用标签的支持。当前的严格模式ＤＴＤ：http://www.w3.org/TR/html4/strict.dtd
		4)DOM
		解析器输出的树是由DOM元素和属性节点组成的。DOM的全称为：Document Object Model。它是HTML文档的对象化描述，也是HTML元素与外界（如Javascript）的接口。
		DOM与标签有着几乎一一对应的关系，如下：
		<html>
			<body>
				<p>hello world</p>
				<div><img src="aa.png"/></div>
			</body>
		</html>
		其对应的DOM树如下3.2.4图：



 

		与HTML一样，DOM规范也由w3c组织制订。参考：http://www.w3.org/DOM/DOMTR. 这是一个操作文档的通用规范。有一个专门的模块定义HTML特有元素: http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/idl-definitions.html.
		当我们说树中包含DOM节点时，意思就是这个树是由实现了DOM接口的元素组成。这些实现包含了其它一些浏览器内部所需的属性。

 

		5)解析算法
		正如我们前面章节中看到，HTML不能使用常规的自上而下或者自下而上的解析器解析，其原因如下：
			a>HTML是一种宽容性的语言
			b>事实上，浏览器有传统的误差允许，以支持众所周知的情况下无效的HTML标签。
			c>解析过程往复。通常在分析过程中，源一般不更改，但在的HTML脚本中含有“document.write”的标签可以添加额外的标记，所以在分析过程中实际上修改了输入。
		无法使用常规的解析技术，浏览器创建自定义的解析器解析HTML。
		在HTML5中这个解析算法被描述的很详细，该算法包含两个阶段——标记化算法和树构造算法，符号化是词法分析，语法分析令牌投入。其中HTML标记的开始标记，结束标记，属性名和属性值。
		记号赋予识别令牌，将其提供给树构造和消耗的下一个字符的识别等等，直到输入下一个标记结束。如下3.2.5图（HTML解析流量（取自HTML5规范））

		6)标记化算法
		该算法的输出是一个HTML标记。该算法被表示为一个状态机。每个状态消耗的一个或多个字符输入流，根据这些字符更新下一个状态。这个决定是由当前的标记化状态和树建设状态的影响。这意味着在下一个正确的状态下消耗相同的字符会产生不同的结果，
		这取决于当前的状态。算法越复杂，越充分，所以让我们来看看一个简单的例子，帮助我们进一步的理解。
		基本的例子 - 标记化下面的HTML：
		<HTML>
			<BODY>
				世界，你好
			</BODY>
		</HTML>
		初始状态是”Data state”，当遇到”<”时状态改为“Tag open state”。吃掉”a-z”字符组成的符号后产生了”Start tag token”，状态变更为“Tag name state”。我们一直保持此状态，直到遇到”>”。每个字符都被追加到新的符号名上。在我们的例子中，解出的符号就是”html”。
		当碰到”>”时，当前符号完成，状态改回“Data state”。”<body>”标签将会以同样的方式处理。现在”html”与”body”标签都完成了，我们回到“Data state”状态。吃掉”H”（”Hello world”第一个字母）时会产生一个字符符号，直到碰到”</body>”的”<”符号，我们就完成了一个字符符号”Hello world”。
		现在我们回到“Tag open state”状态。吃掉下一个输入”/”时会产生一个”end tag token”并变更为“Tag name state”状态。同样，此状态保持到我们碰到”>”时。这时新标签符号完成，我们又回到“Data state”。同样”</html>”也会被这样处理。具体流程如下图：3.2.6（输入源的分词处理）：


		当解析器被创建时，文档对象也被创建了。在树的构建过程中DOM树的根节点（Documen）将被修改，元素被添加到上面去。每个分词器完成的节点都会被树构建器处理。规范中定义了每一个符号与哪个DOM对象相关。除了把元素添加到DOM树外，它还会被添加到一个开放元素堆栈。这个堆栈用于纠正嵌套错误和标签未关闭错误。这个算法也用状态机描述，它的状态叫做”insertion modes”。
 
		让我们看看下面输入的树构建过程：
 
		<html>
			<body>
				Hello world
			</body>
		</html>树的构建过程中，输入就是分词过程中得到的符号序列。第一个模式叫“initial mode”。接收 html 符号后会变成“before html”模式并重新处理此模式中的符号。这会创建一个HTMLHtmlElement元素并追加到根文档节点。
		然后状态改变为“before head”。我们收到”body”时，会隐式创建一个HTMLHeadElement，尽管我们没有这个标签，它也会被创建并添加到树中。
		现在我们进入“in head”模式，然后是“after head”，Body会被重新处理，创建HTMLBodyElement元素并插入，然后进入“in body”模式。字符符号”Hello world”收到后会创建一个”Text”节点，所有字符都被一一追加到上面。收到body结束标签后进入 “after body” 模式，收到html结束标签后进入“after after body”模式。所有符号处理完后将终止解析。
		如下图3.2.7（HTML树的创建）


		8)当解析完成后的动作
		在这一阶段浏览器会把文档标记为交互模式，并开始解析deferred模式的script。”deferred”意味着脚本应该在文档解析完成后执行。脚本处理完成后将进入”complete”状态，”load”事件发生。
		HTML5规范中包含了完整的算法： http://www.w3.org/TR/html5/syntax.html#html-parser
 
 
		9)浏览器容错
		你永远不会看到HTML页面语法错误。浏览器会修正错误并继续。看看下面的例子：
		<html>
		  <mytag>
		  </mytag>
		  <div>
		  <p>
		  </div>
			Really lousy HTML
		  </p>
		</html>
		我一定违背了几百万条规则（”my tag”是非法标签，”p”与”div”元素嵌套错误等等），但浏览器仍然正确地显示，没有任何抱怨。所以很多解析器代码在修正这些HTML作者的错误。
		浏览器的错误处理相当统一，惊人的是这并不是当前HTML规范的一部分，就像书签、前进、后退，只是多年以来在浏览器中开发出来的。有些无效的HTML结构出现在许多网站，浏览器会尝试用和其它各种浏览器一致的方式修复这些错误。
		HTML5规范中应这一需求定义了一些东西，Webkit在它的HTML解析器类开头的注释中很好的做了摘要：
		解析器分析输入符号生成文档，并构建文档树。如果文档格式良好，解析工作会很简单。不幸的是，我们要处理很多格式不良的HTML文档，解析器需要宽容这些错误。我们至少需要照顾下列错误：1. 元素必需被插入在正确的位置。未关闭的标签应该一一关闭，直到可以添加新元素。2. 不允许直接添加元素。用户可能会漏掉一些标签，比如：HTML HEAD BODY TBODY TR TD LI（我遗漏了什么？）。3. 在inline元素里添加block元素时，应关闭所有inline元素，再添加block元素。4. 如果以上不起作用，关闭所有元素，直到可以添加，或者忽略此标签。让我们来看一些Webkit容错的例子：
		使用</br>代替<br>
		有些站点使用</br>而不是<br>。为了更好的与IE和Firefox兼容，Webkit将其视为<br>。代码如下：
		if (t->isCloseTag(brTag) && m_document->inCompatMode()) {
			 reportError(MalformedBRError);
			 t->beginTag = true;
		}注意，这里的错误处理是内部的，并不会显示给用户。
		迷失的表格
		像下面的例子这样，一个表格包含在另外一个表格的内容中，但不是在外部表格的单元格里:
		<table>
			<table>
				<tr><td>inner table</td></tr>
				 </table>
			<tr><td>outer table</td></tr>
		</table>Webkit会改变层级关系，把它们处理成两个相临的表格：
		<table>
			<tr><td>outer table</td></tr>
		</table>
		<table>
			<tr><td>inner table</td></tr>
		 </table>代码：
		if (m_inStrayTableContent && localName == tableTag)
				popBlock(tableTag);Webkit用一个堆栈保存当前元素，它会把里面的表格弹出到外部表格堆栈，使它们成为兄弟表格。
		元素嵌套
		为防止一表单的嵌套，第二个表单会被忽略。代码：
		if (!m_currentFormElement) {
				m_currentFormElement = new HTMLFormElement(formTag,    m_document);
		}
		过深的元素层级
		注释不言自喻：
		www.liceo.edu.mx是一个层级过深的典型，它用大量的<b>嵌套到1500个标签的深度。我们只允许同一标签连续出现20次，超过的话，所有此标签都会被忽略。bool HTMLParser::allowNestedRedundantTag(const AtomicString& tagName)
		{
		unsigned i = 0;
		for (HTMLStackElem* curr = m_blockStack;
				 i < cMaxRedundantTagDepth && curr && curr->tagName == tagName;
			 curr = curr->next, i++) { }
		return i != cMaxRedundantTagDepth;
		}错误的html或body结束标签位置
		注释仍然很明了：
		支持真正的错误html
		我们永远不关闭tag，因为有些愚蠢的网页在文档真正结束之前就关闭了它。
		让我们用end()来关闭标签。if (t->tagName == htmlTag || t->tagName == bodyTag )
		return;
		所以网页作者们小心了，除非你想写一个Webkit容错的示例代码，否则请按正确格式书写HTML。
		
	3.CSS解析
	记得在介绍中的解析概念吗？CSS不像HTML，它是一个与上下文无关语法和能被在介绍中的解析器类型解析，其实CSS规范定义CSS的词法和句法语法。
	让我们看一些例子：
	每一个标记的词法语法通过一些正则表达式来定义：
	注释		\/\*[^*]*\*+([^/*][^*]*\*+)*\/
	数字		[0-9]+|[0-9]*"."[0-9]+
	非AscII码	[\200-\377]
	nmstart		[_a-z]|{nonascii}|{escape}
	nmchar		[_a-z0-9-]|{nonascii}|{escape}
	名称		{nmchar}+
	ident		{nmstart}{nmchar}*
	ident 是一个短标记符，像一个类型一样，名称是一个元素的id
	BNF中的句法描述如下：
	ruleset
	  : selector [ ',' S* selector ]*
		'{' S* declaration [ ';' S* declaration ]* '}' S*
	  ;
	selector
	  : simple_selector [ combinator selector | S+ [ combinator selector ] ]
	  ;
	simple_selector
	  : element_name [ HASH | class | attrib | pseudo ]*
	  | [ HASH | class | attrib | pseudo ]+
	  ;
	class
	  : '.' IDENT
	  ;
	element_name
	  : IDENT | '*'
	  ;
	attrib
	  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
		[ IDENT | STRING ] S* ] ']'
	  ;
	pseudo
	  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
	  ;
	看一个列子
	div.error , a.error{
		color:red;
		font-weight:bold;
	}
	div.error,a.error是选择器，在大括号内的部分包含这个规则集中的应用的规则。这种结构是在下面定义中正式定义：
	ruleset
	  : selector [ ',' S* selector ]*
		'{' S* declaration [ ';' S* declaration ]* '}' S*
	  ;
	这意味着一个规则集是一个选择器或可选数字选择器，这些选择器被coma和空格（S代表空格）分隔。规则集包含大括号内声明或可选的声明，这些声明用分号隔开。“声明”和“选择”将被定义在下面的BNF定义。	
	webkit CSS解析器：
	webkit 使用 flex 和 bison 解析器发生器从CSS 语法文件去自动创建解析器，在解析器介绍中，bison创建一个自下而上的解析器。Firefox使用自上而下的手工编写解析器。在这两种情况下，每一个CSS文件被解析到一个样式表对象，每个对象都包含CSS规则。CSS规则对象包含选择器和声明对象和其他对象相对应的CSS语法。
	如下图3.3（解析CSS）


	4.解析脚本
	将在javascript一章中详细介绍
	5.处理脚本和样式表的顺序
	脚本：
	web模式是同步模式，作者们期望当解析器解析到一个<script>标签时，脚本能被解析和立即执行。脚本被执行，文档的解析暂停，如果<script>脚本是由外部引入的，必须先从网络上获取——这也是同步的，解析暂停，直到资源被获取。这是多年来使用的模式，也被写入到HTML4和HTML5规范中。
	作者可以给<script>标签添加一个defer=”defer“属性，这样不会暂停文档解析，文档解析完成后，再执行脚本。
	HTML5，增加给<script>增加了一个属性async,可以使文档的解析和脚本的执行在不同的线程。
	投机性解析：
	WebKit和火狐都这样做优化。执行脚本时，另一个线程解析文档的其余部分，并找出需要从网络加载的其他资源，并加载它们。在这些方式的资源可以被并行链接加载的整体速度是更好的。注意 - 投机解析器不修改DOM树，节点，主分析器，它仅仅解析外部脚本，样式表和图片等外部资源的引用。
	样式表：
	样式表在另一方面有不同的模式，从概念上讲，它似乎是因为样式表没有改变的DOM树，没有任何理由等待和停止解析文档。有一个问题，当文档解析时脚本访问样式信息，如果样式么有加载和解析，脚本将会得到错误的回答以及会引起一系列问题。这看起来像一种边缘情况，但是相当普遍，
	火狐中有一个样式表一直在加载和解析时，会阻止所有脚本。Webkit的块的脚本，只有当他们试图访问某些可能卸载样式表的样式属性影响时，才会阻止所有脚本。
```

### 原生js

#### 如何实现promise？
完整版
```
    const PENDING='pending';
    const FULFILLED='fulfilled';
    const REJECTED='rejected';

    function MyPromise(fn){
        const self=this;
        self.value=null;
        self.error=null;
        self.status=PENDING;
        self.onFulfilledCallbacks=[];
        self.onRejectedCallbacks=[];

        function resolve(value){
            if(value instanceof MyPromise){
                return value.then(resolve,reject);
            }
            if(self.status===PENDING){
                setTimeout(()=>{
                    self.status=FULFILLED;
                    self.value=value;
                    self.onFulfilledCallbacks.forEach((callback)=>callback(self.value));
                },0)
            }
        }

        function reject(error){
            if(self.status===PENDING){
                setTimeout(function(){
                    self.status=REJECTED;
                    self.error=error;
                    self.onRejectedCallbacks.forEach((callback)=>callback(self.error))
                },0)
            }
        }
        try{
            fn(resolve,reject);
        }catch(e){
            reject(e);
        }
    }

    function resolvePromise(bridgepromise,x,resolve,reject){
        if(bridgepromise===x){
            return reject(new TypeError('Circular reference'));
        }

        let called=false;
        if(x instanceof MyPromise){
            if(x.status===PENDING){
                x.then(y=>{
                    resolvePromise(bridgepromise,y,resolve,reject)
                },error=>{
                    reject(error);
                })
            }else{
                x.then(resolve,reject)
            }
        }else if(x!=null && ((typeof x === 'object') || (typeof x === 'function'))){
            try{
                let then=x.then;
                if(typeof then === 'function'){
                    then.call(x,y=>{
                        if(called) return;
                        called=true;
                        resolvePromise(bridgepromise,y,resolve,reject)
                    },error=>{
                        if(called) return;
                        called=true;
                        reject(error);
                    })
                }else{
                    resolve(x);
                }
            }catch(e){
                if(called) return;
                called=true;
                reject(e);
            }
        }else{
            resolve(x);
        }
    }

    MyPromise.prototype.then=function(onFulfilled,onRejected){
        const self=this;
        let bridgePromise;
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:value=>value;
        onRejected=typeof onRejected==='function'?onRejected:error=>{throw error};
        if(self.status===FULFILLED){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x=onFulfilled(self.value);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            })
        }
        if(self.status===REJECTED){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x=onRejected(self.error);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            })
        }
        if(self.status===PENDING){
            return bridgePromise=new MyPromise((resolve,reject)=>{
                self.onFulfilledCallbacks.push((value)=>{
                    try{
                        let x=onFulfilled(value);
                        resolvePromise(bridgePromise,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                });
                self.onRejectedCallbacks.push((error)=>{
                    try{
                        let x=onRejected(error);
                        resolvePromise(bridgePromise,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    }
    MyPromise.prototype.catch=function(onRejected){
        return this.then(null,onRejected);
    }
    MyPromise.deferred=function(){
        let defer={};
        defer.promise=new MyPromise((resolve,reject)=>{
            defer.resolve=resolve;
            defer.reject=reject;
        });
        return defer;
    }
    try{
        module.exports=MyPromise;
    }catch(e){}
```
简版
```
    function myPromise(constructor){
        let self=this;
        self.status='pending';
        self.vlaue=undefined;
        self.reason=undefined;
        function resolve(value){
            if(self.status==='pending'){
                self.value=value;
                self.status='resolved';
            }
        }
        function reject(reason){
            if(self.status==='pending'){
                self.reason=reason;
                self.status='rejected';
            }
        }
        try{
            constructor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    myPromise.prototype.then=function(onFullfilled,onRejected){
        let self=this;
        switch(self.status){
            case 'resolved':
                onFullfilled(self.value);
                break;
            case 'rejected':
                onRejected(self.reason);
                break;
            default:
        }
    }
```

#### js想要实现同步执行有哪些方法？
https://www.jianshu.com/p/d7f6077a0dd2
```
前言

我们知道Javascript语言的执行环境是"单线程"。也就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务。

这种模式虽然实现起来比较简单，执行环境相对单纯，但是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步和异步。本文主要介绍异步编程几种办法，并通过比较，得到最佳异步编程的解决方案！

一、同步与异步

我们可以通俗理解为异步就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有”堵塞“效应。比如，有一个任务是读取文件进行处理，异步的执行过程就是下面这样


image
这种不连续的执行，就叫做异步。相应地，连续的执行，就叫做同步


image
"异步模式"非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，"异步模式"甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。接下来介绍下异步编程六种方法。

二、回调函数（Callback）

回调函数是异步操作最基本的方法。以下代码就是一个回调函数的例子：

ajax(url, () => {
    // 处理逻辑
})
但是回调函数有一个致命的弱点，就是容易写出回调地狱（Callback hell）。假设多个请求存在依赖性，你可能就会写出如下代码：

ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。此外它不能使用 try catch 捕获错误，不能直接 return。

三、事件监听

这种方式下，异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

下面是两个函数f1和f2，编程的意图是f2必须等到f1执行完成，才能执行。首先，为f1绑定一个事件（这里采用的jQuery的写法）

f1.on('done', f2);
上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：

function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
上面代码中，f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"，有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。

四、发布订阅

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

首先，f2向信号中心jQuery订阅done信号。

jQuery.subscribe('done', f2);
然后，f1进行如下改写：

function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
  }, 1000);
}
上面代码中，jQuery.publish('done')的意思是，f1执行完成后，向信号中心jQuery发布done信号，从而引发f2的执行。
f2完成执行后，可以取消订阅（unsubscribe）

jQuery.unsubscribe('done', f2);
这种方法的性质与“事件监听”类似，但是明显优于后者。因为可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

五、Promise/A+

Promise本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等

1.Promise的三种状态

Pending----Promise对象实例创建时候的初始状态
Fulfilled----可以理解为成功的状态
Rejected----可以理解为失败的状态

image
这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，比如说一旦状态变为 resolved 后，就不能再次改变为Fulfilled

let p = new Promise((resolve, reject) => {
  reject('reject')
  resolve('success')//无效代码不会执行
})
p.then(
  value => {
    console.log(value)
  },
  reason => {
    console.log(reason)//reject
  }
)
当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的

new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('end')
// new Promise => end
2.promise的链式调用

每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
如果then中出现异常,会走下一个then的失败回调
在 then中使用了return，那么 return 的值会被Promise.resolve() 包装(见例1，2)
then中可以不传递参数，如果不传递会透到下一个then中(见例3)
catch 会捕获到没有捕获的异常
接下来我们看几个例子：

  // 例1
  Promise.resolve(1)
  .then(res => {
    console.log(res)
    return 2 //包装成 Promise.resolve(2)
  })
  .catch(err => 3)
  .then(res => console.log(res))
// 例2
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => {
    throw new Error('My Error')
  })
  .catch(() => 1)
  .then(x => x + 1)
  .then(x => console.log(x)) //2
  .catch(console.error)
// 例3
let fs = require('fs')
function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
read('./name.txt')
  .then(function(data) {
    throw new Error() //then中出现异常,会走下一个then的失败回调
  }) //由于下一个then没有失败回调，就会继续往下找，如果都没有，就会被catch捕获到
  .then(function(data) {
    console.log('data')
  })
  .then()
  .then(null, function(err) {
    console.log('then', err)// then error
  })
  .catch(function(err) {
    console.log('error')
  })
Promise不仅能够捕获错误，而且也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

六、生成器Generators/ yield

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同，Generator 最大的特点就是可以控制函数的执行。

语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
Generator 函数除了状态机，还是一个遍历器对象生成函数。
可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果。
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
我们先来看个例子：

function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
可能结果跟你想象不一致，接下来我们逐行代码分析：

首先 Generator 函数调用和普通函数不同，它会返回一个迭代器
当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
当执行第二次 next 时，传入的参数12就会被当作上一个yield表达式的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
当执行第三次 next 时，传入的参数13就会被当作上一个yield表达式的返回值，所以 z = 13, x = 5, y = 24，相加等于 42
我们再来看个例子：有三个本地文件，分别1.txt,2.txt和3.txt，内容都只有一句话，下一个请求依赖上一个请求的结果，想通过Generator函数依次调用三个文件

//1.txt文件
2.txt
//2.txt文件
3.txt
//3.txt文件
结束
let fs = require('fs')
function read(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
function* r() {
  let r1 = yield read('./1.txt')
  let r2 = yield read(r1)
  let r3 = yield read(r2)
  console.log(r1)
  console.log(r2)
  console.log(r3)
}
let it = r()
let { value, done } = it.next()
value.then(function(data) { // value是个promise
  console.log(data) //data=>2.txt
  let { value, done } = it.next(data)
  value.then(function(data) {
    console.log(data) //data=>3.txt
    let { value, done } = it.next(data)
    value.then(function(data) {
      console.log(data) //data=>结束
    })
  })
})
// 2.txt=>3.txt=>结束
从上例中我们看出手动迭代Generator 函数很麻烦，实现逻辑有点绕，而实际开发一般会配合 co 库去使用。co是一个为Node.js和浏览器打造的基于生成器的流程控制工具，借助于Promise，你可以使用更加优雅的方式编写非阻塞代码。

安装co库只需：npm install co

上面例子只需两句话就可以轻松实现

function* r() {
  let r1 = yield read('./1.txt')
  let r2 = yield read(r1)
  let r3 = yield read(r2)
  console.log(r1)
  console.log(r2)
  console.log(r3)
}
let co = require('co')
co(r()).then(function(data) {
  console.log(data)
})
// 2.txt=>3.txt=>结束=>undefined
我们可以通过 Generator 函数解决回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
七、async/await

1.Async/Await简介

使用async/await，你可以轻松地达成之前使用生成器和co函数所做到的工作,它有如下特点：

async/await是基于Promise实现的，它不能用于普通的回调函数。
async/await与Promise一样，是非阻塞的。
async/await使得异步代码看起来像同步代码，这正是它的魔力所在。
一个函数如果加上 async ，那么该函数就会返回一个 Promise

async function async1() {
  return "1"
}
console.log(async1()) // -> Promise {<resolved>: "1"}
Generator函数依次调用三个文件那个例子用async/await写法，只需几句话便可实现

let fs = require('fs')
function read(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
async function readResult(params) {
  try {
    let p1 = await read(params, 'utf8')//await后面跟的是一个Promise实例
    let p2 = await read(p1, 'utf8')
    let p3 = await read(p2, 'utf8')
    console.log('p1', p1)
    console.log('p2', p2)
    console.log('p3', p3)
    return p3
  } catch (error) {
    console.log(error)
  }
}
readResult('1.txt').then( // async函数返回的也是个promise
  data => {
    console.log(data)
  },
  err => console.log(err)
)
// p1 2.txt
// p2 3.txt
// p3 结束
// 结束
2.Async/Await并发请求

如果请求两个文件，毫无关系，可以通过并发请求

let fs = require('fs')
function read(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
function readAll() {
  read1()
  read2()//这个函数同步执行
}
async function read1() {
  let r = await read('1.txt','utf8')
  console.log(r)
}
async function read2() {
  let r = await read('2.txt','utf8')
  console.log(r)
}
readAll() // 2.txt 3.txt
八、总结

1.JS 异步编程进化史：callback -> promise -> generator -> async + await

2.async/await 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

3.async/await可以说是异步终极解决方案了。

(1) async/await函数相对于Promise，优势体现在：

处理 then 的调用链，能够更清晰准确的写出代码
并且也能优雅地解决回调地狱问题。
当然async/await函数也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

(2) async/await函数对 Generator 函数的改进，体现在以下三点：

内置执行器。
Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。

更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果
```

### 框架

#### router有哪几种模式？请简述
```
vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}

- hash模式：在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

hash 路由模式的实现主要是基于下面几个特性：

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

- history模式：history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.
```

#### hash模式想要去掉'#'发送请求，需要做哪些更改？
https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子
```
HTML5 History 模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

# 后端配置例子
# Apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
除了 mod_rewrite，你也可以使用 FallbackResource。

# nginx
location / {
  try_files $uri $uri/ /index.html;
}
# 原生 Node.js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
# 基于 Node.js 的 Express
对于 Node.js/Express，请考虑使用 connect-history-api-fallback 中间件。

# Internet Information Services (IIS)
安装 IIS UrlRewrite
在你的网站根目录中创建一个 web.config 文件，内容如下：
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
# Caddy
rewrite {
    regexp .*
    to {path} /
}
# Firebase 主机
在你的 firebase.json 中加入：

{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
# 警告
给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
或者，如果你使用 Node.js 服务器，你可以用服务端路由匹配到来的 URL，并在没有匹配到路由的时候返回 404，以实现回退。更多详情请查阅 Vue 服务端渲染文档。
```

### Linux

#### Linux中如何查询文件的行数？
```
统计文件记录行数的有下面几个命令:
1、wc -l filename
2、awk ‘END{print NR}’ filename
3、grep -c ‘.*’ filename
4、sed -n ‘$=’ a.txt
5、cat -n a.txt |tail -1
6、执行vi a.txt也可以看到
或者SHIFT+g到文件末行，输入:.=
```

#### 你们是如何部署上线的？
```
1. 服务器部署步骤

购买自己的域名
域名备案
购买服务器
配置服务器应用环境
安装配置服务器
项目远程部署和发布与更新
1.2 购买域名
1.3 云主机
1.4 购买阿里云
选择配置
镜像 Ubuntu 16.04 64位
1.5 备案

阿里云备案
备案服务号管理
2. 服务器

Xshell4
使用git bash而非git cmd
2.1 连接服务器
2.2 创建用户
2.3 赋予权限
2.4 添加sudo权限

2.5 SSH无密码登录

2.5.1 本地生成公钥和私钥
2.5.2 开启ssh代理
2.5.3 服务器配置
2.5.4

2.6 安装软件
2.7 安装node
2.8 编写node程序
2.9 启动程序
2.10 nginx

2.10.1 安装
2.10.2 nginx命令
2.10.3 nginx配置
2.10.4 重启nginx

3. Docker 是什么

3.1 docker安装
3.2 安装
3.3 启动
3.4 查看docker版本
3.5 卸载
3.6 Docker架构
3.7 阿里云加速
3.8 启动node服务

3.8.1 Dockerfile
3.8.2 创建image
3.8.3 使用新的镜像运行容器
3.8.4 CMD
```