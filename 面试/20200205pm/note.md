## 小米

### 原生js

#### node中eventloop和浏览器eventloop的区别是什么？
```
浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。



接下我们通过一个例子来说明两者区别：

setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
1
2
3
4
5
6
7
8
9
10
11
12
浏览器端运行结果：timer1=>promise1=>timer2=>promise2

浏览器端的处理过程如下：



Node 端运行结果：timer1=>timer2=>promise1=>promise2

全局脚本（main()）执行，将 2 个 timer 依次放入 timer 队列，main()执行完毕，调用栈空闲，任务队列开始执行；
首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；
至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2
Node 端的处理过程如下：



六、总结

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

Node 端，microtask 在事件循环的各个阶段之间执行
浏览器端，microtask 在事件循环的 macrotask 执行完之后执行
```

#### jQuery相对于原生js有哪些优势？
https://www.cnblogs.com/qitiandandan/p/5682566.html
```
1、轻量级

JQuery非常轻巧，采用Dean Edwards编写的Packer压缩后，大小不到30KB,如果使用Min版并且在服务器端启用Gzip压缩后，大小只有18KB。
                 

1
gzip： 每天一个linux命令（32）：gzip     减少文件大小有两个明显的好处，一是可以减少存储空间，二是通过网络传输文件时，可以减少传输的时间。gzip是在Linux系统中经常使用的一个对文件进行压缩和解压缩的命令，既方便又好用。gzip不仅可以用来压缩大的、较少使用的文件以节省磁盘空间，还可以和tar命令一起构成Linux操作系统中比较流行的压缩文件格式。据统计，gzip命令对文本文件有60%～70%的压缩率。
　　


2、强大的选择器

JQuery允许开发者使用从CSS1到CSS3几乎所有的选择器，以及JQuery独创的高级而且复杂的选择器，另外还可以加入插件使其支持XPath选择器，甚至开发者可以编写属于自己的选择器。由于JQuery支持选择器这一特性，因此有一定CSS经验的开发人员可以很容易的切入到JQuery的学习中来。

1
2
3
4
5
6
XPath： 
              XPath 是一门在 XML 文档中查找信息的语言。XPath 可用来在 XML 文档中对元素和属性进行遍历。
 
               XPath 是 W3C XSLT 标准的主要元素，并且 XQuery 和 XPointer 都构建于 XPath 表达之上。
 
                因此，对 XPath 的理解是很多高级 XML 应用的基础。
　　



3、出色的DOM操作的封装

JQuery封装了大量常用的DOM操作，使开发者在编写DOM操作相关程序的时候能够得心应手。JQuery轻松地完成各种原本非常复杂的操作，让JavaScript新手也能写出出色的程序。
    
4、可靠的事件处理机制

JQuery的事件处理机制吸收了JavaScript专家Dean Edwards编写的事件处理函数的精华，是的JQuery在处理事件绑定的时候相当可靠。在预留退路、循序渐进以及非入侵式编程思想方面，JQuery也做得非常不错。

5、完善的Ajax

JQuery将所有的Ajax操作封装到一个函数$.ajax()里，使得开发者处理Ajax的时候能够专心处理业务逻辑而无需关心复杂的浏览器兼容性和XMLHttpRequest对象的创建和使用的问题。

6、不污染顶级变量

JQuery只建立一个名为JQuery的对象，其所有的函数方法都在这个对象之下。其别名$也可以随时交流控制权，绝对不会污染其他的对象。该特性是JQuery可以与其他JavaScript库共存，在项目中放心地引用而不需要考虑到后期的冲突。

7、出色的浏览器兼容性

作为一个流行的JavaScript库，浏览器的兼容性是必须具备的条件之一。JQuery能够在IE6.0+,FF 2+,Safari2.+和Opera9.0+下正常运行。JQuery同时修复了一些浏览器之间的的差异，使开发者不必在开展项目前建立浏览器兼容库。

8、链式操作方式

JQuery中最有特色的莫过于它的链式操作方式——即对发生在同一个JQuery对象上的一组动作，可以直接接连写无需要重复获取对象。这一特点使得JQuery的代码无比优雅。

9.隐式迭代

当用JQuery找到带有“.myClass”类的全部元素，然后隐藏他们时。无需循环遍历每一个返回的元素。相反，JQuery里的方法都被设计成自动操作的对象集合，而不是单独的对象，这使得大量的循环结构变得不再必要，从而大幅度地减少代码量。

10、行为层与结构层的分离

开发者可以使用选择器选中元素，然后直接给元素添加事件。这种将行为层与结构层完全分离的思想，可以使JQuery开发人员和HTML或其他页面开发人员各司其职，摆脱过去开发冲突或个人单干的开发模式。同时，后期维护也非常方便，不需要在HTML代码中寻找某些函数和重复修改HTML代码。

11、丰富的插件支持

JQuery的易扩展性，吸引了来自全球开发者来编写JQuery的扩展插件。目前已经有超过几百种官方插件支持，而且还不断有新插件面试。

12、完善的文档

JQuery的文档非常丰富，现阶段多位英文文档，中文文档相对较少。很多热爱JQuery的团队都在努力完善JQuery中文文档，例如JQuery的中文API。

13、开源

JQuery是一个开源的产品，任何人都可以自由地使用并提出修改意见。
```

#### 一个页面从输入url到页面加载显示完成，发生了什么？
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

#### JSONP和ajax的区别是什么？
https://www.cnblogs.com/xiaoxie2016/p/6293781.html
```
json和jsonp和ajax的实质和区别
ajax的两个问题
　　1.ajax以何种格式来交换数据
　　2.跨域的需求如何解决
　　　　数据跨域用自定义字符串或者用XML来描述
　　　　跨域可以用服务器代理来解决
jsonp来跨域
　　json是一种数据交换格式 “暗号”	描述信息格式
　　jsonp是非官方跨域数据交互协议	“接头方式”	信息传递双方约定的方法

　　json是基于文本的数据交换方式或者数据描述格式
　　　　json的优点
　　　　　　1.基于纯文本，跨平台传递极其简单；
　　　　　　2.javascript原生支持，后台语言几乎全部支持
　　　　　　3.轻量级数据格式，占用字符数量极小，特别适合互联网传递
　　　　　　4.可读性比较强，不必xml那么一目了然但在合理的依次缩进之后还是很容易识别的
　　　　　　5.容易编写和解析，当然前提是知道数据结构
　　　　json的格式或者规则
　　　　　　json以非常简单的方式来描述数据结构 xml能做的它都能做
　　　　　　1.json的数据两种数据类型 大括号{}和方括号[] 其余英文冒号,是分隔符 冒号:是映射符 英文双引号""是定义符
　　　　　　2.{}是描述一组 不同类型的无序键值对集合 每个键值对理解为OOP的属性描述
　　　　　　    []是描述一组 相同类型的有序数据的集合 对应OPP的数组
　　　　　　3.{}不同类型无序键值对和[]相同类型有序集合中有有多个子项，通过英文逗号分隔
　　　　　　4.键值对以英文冒号:分隔并且建议键名都加英文双引号""，以便不同语言的解析
　　　　　　5.json内部常用数据类型是字符串(必须用双引号引起来其他不用) 数字 布尔 日期 null 
　　　　　　　　日期比较特殊？？？？？？

复制代码
 1             var person = { //一个人的描述
 2                 "name":"Bob",
 3                 "Age":32,
 4                 "Company":"IBM",
 5                 "Engineer":true
 6             }  
 7             var personAge = person.Age;
 8             var conference = {        //描述一次会议
 9                 "Conference": "Future Marketing",
10                 "Date": "2012-6-1",
11                 "Address": "Beijing",
12                 "Members":
13                     [
14                         {
15                             "Name": "Bob",
16                             "Age": 32,
17                             "Company": "IBM",
18                             "Engineer": true
19                         },
20                         {
21                             "Name": "John",
22                             "Age": 20,
23                             "Company": "Oracle",
24                             "Engineer": false
25                         },
26                         {
27                             "Name": "Henry",
28                             "Age": 45,
29                             "Company": "Microsoft",
30                             "Engineer": false
31                         }
32                     ]
33                 }
34                 var henryIsAnEngineer = conference.Members[2].Engineer;// 读取参会者Henry是否工程师 
复制代码
jsonp的产生原因
　　1.Ajax直接请求普通文件存在跨域无权限访问的问题（静态页、动态页、web服务、wcf只要是跨域请求一律不准）
　　2.web的页面上调用js文件是不受跨域的影响（凡拥有src属性的标签都拥有跨域能力script img iframe）
　　3.可以判断 现在想通过纯web端(ActiveX控件、服务端代理、H5之Websocket等方式不算)跨域访问数据就只有一种可能，就是在远程服务器上设法把数据装进js格式的文件里，供客户度调用和进一步处理；
　　4.json的纯字符数格式可以简洁的描述复杂数据还被js原生支持
　　5.web客户端通过与调用脚本一样的方式来调用跨域服务器上动态生成的js格式文件(后缀.json)，服务器之所以要动态生成json文件目的把客户端需要的数据装入进去
　　6.客户端在对json文件调用成功后获得自己所需的数据剩下的就按照自己需求进行处理和展现，这种获取远程数据的方式非常像ajax其实并一样
　　7.为了方便客户端使用数据逐渐形成非正式传输协议jsonp
　　　　该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住json数据 这样客户端就可以随意定制自己的函数来自动处理返回数据

复制代码
 1     <!DOCTYPE html>
 2         <html>
 3             <head>
 4              <title></title>
 5             </head>
 6             <body>
 7                 <script>
 8                 var flightHandler = function (data) {
 9                     alert('您查到的信息：票价' + data.price + '元，余票' + data.tickets + '张。');
10                 };
11                 var url = "https://www.baidu.com/jsonp/flightResult.aspx?code=1991&callback=flightHandler";
12                 var script = document.createElement('script');
13                     script.setAttribute('scr',url);
14                 document.getElementsByTagName('head')[0].appendChild(script);
15 
16                 </script>
17             </body>
18         </html>
复制代码
　　jsonp.html

1             flightHandler({
2                 "code":"1991",
3                 "price":1991,
4                 "tickets":5
5             });
　　jQuery如何实现jsonp调用

复制代码
 1     <!DOCTYPE html>
 2     <html>
 3     <head>
 4         <title>123</title>
 5         <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
 6         <script>
 7             $(document).ready(function () {
 8                 $.ajax({
 9                     type: "get",
10                     async: false,
11                     url: "https://www.baidu.com/jsonp/flightResult.aspx?code=1991&callback=flightHandler",
12                     dataType: "jsonp",
13                     jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
14                     jsonpCallback: "flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
15                     success: function(json) {
16                         alert('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
17                     },
18                     error: function() {
19                         alert("123456");
20                     }
21 
22                 });
23             });
24         </script>
25     </head>
26     <body>
27     </body>
28     </html>    
复制代码
ajax和jsonp的实质核心、区别联系
　　1.ajax和jsonp的调用方式很像，目的一样，都是请求url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；
　　2.实质不同
　　　　ajax的核心是通过xmlHttpRequest获取非本页内容
　　　　jsonp的核心是动态添加script标签调用服务器提供的js脚本
　　3.区别联系
　　　　不在于是否跨域
　　　　ajax通过服务端代理一样跨域
　　　　jsonp也不并不排斥同域的数据的获取
　　4.jsonp是一种方式或者说非强制性的协议
　　　　ajax也不一定非要用json格式来传递数据
```

#### 常见的跨域方式有哪些？
```
- cors
服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

- jsonp
var script = document.createElement('script');  
script.src = "http://aa.xx.com/js/*.js";  
document.body.appendChild(script);

- postMessage
window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。

- window.name

- location.hash

- http-proxy

- nginx

- websocket

- iframe
基于iframe实现的跨域要求两个域具有aa.xx.com,bb.xx.com这种特点，也就是两个页面必须属于同一个顶级基础域（例如都是xxx.com，或是xxx.com.cn），使用同一协议（例如都是 http）和同一端口（例如都是80），这样在两个页面中同时添加document.domain，就可以实现父页面调用子页面的函数
```

#### es6实现解构是深拷贝还是浅拷贝？
https://www.cnblogs.com/cckui/p/11518842.html
```
对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

拷贝对象

let aa = {
    age: 18,
    name: 'aaa'
}

 
let bb = {...aa};
console.log(bb);  // {age: 18, name: "aaa"}
合并对象

扩展运算符（...）可以用于合并两个对象

let aa = {
    age: 18,
    name: 'aaa'
} 

let bb = {
    sex: '男'
}
  
let cc = {...aa, ...bb}; 


// 等同于： 
// let cc = Object.assign({}, aa, bb);


console.log(cc); // {age: 18, name: "aaa", sex: "男"}
拷贝并修改对象

在扩展运算符后面，加上自定义的属性，则扩展运算符内部的同名属性会被覆盖掉。

let aa = {
    age: 18,
    name: 'aaa'
}
 
let dd = {...aa, name: 'ddd'};
 

// 等同于： 
// let dd = {...aa, ...{name: 'ddd'}};
// let dd = Object.assign({}, aa, { name: 'ddd'});



console.log(dd); // {age: 18, name: "ddd"}
一般，在 redux 中修改 state 时，会用解构赋值的方法。

但是，解构后得到的新对象，相对于老对象，是浅拷贝，还是深拷贝？

例如，下面肯定是引用赋值：

let aa = {
    age: 18,
    name: 'aaa'
}

let bb = aa;
bb.age = 22;

console.log(aa.age); // 22
上面， 对象 bb 是 aa 的一个引用赋值。那么，如果使用解构赋值得到 bb 呢：

let aa = {
    age: 18,
    name: 'aaa'
}

let bb = {...aa};
bb.age = 22;

console.log(aa.age); // 18
可见，改变 bb 的属性 age 的值，并不会改变对象 aa 的属性的 age 的值，所以，上面的例子bb是aa的一份拷贝
但是，这个拷贝是只有一层的浅拷贝，还是深拷贝？
let aa = {
    age: 18,
    name: 'aaa',
    address: {
        city: 'shanghai'
    }
}

let bb = {...aa};
bb.address.city = 'shenzhen';

console.log(aa.address.city);  // shenzhen
可见，aa 解构赋值到新对象 bb，只是进行了一层浅拷贝，对象 bb 中的属性（address）的属性（city）还是对象 aa 中属性的属性的引用。

如果像拷贝 aa 中的 city 属性，可以像下面处理：

let aa = {
    age: 18,
    name: 'aaa',
    address: {
        city: 'shanghai'
    }
}

let bb = {
    ...aa,
    address: {...aa.address}
};

bb.address.city = 'shenzhen';

console.log(aa.address.city);  // shanghai
```

#### js如何实现继承？
https://www.cnblogs.com/ranyonsue/p/11201730.html
```
想要继承，就必须要提供个父类（继承谁，提供继承的属性）
　　　　 
　　一、原型链继承
　　　　 
　　　　重点：让新实例的原型等于父类的实例。
　　　　特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
　　　　缺点：1、新实例无法向父类构造函数传参。
　　　　　　　2、继承单一。
　　　　　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
　　
　　二、借用构造函数继承
　　　　 
　　　　重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
　　　　特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　　　　　2、解决了原型链继承缺点1、2、3。
　　　　　　　3、可以继承多个构造函数属性（call多个）。
　　　　　　　4、在子实例中可向父实例传参。
　　　　缺点：1、只能继承父类构造函数的属性。
　　　　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　　　　　3、每个新实例都有父类构造函数的副本，臃肿。

　　三、组合继承（组合原型链继承和借用构造函数继承）（常用）
　　　　 
　　　　重点：结合了两种模式的优点，传参和复用
　　　　特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　　　　　2、每个新实例引入的构造函数属性是私有的。
　　　　缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

　　四、原型式继承
　　　　 
　　　　重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
　　　　特点：类似于复制一个对象，用函数来包装。
　　　　缺点：1、所有实例都会继承原型上的属性。
　　　　　　　2、无法实现复用。（新实例属性都是后面添加的）
　　
　　五、寄生式继承
　　　　 
　　　　重点：就是给原型式继承外面套了个壳子。
　　　　优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
　　　　缺点：没用到原型，无法复用。
　　　　
　　六、寄生组合式继承（常用）
　　　　寄生：在函数内返回对象然后调用
　　　　组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
　　　　 
　　　　重点：修复了组合继承的问题

　　　　继承这些知识点与其说是对象的继承，更像是函数的功能用法，如何用函数做到复用，组合，这些和使用继承的思考是一样的。上述几个继承的方法都可以手动修复他们的缺点，但就是多了这个手动修复就变成了另一种继承模式。
　　　　这些继承模式的学习重点是学它们的思想，不然你会在coding书本上的例子的时候，会觉得明明可以直接继承为什么还要搞这么麻烦。就像原型式继承它用函数复制了内部对象的一个副本，这样不仅可以继承内部对象的属性，还能把函数（对象，来源内部对象的返回）随意调用，给它们添加属性，改个参数就可以改变原型对象，而这些新增的属性也不会相互影响。
```

#### 10个ajax同时发出请求 并且全部返回展示结果 并且最多允许出现三次失败
```
let errorCount = 0
let p = new Promise((resolve, reject) => {
    if (success) {
         resolve(res.data)
     } else {
         errorCount++
         if (errorCount > 3) {
            // 失败次数大于3次就应该报错了
            reject(error)
         } else {
             resolve(error)
         }
     }
})
Promise.all([p]).then(v => {
  console.log(v);
});
```

#### 实现斐波那契数列
递归
```
    function fib(n) {
        return fib(n) = n > 2 ?
            fib(n - 1) + fib(n - 2) :
            1
    }
```
尾递归
```
    function fib(n,a=1,b=1){
        if(n<=1) return b;
        return fib(n-1,b,a+b);
    }
```
非递归 动态规划
```
    function fib(n){
        let a=1,
            b=1;
        for(let i=2;i<n;i++){
            const t=b;
            b=a+b;
            a=t
        }
        return b
    }
```
非递归 生成器
```
    function *fib(){
        let a=1,b=1;
        yield a;
        yield b;
        while(true){
            const t=b;
            b=a+b;
            a=t;
            yield b
        }
    }
```
递归 reduce流
```
    function fib(n){
        return Array(n).fill().reduce(([a,b],_)=>{
            return [b,a+b]
        },[0,1])[0]
    }
```
非递归 堆栈
```
    function fib(n){
        let stack=[n]
        while(stack.length){
            const item=stack.pop();
            if(item===1 || item===2){
                stack.push(1)
            }else{
                stack.push(item-1);
                stack.push(item-2);
            }
        }
    }
```

#### 实现快速排序
```
    function quickSort(arr,left,right){
        let len=arr.length,
            partitionIndex,
            left=typeof left != 'number' ? 0 : left,
            right=typeof right != 'number' ? len-1 : right;
        if(left<right){
            partitionIndex=partition(arr,left,right);
            quickSort(arr,left,partitionIndex-1);
            quickSort(arr,partitionIndex+1,right);
        }
        return arr;
    }
    function partition(arr,left,right){
        let pivot=left,
            index=pivot+1;
        for(let i=index;i<=right;i++){
            if(arr[i]<arr[pivot]){
                swap(arr,i,index);
                index++;
            }
        }
        swap(arr,pivot,index-1);
        return index-1;
    }
    function swap(arr,i,j){
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
```

### 框架

#### 请简单介绍一下React Hooks
```
> Hooks是 React 16.8 中的新添加内容。它们允许在不编写类的情况下使用state和其他 React 特性。使用 Hooks，可以从组件中提取有状态逻辑，这样就可以独立地测试和重用它。Hooks 允许咱们在不改变组件层次结构的情况下重用有状态逻辑，这样在许多组件之间或与社区共享 Hooks 变得很容易。

> 首先，Hooks 通常支持提取和重用跨多个组件通用的有状态逻辑，而无需承担高阶组件或渲染 props 的负担。Hooks 可以轻松地操作函数组件的状态，而不需要将它们转换为类组件。

Hooks 在类中不起作用，通过使用它们，咱们可以完全避免使用生命周期方法，例如 componentDidMount、componentDidUpdate、componentWillUnmount。相反，使用像useEffect这样的内置钩子。
```

#### 如何封装一个button？
https://www.cnblogs.com/elsonww/p/11456244.html
```
一、效果

　　

 二、封装

复制代码
<template>
    <button @click="ClickHandler()" :class="styles" :disabled="disabled">{{ text }}</button>
</template>

<script>
export default {
    name: 'sp-button',
    data() {
        return {}
    },
    props: {
        /* 按钮中显示的文字 */
        text: {
            type: String
        },
        /* 是否启用按钮 */
        disabled: {
            type: Boolean,
            default: false
        },
        /* 按钮形状 */
        design: {
            type: String,
            default: 'block'
        },
        /* 矢量图标 */
        icon: String,
        /* 内置按钮风格 */
        type: {
            type: String,
            default: 'normal'
        }
    },
    methods: {
        /* 按钮点击时触发的事件，用于父组件中使用 */
        ClickHandler() {
            this.$emit('click')
        }
    },
    computed: {
        /* 根据不同的props，展示按钮样式 */
        styles: {
            get() {
                return ['sp-button', this.design, this.icon, this.type]
            }
        }
    }
}
</script>

<style scoped>
/* 引入矢量图标 */
@import '../../assets/icons/iconfont.css';
button {
    width: 100px;
    height: 30px;
    outline: none; /*outline 去除原生的button样式*/

    /*动画设置*/
    transition: border 0.8s;
    -webkit-transition: border 0.8s;
    transition: background-color 0.1s;
    -webkit-transition: background-color 0.1s;
}
/*normal style*/
.normal {
    border: 1px solid rgb(135, 135, 136);
    background-color: #ffffff;
    font-size: 12px;
    color: rgb(92, 90, 90);
}
.normal:hover {
    cursor: pointer;
    background-color: #F4F4F5;
}
.normal:active {
    color: #000;
    border: 1px solid rgb(135, 135, 136);
    background-color: #F4F4F5;
}
.normal:disabled {
    cursor: not-allowed;
    background-color: rgb(241, 243, 245);
    opacity: 0.8;
}
/* primary style */
.primary {
    color: #ffffff;
    background-color: #3a8ee6;
    font-size: 12px;
    border: none;
}
.primary:active {
    background-color: rgb(192, 215, 250);
    color: rgb(105, 83, 233);
    border: none;
}
.primary:hover{
    cursor: pointer;
    background-color: rgb(125, 174, 248);
}
.primary:disabled{
    background-color: rgb(192, 215, 250);
    color: #3a8ee6;
    border: none;
    cursor: not-allowed;
}
/* warning style*/
.warning {
    color: #ffffff;
    background-color: #CF9236;
    font-size: 12px;
    border: none;
}
.warning:active {
    background-color: rgb(233, 202, 157);
    color: rgb(185, 115, 10);
    border: none;
}
.warning:hover{
    cursor: pointer;
    background-color: rgb(231, 177, 97);
}
.warning:disabled{
    background-color: rgb(233, 202, 157);
    color: rgb(185, 115, 10);
    border: none;
    cursor: not-allowed;
}
/* error style*/
.error {
    color: #ffffff;
    background-color: rgb(250, 96, 96);
    font-size: 12px;
    border: none;
}
.error:active {
    background-color: rgb(243, 181, 181);
    color: rgb(245, 60, 60);
    border: none;
}
.error:hover{
    cursor: pointer;
    background-color: rgb(238, 127, 127);
}
.error:disabled{
    background-color: rgb(243, 181, 181);
    color: rgb(245, 60, 60);
    border: none;
    cursor: not-allowed;
}
/* success style */
.success {
    color: #ffffff;
    background-color: #5DAF34;
    font-size: 12px;
    border: none;
}
.success:active {
    background-color: rgb(185, 218, 168);
    color: rgb(70, 153, 29);
    border: none;
}
.success:hover{
    cursor: pointer;
    background-color: rgb(129, 211, 85);
}
.success:disabled{
    background-color: rgb(185, 218, 168);
    color: rgb(70, 153, 29);
    border: none;
    cursor: not-allowed;
}
/* info style */
.info {
    color: #ffffff;
    background-color: #A6A9AD;
    font-size: 12px;
    border: none;
}
.info:active {
    background-color: rgb(212, 214, 218);
    color: rgb(141, 144, 146);
    border: none;
}
.info:hover{
    cursor: pointer;
    background-color: rgb(176, 178, 182);
}
.info:disabled{
    background-color: rgb(212, 214, 218);
    color: rgb(141, 144, 146);
    border: none;
    cursor: not-allowed;
}
/* 方块 */
.block {
    border-radius: 0px;
}
/* 半圆 */
.oval {
    border-radius: 50px;
}
/* 圆角 */
.fillet {
    border-radius: 5px;
}
/* 圆 */
.circle {
    /*宽高相等才能成为圆,但从视觉上来看，width比height多5px更为好看*/
    width: 50px;
    height: 45px;
    border-radius: 50%;
}
</style>
复制代码
 三、总结

　　功能不多，更多的是样式的设计和颜色的搭配。
```

#### 如何解决首屏加载问题？
```
- 配置打包工具，将组件分别打包到不同的js代码块中
 build/webpack.base.conf.js
   output:{
     path: config.build.assetsRoot,
	  filename:’[name].js’,
     //新增
chunkFilename:”[name].js”,
publicPath: process.env.NODE_ENV===”production”
  ?config.build.assetsPublicPath
  :config.dev.assetsPublicPath
}

- 当路由请求到该组件时，才动态加载组件的内容
const Index=()=>import(‘@/views/Index.vue’) // 当用户在vue中请求当前组件对应的路由地址时，由vue-router自动调用加载函数，动态请求Index.vue组件对象

- 服务端渲染SSR
```