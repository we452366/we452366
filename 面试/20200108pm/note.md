## 京东

### 后端

#### 有了解哪些数据结构吗？
```
链表、数组、栈、队列、树、图、堆、散列表
```

#### 链表有哪些特点？
```
1）数组在内存中是逐个存放的，也就是说倘若数组的第一个元素在地址A,则数组第二个元素就在地址A+1。

而链表则不是，链表每个节点没有相对固定的位置关系。某个节点在地址A其后的节点不一定是A+1,而在内存的其他空闲区域，呈现一种随机的状态。

2）数组一旦显式的被申明后，其大小就固定了，不能动态进行扩充。而链表则可以，可以动态生成节点并且添加到已有的链表后面。

3）链表灵活，但是空间和时间额外耗费较大；数组大小固定，元素位置固定，但是操作不灵活，且容易浪费空间，但是时间耗费较小，尤其是元素变化不大的时候效率很高。双向链表比单向的更灵活，但是空间耗费也更大

。。。。。

链表的特性是在中间任意位置添加删除元素的都非常的快，不需要移动其它的元素。 
链表顾名思义，要把各个元素链接起来才算撒。   
  通常链表每一个元素都要保存一个指向下一个元素的指针（单链表）。   
  双链表的化每个元素即要保存到下一个元素的指针，还要保存一个上一个元素的指针。   
  循环链表则把最后一个元素中保存下一个元素指针指向第一个元素。   
数组是一组具有相同类型和名称的变量的集合。这些变量称为数组的元素,每个数组元素都有一个编号,
这个编号叫做下标,我们可以通过下标来区别这些元素。数组元素的个数有时也称之为数组的长度。

数组查改方便,链表增删效率高。

```

#### 冒泡排序的复杂度是多少？
```
O(n^2)
```

#### 什么是二分查找？
https://blog.csdn.net/bjweimengshu/article/details/90627899
```
    function bsearch(A,x){
        let l=0,
            r=A.length-1,
            guess;
        while(l<=r){
            guess=Math.floor((l+r)/2);
            if(A[guess]===x){
                return guess;
            }else if(A[guess]>x){
                r=guess-1;
            }else{
                l=guess+1
            }
        }
        return -1;
    }
```

#### 进程和线程的区别是什么？
```
1、功能不同

进程是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。

线程是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。

2、工作原理不同

在早期面向进程设计的计算机结构中，进程是程序的基本执行实体；在当代面向线程设计的计算机结构中，进程是线程的容器。程序是指令、数据及其组织形式的描述，进程是程序的实体。

线程是独立调度和分派的基本单位。线程可以为操作系统内核调度的内核线程，如Win32线程；由用户进程自行调度的用户线程，如Linux平台的POSIX Thread；或者由内核与用户进程，如Windows 7的线程，进行混合调度。



3、作用不同

进程是操作系统中最基本、重要的概念。是多道程序系统出现后，为了刻画系统内部出现的动态情况，描述系统内部各道程序的活动规律引进的一个概念,所有多道程序设计操作系统都建立在进程的基础上。

通常在一个进程中可以包含若干个线程，它们可以利用进程所拥有的资源。在引入线程的操作系统中，通常都是把进程作为分配资源的基本单位，而把线程作为独立运行和独立调度的基本单位。
```

#### 如何实现进程间通信？
https://blog.csdn.net/qq_19525389/article/details/81774622
```
进程间通信的意思就是在不同进程之间传递信息。它是一组编程接口，让程序员协调不同进程，使能够相互传递消息。

IPC目的

1）数据传输：一个进程需要将它的数据发送给另一个进程，发送的数据量在一个字节到几兆字节之间。

2）共享数据：多个进程想要操作共享数据，一个进程对共享数据的修改，别的进程应该立刻看到。

3）通知事件：一个进程需要向另一个或一组进程发送消息，通知它（它们）发生了某种事件（如进程终止时要通知父进程）。

4）资源共享：多个进程之间共享同样的资源。为了作到这一点，需要内核提供锁和同步机制。

5）进程控制：有些进程希望完全控制另一个进程的执行（如Debug进程），此时控制进程希望能够拦截另一个进程的所有陷入和异常，并能够及时知道它的状态改变。

IPC方式包括：管道、系统IPC（信号量、消息队列、共享内存）和套接字（socket）。

管道：

3种。管道是面向字节流，自带互斥与同步机制，生命周期随进程。 

1)普通管道PIPE, 通常有两种限制,一是半双工,数据同时只能单向传输;二是只能在父子或者兄弟进程间使用.，

2)命令流管道s_pipe: 去除了第一种限制,为全双工，可以同时双向传输，

3)命名管道FIFO, 去除了第二种限制,可以在许多并不相关的进程之间进行通讯。

①无名管道：没有磁盘节点，仅仅作为一个内存对象，用完就销毁了。因此没有显示的打开过程，实际在创建时自动打开，并且生成内存iNode，其内存对象和普通文件的一致，所以读写操作用的同样的接口，但是专用的。因为不能显式打开（没有任何标示），所以只能用在父子进程，兄弟进程， 或者其他继承了祖先进程的管道文件对象的两个进程间使用【具有共同祖先的进程】



int pipe(int fd[2]);//由参数fd返回两个文件描述符，fd[0]为读而打开  fd[1]为写而打开

int read(fd[0], buff, int size);    int write(fd[1], buff, int size);

②有名管道：任意两个或多个进程间通讯。因为它在文件目录树中有一个文件标示（FIFO） 实际不占据磁盘空间，数据缓存在内存上。它与普通文件类似，都遵循打开，读，写，关闭的过程，但读写的内部实现和普通文件不同，和无名管道一样。

命令：mkfifo a=filename  //mkfifo(char *path,int flag)系统调用。

标识符与键：每个内核的IPC结构（消息队列、信号量或共享内存）都用一个非负整数标识符引用。

标识符是IPC对象的内部名。为了是多个进程间能够访问到同一IPC对象，需要提供一个外部名。即“键（key）”，键与每个IPC对象关联，并作为对象的外部名。键的数据类型为key_t，由内核变换成标识符。

内核对象：用于进程间通讯时，多进程能访问同一资源的记录，用标识符标识。。

                                 

信号量：

              1.临界资源：同一时刻，只能被一个进程访问的资源

               2.临界区：访问临界资源的代码区

              3.原子操作：任何情况下不能被打断的操作。

            它是一个计数器，记录资源能被多少个进程同时访问。用于控制多进程对临界资源的访问（同步)），并且是非负值。主要作为进程间以及同一进程的不同线程间的同步手段。

操作：创建或获取，若是创建必须初始化，否则不用初始化。

      int semget((key_t)key, int nsems, int flag);//创建或获取信号量

      int semop(int semid, stuct sembuf*buf, int length);//加一操作（V操作）：释放资源；减一操作（P操作）：获取资源

      int semct(int semid, int pos, int cmd);//初始化和删除

注：我们可以封装成库，实现信号量的创建或初始化，p操作，V操作，删除操作。。

消息队列：

        消息队列是消息的链表，是存放在内核中并由消息队列标识符标识。因此是随内核持续的，只有在内核重起或者显示删除一个消息队列时，该消息队列才会真正被删除。。消息队列克服了信号传递信息少，管道只能承载无格式字节流以及缓冲区受限等特点。允许不同进程将格式化的数据流以消息队列形式发送给任意进程，对消息队列具有操作权限的进程都可以使用msgget完成对消息队列的操作控制，通过使用消息类型，进程可以按顺序读信息，或为消息安排优先级顺序。

          与信号量相比，都以内核对象确保多进程访问同一消息队列。但消息队列发送实际数据，信号量进行进程同步控制。

         与管道相比，管道发送的数据没有类型，读取数据端无差别从管道中按照前后顺序读取；消息队列有类型，读端可以根据数据类型读取特定的数据。

         操作：创建或获取消息队列， int msgget((key_tkey, int flag);//若存在获取，否则创建它

        发送消息：int msgsnd(int msgid, void *ptr, size_t size, int flag); ptr指向一个结构体存放类型和数据 size 数据的大小

        接受消息：int msgrcv(int msgid, void *ptr, size_t size, long type, int flag);

        删除消息队列： int msgctl(int msgid, int cmd, struct msgid_ds*buff);

共享内存：

       共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。





        共享内存是最快的一种IPC，因为不需要在客户进程和服务器进程之间赋值。使用共享内存的唯一注意的是是多个进程对一给定的存储区的同步访问。【若服务器进程正在向共享存储区写入数据，则写完数据之前客户进程不应读取数据，或者客户进程正在从共享内存中读取数据，服务进程不应写入数据。。所以我们要对共享内存进行同步控制，通常是信号量。】

int shmget((key_t)key, size_t size, int flag); //size 开辟内存空间的大小，flag：若存在则获取，否则创建共享内存存储段，返回一个标识符。

void *shmat(int shmid, void *addr, int flag); //将共享内存段连接到进程的地址空间中，返回一个共享内存首地址

       函数shmat将标识号为shmid共享内存映射到调用进程的地址空间中，映射的地址由参数shmaddr和shmflg共同确定，其准则为：

       (1) 如果参数shmaddr取值为NULL，系统将自动确定共享内存链接到进程空间的首地址。

       (2) 如果参数shmaddr取值不为NULL且参数shmflg没有指定SHM_RND标志，系统将运用地址shmaddr链接共享内存。

       (3) 如果参数shmaddr取值不为NULL且参数shmflg指定了SHM_RND标志位，系统将地址shmaddr对齐后链接共享内存。其中选项SHM_RND的意思是取整对齐，常数SHMLBA代表了低边界地址的倍数，公式“shmaddr – (shmaddr % SHMLBA)”的意思是将地址shmaddr移动到低边界地址的整数倍上。

int shmdt(void *ptr); //断开进程与共享内存的链接

         进程脱离共享内存区后，数据结构 shmid_ds 中的 shm_nattch 就会减 1 。但是共享段内存依然存在，只有 shm_attch 为 0 后，即没有任何进程再使用该共享内存区，共享内存区才在内核中被删除。一般来说，当一个进程终止时，它所附加的共享内存区都会自动脱离。

int shmctl(int shmid, int cmd, struct shmid_ds *buff); //删除共享内存（内核对象）

       shmid是shmget返回的标识符；

      cmd是执行的操作：有三种值，一般为 IPC_RMID  删除共享内存段；

      buff默认为0.

      如果共享内存已经与所有访问它的进程断开了连接，则调用IPC_RMID子命令后，系统将立即删除共享内存的标识符，并删除该共享内存区，以及所有相关的数据结构；

       如果仍有别的进程与该共享内存保持连接，则调用IPC_RMID子命令后，该共享内存并不会被立即从系统中删除，而是被设置为IPC_PRIVATE状态，并被标记为”已被删除”（使用ipcs命令可以看到dest字段）；直到已有连接全部断开，该共享内存才会最终从系统中消失。

        需要说明的是：一旦通过shmctl对共享内存进行了删除操作，则该共享内存将不能再接受任何新的连接，即使它依然存在于系统中！所以，可以确知， 在对共享内存删除之后不可能再有新的连接，则执行删除操作是安全的；否则，在删除操作之后如仍有新的连接发生，则这些连接都将可能失败！

消息队列和管道基本上都是4次拷贝，而共享内存（mmap, shmget）只有两次。

     4次：1，由用户空间的buf中将数据拷贝到内核中。2，内核将数据拷贝到内存中。3，内存到内核。4，内核到用户空间的buf.

     2次： 1，用户空间到内存。 2，内存到用户空间。

        消息队列、共享内存和管道都是内核对象，所执行的操作也都是系统调用，而这些数据最终是要存储在内存中执行的。因此不可避免的要经过4次数据的拷贝。但是共享内存不同，当执行mmap或者shmget时，会在内存中开辟空间，然后再将这块空间映射到用户进程的虚拟地址空间中，即返回值为一个指向逻辑地址的指针。当用户使用这个指针时，例如赋值操作，会引起一个从逻辑地址到物理地址的转化，会将数据直接写入对应的物理内存中，省去了拷贝到内核中的过程。当读取数据时，也是类似的过程，因此总共有两次数据拷贝。

socket通信

       适合同一主机的不同进程间和不同主机的进程间进行全双工网络通信。但并不只是Linux有，在所有提供了TCP/IP协议栈的操作系统中几乎都提供了socket，而所有这样操作系统，对套接字的编程方法几乎是完全一样的,即“网络编程”。
```
node
```
> 原生的 cluster 和 fork 模式都有 API 封装好的进行通信。如果是 execfile 这样形式调起第三方插件形式，想要与第三方插件进行通信，可以自己封装一个类似 promisyfy 形式进行通信，维护这块，子进程可以监听到异常，一旦发现异常，立刻通知主进程，杀死这个异常的子进程，然后重新开启一个子进程～
```

#### java中如何创建一个进程？
https://blog.csdn.net/wangxinzhen/article/details/89736143
```
java创建进程有两种方法：

1.使用Runtime的exec(String cmdarray[])方法创建进程

代码如下:

String [] cmd={"cmd","/c","start dir"};
Runtime rt = Runtime.getRuntime();
Process proc=rt.exec(cmd);
执行结果如下:



2.使用ProcessBuilder的start()方法创建进程

代码如下:

ProcessBuilder pb=new ProcessBuilder("cmd","/C","start","netstat");
Process ps=pb.start();
执行结果如下：



除以上列出的命令外，还可以通过进程调起计算机、文本编辑器等。

调起计算器代码为:Runtime.getRuntime.exec("calc");

调起文本编辑器为:Runtime.getRuntime.exec("notepad");
```

#### 浏览器中的DOM树的数据结构是怎么存储的？
```
今天通过对 DOM 模型、HTML 解释器和 JavaScript 的执行的介绍，来初步学习 HTML 解释器是如何将从网络或者本地文件获取的字节流转成 DOM 树的。

DOM 模型

1、DOM 标准

DOM (Document Object Model) 的全称是文档对象模型，它可以以一种独立于平台和语言的方式访问和修改一个文档的内容和结构。比如，Web开发中，用 JavaScript 语言来访问、创建、删除或者修改 HTML 的文档结构。

目前 W3C 已经定义了一系列 DOM 接口（三个版本的 DOM 接口，每一个版本都加入了一些新功能，有兴趣的同学请自行查阅），使用这些接口可以对 DOM 树结构进行操作。

2、 DOM 树

在介绍 DOM 树之前，首先要清楚，DOM 规范中，对于文档的表示方法并没有任何限制，因此，DOM 树只是多种文档结构中的一种较为普遍的实现方式。

DOM 结构构成的基本要素是 “节点“，而文档的结构就是由层次化的节点组成。在 DOM 模型中，节点的概念很宽泛，整个文档 （Document） 就是一个节点，称为文档节点。除此之外还有元素（Element）节点、属性节点、Entity节点、注释（Comment）节点等。

了解了 DOM 的结构是由各种的子节点组成的，那么以 HTMLDocument 为根节点，其余节点为子节点，组织成一个树的数据结构的表示就是 DOM树。

HTML 网页和它的 DOM 树表示

HTML 解释器

1、解释过程

HTML 解释器的工作就是将网络或者本地磁盘获取的 HTML 网页和资源从字节流解释成 DOM 树结构。

![从资源的字节流到 DOM 树](https://img-blog.csdn.net/2018062900265381?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3VzZXJrYW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70) 从资源的字节流到 DOM 树
通过上图可以清楚的了解这一过程：首先是字节流，经过解码之后是字符流，然后通过词法分析器会被解释成词语（Tokens），之后经过语法分析器构建成节点，最后这些节点被组建成一颗 DOM 树。

在这个过程中，每一个环节都会调用对应的类去处理

词法分析： HTMLTokenizer 类
词语验证：XSSAuditor 类
从词语到节点： HTMLDocumentParser 类、 HTMLTreeBuilder 类
从节点到 DOM 树： HTMLConstructionSite 类
对于线程化的解释器，字符流后的整个解释、布局和渲染过程基本会交给一个单独的渲染线程来管理（不是绝对的）。由于 DOM 树只能在渲染线程上创建和访问，所以构建 DOM 树的过程只能在渲染线程中进行。但是，从字符串到词语这个阶段可以交给单独的线程来做，Chromium 浏览器使用的就是这个思想。在解释成词语之后，Webkit 会分批次将结果词语传递回渲染线程。

JavaScript 的执行

在 HTML 解释器的工作过程中，可能会有 JavaScript 代码需要执行，它发生在将字符串解释成词语之后、创建各种节点的时候。这也是为什么全局执行的 JavaScript 代码不能访问 DOM 的原因——因为 DOM 树还没有被创建完呢。

WebKit 将 DOM 树创建过程中需要执行的 JavaScript 代码交由 HTMLScriptRunner 类来负责，其利用 JavaScript 引擎来执行 Node 节点中包含的代码。

因为 JavaScript 代码可能会修改文档结构，所以代码的执行会阻碍后面节点的创建，同时也会阻碍后面的资源下载，这样就会导致资源不能并发下载的性能问题。所以一般建议：

1、在 “script“ 标签上加上 “async“ 或 “defer“ 属性。
2、将 “script“ 元素放在 “body“ 元素后面。

对于此，WebKit 也通过预扫描和预加载来实现对资源并发下载的优化。

具体过程就是当需要执行 JavaScript 代码的时候，WebKit 先暂停代码的执行，使用预扫描器 HTMLPreloadScanner 类来扫描后面的词语， 如果发现需要使用其他资源，那么就会使用与资源加载器 HTMLResourcePreloader 类来发送请求，在这之后，才执行 JavaScript 代码。由于预扫描器本身并不创建节点对象，也不会构建 DOM 树，所以速度比较快。就算如此，还是推荐不要在头部写入大量 JavaScript 代码，毕竟不是所有渲染引擎都做了这样的优化。

在 DOM 树构建完成后，WebKit 会触发 “DOMContentLoaded” 事件，当所有资源都被加载完成后，会触发 “onload” 事件。
```
https://blog.csdn.net/weixin_33701564/article/details/90397113
```
这几天下了Chrome的源码，安装了一个debug版的Chromium研究了一下，虽然很多地方都一知半解，但是还是有一点收获，将在这篇文章介绍DOM树是如何构建的，看了本文应该可以回答以下问题：

IE用的是Trident内核，Safari用的是Webkit，Chrome用的是Blink，到底什么是内核，它们的区别是什么？
如果没有声明<!DOCTYPE html>会造成什么影响？
浏览器如何处理自定义的标签，如写一个<data></data>？
查DOM的过程是怎么样的？
先说一下，怎么安装一个可以debug的Chrome

1. 从源码安装Chrome

为了可以打断点debug，必须得从头编译(编译的时候带上debug参数)。所以要下载源码，Chrome把最新的代码更新到了Chromium的工程，是完全开源的，你可以把它整一个git工程下载下来。Chromium的下载安装可参考它的文档， 这里把一些关键点说一下，以Mac为例。你需要先下载它的安装脚本工具，然后下载源码：

fetch chromium --no-history
–no-history的作用是不把整个git工程下载下来，那个实在是太大了。或者是直接执行git clone：

git clone https://chromium.googlesource.com/chromium/src
这个就是整一个git工程，下载下来有6.48GB（那时）。博主就是用的这样的方式，如果下载到最后提示出错了：

fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
可以这样解决：

git config --global core.compression 0
git clone --depth 1 https://chromium.googlesource.com/chromium/src
就不用重头开始clone，因为实在太大、太耗时了。

下载好之后生成build的文件：

gn gen out/gn --ide=xcode
–ide=xcode是为了能够使用苹果的XCode进行可视化进行调试。gn命令要下载Chrome的devtools包，文档里面有说明。

准备就绪之后就可以进行编译了：

ninja -C out/gn chrome
在笔者的电脑上编译了3个小时，firfox的源码需要编译7、8个小时，所以相对来说已经快了很多，同时没报错，一次就过，相当顺利。编译组装好了之后，会在out/gn目录生成Chromium的可执行文件，具体路径是在：

out/gn/Chromium.app/Contents/MacOS/Chromium
运行这个就可以打开Chromium了：



那么怎么在可视化的XCode里面进行debug呢？

2. 在XCode里面Debug

在上面生成build文件的同时，会生成XCode的工程文件：sources.xcodeproj，具体路径是在：

out/gn/sources.xcodeproj
双击这个文件，打开XCode，在上面的菜单栏里面点击Debug -> AttachToProcess -> Chromium，要先打开Chrome，才能在列表里面看到Chrome的进程。然后小试牛刀，打个断点试试，看会不会跑进来：

在左边的目录树，打开chrome/browser/devtools/devtools_protocol.cc这个文件，然后在这个文件的ParseCommand函数里面打一个断点，按照字面理解这个函数应该是解析控制台的命令。打开Chrome的控制台，输入一条命令，例如：new Date()，按回车可以看到断点生效了：



通过观察变量值，可以看到刚刚敲进去的命令。这就说明了我们安装成功，并且可以通过可视化的方式进行调试。

但是我们要debug页面渲染过程，Chrome的blink框架使用多进程技术，每打开一个tab都会新开一个进程，按上面的方式是debug不了构建DOM过程的，从Chromium的文档可以查到，需要在启动的时候带上一个参数：

Chromium --renderer-startup-dialog
Chrom的启动进程就会绪塞，并且提示它的渲染进程ID：

[7339:775:0102/210122.254760:ERROR:child_process.cc(145)] Renderer (7339) paused waiting for debugger to attach. Send SIGUSR1 to unpause.

7339就是它的渲染进程id，在XCode里面点 Debug -> AttachToProcess By Id or Name -> 填入id -> 确定，attach之后，Chrome进程就会恢复，然后就可以开始调试渲染页面的过程了。

在content/renderer/render_view_impl.cc这个文件的1093行RenderViewImpl::Create函数里面打个断点，按照上面的方式，重新启动Chrome，在命令行带上某个html文件的路径，为了打开Chrome的时候就会同时打开这个文件，方便调试。执行完之后就可以看到断点生效了。可以说render_view_impl.cc这个文件是第一个具体开始渲染页面的文件——它会初始化页面的一些默认设置，如字体大小、默认的viewport等，响应关闭页面、OrientationChange等事件，而在它再往上的层主要是一些负责通信的类。

3. Chrome建DOM源码分析

先画出构建DOM的几个关键的类的UML图，如下所示：



第一个类HTMLDocumentParser负责解析html文本为tokens，一个token就是一个标签文本的序列化，并借助HTMLTreeBuilder对这些tokens分类处理，根据不同的标签类型、在文档不同位置，调用HTMLConstructionSite不同的函数构建DOM树。而HTMLConstructionSite借助一个工厂类对不同类型的标签创建不同的html元素，并建立起它们的父子兄弟关系，其中它有一个m_document的成员变量，这个变量就是这棵树的根结点，也是js里面的window.document对象。

为作说明，用一个简单的html文件一步步看这个DOM树是如何建立起来的：

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>
        <h1 class="title">demo</h1>
        <input value="hello">
    </div>
</body>
</html>
然后按照上面第2点提到debug的方法，打开Chromium并开始debug：

chromium ~/demo.html --renderer-startup-dialog
我们先来研究一下Chrome的加载和解析机制

1. 加载机制

以发http请求去加载html文本做为我们分析的第一步，在此之前的一些初始化就不考虑了。Chrome是在DocumentLoader这个类里面的startLoadingMainResource函数里去加载url返回的数据，如访问一个网站则返回html文本：

  FetchRequest fetchRequest(m_request, FetchInitiatorTypeNames::document,
                            mainResourceLoadOptions);
  m_mainResource =
      RawResource::fetchMainResource(fetchRequest, fetcher(), m_substituteData);
把参数里的m_request打印出来，在这个函数里面加一行代码：

LOG(INFO) << "request url is: " << m_request.url().getString()
并重新编译Chrome运行，控制台输出：

[22731:775:0107/224014.494114:INFO:DocumentLoader.cpp(719)] request url is: “file:///Users/yincheng/demo.html”

可以看到，这个url确实是我们传进的参数。

发请求后，每次收到的数据块，会通过Blink封装的IPC进程间通信，触发DocumentLoader的dataReceived函数，里面会去调它commitData函数，开始处理具体业务逻辑：

void DocumentLoader::commitData(const char* bytes, size_t length) {
  ensureWriter(m_response.mimeType());
 
  if (length)
    m_dataReceived = true;
 
  m_writer->addData(bytes, length);
}
这个函数关键行是最2行和第7行，ensureWriter这个函数会去初始化上面画的UML图的解析器HTMLDocumentParser (Parser)，并实例化document对象，这些对象都是通过实例m_writer去带动的。也就是说，writer会去实例化Parser之后，第7行writer传递数据给Parser去解析。

检查一下收到的数据bytes是什么东西：



可以看到bytes就是请求返回的html文本。

在ensureWriter函数里面有个判断：

void DocumentLoader::ensureWriter(const AtomicString& mimeType,
                                  const KURL& overridingURL) {
  if (m_writer)
    return;
 
}
如果m_writer已经初始化过了，则直接返回。也就是说Parser和document只会初始化一次。

在上面的addData函数里面，会启动一条线程执行Parser的任务：

if (!m_haveBackgroundParser)
      startBackgroundParser();
并把数据传递给这条线程进行解析，Parser一旦收到数据就会序列成tokens，再构建DOM树。

2. 构建tokens

这里我们只要关注序列化后的token是什么东西就好了，为此，写了一个函数，把tokens的一些关键信息打印出来：

  String getTokenInfo(){
    String tokenInfo = "";
    tokenInfo = "tagName: " + this->m_name + "|type: " + getType() + "|attr:" + getAttributes() + "|text: " + this->m_data;
    return tokenInfo;
  }
打印出来的结果：

tagName: html  |type: DOCTYPE   |attr:              |text: " tagName:       |type: Character |attr:              |text: \n" tagName: html  |type: startTag  |attr:              |text: "
tagName:       |type: Character |attr:              |text: \n" tagName: head  |type: startTag  |attr:              |text: " tagName:       |type: Character |attr:              |text: \n    "
tagName: meta  |type: startTag  |attr:charset=utf-8 |text: " tagName:       |type: Character |attr:              |text: \n" tagName: head  |type: EndTag    |attr:              |text: "
tagName:       |type: Character |attr:              |text: \n" tagName: body  |type: startTag  |attr:              |text: " tagName:       |type: Character |attr:              |text: \n    "
tagName: div   |type: startTag  |attr:              |text: " tagName:       |type: Character |attr:              |text: \n        " tagName: h1    |type: startTag  |attr:class=title   |text: "
tagName:       |type: Character |attr:              |text: demo" tagName: h1    |type: EndTag    |attr:              |text: " tagName:       |type: Character |attr:              |text: \n        "
tagName: input |type: startTag  |attr:value=hello   |text: " tagName:       |type: Character |attr:              |text: \n    " tagName: div   |type: EndTag    |attr:              |text: "
tagName:       |type: Character |attr:              |text:     \n" tagName: body  |type: EndTag    |attr:              |text: " tagName:       |type: Character |attr:              |text: \n"
tagName: html  |type: EndTag    |attr:              |text: " tagName:       |type: Character |attr:              |text: \n" tagName:       |type: EndOfFile |attr:              |text: "
这些内容有标签名、类型、属性和innerText，标签之间的文本（换行和空白）也会被当作一个标签处理。Chrome总共定义了7种标签类型：

  enum TokenType {
    Uninitialized,
    DOCTYPE,
    StartTag,
    EndTag,
    Comment,
    Character,
    EndOfFile,
  };
有了一个根结点document和一些格式化好的tokens，就可以构建dom树了。

3. 构建DOM树

（1）DOM结点

在研究这个过程之前，先来看一下一个DOM结点的数据结构是怎么样的。以p标签HTMLParagraphElement为例，画出它的UML图，如下所示：



Node是最顶层的父类，它有三个指针，两个指针分别指向它的前一个结点和后一个结点，一个指针指向它的父结点；

ContainerNode继承于Node，添加了两个指针，一个指向第一个子元素，另一个指向最后一个子元素；

Element又添加了获取dom结点属性、clientWidth、scrollTop等函数

HTMLElement又继续添加了Translate等控制，最后一级的子类HTMLParagraphElement只有一个创建的函数，但是它继承了所有父类的属性。

需要提到的是每个Node都组合了一个treeScope，这个treeScope记录了它属于哪个document（一个页面可能会嵌入iframe）。

构建DOM最关键的步骤应该是建立起每个结点的父子兄弟关系，即上面提到的成员指针的指向。

到这里我们可以先回答上面提出的第一个问题，什么是浏览器内核

（2）浏览器内核

浏览器内核也叫渲染引擎，上面已经看到了Chrome是如何实例化一个P标签的，而从firefox的源码里面P标签的依赖关系是这样的：



在代码实现上和Chrome没有任何关系。这就好像W3C出了道题，firefox给了一个解法，取名为Gecko，Safari也给了自己的答案，取名Webkit，Chrome觉得Safari的解法比较好直接拿过来用，又结合自身的基础又封装了一层，取名Blink。由于W3C出的这道题“开放性”比较大，出的时间比较晚，导致各家实现各有花样。

明白了这点后，继续DOM构建。下面开始不再说Chrome，叫Webkit或者Blink应该更准确一点

（3）处理开始步骤

Webkit把tokens序列好之后，传递给构建的线程。在HTMLDocumentParser::processTokenizedChunkFromBackgroundParser的这个函数里面会做一个循环，把解析好的tokens做一个遍历，依次调constructTreeFromCompactHTMLToken进行处理。

根据上面的输出，最开始处理的第一个token是docType的那个：

"tagName: html  |type: DOCTYPE   |attr:              |text: "
在那个函数里面，首先Parser会调TreeBuilder的函数：

m_treeBuilder->constructTree(&token);
然后在TreeBuilder里面根据token的类型做不同的处理：

void HTMLTreeBuilder::processToken(AtomicHTMLToken* token) {
  if (token->type() == HTMLToken::Character) {
    processCharacter(token);
    return;
  }
 
  switch (token->type()) {
    case HTMLToken::DOCTYPE:
      processDoctypeToken(token);
      break;
    case HTMLToken::StartTag:
      processStartTag(token);
      break;
    case HTMLToken::EndTag:
      processEndTag(token);
      break;
    //othercode
  }
}
它会对不同类型的结点做相应处理，从上往下依次是文本节点、doctype节点、开标签、闭标签。doctype这个结点比较特殊，单独作为一种类型处理

（3）DOCType处理

在Parser处理doctype的函数里面调了HTMLConstructionSite的插入doctype的函数：

void HTMLTreeBuilder::processDoctypeToken(AtomicHTMLToken* token) {
    m_tree.insertDoctype(token);
    setInsertionMode(BeforeHTMLMode);
}
在这个函数里面，它会先创建一个doctype的结点，再创建插dom的task，并设置文档类型：

void HTMLConstructionSite::insertDoctype(AtomicHTMLToken* token) {
  //const String& publicId = ...
  //const String& systemId = ...
  DocumentType* doctype =
      DocumentType::create(m_document, token->name(), publicId, systemId); //创建DOCType结点
  attachLater(m_attachmentRoot, doctype);  //创建插DOM的task
  setCompatibilityModeFromDoctype(token->name(), publicId, systemId); //设置文档类型
}
我们来看一下不同的doctype对文档类型的设置有什么影响，如下：

  // Check for Quirks Mode.
  if (name != "html" ) {
    setCompatibilityMode(Document::QuirksMode);
    return;
  }
如果tagName不是html，那么文档类型将会是怪异模式，以下两种就会是怪异模式：

<!DOCType svg>
<!DOCType math>
而常用的html4写法：

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
在源码里面这个将是有限怪异模式：

  // Check for Limited Quirks Mode.
  if (!systemId.isEmpty() &&
       publicId.startsWith("-//W3C//DTD HTML 4.01 Transitional//",
                           TextCaseASCIIInsensitive))) {
    setCompatibilityMode(Document::LimitedQuirksMode);
    return;
  }
上面的systemId就是”http://www.w3.org/TR/html4/loose.dtd”，它不是空的，所以判断成立。而如果systemId为空，则它将是怪异模式。如果既不是怪异模式，也不是有限怪异模式，那么它就是标准模式：

 // Otherwise we are No Quirks Mode.
  setCompatibilityMode(Document::NoQuirksMode);
常用的html5的写法就是标准模式，如果连DOCType声明也没有呢？那么会默认设置为怪异模式：

void HTMLConstructionSite::setDefaultCompatibilityMode() {
  setCompatibilityMode(Document::QuirksMode);
}
这些模式有什么区别，从源码注释可窥探一二：

  // There are three possible compatibility modes:
  // Quirks - quirks mode emulates WinIE and NS4. CSS parsing is also relaxed in
  // this mode, e.g., unit types can be omitted from numbers.
  // Limited Quirks - This mode is identical to no-quirks mode except for its
  // treatment of line-height in the inline box model.
  // No Quirks - no quirks apply. Web pages will obey the specifications to the
  // letter.
大意是说，怪异模式会模拟IE，同时CSS解析会比较宽松，例如数字单位可以省略，而有限怪异模式和标准模式的唯一区别在于在于对inline元素的行高处理不一样。标准模式将会让页面遵守文档规定。

怪异模式下的input和textarea的默认盒模型将会变成border-box：



标准模式下的文档高度是实际内容的高度：



而在怪异模式下的文档高度是窗口可视域的高度：



在有限怪异模式下，div里面的图片下方不会留空白，如下图左所示；而在标准模式下div下方会留点空白，如下图右所示：

<div><img src="test.jpg" style="height:100px"></div>

这个空白是div的行高撑起来的，当把div的行高设置成0的时候，就没有下面的空白了。在怪异模和有限怪异模式下，为了计算行内子元素的最小高度，一个块级元素的行高必须被忽略。

这里的叙述虽然跟解读源码没有直接的关系（我们还没解读到CSS处理），但是很有必要提一下。

接下来我们开始正式说明DOM构建

（4）开标签处理

下一个遇到的开标签是<html>标签，处理这个标签的任务应该是实例化一个HTMLHtmlElement元素，然后把它的父元素指向document。Webkit源码里面使用了一个m_attachmentRoot的变量记录attach的根结点，初始化HTMLConstructionSite也会初始化这个变量，值为document：

HTMLConstructionSite::HTMLConstructionSite(
    Document& document)
    : m_document(&document),
      m_attachmentRoot(document)) {
}
所以html结点的父结点就是document，实际的操作过程是这样的：

void HTMLConstructionSite::insertHTMLHtmlStartTagBeforeHTML(AtomicHTMLToken* token) {
  HTMLHtmlElement* element = HTMLHtmlElement::create(*m_document);
  attachLater(m_attachmentRoot, element);
  m_openElements.pushHTMLHtmlElement(HTMLStackItem::create(element, token));
  executeQueuedTasks();
}
第二行先创建一个html结点，第三行把它加到一个任务队列里面，传递两个参数，第一个参数是父结点，第二个参数是当前结点，第五行执行队列里面的任务。代码第四行会把它压到一个栈里面，这个栈存放了未遇到闭标签的所有开标签。

第三行attachLater是如何建立一个task的：

void HTMLConstructionSite::attachLater(ContainerNode* parent,
                                       Node* child,
                                       bool selfClosing) {
  HTMLConstructionSiteTask task(HTMLConstructionSiteTask::Insert);
  task.parent = parent;
  task.child = child;
  task.selfClosing = selfClosing;
 
  // Add as a sibling of the parent if we have reached the maximum depth
  // allowed.
  if (m_openElements.stackDepth() > maximumHTMLParserDOMTreeDepth &&
      task.parent->parentNode())
    task.parent = task.parent->parentNode();
 
  queueTask(task);
}
代码逻辑比较简单，比较有趣的是发现DOM树有一个最大的深度：maximumHTMLParserDOMTreeDepth，超过这个最大深度就会把它子元素当作父无素的同级节点，这个最大值是多少呢？512：

static const unsigned maximumHTMLParserDOMTreeDepth = 512;
我们重点关注executeQueuedTasks干了些什么，它会根据task的类型执行不同的操作，由于本次是insert的，它会去执行一个插入的函数：

void ContainerNode::parserAppendChild(Node* newChild) {
  if (!checkParserAcceptChild(*newChild))
    return;
    AdoptAndAppendChild()(*this, *newChild, nullptr);
  }
  notifyNodeInserted(*newChild, ChildrenChangeSourceParser);
}
在插入里面它会先去检查父元素是否支持子元素，如果不支持，则直接返回，就像video标签不支持子元素。然后再去调具体的插入：

void ContainerNode::appendChildCommon(Node& child) {
  child.setParentOrShadowHostNode(this);
  if (m_lastChild) {
    child.setPreviousSibling(m_lastChild);
    m_lastChild->setNextSibling(&child);
  } else {
    setFirstChild(&child);
  }
  setLastChild(&child);
}
上面代码第二行，设置子元素的父结点，也就是会把html结点的父结点指向document，然后如果没有lastChild，会将这个子元素作为firstChild，由于上面已经有一个docype的子结点了，所以已经有lastChild了，因此会把这个子元素的previousSibling指向老的lastChild，老的lastChild的nexSibling指向它。最后倒数第二行再把子元素设置为当前ContainerNode（即document）的lastChild。这样就建立起了html结点的父子兄弟关系。

可以看到，借助上一次的m_lastChild建立起了兄弟关系。

这个时候你可能会有一个问题，为什么要用一个task队列存放将要插入的结点呢，而不是直接插入呢？一个原因是放到task里面方便统一处理，并且有些task可能不能立即执行，要先存起来。不过在我们这个案例里面都是存完后下一步就执行了。

当遇到head标签的token时，也是先创建一个head结点，然后再创建一个task，插到队列里面：

void HTMLConstructionSite::insertHTMLHeadElement(AtomicHTMLToken* token) {
  m_head = HTMLStackItem::create(createHTMLElement(token), token);
  attachLater(currentNode(), m_head->element());
  m_openElements.pushHTMLHeadElement(m_head);
}
attachLater传参的第一个参数为父结点，这个currentNode为开标签栈里面的最顶的元素：

ContainerNode* currentNode() const { 
    return m_openElements.topNode(); 
}
我们刚刚把html元素压了进去，则栈顶元素为html元素，所以head的父结点就为html。所以每当遇到一个开标签时，就把它压起来，下一次再遇到一个开标签时，它的父元素就是上一个开标签。

所以，初步可以看到，借助一个栈建立起了父子关系。

而当遇到一个闭标签呢？

（5）处理闭标签

当遇到一个闭标签时，会把栈里面的元素一直pop出来，直到pop到第一个和它标签名字一样的：

m_tree.openElements()->popUntilPopped(token->name());
我们第一个遇到的是闭标签是head标签，它会把开的head标签pop出来，栈里面就剩下html元素了，所以当再遇到body时，html元素就是body的父元素了。

这个是栈的一个典型应用。

以下面的html为例来研究压栈和出栈的过程：

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"></meta>
</head>
<body>
    <div>
        <p><b>hello</b></p>
        <p>demo</p>
    </div>
</body>
</html>
把push和pop打印出来是这样的：

 push "HTML" m_stackDepth = 1
 push "HEAD" m_stackDepth = 2
 pop "HEAD" m_stackDepth = 1
 push "BODY" m_stackDepth = 2
 push "DIV" m_stackDepth = 3
 push "P" m_stackDepth = 4
 push "B" m_stackDepth = 5
 pop "B" m_stackDepth = 4
 pop "P" m_stackDepth = 3
 push "P" m_stackDepth = 4
 pop "P" m_stackDepth = 3
 pop "DIV" m_stackDepth = 2
 "tagName: body  |type: EndTag    |attr:              |text: "
 "tagName: html  |type: EndTag    |attr:              |text: "
这个过程确实和上面的描述一致，遇到一个闭标签就把一次的开标签pop出来。

并且可以发现遇到body闭标签后，并不会把body给pop出来，因为如果body闭标签后面又再写了标签的话，就会自动当成body的子元素。

假设上面的b标签的闭标签忘记写了，又会发生什么：

<p><b>hello</p>
打印出来的结果是这样的：

push "P" m_stackDepth = 4
push "B" m_stackDepth = 5
"tagName: p     |type: EndTag    |attr:              |text: "
pop "B" m_stackDepth = 4
pop "P" m_stackDepth = 3
push "B" m_stackDepth = 4
push "P" m_stackDepth = 5
pop "P" m_stackDepth = 4
pop "B" m_stackDepth = 3
pop "DIV" m_stackDepth = 2
push "B" m_stackDepth = 3
同样地，在上面第3行，遇到P闭标签时，会把所有的开标签pop出来，直到遇到P标签。不同的是后续的过程中会不断地插入b标签，最后渲染的页面结构：



因为b等带有格式化的标签会特殊处理，遇到一个开标签时会它们放到一个列表里面：

 // a, b, big, code, em, font, i, nobr, s, small, strike, strong, tt, and u.
  m_activeFormattingElements.append(currentElementRecord()->stackItem());
遇到一个闭标签时，又会从这个列表里面删掉。每处理一个新标签时就会进行检查和这个列表和栈里的开标签是否对应，如果不对应则会reconstruct：重新插入一个开标签。因此b就不断地被重新插入，直到遇到下一个b的闭标签为止。

如果上面少写的是一个span，那么渲染之后的结果是正常的：



而对于文本节点是实例化了Text的对象，这里不再展开讨论。

（6）自定义标签的处理

在浏览器里面可以看到，自定义标签默认不会有任何的样式，并且它默认是一个行内元素：



初步观察它和span标签的表现是一样的：



在blink的源码里面，不认识的标签默认会被实例化成一个HTMLUnknownElement，这个类对外提供了一个create函数，这和HTMLSpanElement是一样的，只有一个create函数，并且大家都是继承于HTMLElement。并且创建span标签的时候和unknown一样，并没有做特殊处理，直接调的create。所以从本质上来说，可以把自定义的标签当作一个span看待。然后你可以再设置display: block改成块级元素之类的。

但是你可以用js定义一个自定义标签，定义它的属性等，Webkit会去读它的定义：

// "4. Let definition be the result of looking up a custom element ..." etc.
  CustomElementDefinition* definition =
      m_isParsingFragment ? nullptr
                          : lookUpCustomElementDefinition(document, token);
例如给自定义标签创建一个原生属性：

<high-school country="China">NO. 2 high school</high-school>
上面定义了一个country，为了可以直接获取这个属性：

console.log(document.getElementsByTagName("high-school")[0].country);
注册一个自定义标签：

window.customElements.define("high-school", HighSchoolElement);
这个HighSchoolElement继承于HTMLElement：

class HighSchoolElement extends HTMLElement{
    constructor(){
        super();
        this._country = null;
    }
    get country(){
        return this._country;
    }
    set country(country){
        this.setAttribute("country", _country);
    }
    static get observedAttributes() { 
        return ["country"]; 
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._country = newValue;
        this._updateRender(name, oldValue, newValue);
    }
    _updateRender(name, oldValue, newValue){
        console.log(name + " change from " + oldValue + " " + newValue);
    }
}
就可以直接取到contry这个属性，而不用通过getAttribute的函数，并且可以在属性发生变化时更新元素的渲染，改变color等。详见Custom Elements – W3C.

通过这种方式创建的，它就不是一个HTMLUnknownElement了。blink通过V8引擎把js的构造函数转化成C++的函数，实例化一个HTMLElement的对象。

最后再来看查DOM的过程

4. 查DOM过程

（1）按ID查找

在页面添加一个script：

<script>document.getElementById("text")</script>
Chrome的V8引擎把js代码层层转化，最后会调：

DocumentV8Internal::getElementByIdMethodForMainWorld(info);
而这个函数又会调TreeScope的getElementById的函数，TreeScope存储了一个m_map的哈希map，这个map以标签id字符串作为key值，Element为value值，我们可以把这个map打印出来：

Map::iterator it = m_map.begin();
while(it != m_map.end()){
    LOG(INFO) << it->key << " " << it->value->element->tagName();
    ++it;
}
html结构是这样的：

<div class="user" id="id-yin">
    <p id="id-name" class="important">yin</p>
    <p id="id-age">20</p>
    <p id="id-sex">mail</p>
</div>
打印出来的结果为：

"id-age" "P"
"id-sex" "P"
"id-name" "P"
"id-yin" "DIV"
可以看到， 这个m_map把页面所有有id的标签都存了进来。由于map的查找时间复杂度为O(1)，所以使用ID选择器可以说是最快的。

再来看一下类选择器：

（2）类选择器

js如下：

var users = document.getElementsByClassName("user"); 
users.length;
在执行第一行的时候，Webkit返回了一个ClassCollection的列表：

return new ClassCollection(rootNode, classNames);
而这个列表并不是去查DOM获取的，它只是记录了className作为标志。这与我们的认知是一致的，这种HTMLCollection的数据结构都是在使用的时候才去查DOM，所以在上面第二行去获取它的length，就会触发它的查DOM，在nodeCount这个函数里面执行：

  NodeType* currentNode = collection.traverseToFirst();
  unsigned currentIndex = 0;
  while (currentNode) {
    m_cachedList.push_back(currentNode);
    currentNode = collection.traverseForwardToOffset(
        currentIndex + 1, *currentNode, currentIndex);
  }
第一行先获取符合collection条件的第一个结点，然后不断获取下一个符合条件的结点，直到null，并把它存到一个cachedList里面，下次再获取这个collection的东西时便不用再重复查DOM，只要cached仍然是有效的：

  if (this->isCachedNodeCountValid())
    return this->cachedNodeCount();
怎么样找到有效的节点呢：

  ElementType* element = Traversal<ElementType>::firstWithin(current);
  while (element && !isMatch(*element))
    element = Traversal<ElementType>::next(*element, &current, isMatch);
  return element;
第一行先获取第一个节点，如果它没有match，则继续next，直到找到符合条件或者空为止。我们的重点在于，它是怎么遍历的，如何next获取下一个节点，核心代码：

  if (current.hasChildren())
    return current.firstChild();
  if (current == stayWithin)
    return 0;
  if (current.nextSibling())
    return current.nextSibling();
  return nextAncestorSibling(current, stayWithin);
第一行先判断当前节点有没有子元素，如果有的话返回它的第一个子元素，如果当前节点没有子元素，并且这个节点就是开始找的根元素（用document.getElement*，则为document），则说明没有下一个元素了，直接返回0/null。如果这个节点不是根元素了（例如已经到了子元素这一层），那么看它有没有相邻元素，如果有则返回下一个相邻元素，如果相邻无素也没有了，由于它是一个叶子结点（没有子元素），说明它已经到了最深的一层，并且是当前层的最后一个叶子结点，那么就返回它的父元素的下一个相邻节点，如果这个也没有了，则返回null，查找结束。可以看出这是一个深度优先的查找。

（3）querySelector

a）先来看下selector为一个id时发生了什么：

document.querySelector("#id-name");
它会调ContainerNode的querySelecotr函数：

SelectorQuery* selectorQuery = document().selectorQueryCache().add(
      selectors, document(), exceptionState);
 
return selectorQuery->queryFirst(*this);
先把输入的selector字符串序列化成一个selectorQuery，然后再queryFirst，通过打断点可以发现，它最后会调的TreeScope的getElementById：

rootNode.treeScope().getElementById(idToMatch);
b）如果selector为一个class：

document.querySelector(".user");
它会从document开始遍历：

  for (Element& element : ElementTraversal::descendantsOf(rootNode)) {
    if (element.hasClass() && element.classNames().contains(className)) {
      SelectorQueryTrait::appendElement(output, element);
      if (SelectorQueryTrait::shouldOnlyMatchFirstElement)
        return;
    }
  }
我们重点查看它是怎么遍历，即第一行的for循环。表面上看它好像把所有的元素取出来然后做个循环，其实不然，它是重载++操作符：

void operator++() { m_current = TraversalNext::next(*m_current, m_root); }
只要我们看下next是怎么操作的就可以得知它是怎么遍历，而这个next跟上面的讲解class时是调的同一个next。不一样的是match条件判断是：有className，并且className列表里面包含这个class，如上面代码第二行。

c）复杂选择器

例如写两个class：

document.querySelector(".user .important");
最终也会转成一个遍历，只是判断是否match的条件不一样：

  for (Element& element : ElementTraversal::descendantsOf(*traverseRoot)) {
    if (selectorMatches(selector, element, rootNode)) {
      SelectorQueryTrait::appendElement(output, element);
      if (SelectorQueryTrait::shouldOnlyMatchFirstElement)
        return;
    }
  }
怎么判断是否match比较复杂，这里不再展开讨论。

同时在源码可以看到，如果是怪异模式，会调一个executeSlow的查询，并且判断match条件也不一样。不过遍历是一样的。

查看源码确实是一件很费时费力的工作，但是通过一番探索，能够了解浏览器的一些内在机制，至少已经可以回答上面提出来的几个问题。同时知道了Webkit/Blink借助一个栈，结合开闭标签，一步步构建DOM树，并对DOCType的标签、自定义标签的处理有了一定的了解。最后又讨论了查DOM的几种情况，明白了查找的过程。

通过上面的分析，对页面渲染的第一步构建DOM应该会有一个基础的了解。
```

### css

#### @import和link的区别是什么？
```
href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系
若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
```

#### 请你简述一下浏览器的重排重绘
```
会触发重绘或回流/重排的操作
- 添加、删除元素(回流+重绘)
- 隐藏元素，display:none(回流+重绘)，visibility:hidden(只重绘，不回流)
- 移动元素，如改变top、left或移动元素到另外1个父元素中(重绘+回流)
- 改变浏览器大小(回流+重绘)
- 改变浏览器的字体大小(回流+重绘)
- 改变元素的padding、border、margin(回流+重绘)
- 改变浏览器的字体颜色（只重绘，不回流）
- 改变元素的背景颜色（只重绘，不回流）

优化：
- 用transform 代替 top，left ，margin-top， margin-left... 这些位移属性
- opacity 加上 transform: translateZ/3d  这个属性之后便不会发生回流和重绘了
- 不要使用 js 代码对dom 元素设置多条样式，选择用一个 className 代替之。
- 如果确实需要用 js 对 dom 设置多条样式那么可以将这个dom 先隐藏，然后再对其设置
- 不要使用table 布局，因为table 的每一个行甚至每一个单元格的样式更新都会导致整个table 重新布局
- 对于频繁变化的元素应该为其加一个 transform 属性，对于视频使用video 标签
```

#### 用flex实现左右两栏布局，左栏有一个div，右侧有两个div
```
.container{
    display: flex;
    flex-direction: row;
    width:100%;
}
.row{
    flex:1;
    display:flex;
}
.col{
    width:100%;
}  
```
```
<div class="container">
    <div class="row">
        <span class="col" style="background-color:red;">111</span>
    </div>
    <div class="row">
        <span class="col" style="background-color:yellow;">222</span>
        <span class="col" style="background-color:green;">333</span>
    </div>
</div>
```

#### 如何实现水平垂直居中？
```
- 绝对定位水平垂直居中
<div style="position: absolute;
     width: 500px;
     height: 300px;
     margin: auto;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background-color: green;">水平垂直居中</div>

- 水平垂直居中
<div style="position: relative;
     width:400px;
     height:200px;
     top: 50%;
     left: 50%;
     margin: -100px 0 0 -200px;
     background-color: red;">水平垂直居中</div>

- 水平垂直居中
<div style="position: absolute;
     width:300px;
     height:200px;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: blue;">水平垂直居中</div>

- flex 布局居中
<div style="display: flex;align-items: center;justify-content: center;">
    <div style="width: 100px;height: 100px;background-color: gray;">flex 布局</div>
  </div>
```

### 原生js

#### 如何实现es6中的const？
https://blog.csdn.net/Allan_L/article/details/85295959
```
前言

刚刚看了掘金上一篇文章《作为技术面试官，为什么把你pass了》，里面第一题就是用es5实现const，据作者反馈 这一题所有的面试者都没有回答出来，感觉挺可惜的，其实这是一道比较简单的题目，但是由于涉及到了一些Object对象属性描述符的知识，这些描述符往往用到的场景不多，所以不容易记住。
属性描述符：

对象里目前的属性描述符有两种：

数据描述符：具有值的属性
存取描述符：由getter与setter函数对描述的属性
描述符功能：

数据描述符与存取描述符皆可修改:

configurable：当前对象元素的属性描述符是否可改，是否可删除
enumerable：当前对象元素是否可枚举
唯有数据描述符可以修改：

value: 当前对象元素的值
writable：当前对象元素的值是否可修改
唯有存取描述符可以修改：

get：读取元素属性值时的操作
set：修改元素属性值时的操作
描述符可同时具有的键值：

 	configurable	enumerable	value	writable	get	set
数据描述符	Yes	Yes	Yes	Yes	No	No
存取描述符	Yes	Yes	No	No	Yes	Yes
const 实现原理

由于ES5环境没有block的概念，所以是无法百分百实现const，只能是挂载到某个对象下，要么是全局的window，要么就是自定义一个object来当容器

      var __const = function __const (data, value) {
        window.data = value // 把要定义的data挂载到window下，并赋值value
        Object.defineProperty(window, data, { // 利用Object.defineProperty的能力劫持当前对象，并修改其属性描述符
          enumerable: false,
          configurable: false,
          get: function () {
            return value
          },
          set: function (data) {
            if (data !== value) { // 当要对当前属性进行赋值时，则抛出错误！
              throw new TypeError('Assignment to constant variable.')
            } else {
              return value
            }
          }
        })
      }
      __const('a', 10)
      console.log(a)
      delete a
      console.log(a)
      for (let item in window) { // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
        if (item === 'a') { // 因为不可枚举，所以不执行
          console.log(window[item])
        }
      }
      a = 20 // 报错
复制代码
题外话

Vue目前双向绑定的核心实现思路就是利用Object.defineProperty对get跟set进行劫持，监听用户对属性进行调用以及赋值时的具体情况，从而实现的双向绑定~~
```

### 实现一个方法，随机打乱一个数组
```
    function shuffle_simple(arr){
        return arr.sort(()=>Math.random()- .5)
    }
```
或
```
    function fisher_yates_shuffle(arr){
        for(let i=0;i<arr.length-1;i++){
            const j=i+Math.floor(Math.random()*(arr.length-1));
            [arr[i],[arr[j]]]=[arr[j],arr[i]]
        }
        return arr
    }
```
或
```
    function shuffle(arr){
        const m=[];
        const N=arr.length*arr.length*arr.length;
        for(let i=0;i<arr.length-1;i++){
            m[i]=Math.floor(Math.random(1,N))
        }
        return arr.sort((i,j)=>m[i]-m[j])
    }
```

#### 请简述一下原型和原型链
```
什么是原型链：只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被称为原型链
所有的实例有一个内部指针(prototype)，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。
```

#### 如何判断类型为数组？
```
Object.prototype.toString.call()
```

#### 请简述一下深拷贝和浅拷贝
```
    function clone(obj){
        let newObj={};
        for(let key in obj){
            newObj[key]=obj[key];
        }
        return newObj;
    }
```
简版：
```
    function clone(obj){
        if(obj===null){
            return null
        };
        if({}.toString.call(obj)==='[object Array]'){
            let newArr=[];
            newArr=obj.slice();
            return newArr;
        };
        let newObj={};
        for(let key in obj){
            if(typeof obj[key]!=='object'){
                newObj[key]=obj[key];
            }else{
                newObj[key]=clone(obj[key]);
            }
        }
    }
```
完整版：
```
    const clone = parent => {
        const isType = (obj, type) => {
            if (typeof obj !== "object") return false;
            const typeString = Object.prototype.toString.call(obj);
            let flag;
            switch (type) {
                case "Array":
                    flag = typeString === "[object Array]";
                    break;
                case "Date":
                    flag = typeString === "[object Date]";
                    break;
                case "RegExp":
                    flag = typeString === "[object RegExp]";
                    break;
                default:
                    flag = false;
            }
            return flag;
        };

        const getRegExp = re => {
            var flags = "";
            if (re.global) flags += "g";
            if (re.ignoreCase) flags += "i";
            if (re.multiline) flags += "m";
            return flags;
        };

        const parents = [];
        const children = [];

        const _clone = parent => {
            if (parent === null) return null;
            if (typeof parent !== "object") return parent;

            let child, proto;

            if (isType(parent, "Array")) {
                child = [];
            } else if (isType(parent, "RegExp")) {
                child = new RegExp(parent.source, getRegExp(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (isType(parent, "Date")) {
                child = new Date(parent.getTime());
            } else {
                proto = Object.getPrototypeOf(parent);
                child = Object.create(proto);
            }

            const index = parents.indexOf(parent);

            if (index != -1) {
                return children[index];
            }
            parents.push(parent);
            children.push(child);

            for (let i in parent) {
                child[i] = _clone(parent[i]);
            }
            return child;
        };

        return _clone(parent);
    };
```

#### call、bind和apply的区别
```
1、call,apply和bind的区别
它们在功能上是没有区别的，都是改变this的指向，它们的区别主要是在于方法的实现形式和参数传递上的不同。call和apply方法都是在调用之后立即执行的。而bind调用之后是返回原函数，需要再调用一次才行，
2、①：函数.call(对象,arg1,arg2....)
②：函数.apply(对象，[arg1,arg2,...])
③：var ss=函数.bind(对象,arg1,arg2,....)
3、总结一下call，apply，bind方法：
a：第一个参数都是指定函数内部中this的指向（函数执行时所在的作用域），然后根据指定的作用域，调用该函数。
b：都可以在函数调用时传递参数。call，bind方法需要直接传入，而apply方法需要以数组的形式传入。
c：call，apply方法是在调用之后立即执行函数，而bind方法没有立即执行，需要将函数再执行一遍。有点闭包的味道。
d：改变this对象的指向问题不仅有call，apply，bind方法，也可以使用that变量来固定this的指向。
```

#### JSON.parse(JSON.stringify)深拷贝需要注意什么？
https://segmentfault.com/a/1190000020297508
```
在js中，怎么用一行代码实现深拷贝？它可以实现： JSON.parse(JSON.stringify(obj))。
这行代码的运行过程，就是利用 JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化（还原）js对象；序列化的作用是存储和传输。（对象本身存储的是一个地址映射，如果断电，对象将不存在，所以要将对象的内容转换成字符串的形式再保存在磁盘上）
不过，这种实现深拷贝的方法有局限性，它只适用于一般数据的拷贝（对象、数组），有以下情况需要注意：

1.如果json里面有时间对象，则序列化结果：时间对象=>字符串的形式；

{
    let obj = {
        age: 18,
        date: new Date()
    };
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
    console.log(typeof obj.date); // object
    console.log(typeof objCopy.date); // string
}
clipboard.png

2.如果json里有RegExp、Error对象，则序列化的结果将只得到空对象 RegExp、Error => {}；

{
    let obj = {
        age: 18,
        reg: new RegExp('\\w+'),
        err: new Error('error message')
    };
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
}
clipboard.png

3.如果json里有 function,undefined，则序列化的结果会把 function,undefined 丢失；

{
    let obj = {
        age: 18,
        fn: function () {
            console.log('fn');
        },
        hh: undefined
    };
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
}
clipboard.png

4.如果json里有NaN、Infinity和-Infinity，则序列化的结果会变成null；

{
    let obj = {
        age: 18,
        hh: NaN,
        isInfinite: 1.7976931348623157E+10308,
        minusInfinity: -1.7976931348623157E+10308
    };
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
}
clipboard.png

5.如果json里有对象是由构造函数生成的，则序列化的结果会丢弃对象的 constructor；

{
    function Person(name) {
        this.name = name;
    }
    let obj = {
        age: 18,
        p1: new Person('lxcan')
    };
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
    console.log(obj.p1.__proto__.constructor === Person); // true
    console.log(objCopy.p1.__proto__.constructor === Object); // true
}
clipboard.png

6.如果对象中存在循环引用的情况也无法实现深拷贝

{
    let obj = {
        age: 18
    };
    obj.obj = obj;
    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
}
clipboard.png

以上，如果拷贝的对象不涉及上面的情况，可以使用 JSON.parse(JSON.stringify(obj)) 实现深拷贝。
关于js深拷贝的相关知识以及更多解决方案，可以阅读这篇文章 深拷贝的终极探索（99%的人都不知道）
```

#### 什么是json安全？
```
JSON 对值的类型和格式有严格的规定。

复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
字符串必须使用双引号表示，不能使用单引号。
对象的键名必须放在双引号里面。
数组或对象最后一个成员的后面，不能加逗号。
```

#### 请简述一下你对闭包的理解，会有什么问题？怎么解决？
```
- 闭包是函数和声明该函数的词法环境的组合。(MDN定义)
A clousure is the combination of a function and the lexical environment within which that function was declared.
注：离散数学中是对集合间关系的一种描述
- ECMAScript支持闭包，因而js中的闭包表现为：外层函数调用后，外层函数变量被内层函数对象的[[scope]]引用着而导致外层函数的作用域对象AO无法释放(垃圾回收));
- js中闭包常见作用：<1>.实现共有变量，如：函数累加器;<2>.可以做缓存(存储结构);<3>.属性私有化;<4>.模块化开发，防止污染全局变量
- js闭包的缺点：比普通函数占有更多内存(多的是外层函数作用域对象AO始终存在),容易造成内存泄漏
```

#### 请简述一下V8引擎的垃圾回收机制
https://segmentfault.com/a/1190000014383214
```
前言

我们知道，JavaScript之所以能在浏览器环境和NodeJS环境运行，都是因为有V8引擎在幕后保驾护航。从编译、内存分配、运行以及垃圾回收等整个过程，都离不开它。

在写这篇文章之前，我也在网上看了很多博客，包括一些英文原版的内容，于是想通过这篇文章来做一个归纳整理，文中加入了我自己的思考，以及纯手工制作流程图~~

希望这篇文章能帮到你，同时本文也会收录到我自己的个人网站。

为什么要有垃圾回收

在C语言和C++语言中，我们如果想要开辟一块堆内存的话，需要先计算需要内存的大小，然后自己通过malloc函数去手动分配，在用完之后，还要时刻记得用free函数去清理释放，否则这块内存就会被永久占用，造成内存泄露。

但是我们在写JavaScript的时候，却没有这个过程，因为人家已经替我们封装好了，V8引擎会根据你当前定义对象的大小去自动申请分配内存。

不需要我们去手动管理内存了，所以自然要有垃圾回收，否则的话只分配不回收，岂不是没多长时间内存就被占满了吗，导致应用崩溃。

垃圾回收的好处是不需要我们去管理内存，把更多的精力放在实现复杂应用上，但坏处也来自于此，不用管理了，就有可能在写代码的时候不注意，造成循环引用等情况，导致内存泄露。

内存结构分配

由于V8最开始就是为JavaScript在浏览器执行而打造的，不太可能遇到使用大量内存的场景，所以它可以申请的最大内存就没有设置太大，在64位系统下大约为1.4GB，在32位系统下大约为700MB。

在NodeJS环境中，我们可以通过process.memoryUsage()来查看内存分配。

clipboard.png

process.memoryUsage返回一个对象，包含了 Node 进程的内存占用信息。该对象包含四个字段，含义如下：

clipboard.png

rss（resident set size）：所有内存占用，包括指令区和堆栈

heapTotal：V8引擎可以分配的最大堆内存，包含下面的 heapUsed

heapUsed：V8引擎已经分配使用的堆内存

external： V8管理C++对象绑定到JavaScript对象上的内存
以上所有内存单位均为字节（Byte）。

如果说想要扩大Node可用的内存空间，可以使用Buffer等堆外内存内存，这里不详细说明了，大家有兴趣可以去看一些资料。

下面是Node的整体架构图，有助于大家理解上面的内容：

clipboard.png

Node Standard Library: 是我们每天都在用的标准库，如Http, Buffer 模块

Node Bindings: 是沟通JS 和 C++的桥梁，封装V8和Libuv的细节，向上层提供基础API服务

第三层是支撑 Node.js 运行的关键，由 C/C++ 实现：
1. V8 是Google开发的JavaScript引擎，提供JavaScript运行环境，可以说它就是 Node.js 的发动机
2. Libuv 是专门为Node.js开发的一个封装库，提供跨平台的异步I/O能力
3. C-ares：提供了异步处理 DNS 相关的能力
4. http_parser、OpenSSL、zlib 等：提供包括 http 解析、SSL、数据压缩等其他的能力
垃圾回收机制

如何判断是否可以回收

1.1 标记清除

当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。

可以使用任何方式来标记变量。比如，可以通过翻转某个特殊的位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生了变化。如何标记变量并不重要，关键在于采取什么策略。

（1）垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。
（2）然后，它会去掉运行环境中的变量以及被环境中变量所引用的变量的标记
（3）此后，依然有标记的变量就被视为准备删除的变量，原因是在运行环境中已经无法访问到这些变量了。
（4）最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。
目前，IE、Firefox、Opera、Chrome和Safari的JavaScript实现使用的都是标记清除式的垃圾回收策略（或类似的策略），只不过垃圾收集的时间间隔互有不同。

clipboard.png

活动对象就是上面的root，如果不清楚活动对象的可以先查一下资料，当一个对象和其关联对象不再通过引用关系被当前root引用了，这个对象就会被垃圾回收。

1.2 引用计数

引用计数的垃圾收集策略不太常见。含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。

如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量改变了引用对象，则该值引用次数减1。

当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。

这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为0的值所占用的内存。

Netscape Navigator 3.0是最早使用引用计数策略的浏览器，但很快它就遇到了一个严重的问题：循环引用。

循环引用是指对象A中包含一个指向对象B的指针，而对象B中也包含一个指向对象A的引用，看个例子：

function foo () {
    var objA = new Object();
    var objB = new Object();
    
    objA.otherObj = objB;
    objB.anotherObj = objA;
}
这个例子中，objA和objB通过各自的属性相互引用，也就是说，这两个对象的引用次数都是2。

在采用标记清除策略的实现中，由于函数执行后，这两个对象都离开了作用域，因此这种相互引用不是问题。

但在采用引用次数策略的实现中，当函数执行完毕后，objA和objB还将继续存在，因为它们的引用次数永远不会是0。

加入这个函数被重复多次调用，就会导致大量内存无法回收。为此，Netscape在Navigator 4.0中也放弃了引用计数方式，转而采用标记清除来实现其垃圾回收机制。

还要注意的是，我们大部分人时刻都在写着循环引用的代码，看下面这个例子，相信大家都这样写过：

var el = document.getElementById('#el');
el.onclick = function (event) {
    console.log('element was clicked');
}
我们为一个元素的点击事件绑定了一个匿名函数，我们通过event参数是可以拿到相应元素el的信息的。

大家想想，这是不是就是一个循环引用呢？
el有一个属性onclick引用了一个函数（其实也是个对象），函数里面的参数又引用了el，这样el的引用次数一直是2，即使当前这个页面关闭了，也无法进行垃圾回收。

如果这样的写法很多很多，就会造成内存泄露。我们可以通过在页面卸载时清除事件引用，这样就可以被回收了：

var el = document.getElementById('#el');
el.onclick = function (event) {
    console.log('element was clicked');
}

// ...
// ...

// 页面卸载时将绑定的事件清空
window.onbeforeunload = function(){
    el.onclick = null;
}
V8垃圾回收策略

自动垃圾回收有很多算法，由于不同对象的生存周期不同，所以无法只用一种回收策略来解决问题，这样效率会很低。

所以，V8采用了一种代回收的策略，将内存分为两个生代：新生代（new generation）和老生代（old generation）。

新生代中的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象，分别对新老生代采用不同的垃圾回收算法来提高效率，对象最开始都会先被分配到新生代（如果新生代内存空间不够，直接分配到老生代），新生代中的对象会在满足某些条件后，被移动到老生代，这个过程也叫晋升，后面我会详细说明。

分代内存

默认情况下，32位系统新生代内存大小为16MB，老生代内存大小为700MB，64位系统下，新生代内存大小为32MB，老生代内存大小为1.4GB。

新生代平均分成两块相等的内存空间，叫做semispace，每块内存大小8MB（32位）或16MB（64位）。

新生代

1. 分配方式

新生代存的都是生存周期短的对象，分配内存也很容易，只保存一个指向内存空间的指针，根据分配对象的大小递增指针就可以了，当存储空间快要满时，就进行一次垃圾回收。

2. 算法

新生代采用Scavenge垃圾回收算法，在算法实现时主要采用Cheney算法。

Cheney算法将内存一分为二，叫做semispace，一块处于使用状态，一块处于闲置状态。

clipboard.png

处于使用状态的semispace称为From空间，处于闲置状态的semispace称为To空间。

我画了一套详细的流程图，接下来我会结合流程图来详细说明Cheney算法是怎么工作的。
垃圾回收在下面我统称为 GC（Garbage Collection）。

step1. 在From空间中分配了3个对象A、B、C

cheney-step1

step2. GC进来判断对象B没有其他引用，可以回收，对象A和C依然为活跃对象

cheney-step1

step3. 将活跃对象A、C从From空间复制到To空间

cheney-step1

step4. 清空From空间的全部内存

cheney-step1

step5. 交换From空间和To空间

cheney-step1

step6. 在From空间中又新增了2个对象D、E

cheney-step1

step7. 下一轮GC进来发现对象D没有引用了，做标记

cheney-step1

step8. 将活跃对象A、C、E从From空间复制到To空间

cheney-step1

step9. 清空From空间全部内存

cheney-step1

step10. 继续交换From空间和To空间，开始下一轮

cheney-step1

通过上面的流程图，我们可以很清楚的看到，进行From和To交换，就是为了让活跃对象始终保持在一块semispace中，另一块semispace始终保持空闲的状态。

Scavenge由于只复制存活的对象，并且对于生命周期短的场景存活对象只占少部分，所以它在时间效率上有优异的体现。Scavenge的缺点是只能使用堆内存的一半，这是由划分空间和复制机制所决定的。

由于Scavenge是典型的牺牲空间换取时间的算法，所以无法大规模的应用到所有的垃圾回收中。但我们可以看到，Scavenge非常适合应用在新生代中，因为新生代中对象的生命周期较短，恰恰适合这个算法。

3. 晋升

当一个对象经过多次复制仍然存活时，它就会被认为是生命周期较长的对象。这种较长生命周期的对象随后会被移动到老生代中，采用新的算法进行管理。

对象从新生代移动到老生代的过程叫作晋升。

对象晋升的条件主要有两个：

对象从From空间复制到To空间时，会检查它的内存地址来判断这个对象是否已经经历过一次Scavenge回收。如果已经经历过了，会将该对象从From空间移动到老生代空间中，如果没有，则复制到To空间。总结来说，如果一个对象是第二次经历从From空间复制到To空间，那么这个对象会被移动到老生代中。
当要从From空间复制一个对象到To空间时，如果To空间已经使用了超过25%，则这个对象直接晋升到老生代中。设置25%这个阈值的原因是当这次Scavenge回收完成后，这个To空间会变为From空间，接下来的内存分配将在这个空间中进行。如果占比过高，会影响后续的内存分配。
老生代

1. 介绍

在老生代中，存活对象占较大比重，如果继续采用Scavenge算法进行管理，就会存在两个问题：

由于存活对象较多，复制存活对象的效率会很低。
采用Scavenge算法会浪费一半内存，由于老生代所占堆内存远大于新生代，所以浪费会很严重。
所以，V8在老生代中主要采用了Mark-Sweep和Mark-Compact相结合的方式进行垃圾回收。

2. Mark-Sweep

Mark-Sweep是标记清除的意思，它分为标记和清除两个阶段。

与Scavenge不同，Mark-Sweep并不会将内存分为两份，所以不存在浪费一半空间的行为。Mark-Sweep在标记阶段遍历堆内存中的所有对象，并标记活着的对象，在随后的清除阶段，只清除没有被标记的对象。

也就是说，Scavenge只复制活着的对象，而Mark-Sweep只清除死了的对象。活对象在新生代中只占较少部分，死对象在老生代中只占较少部分，这就是两种回收方式都能高效处理的原因。

我们还是通过流程图来看一下：

step1. 老生代中有对象A、B、C、D、E、F

clipboard.png

step2. GC进入标记阶段，将A、C、E标记为存活对象

clipboard.png

step3. GC进入清除阶段，回收掉死亡的B、D、F对象所占用的内存空间

clipboard.png

可以看到，Mark-Sweep最大的问题就是，在进行一次清除回收以后，内存空间会出现不连续的状态。这种内存碎片会对后续的内存分配造成问题。

如果出现需要分配一个大内存的情况，由于剩余的碎片空间不足以完成此次分配，就会提前触发垃圾回收，而这次回收是不必要的。

2. Mark-Compact

为了解决Mark-Sweep的内存碎片问题，Mark-Compact就被提出来了。

Mark-Compact是标记整理的意思，是在Mark-Sweep的基础上演变而来的。Mark-Compact在标记完存活对象以后，会将活着的对象向内存空间的一端移动，移动完成后，直接清理掉边界外的所有内存。如下图所示：

step1. 老生代中有对象A、B、C、D、E、F（和Mark—Sweep一样）

clipboard.png

step2. GC进入标记阶段，将A、C、E标记为存活对象（和Mark—Sweep一样）

clipboard.png

step3. GC进入整理阶段，将所有存活对象向内存空间的一侧移动，灰色部分为移动后空出来的空间

clipboard.png

step4. GC进入清除阶段，将边界另一侧的内存一次性全部回收

clipboard.png

3. 两者结合

在V8的回收策略中，Mark-Sweep和Mark-Conpact两者是结合使用的。

由于Mark-Conpact需要移动对象，所以它的执行速度不可能很快，在取舍上，V8主要使用Mark-Sweep，在空间不足以对从新生代中晋升过来的对象进行分配时，才使用Mark-Compact。

总结

V8的垃圾回收机制分为新生代和老生代。

新生代主要使用Scavenge进行管理，主要实现是Cheney算法，将内存平均分为两块，使用空间叫From，闲置空间叫To，新对象都先分配到From空间中，在空间快要占满时将存活对象复制到To空间中，然后清空From的内存空间，此时，调换From空间和To空间，继续进行内存分配，当满足那两个条件时对象会从新生代晋升到老生代。

老生代主要采用Mark-Sweep和Mark-Compact算法，一个是标记清除，一个是标记整理。两者不同的地方是，Mark-Sweep在垃圾回收后会产生碎片内存，而Mark-Compact在清除前会进行一步整理，将存活对象向一侧移动，随后清空边界的另一侧内存，这样空闲的内存都是连续的，但是带来的问题就是速度会慢一些。在V8中，老生代是Mark-Sweep和Mark-Compact两者共同进行管理的。
```

#### 会产生内存泄漏的操作有哪些？
https://www.jianshu.com/p/763ba9562864
```
1.背景介绍

                                 什么是内存泄漏

内存泄漏是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。在C++中，因为是手动管理内存，内存泄漏是经常出现的事情。而现在流行的C#和Java等语言采用了自动垃圾回收方法管理内存，正常使用的情况下几乎不会发生内存泄漏。浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有bug，因此会产生内存泄漏。



2.知识剖析

    2.1、js的回收机制

垃圾回收机制—GC

Javascript具有自动垃圾回收机制(GC:Garbage Collecation)，也就是说，执行环境会负责管理代码执行过程中使用的内存。

JavaScript垃圾回收的机制很简单：找出不再使用的变量，然后释放掉其占用的内存，但是这个过程不是实时的，因为其开销比较大，所以垃圾回收系统（GC）会按照固定的时间间隔,周期性的执行。

到底哪个变量是没有用的？所以垃圾收集器必须跟踪到底哪个变量没用，对于不再有用的变量打上标记，以备将来收回其内存。用于标记的无用变量的策略可能因实现而有所区别，通常情况下有两种实现方式：标记清除和引用计数。引用计数不太常用，标记清除较为常用。



    2.2、标记清除

js中最常用的垃圾回收方式就是标记清除。当变量进入环境时，例如，在函数中声明一个变量，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。






2.3、引用计数

引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值（function object array）赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减1。当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾回收器下次再运行时，它就会释放那些引用次数为0的值所占用的内存。






3.常见问题

JS哪些操作会造成内存泄漏？



4.解决方案

    虽然JavaScript 会自动垃圾收集，但是如果我们的代码写法不当，会让变量一直处于“进入环境”的状态，无法被回收。下面列一下内存泄漏常见的几种情况。



    4.1、意外的全局变量引起的内存泄漏


你可以通过加上 'use strict' 启用严格模式来避免这类问题, 严格模式会阻止你创建意外的全局变量.


4.2、闭包引起的内存泄漏


闭包可以维持函数内局部变量，使其得不到释放。 上例定义事件回调时，由于是函数内定义函数，并且内部函数--事件回调的引用外暴了，形成了闭包 解决之道，将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用








4.3、没有清理的DOM元素引用


虽然我们用removeChild移除了button, 但是还在elements对象里保存着#button的引用，换言之, DOM元素还在内存里面


4.4、被遗忘的定时器或者回调


这样的代码很常见, 如果 id 为 Node 的元素从 DOM 中移除, 该定时器仍会存在, 同时, 因为回调函数中包含对 someResource 的引用, 定时器外面的 someResource 也不会被释放.
4.5、子元素存在引用引起的内存泄漏




黄色是指直接被 js变量所引用，在内存里，红色是指间接被 js变量所引用，如上图，refB 被 refA 间接引用，导致即使 refB 变量被清空，也是不会被回收的子元素 refB 由于 parentNode 的间接引用，只要它不被删除，它所有的父元素（图中红色部分）都不会被删除。


5.扩展思考

IE7/8引用计数使用循环引用产生的问题。




fn()执行完毕后，两个对象都已经离开环境，在标记清除方式下是没有问题的，但是在引用计数策略下，因为a和b的引用次数不为0，所以不会被垃圾回收器回收内存，如果fn函数被大量调用，就会造成内存泄漏。在IE7与IE8上，内存直线上升。

IE中有一部分对象并不是原生js对象。例如，其内存泄漏DOM和BOM中的对象就是使用C++以COM对象的形式实现的，而COM对象的垃圾回收机制采用的就是引用计数策略。因此，即使IE的js引擎采用标记清除策略来实现，但js访问的COM对象依然是基于引用计数策略的。换句话说，只要在IE中涉及COM对象，就会存在循环引用的问题。




上面的例子在一个DOM元素（element)与一个原生js对象（myObject)之间创建了循环引用。其中，变量myObject有一个名为e的属性指向element对象；而变量element也有一个属性名为o回指myObject。由于存在这个循环引用，即使例子中的DOM从页面中移除，它也永远不会被回收。




看上面的例子，有人会觉得太弱了，谁会做这样无聊的事情，但是其实我们经常会这样做


这段代码看起来没什么问题，但是obj引用了document.getElementById(“element”)，而document.getElementById(“element”)的onclick方法会引用外部环境中的变量，自然也包括obj，是不是很隐蔽啊。


最简单的解决方式就是自己手工解除循环引用，比如刚才的函数可以这样




将变量设置为null意味着切断变量与它此前引用的值之间的连接。当垃圾回收器下次运行时，就会删除这些值并回收它们占用的内存。 要注意的是，IE9+并不存在循环引用导致Dom内存泄漏问题，可能是微软做了优化，或者Dom的回收方式已经改变


6.参考文献

javascript的垃圾回收机制与内存管理

js内存泄漏常见的四种情况



7.更多讨论

    7.1、如何分析JS内存使用情况

Google Chrome浏览器提供了非常强大的JS调试工具，Memory 视图

profiles 视图让你可以对 JavaScript 代码运行时的内存进行快照，并且可以比较这些内存快照。它还让你可以记录一段时间内的内存分配情况。在每一个结果视图中都可以展示不同类型的列表，但是对我们最有用的是 summary 列表和 comparison 列表。

summary 视图提供了不同类型的分配对象以及它们的合计大小：shallow size （一个特定类型的所有对象的总和）和 retained size （shallow size 加上保留此对象的其它对象的大小）。distance 显示了对象到达 GC 根（校者注：最初引用的那块内存，具体内容可自行搜索该术语）的最短距离。 comparison 视图提供了同样的信息但是允许对比不同的快照。这对于找到泄漏很有帮助。

    7.2、Chrome开发者工具初窥-Profiles面板

    7.3、你能想哪些避免内存泄漏的姿势

1.减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收

2.注意程序逻辑，避免“死循环”之类的

3.避免创建过多的对象

原则：不用了的东西要及时归还。
```

#### web端H5页面如何和ios端和android端交互？如何处理返回回来的回调函数？
https://blog.csdn.net/zgd826237710/article/details/95518433
```
这里写自定义目录标题

一、写在前面
二、H5 端代码
1、初始化 `WebViewJavascriptBridge`
2、注册与原生交互的事件函数
3、调用原生注册的事件函数
三、IOS 端代码
1、引入 WebViewJavascriptBridge
直接使用方式
Cocopad 使用方式
2、初始化 WebViewJavascriptBridge
3、注册与 H5 端交互的事件函数
4、调用 H5 端事件函数
四、Android 端代码
1、引入 BridgeWebView
2、初始化 BridgeWebView
在 `activity_main.xml` 文件中添加布局
在 MainActivity 中初始化 BridgeWebView
3、注册与 H5 交互的事件函数
4、调用 H5 端事件函数
5、添加网络权限
五、参考链接
六、Demo 地址
**[jsbridge-example](https://github.com/beichensky/jsbridge-example)**
本文详细讲述了如何使用 JSBridge 在 H5 和原生 Android、IOS之间进行交互。IOS 端包含 OC 和 Swift 的版本，Android 端包含 Java 和 Kotlin 版本。

一、写在前面

本文主要是通过代码讲述了如何使用 JSBridge 在 H5 和 原生之间进行通信。文中包含 H5、IOS、Android 三部分的代码。
IOS 中使用 OC 和 Swift 分别进行了代码实现。Android 中使用 Java 和 Kotlin 分别进行了代码实现。

Demo 地址：jsbridge-example

JSBridgeH5：H5 端代码实现
JSBridgeIOSOC：原生 IOS 端 OC 代码实现
JSBridgeIOSSwift：原生 IOS 端 Swift 代码实现
JSBridgeAndroidJava：原生 Android 端 Java 代码实现
JSBridgeAndroidKotlin：原生 IOS 端 Kotlin 代码实现
本文没有讲解关于原理的部分，只是详细使用代码介绍了 JSBridge 的使用。想要了解原理的朋友，可以另行搜索关于原理的博客。

二、H5 端代码

初始化 WebViewJavascriptBridge，方式代码如下
注册供原生调用的事件函数：
window.setupWebViewJavascriptBridge(bridge => bridge.registerHandler('fnName', function) )
调用原生事件函数：
window.setupWebViewJavascriptBridge(bridge => bridge.callHandler('fnName', data, callback) )
1、初始化 WebViewJavascriptBridge

在项目入口文件或者根 js 文件下，添加以下代码：


// 这里根据移动端原生的 userAgent 来判断当前是 Android 还是 ios
const u = navigator.userAgent;
// Android终端
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// IOS 终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

/**
 * 配合 IOS 使用时的初始化方法
 */
const iosFunction = (callback) => {
    if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function(){
         document.documentElement.removeChild(WVJBIframe);
    }, 0);
}

/**
 * 配合 Android 使用时的初始化方法
 */
const androidFunction = (callback) => {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(window.WebViewJavascriptBridge);
        }, false)
    }
}

window.setupWebViewJavascriptBridge = isAndroid ? androidFunction : iosFunction;

isAndroid && window.setupWebViewJavascriptBridge(function (bridge) {
    // 注册 H5 界面的默认接收函数（与安卓交互时，安卓端可以不调用函数名，直接 send 数据过来，就能够在这里接收到数据）
    bridge.init(function (msg, responseCallback) {
        console.log(msg);
        responseCallback("JS 返回给原生的消息内容");
    })
});
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
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
2、注册与原生交互的事件函数

/*
    window.setupWebViewJavascriptBridge(bridge => {
        bridge.registerHandler('事件函数名',fun 执行函数);
    })
*/
window.setupWebViewJavascriptBridge(bridge => {
    /**
     * data：原生传过来的数据
     * fn: 原生传过来的回调函数
     */
    bridge.registerHandler("H5Function", (data, fn) => {
        console.log(data);
        fn && fn();
    });
});
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
13
14
15
3、调用原生注册的事件函数

调用原生注册的时间函数时使用如下的代码：

/*
    window.setupWebViewJavascriptBridge(bridge => {
        bridge.callHandler('安卓端函数名', "传给原生端的数据", callback 回调函数);
    })
*/
window.setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler('changeData', data, (result) => {
        console.log(result);
    });
})
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
三、IOS 端代码

初始化 WebViewJavascriptBridge:

+ (instancetype)bridgeForWebView:(id)webView;
+ (instancetype)bridge:(id)webView;
1
2
注册与 H5 端交互的事件函数：
- (void)registerHandler:(NSString*)handlerName handler:(WVJBHandler)handler;

调用 H5 端事件函数：

- (void)callHandler:(NSString*)handlerName;
- (void)callHandler:(NSString*)handlerName data:(id)data;
- (void)callHandler:(NSString*)handlerName data:(id)data responseCallback:(WVJBResponseCallback)responseCallback;
1
2
3
1、引入 WebViewJavascriptBridge

直接使用方式

下载 WebViewJavascriptBridge

找到 WebViewJavascriptBridge文件夹，直接拖入到 XCode 项目中，在提示的弹窗中选择 Copy items if needed 和 Create groups，如下图：


在 ViewController.h 头文件中引入 #import "WebViewJavascriptBridge.h" 即可

Cocopad 使用方式

如必须使用这种方式请自行 Google。

2、初始化 WebViewJavascriptBridge

// 启用 WebViewJavascriptBridge Log
[WebViewJavascriptBridge enableLogging];

// 初始化 WKWebViewConfiguration 对象
self.webConfig = [[WKWebViewConfiguration alloc] init];
// 设置偏好设置
_webConfig.preferences = [[WKPreferences alloc] init];
// 默认为0
_webConfig.preferences.minimumFontSize = 10;
// 默认认为YES
_webConfig.preferences.javaScriptEnabled = YES;
// 在iOS上默认为NO，表示不能自动通过窗口打开
_webConfig.preferences.javaScriptCanOpenWindowsAutomatically = NO;

// TODO: 请替换成页面的 url 地址
NSString *URLSTR = @"http://xxx.xxx.xxx.xx:xxxx";
self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:_webConfig];
// 设置 UserAgent 后缀
_webView.customUserAgent = [NSString stringWithFormat:self.webView.customUserAgent, @"app"];
_webView.UIDelegate = self;
_webView.navigationDelegate = self;
NSURL *url = [NSURL URLWithString:URLSTR];
NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
[_webView loadRequest:urlRequest];
[self.view addSubview:_webView];

self.bridge = [WebViewJavascriptBridge bridgeForWebView:self.webView];
[_bridge setWebViewDelegate:self];
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
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
3、注册与 H5 端交互的事件函数

// 例：注册修改 User 名称的 changeUser 函数
[self.bridge registerHandler:@"changeUser" handler:^(id data, WVJBResponseCallback responseCallback) {
    // 在这里处理逻辑
    NSLog(@"JS 传过来的数据%@", data);
    if (responseCallback) {
        // 执行回调函数
        responseCallback(@"返回给 JS 的数据");
    }
}];
1
2
3
4
5
6
7
8
9
4、调用 H5 端事件函数

// 调用 H5 界面的 changeName 事件函数
[self.bridge callHandler:@"changeName" data:name responseCallback:^(id responseData) {
    NSLog(@"JS 调用 OC 回调函数返回的值：%@", responseData);
}];
1
2
3
4
四、Android 端代码

注册与 H5 交互的事件函数：
public void registerHandler(String handlerName, BridgeHandler handler) {
    if (handler != null) {
        messageHandlers.put(handlerName, handler);
    }
}
1
2
3
4
5
调用 H5 端事件函数
public void callHandler(String handlerName, String data, CallBackFunction callBack) {
    doSend(handlerName, data, callBack);
}
1
2
3
注册与 H5 交互的默认事件，即 H5 端不调用函数名，直接使用 send 函数传递数据，安卓端也可以在这个事件中接收到数据
// 设置默认接收函数
public void setDefaultHandler(BridgeHandler handler) {
    this.defaultHandler = handler;
}
1
2
3
4
调用 H5 端注册的默认事件函数
@Override
public void send(String data, CallBackFunction responseCallback) {
    doSend(null, data, responseCallback);
}
1
2
3
4
1、引入 BridgeWebView

在项目的 build.gradle 文件中添加如下代码：
buildTypes {
    // ...
    repositories {
        // ...
        maven { url "https://jitpack.io" }
    }
}
1
2
3
4
5
6
7
添加依赖：implementation 'com.github.lzyzsd:jsbridge:1.0.4'
2、初始化 BridgeWebView

在 activity_main.xml 文件中添加布局

<com.github.lzyzsd.jsbridge.BridgeWebView
    android:id="@+id/main_wv"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
</com.github.lzyzsd.jsbridge.BridgeWebView>
1
2
3
4
5
在 MainActivity 中初始化 BridgeWebView

mWebView = findViewById(R.id.main_wv);

mWebView.getSettings().setAllowFileAccess(true);
mWebView.getSettings().setAppCacheEnabled(true);
mWebView.getSettings().setDatabaseEnabled(true);
// 开启 localStorage
mWebView.getSettings().setDomStorageEnabled(true);
// 设置支持javascript
mWebView.getSettings().setJavaScriptEnabled(true);
// 进行缩放
mWebView.getSettings().setBuiltInZoomControls(true);
// 设置UserAgent
mWebView.getSettings().setUserAgentString(mWebView.getSettings().getUserAgentString() + "app");
// 设置不用系统浏览器打开,直接显示在当前WebView
mWebView.setWebChromeClient(new WebChromeClient());
mWebView.setWebViewClient(new MyWebViewClient(mWebView));

mWebView.loadUrl(URL);
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
13
14
15
16
17
18
3、注册与 H5 交互的事件函数

// 默认事件函数
mWebView.setDefaultHandler(new BridgeHandler() {
    @Override
    public void handler(String data, CallBackFunction function) {
        Toast.makeText(MainActivity.this, data, Toast.LENGTH_LONG).show();
        function.onCallBack("安卓返回给 JS 的消息内容");
    }
});

// 普通事件函数
mWebView.registerHandler("reloadUrl", new BridgeHandler() {

    @Override
    public void handler(String data, CallBackFunction function) {
        mWebView.reload();
        Toast.makeText(MainActivity.this, "刷新成功~", Toast.LENGTH_SHORT).show();
        function.onCallBack("");
    }
});
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
13
14
15
16
17
18
19
4、调用 H5 端事件函数

// 调用 H5 端默认事件函数
mWebView.send("安卓传递给 JS 的消息", new CallBackFunction() {
    @Override
    public void onCallBack(String data) {
        Toast.makeText(MainActivity.this, data, Toast.LENGTH_LONG).show();
    }
});

// 调用 H5 端普通事件函数
mWebView.callHandler("changeName", mEditName.getText().toString(), new CallBackFunction() {
    @Override
    public void onCallBack(String data) {
        Toast.makeText(MainActivity.this, "name 修改成功", Toast.LENGTH_SHORT).show();
        mEditName.setText("");
    }
});
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
13
14
15
16
5、添加网络权限

这一步是必须的，否则的话， WebView 加载不出来，手机界面会提示 Webpage not available。

在 AndroidManifest.xml 清单文件中添加：

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
1
2
3
添加了权限之后，网页可能还是加载不出来，可能是因为对未加密的流量不信任，在 AndroidManifest.xml 的 application 中添加一个属性：android:usesCleartextTraffic="true"。如下：

<?xml version="1.0" encoding="utf-8"?>
<manifest ...>
    <application 
        ...
        android:usesCleartextTraffic="true">
        ...
    </application>
</manifest>
1
2
3
4
5
6
7
8
五、参考链接

JsBridge
WebViewJavascriptBridge
iOS开发-WKWebView设置cookie
iOS类似Android上toast效果
六、Demo 地址

jsbridge-example

如果有所帮助，欢迎 Star！
```

#### 浏览器存储有哪些？它们的区别是什么？
```
（1）Local Storage

（2）Session Storage

（3）IndexedDB

（4）Web SQL

（5）Cookie
```
```
- 相同点：都存储在客户端
- 不同点：
    - 存储大小：
        - cookie数据大小不能超过4k
        - sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大的多，可以达到5M或更大，就是为了解决cookie存储空间不足而诞生的
    - 有限时间：
        - localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
        - sessionStorage数据在当前浏览器窗口关闭后自动删除
        - cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
    - 数据域服务器之间的交互方式
        - cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
        - sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
```

#### 客户端可以更改cookie吗？服务器端可以更改cookie吗？
https://blog.csdn.net/qq_39207066/article/details/80970668
```
在客户端（document.cookie）添加或修改cookie
Cookie的来源

由于HTTP协议是无状态的，而服务器端的业务必须是要有状态的。Cookie诞生的最初目的是为了存储web中的状态信息，以方便服务器端使用。比如判断用户是否是第一次访问网站。目前最新的规范是RFC 6265，它是一个由浏览器服务器共同协作实现的规范。 
Cookie的处理分为：

服务器像客户端发送cookie
浏览器将cookie保存
之后每次http请求浏览器都会将cookie发送给服务器端
服务器端的发送与解析

发送cookie

服务器端像客户端发送Cookie是通过HTTP响应报文实现的，在Set-Cookie中设置需要像客户端发送的cookie，cookie格式如下：

Set-Cookie: “name=value;domain=.domain.com;path=/;expires=Sat, 11 Jun 2016 11:29:42 GMT;HttpOnly;secure”

其中name=value是必选项，其它都是可选项。Cookie的主要构成如下：

name:一个唯一确定的cookie名称。通常来讲cookie的名称是不区分大小写的。
value:存储在cookie中的字符串值。最好为cookie的name和value进行url编码
domain:cookie对于哪个域是有效的。所有向该域发送的请求中都会包含这个cookie信息。这个值可以包含子域(如：yq.aliyun.com)，也可以不包含它(如：.aliyun.com，则对于aliyun.com的所有子域都有效).
path: 表示这个cookie影响到的路径，浏览器跟会根据这项配置，像指定域中匹配的路径发送cookie。
expires:失效时间，表示cookie何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个cookie)。如果不设置这个时间戳，浏览器会在页面关闭时即将删除所有cookie；不过也可以自己设置删除时间。这个值是GMT时间格式，如果客户端和服务器端时间不一致，使用expires就会存在偏差。
max-age: 与expires作用相同，用来告诉浏览器此cookie多久过期（单位是秒），而不是一个固定的时间点。正常情况下，max-age的优先级高于expires。
HttpOnly: 告知浏览器不允许通过脚本document.cookie去更改这个值，同样这个值在document.cookie中也不可见。但在http请求张仍然会携带这个cookie。注意这个值虽然在脚本中不可获取，但仍然在浏览器安装目录中以文件形式存在。这项设置通常在服务器端设置。
secure: 安全标志，指定后，只有在使用SSL链接时候才能发送到服务器，如果是http链接则不会传递该信息。就算设置了secure 属性也并不代表他人不能看到你机器本地保存的 cookie 信息，所以不要把重要信息放cookie就对了
1
2
3
4
5
6
7
8
9
服务器端设置cookie示例

var http = require('http');
var fs = require('fs');
 
http.createServer(function(req, res) {
    res.setHeader('status', '200 OK');
    res.setHeader('Set-Cookie', 'isVisit=true;domain=.yourdomain.com;path=/;max-age=1000');
    res.write('Hello World');
    res.end();
}).listen(8888);
 
console.log('running localhost:8888')
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
这里写图片描述 
这里写图片描述 
直接设置Set-Cookie过于原始，我们可以对cookie的设置过程做如下封装：

var serilize = function(name, val, options) {
    if (!name) {
        throw new Error("coolie must have name");
    }
    var enc = encodeURIComponent;
    var parts = [];
 
    val = (val !== null && val !== undefined) ? val.toString() : "";
    options = options || {};
    parts.push(enc(name) + "=" + enc(val));
    // domain中必须包含两个点号
    if (options.domain) {
        parts.push("domain=" + options.domain);
    }
    if (options.path) {
        parts.push("path=" + options.path);
    }
    // 如果不设置expires和max-age浏览器会在页面关闭时清空cookie
    if (options.expires) {
        parts.push("expires=" + options.expires.toGMTString());
    }
    if (options.maxAge && typeof options.maxAge === "number") {
        parts.push("max-age=" + options.maxAge);
    }
    if (options.httpOnly) {
        parts.push("HTTPOnly");
    }
    if (options.secure) {
        parts.push("secure");
    }
 
    return parts.join(";");
}
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
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
需要注意的是，如果给cookie设置一个过去的时间，浏览器会立即删除该cookie；此外domain项必须有两个点，因此不能设置为localhost:

something that wasn’t made clear to me here and totally confused me for a while was that domain names must contain at least two dots (.),hence ‘localhost’ is invalid and the browser will refuse to set the cookie!

服务器端解析cookie

cookie可以设置不同的域与路径，所以对于同一个name value，在不同域不同路径下是可以重复的，浏览器会按照与当前请求url或页面地址最佳匹配的顺序来排定先后顺序 
这里写图片描述
所以当前端传递到服务器端的cookie有多个重复name value时，我们只需要最匹配的那个，也就是第一个。服务器端解析代码如下：

var parse = function(cstr) {
    if (!cstr) {
        return null;
    }
 
    var dec = decodeURIComponent;
    var cookies = {};
    var parts = cstr.split(/\s*;\s*/g);
    parts.forEach(function(p){
        var pos = p.indexOf('=');
        // name 与value存入cookie之前，必须经过编码
        var name = pos > -1 ? dec(p.substr(0, pos)) : p;
        var val = pos > -1 ? dec(p.substr(pos + 1)) : null;
        //只需要拿到最匹配的那个
        if (!cookies.hasOwnProperty(name)) {
            cookies[name] = val;
        }/* else if (!cookies[name] instanceof Array) {
            cookies[name] = [cookies[name]].push(val);
        } else {
            cookies[name].push(val);
        }*/
    });
 
    return cookies;
}
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
13
14
15
16
17
18
19
20
21
22
23
24
25
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
13
14
15
16
17
18
19
20
21
22
23
24
25


前后端跨域发送cookie的问题

1.jquery ajax

$.ajax({

url: '自己要请求的url',
method:'请求方式',  //GET POST PUT DELETE
xhrFields:{withCredentials:true},
success:function(data){
   //自定义请求成功做什么
},
error:function(){
//自定义请求失败做什么
}
})

 2.angular.js

$http.get(url, {withCredentials: true});
$http.post(url,data, {withCredentials: true});
后台：java spring
response().setHeader("Access-Control-Allow-Credentials", "true");
response().setHeader("Access-Control-Allow-Origin", "login.com");
注意，这里login.com 不能设置为 * 来允许全部，如果在 Credentials 是true 的情况下。因为浏览器会报错如下：
A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the credentials flag is true. Origin 'http://10.0.0.3:18080' is therefore not allowed access

 所以要设置成客户端页面的 域名。

3.vue-cli可以通过配置代理来解决跨域的问题：

proxyTable: {
  '/list': {
    target: 'http://api.xxxxxxxx.com',
    changeOrigin: true,
    pathRewrite: {
      '^/list': '/list'
    }
  }
}
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
具体可以看这篇文章：Vue-cli proxyTable 解决开发环境的跨域问题

假如不用代理，那需要怎样设置呢？

最简单的方法是服务端将响就头设置成Access-Control-Allow-Origin：域名，如果客户端发送请求时，不需要携带cookie等信息，可以设置成Access-Control-Allow-Origin：*，表示任何域都可以向服务端发送请求，客户端不需要任何配置，就可以进行跨域调试了。

但是一般的网站，都需要向后端发送cookie来进行身份验证，此时，服务器还需向响应头设置Access-Control-Allow-Credentials:true，表示跨域时，允许cookie添加到请求中。设置Access-Control-Allow-Credentials:true后，要将Access-Control-Allow-Origin指定到具体的域，否则cookie不会带到客户端，例如设置成Access-Control-Allow-Origin：http://192.168.0.1:8088,http://192.168.0.1:8088是前端服务器的域名，这就要求用webpack的时候，要指定具体的域来启动，不要直接用localhost。

要向后端发送cookie，前端也需要有相应的配置。我在项目中，引用了fetch的polyfill,直接用fetch来发送ajax请求，需要将credentials设置成include，表示允许跨越传递cookie，不要将credentials设置成same-origin,如果设置成same-origin，只会在同源的时候发送cookie。另外还要将withCredentials设为true。

客户端的存取

浏览器将后台传递过来的cookie进行管理，并且允许开发者在JavaScript中使用document.cookie来存取cookie。但是这个接口使用起来非常蹩脚。它会因为使用它的方式不同而表现出不同的行为。

当用来获取属性值时，document.cookie返回当前页面可用的（根据cookie的域、路径、失效时间和安全设置）所有的字符串，字符串的格式如下：

“name1=value1;name2=value2;name3=value3”;

当用来设置值的时候，document.cookie属性可设置为一个新的cookie字符串。这个字符串会被解释并添加到现有的cookie集合中。如：

document.cookie = "_fa=aaaffffasdsf;domain=.dojotoolkit.org;path=/"
1
2
设置document.cookie并不会覆盖cookie，除非设置的name value domain path都与一个已存在cookie重复。

由于cookie的读写非常不方便，我们可以自己封装一些函数来处理cookie，主要是针对cookie的添加、修改、删除。

var cookieUtils = {
        get: function(name){
          var cookieName=encodeURIComponent(name) + "=";
          //只取得最匹配的name，value
          var cookieStart = document.cookie.indexOf(cookieName);
          var cookieValue = null;
 
          if (cookieStart > -1) {
            // 从cookieStart算起
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            //从=后面开始
            if (cookieEnd > -1) {
              cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            } else {
              cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, document.cookie.length));
            }
          }
 
          return cookieValue;
        },
 
        set: function(name, val, options) {
            if (!name) {
                throw new Error("coolie must have name");
            }
            var enc = encodeURIComponent;
            var parts = [];
 
            val = (val !== null && val !== undefined) ? val.toString() : "";
            options = options || {};
            parts.push(enc(name) + "=" + enc(val));
            // domain中必须包含两个点号
            if (options.domain) {
                parts.push("domain=" + options.domain);
            }
            if (options.path) {
                parts.push("path=" + options.path);
            }
            // 如果不设置expires和max-age浏览器会在页面关闭时清空cookie
            if (options.expires) {
                parts.push("expires=" + options.expires.toGMTString());
            }
            if (options.maxAge && typeof options.maxAge === "number") {
                parts.push("max-age=" + options.maxAge);
            }
            if (options.httpOnly) {
                parts.push("HTTPOnly");
            }
            if (options.secure) {
                parts.push("secure");
            }
 
            document.cookie = parts.join(";");
        },
        delete: function(name, options) {
          options.expires = new Date(0);// 设置为过去日期
          this.set(name, null, options);
        }      }

```
https://blog.csdn.net/adley_app/article/details/80734247
```
一、为什么Cookie需要防篡改

为什么要做Cookie防篡改，一个重要原因是 Cookie中存储有判断当前登陆用户会话信息（Session）的会话票据-SessionID和一些用户信息。 当发起一个HTTP请求，HTTP请求头会带上Cookie，Cookie里面就包含有SessionID。 后端服务根据SessionID，去获取当前的会话信息。如果会话信息存在，则代表该请求的用户已经登陆。 服务器根据登陆用户的权限，返回请求的数据到浏览器端。

因为Cookie是存储在客户端，用户可以随意修改。所以，存在一定的安全隐患。

二、例子

用户wall在浏览器端输入用户名密码,发起POST请求到后端服务器。后端服务器验证合法，返回Response，并Set-Cookie为sessionid=*;username=wall;。

浏览器端在接收到HTTP响应后，发现Set-Cookie，将其存入本地内存或硬盘中。

浏览器端再次发起请求，带上Cookie信息sessionid=*;username=wall;，请求修改自己的头像信息。

服务器根据sessionid验证当前用户已登陆，根据username,查找数据库中的对应数据，修改头像信息。

如果当前用户知道username的作用，修改username=pony。再次发起请求，则服务器接收到请求后，会去修改username为pony的数据。 这样，就暴露出数据被恶意篡改的风险。

三、防篡改签名

服务器为每个Cookie项生成签名。如果用户篡改Cookie，则与签名无法对应上。以此，来判断数据是否被篡改。

原理如下：

服务端提供一个签名生成算法secret

根据方法生成签名secret(wall)=34Yult8i

将生成的签名放入对应的Cookie项username=wall|34Yult8i。其中，内容和签名用|隔开。

服务端根据接收到的内容和签名，校验内容是否被篡改。

举个栗子：

比如服务器接收到请求中的Cookie项username=pony|34Yult8i，然后使用签名生成算法secret(pony)=666。 算法得到的签名666和请求中数据的签名不一致，则证明数据被篡改。

四、敏感数据的保护 
鉴于Cookie的安全性隐患，敏感数据都应避免存储在Cookie。 应该根据SessionID，将敏感数据存储在后端。取数据时，根据SessionID去后端服务器获取即可。 另外，对一些重要的Cookie项，应该生成对应的签名，来防止被恶意篡改。
————————————————
版权声明：本文为CSDN博主「adley_app」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/adley_app/article/details/80734247
```

#### web worker有了解吗？PWA有什么弊端？
https://www.cnblogs.com/pqjwyn/p/9016901.html
```
一、传统web 应用
当前web应用在移动时代并没有达到其在桌面设备上流行的程度，下面有张图来对比与原生应用之间的差别。

究其原因，无外乎下面不可避免的几点：

移动设备网络限制-不可忽略的加载时间
web应用依赖于浏览器作为入口
体验与原生的差距
假如能解决以上的几点，对web app 来说会有多大的提升可以想象。

二、PWA是什么
PWA 全称Progressive Web Apps(渐进式Web应用程序)，旨在使用现有的web技术提供用户更优的使用体验。
基本要求

可靠（Reliable）
即使在不稳定的网络环境下，也能瞬间加载并展现
快速响应（Fast）
快速响应，并且有平滑的动画响应用户的操作
粘性(Engaging)
像设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面
PWA 本身强调渐进式，并不要求一次性达到安全、性能和体验上的所有要求，开发者可以通过 PWA Checklist 查看现有的特征。

除以上的基准要求外，还应该包括以下特性：

渐进式 - 适用于所有浏览器，因为它是以渐进式增强作为宗旨开发的
连接无关性 - 能够借助 Service Worker 在离线或者网络较差的情况下正常访问
类似应用 - 由于是在 App Shell 模型基础上开发，因为应具有 Native App 的交互和导航，给用户 Native App 的体验
持续更新 - 始终是最新的，无版本和更新问题
安全 - 通过 HTTPS 协议提供服务，防止窥探和确保内容不被篡改
可索引 - 应用清单文件和 Service Worker 可以让搜索引擎索引到，从而将其识别为『应用』
粘性 - 通过推送离线通知等，可以让用户回流
可安装 - 用户可以添加常用的 webapp 到桌面，免去去应用商店下载的麻烦
可链接 - 通过链接即可分享内容，无需下载安装
看起来有点眼花缭乱，这又是一个新的飞起的轮子吗？这里重申一下,PWA背后不是一种新的技术，而是集合当前多种web技术的一种集合。分别利用各自的功能来完成渐进式的整体需求。下面就沿着前面提出的问题分别了解一下相关技术

三、技术组成
由以下几种技术构成：

App Manifest
Service Worker
Notifications API
Push API
其中Service Worker是PWA技术的关键，它们可以让app满足上面的三基准。其他技术则是锦上添花，让app更加的强大。

3.1 service worker背景

离线缓存背景

针对网页的体验，从前到后都做了很多努力，极力去降低响应时间，这里就不表述多样的技术手段。
另一个方向的就是缓存，减少与服务器非必要的交互，不过对于离线的情况下浏览器缓存就无力了，
这样离线缓存的需求就出现了。

离线缓存的历程

web应用在离线缓存发展的过程中也不是一簇而就的，经历了逐渐完善的过程。
初期的解决方案是AppCache
然而，事实证明这是一个失败的尝试，缺陷太多，已经被废弃了。具体可以查看Application Cache is a douchebag
但是方向还是正确的，那就继续孜孜不倦的探索。

workers

持久化先放一边，来谈谈另一个问题
基于浏览器中的 javaScript 单线程的现实逐渐不能满足现代web需求的现状,例如耗时的计算，用户的交互显然会受影响。
为了将这些耗时操作从主线程中解放出来，早期W3C新增了一个Web Worker 的 API，可以脱离主线程单独执行，并且可以与主线程交互。
不过Web Worker是临时性的依赖于创建页面 ，不能满足我们持久化的需求。
冲着这个目标，下面就比较容易解决了，搞个能持久存在的就行了。
在Web Worker的基础上，W3C新增了service worker来满足我们持久化的需求。
其生命周期与页面无关，关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动
功能

Service Worker虽然满足了离线缓存来，其功能可不仅仅局限于此。 可以提供

丰富的离线体验，
周期的后台同步，
消息推送通知，
拦截和处理网络请求，
管理资源缓存
这些正好也是PWA的目的，所以说Service Worker是PWA的关键技术。

前提条件

Service Worker 出于安全性和其实现原理，在使用的时候有一定的前提条件。
由于 Service Worker 要求 HTTPS 的环境
当然一般浏览器允许调试 Service Worker 的时候 host 为 localhost 或者 127.0.0.1
Service Worker 的缓存机制是依赖 Cache API (略过)
依赖 HTML5 fetch API（略过）
依赖 Promise 实现
由上可知，不是所有的浏览器都支持的，支持情况大概如下：


iOS 内的所有的浏览器都基于 safari，所以iOS要在11.3以上
IE是放弃支持了，不过Edge好歹支持了。

3.2 Cache

Cache是Service Worker衍生出来的API，配合Service Worker实现对资源请求的缓存。
不过cache并不直接缓存字符串，而是直接缓存资源请求（css、js、html等）。
cache也是key-value形式，一般来说key就是request，value就是response

caches.open(cacheName) 打开一个cache
caches是global对象，返回一个带有cache返回值的Promise
cache.keys() 遍历cache中所有键，得到value的集合
cache.match(Request|url) 在cache中匹配传入的request，返回Promise；
cache.matchAll只有第一个参数与match不同，需要一个request的数组，当然返回的结果也是response的数组
cache.add(Request|url) 并不是单纯的add，因为传入的是request或者url，在cache.add内部会自动去调用fetch取回request的请求结果，然后才是把response存入cache；
cache.addAll类似，通常在sw install的时候用cache.addAll把所有需要缓存的文件都请求一遍
cache.put(Request, Response) 这个相当于cache.add的第二步，即fetch到response后存入cache
cache.delete(Request|url) 删除缓存
3.3 注册Service Worker

注册即声明sw文件的位置，显然应该在主js中引入。大概如下：

//基于promise
function registerServiceWorker(){
    // 注册service worker
    return navigator.serviceWorker.register('./sw1.js').then(registration => {
        console.log('注册成功');
        // 返回
        return registration;
    })
    .catch(err => {
        console.error('注册失败', err);
    });
}
window.onload = function () {
    //是否支持
    if (!('serviceWorker' in navigator)) {
        return;
    }
    registerServiceWorker()
}
3.4 生命周期

Service worker 有一个独立于web 页面的生命周期。
如果在网站上安装 serice worker ，你需要注册，注册后浏览器会在后台安装 service worker。然后进入下面的不同阶段。
激活之后，service worker 将控制所有的页面，纳入它的范围，不过第一次在页面注册 service worker 时不会控制页面，直到它再次加载。
service worker 生效之后,它会处于下面两种状态之一：

service worker 终止来节省内存，
页面发起网络请求后，它将处理请求获取和消息事件。
由上图看知，分为这么几个阶段：

Installing
发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存
Installed
Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。
Activating
在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装
Activated
在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)
Redundant
被替换，即被销毁
了解声明周期其实是为了我们在不同时间段去监听事件来完成相应操作。对PWA来说主要两个事件。

install 事件回调：
event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
self.skipWaiting()：self 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态。

activate 回调：
event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
self.clients.claim()：在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。

const CURCACHE = 'CURCACHE_test_1'
const RUNTIME = 'runtime';
const CURCACHE_URLS = [
    './',
    '/asset/sw.jpg',
    'index.js'
]
self.addEventListener('install',e=>{
    e.waitUntil(
      //存储缓存路径对应的资源
        caches.open(CURCACHE).then(cache=>{
            cache.addAll(CURCACHE_URLS)
        }).then(
            self.skipWaiting()
        )
    )
})
 
 
   
  //代理请求，使用缓存，请求发送之前
  self.addEventListener('fetch', e => {
    e.respondWith(
      //缓存是否匹配 
      caches.match(e.request).then(function(response) {
        if (response != null) {
          //命中缓存返回缓存，结束请求
          return response
        }
        //未命中缓存，正常请求
        return fetch(e.request.url)
      })
    )
  });
更新service worker
service worker 更新步骤如下：

更新 service worker 的文件
网页打开时服务器会进行对比，保持最新
新的 service worker 启动install
当前页面生效的依然是老的service worker，新的 service worker 会进入 “waiting” 状态。
页面关闭之后，老的 service worker 会被干掉，新的 servicer worker 接管页面
新的 service worker 生效后会触发 activate 事件。
const CURCACHE = 'precache_test_1'
//假设上个版本的key为precache_test_2 反正不等于CURCACHE
self.addEventListener('activate', e => {
  e.waitUntil(
      //遍历当前缓存keys
      caches.keys().then(cacheNames=>{
        return Promise.all(
          cacheNames.map(function(cacheName) {
            //是否等于当前key,保留自己
            if (cacheName !== CURCACHE) {
              return caches.delete(cacheName);
            }
          })
    )}).then(() => self.clients.claim())
 )
}) 
这样一个简单的service worker离线缓存完成了。控制台可以看到，来源是service worker


关闭网络之后再次访问，可以同样得到上面的结果，并且sw.js请求未能拿到，但是不影响，旧的文件依然在，这里证明了每次都回去对比sw文件以确保更新

到这里，离线缓存就实现了。

四、添加到主屏幕
允许将站点添加至主屏幕，是 PWA 提供的一项重要功能。这样就不用再依赖于浏览器作为平台，符合移动端的用户习惯。

manifest.json

需要 manifest.json 文件去配置应用的图标、名称等基本信息如下：

{
    //被提示安装应用时出现的文本
    "name": "PQJ-PWA",
    //添加至主屏幕后的文本
    "short_name":"PQJ",
    "description": "测试demo",
    //添加之后，启动地址
    "start_url": "/index.html",
    //图标信息
    "icons": {
      "128": "/asset/sw.jpg"
    },
    "developer": {
      "name": "pqj",
      "url": ""
    },
    "display": "standalone",
    "background_color": "#287fc5",
    "theme_color": "#fff",
    "permissions": {
        "desktop-notification": {
          "description": "Needed for creating system notifications."
        }
      }
}  
然后以如下方式在html中引入

<link rel="manifest" href="/mainfest.json" />
这样完成之后，移动端安卓使用chrome(亲测),首次访问时会提示是否允许安装到主屏幕，以应用icon的形式出现。
图片和文字即由配置决定。

五、消息通知

消息通知也是使用service worker的通知功能进行的，允许服务器想用户发生通知，而非用户主动请求才去响应某些行为。
正常的通知逻辑需要服务器来参与实现，这次展示只实现功能。

首先申请通知权限
注册service worker
处理逻辑，发送通知
function getPermission(){
    return new Promise((resolve, reject) => {
        //权限获取
        const permissionPromise = Notification.requestPermission(result => {
            resolve(result);
        });
    }).then(result => {
            //判断条件
            if (result === 'granted') {
                execute();
            }
            else {
                console.log('no permission');
            }
        });
} 
发送通知

function execute() {
    // 允许之后执行
    registerServiceWorker().then(registration => {
        // 通知
        registration.showNotification('Hello World!');
    });
}  
```
```
前言

最近在翻红宝书，看到 Web Worker 那章，猛然意识到，通过它竟然可以把几个缓存相关的概念串起来，甚是有趣，撰文记之。最后我也写了一个完整的离线应用 Demo，以供运行调试。

浏览器缓存

传统意义上的浏览器缓存，分为强缓存和协商缓存，其共同点都是通过设置 HTTP Header 实现。关于两者的异同已经被讨论得很多，我就不赘述了，附两个参考资料。

浏览器的缓存机制, By Aitter
http协商缓存VS强缓存, By wonyun
这种浏览器缓存（我称之为 Header 缓存）有两个共同的缺点：

当没有网络的时候，应用无法访问，因为 HTML 页面总得去服务器获取。
缓存不可编程，无法通过 JS 来精细地对缓存进行增删改查。
应用缓存

为了在无网络下也能访问应用，HTML5 规范中设计了应用缓存（Application Cache）这么一个新的概念。通过它，我们可以做离线应用。然而，由于这个 API 的设计有太多的缺陷，被很多人吐槽，最终被废弃。废弃的原因可以看看这些讨论：

为什么app cache没有得到大规模应用？它有哪些硬伤吗？
Application Cache is a Douchebag, By Jake Archibald
PS：我当年毕设也用到过这种技术，没想到短短几年就被废弃了，技术迭代何其之快也！

CacheStorage

为了能够精细地、可编程地控制缓存，CacheStorage 被设计出来。有了它，就可以用 JS 对缓存进行增删改查，你也可以在 Chrome 的 DevTools 里面直观地查看。对于传统的 Header 缓存，你是没法知道有哪些缓存，更加没法对缓存进行操作的。你只能被动地修改 URL 让浏览器抛弃旧的缓存，使用新的资源。

image

PS：CacheStorage 并非只有在 Service Worker 中才能用，它是一个全局性的 API，你在控制台中也可以访问到 caches 全局变量。

Web Worker

一直以来，一个网页只会有两个线程：GUI 渲染线程和 JS 引擎线程。即便你的 JS 写得再天花乱坠，也只能在一个进程里面执行。然而，JS 引擎线程和 GUI 渲染线程是互斥的，因此在 JS 执行的时候，UI 页面会被阻塞住。为了在进行高耗时 JS 运算时，UI 页面仍可用，那么就得另外开辟一个独立的 JS 线程来运行这些高耗时的 JS 代码，这就是 Web Worker。

Web Worker 有两个特点：

只能服务于新建它的页面，不同页面之间不能共享同一个 Web Worker。
当页面关闭时，该页面新建的 Web Worker 也会随之关闭，不会常驻在浏览器中。
PS：还有一个相关的概念：Shared Worker，不过这个东西比较复杂，我并未深入研究，感兴趣的读者可以了解，也可以看看 Shared Worker 跟 Service Worker 的区别。

Service Worker

终于说到本文的主角了。Service Worker 与 Web Worker 相比，相同点是：它们都是在常规的 JS 引擎线程以外开辟了新的 JS 线程。不同点主要包括以下几点：

Service Worker 不是服务于某个特定页面的，而是服务于多个页面的。（按照同源策略）
Service Worker 会常驻在浏览器中，即便注册它的页面已经关闭，Service Worker 也不会停止。本质上它是一个后台线程，只有你主动终结，或者浏览器回收，这个线程才会结束。
生命周期、可调用的 API 等等也有很大的不同。
总而言之，Service Worker 是 Web Worker 进一步发展的产物。关于如何使用 Service Worker，可以参考下面的资料。

借助Service Worker和cacheStorage缓存及离线开发, By 张鑫旭
使用Service Worker做一个PWA离线网页应用, By 会编程的银猪
【译】理解Service Worker, 作者 By Adnan Chowdhury, 译者 By 安秦
我也写了一个 Service Worker 用作离线应用的 Demo，大家可以调试观察。下面我们讨论几个 Service Worker 容易被忽略的地方，以我的 Demo 为例。

Service Worker 只是 Service Worker

一开始我以为 Service Worker 就是用来做离线应用的，后来渐渐研究才发现不是这样的。→ Service Worker 只是一个常驻在浏览器中的 JS 线程，它本身做不了什么。它能做什么，全看跟哪些 API 搭配使用。

跟 Fetch 搭配，可以从浏览器层面拦截请求，做数据 mock；
跟 Fetch 和 CacheStorage 搭配，可以做离线应用；
跟 Push 和 Notification 搭配，可以做像 Native APP 那样的消息推送，这方面可以参考 villainhr 的文章：Web 推送技术
……
假如把这些技术融合在一起，再加上 Manifest 等，就差不多成了 PWA 了。
总之，Service Worker 是一种非常关键的技术，有了它，我们能更接近浏览器底层，能做更多的事情。

The idea is that we, as browser developers, acknowledge that we are not better at web development than web developers. And as such, we shouldn't provide narrow high-level APIs that solve a particular problem using patterns we like, and instead give you access to the guts of the browser and let you do it how you want, in a way that works best for your users.
出处：https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#handling_updates

初次访问不会触发 fetch 事件

按照官方给的 Demo，Service Worker 注册的代码是放在 HTML 的最后。但是，当我尝试把 Service Worker 的注册代码提到最开头，并且 console 出时间戳，我发现一个现象：即便 Service Worker 注册成功之后再请求资源，这些资源也不会触发 fetch 请求，只有再次访问页面才会触发 fetch 事件。这是为什么呢？后来我在官方文档中找到了答案：如果你的页面加载时没有 Service Worker，那么它所依赖的其他资源请求也不会触发 fetch 事件。

The first time you load the demo, even though dog.svg is requested long after the service worker activates, it doesn't handle the request, and you still see the image of the dog. The default is consistency, if your page loads without a service worker, neither will its subresources. If you load the demo a second time (in other words, refresh the page), it'll be controlled. Both the page and the image will go through fetch events, and you'll see a cat instead.
出处：https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#activate

cache.add VS cache.put

在 install 事件中用 cache.addAll，在 fetch 事件中用 cache.put，add 和 put 有什么区别吗？→ cache.add = fetch + cache.put

The add() method of the Cache interface takes a URL, retrieves it, and adds the resulting response object to the given cache. The add() method is functionally equivalent to the following:
fetch(url).then(function(response) {
  if (!response.ok) {
    throw new TypeError('bad response status');
  }
  return cache.put(url, response);
})
出处：https://developer.mozilla.org/en-US/docs/Web/API/Cache/add

event.waitUntil 和 event.respondWith

先说 event.waitUntil

只能在 Service Worker 的 install 或者 activate 事件中使用；
看起来像是一个 callback，但是，即便你不使用它，程序也可能正常运行。如果你传递了一个 Promise 给它，那么只有当该 Promise resolved 时，Service Worker 才会完成 install；如果 Promise rejected 掉，那么整个 Service Worker 便会被废弃掉。因此，cache.addAll 里面，只要有一个资源获取失败，整个 Service Worker 便会失效。
再说 event.respondWith

只能在 Service Worker 的 fetch 事件中使用；
作用相当于一个 callback，当传入的 Promise resolved 之后，才会将对应的 response 返回给浏览器。
总之，虽然 event.waitUntil 和 event.respondWith 中的 event 都是继承于 Event 类，但是它们与常见的 event 对象差异很大，这些方法也只有在 Service Worker 的那些对应的事件中才存在。

资源的更新

以前我们用强缓存的时候，如果资源需要更新，那么我们只需要改变资源的 URL，换上新的 MD5 戳就好了。如果使用 Service Worker + CacheStorage + Fetch 做离线应用，又该如何处理资源的更新呢？

当有任何的资源（HTML、JS、Image、甚至是 sw.js 本身）需要更新时，都需要改变 sw.js。因为有了 sw.js，整个应用的入口变成了 sw.js，而非原先的 HTML。每当用户访问页面时，不管你当前是不是命中了缓存，浏览器都会请求 sw.js，然后将新旧 sw.js 进行字节对比，如果不一样，说明需要更新。因此，你能看到在 Demo 中，我们有一个 VERSION 字段，它不仅代表 sw.js 本身的版本，更代表整个应用的版本。

不要试图通过改变 sw.js 的名字（如改成 sw_v2.js）来触发浏览器的更新，因为 HTML 本身会被 sw.js 缓存，而缓存的 HTML 中永远都指向 sw.js，导致浏览器无法得知 sw_v2.js 的更新。虽然，你可以像上面提到的文章：使用Service Worker做一个PWA离线网页应用 那样，再结合其他的手段来判断 HTML 的更新状态，但是会更加复杂，官方并不推荐。

you may consider giving each version of your service worker a unique URL. Don't do this! This is usually bad practice for service workers, just update the script at its current location.
出处：https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#avoid_changing_the_url_of_your_service_worker_script

每次 sw.js 的更新，都会根据 VERSION 字段新建一个缓存空间，然后把新的资源缓存在里面。等到旧的 sw.js 所控制的网页全部关闭之后，新的 sw.js 会被激活，然后 在 activate 事件中删除旧缓存空间。这样既能保证在同时打开多个网页时更新 sw.js 不出差错，也能及时删除冗余的缓存。

双重缓存

上面我们谈到，当新的 sw.js install 的时候，会重新 fetch addAll 里面的所有资源，不管里面的资源是否需要更新，这显然违背了 Web 增量下载的原则，怎么办呢？ → 结合使用强缓存和 Service Worker，做一个双重缓存。强缓存在前， Service Worker 在后。举个例子，假如有两个强缓存 a_v1.js 和 b_v1.js，现在 a 不变，b 要改成 b_v2.js，修改 sw.js 的 addAll 和 VERSION。当新的 sw.js install 的时候，addAll 要 fetch a_v1.js ，但是浏览器发现 a_v1.js 是强缓存，所以根本不会发起网络请求，只有 b_v2.js 才会发起网络请求。具体的可以调试我的 Demo 查看现象。

关于这种方法，有两点要说明一下。

需要在 cache.addAll 中指定资源的版本号，就如同在 html 中指定那般。因为在使用 Service Worker 之后，HTML 只是加载资源的入口，判断资源是否改变的功能，已经转移到 sw.js 中了。
return cache.addAll([
    './',
    'getList',
    'img/avatar_v1.jpg',
    'js/index_v2.js',
    'js/jquery_v1.js'
]);
上面提到的文章：使用Service Worker做一个PWA离线网页应用 中也有提到这种多重缓存的做法，但是作者认为浏览器会先读取 Service Worker，没有的话才会读取强缓存，这与我的 Demo 实践结果不相符。
```

### 框架

#### Vue实现双向数据绑定的原理是什么？
```
> 实现mvvm的双向绑定，是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化。
Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化。
其中，View 变化更新 Data ，可以通过事件监听的方式来实现，所以 Vue 的数据双向绑定的工作主要是如何根据 Data 变化更新 View。

Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
```

#### Vue都有哪些生命周期函数？
```
Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。
生命周期中有多个事件钩子，如下：
- beforeCreate（创建前） 在数据观测和初始化事件还未开始
- created（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
- beforeMount（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
- mounted（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
- beforeUpdate（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- updated（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- beforeDestroy（销毁前） 在实例销毁之前调用。实例仍然完全可用。
- destroyed（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
```

### Vue 的父组件和子组件生命周期钩子函数执行顺序？
```
Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程：
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程：
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程：
父 beforeUpdate -> 父 updated

- 销毁过程：
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
```

#### 子组件如何向父组件传递数据？
https://blog.csdn.net/qq_33769914/article/details/100093661
```
方法一：使用prop和emit。

父页面

<template>
    <div>
        <child  :valueC="value1"  @getChidC="getChid"></child>   //等号右边代表当前页面要传到子页面的值。子页面用左边的变量接收。@代表函数，左边是子页面emit要用的，右边是当前页接收的子。右当前左子页面
        <button @click="changeA">点击获取子组件值</button>
    </div>
</template>
<script>
    export default{
         components: { 
               child: resolve => {
                    require(['@/components/child'], resolve)
                },
        },
        data(){
            return {
                value1:'',    
            }
        },
        methods:{
            getChid(e){
                console.log(e)
            },
    }
</script>

子页面child.vue

<template>
  <div class="children">
      父组件的值value1：{{value1}}
     <input type="text" v-model="inputValue">
     <button @click="sendToP">点击传值给父组件</button>
  </div>
</template>
<script>
    export default{
        props:['valueC'],
        data(){
            return{
                inputValue:'',
            }
        },
        methods:{
            sendToP(){
                this.$emit("getChidC",this.inputValue)
            }
        },
    }
</script> 

 

方法2.使用$parent 和$children。$children 的值是数组，而$parent是个对象

在子页面使用this.$parent能获取父组件里面的变量和函数

在父页面使用this.$children获取所有的子组件的数组形式。然后根据下标可以获取具体子页面的变量和函数.this.$children[0].messageA

父组件

<template>
    <div>
        <child :value1="value1"  @getChid="getChid"></child>
        <button @click="changeA">点击获取子组件值</button>
    </div>
</template>
<script>
    export default{
         components: { 
               child: resolve => {
                    require(['@/components/child'], resolve)
                },
        },
        data(){
            return {
                value1:'123',    
            }
        },
        methods:{
            getChid(e){
                console.log(e)
            },
            changeA(){
                console.log(this.$children[0].parentVal);
                 this.$children[0].parentVal ='this is new value';
                console.log(this.$children[0].parentVal)
            }
        },
    }
</script>

子组件

<template>
  <div class="children">
      父组件的值value1：{{parentVal}}
  </div>
</template>
<script>
    export default{

        data(){
            return{
                parentVal:'',
            }
        },
        mounted(){
            this.parentVal=this.$parent.value1
        },
    }
</script>

 方法3：ref / refs

子组件ref="child".父组件中使用refs获取子组件的内容。

父组件

<template>
    <div>
        <child :value1="value1"  @getChid="getChid" ref="child"></child>
        <button @click="changeA">点击获取子组件值</button>
    </div>
</template>
<script>
    export default{
         components: { 
               child: resolve => {
                    require(['@/components/child'], resolve)
                },
        },
        data(){
            return {
                value1:'123',    
            }
        },
        methods:{
            getChid(e){
                console.log(e)
            },
            changeA(){                
                console.log(this.$refs.child.parentVal);
                
            }
        },
    }
</script>
```

#### 如果想要强制初始化组件，应该使用Vue中的哪个命令？
https://blog.csdn.net/qq_39985511/article/details/82494257
```
前言：

       在开发过程中，有时候会遇到这么一种情况，通过动态的赋值，但是dom没有及时更新，能够获取到动态赋的值，但是无法获取到双向绑定的dom节点，这就需要我们手动进行强制刷新组件。

官网是这样说的：



可能你还不大理解，请继续往下看，下面是我的一个例子，来详细解说了这个方法的使用，



第一个打印结果



第二个打印结果

         

/************************************************************************************************************************************/

一、问题描述：父组件通过v-for渲染子组件，删除子组件数据出现异常。
<code class="language-plain"><section v-if="isrefresh" v-for="(sign,index) in signs">    
   <sign-card></sign-card>  
</section></code>  
二、问题原因：出现异常的数据不是响应式依赖，是从vuex读取的。通过测试发现，父组件删除数据，没有重新创建子组件，怀疑是子组件异常的数据是读取的缓存副本。

三、问题解决：根据v-if改变dom结构的特性，手动使子组件重新创建。

1.设置一个数据变量isrefresh=true



2.初始v-if=isrefresh



3.删除时,配合$nextTick()DOM渲染回调函数，使子组件重新创建

```

