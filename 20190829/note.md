## node

### module

#### 原生模块
> http path fs util events 编译成二进制,加载速度最快，原来模块通过名称来加载

#### 文件模块
> 在硬盘的某个位置，加载速度非常慢，文件模块通过名称或路径来加载 文件模块的后缀有三种

- 后缀名为.js的JavaScript脚本文件,需要先读入内存再运行
- 后缀名为.json的JSON文件,fs 读入内存 转化成JSON对象
- 后缀名为.node的经过编译后的二进制C/C++扩展模块文件,可以直接使用
- 一般自己写的通过路径来加载,别人写的通过名称去当前目录或全局的node_modules下面去找

#### 第三方模块
> 如果require函数只指定名称则视为从node_modules下面加载文件，这样的话你可以移动模块而不需要修改引用的模块路径；第三方模块的查询路径包括module.paths和全局目录

#### 全局目录 
> window如果在环境变量中设置了NODE_PATH变量，并将变量设置为一个有效的磁盘目录，require在本地找不到此模块时向在此目录下找这个模块。 UNIX操作系统中会从 $HOME/.node_modules $HOME/.node_libraries目录下寻找

#### 从模块外部访问模块内的成员
- 使用exports对象
- 使用module.exports导出引用类型

#### 模块对象的属性 
- module.id
- module.filename
- module.loaded
- module.parent
- module.children
- module.paths

### 包
> 在Node.js中，可以通过包来对一组具有相互依赖关系的模块进行统一管理，通过包可以把某个独立功能封装起来 每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境

### NPM
> 安装完node之后只能使用Node语言特性及核心函数，我们还需要一个系统来下载、安装和管理第三方模块
在Node里这个系统被称为Node包管理器(Node Package Manager,NPM)

#### npm提供的功能
- 公共注册服务，用户可以把自己写的包上传到服务器上
- 命令行下载工具，用户可以通过npm命令把别人写的包下载到自己电脑上，还可以管理自己模块依赖的其它模块

#### 初始化包
package.json
```npm init -y

## 下载包
全局安装 npm i http -g

/usr/local/bin/vleedesigntheory -> /usr/local/lib/node_modules/vleedesigntheory/bin/www
/usr/local/lib/node_modules/vleedesigntheory -> /Users/lihengqian/Downloads/test/20190829

可在命令行中使用 npm link，创建快捷方式 指向我的连接

"bin": {
    "vleedesigntheory": "./bin/www",
    "vlee": "./bin/www"
},
```

-本地安装
```

npm install jquery --save / -S
npm install webpack --save-dev / -D
```

默认不给--save表示安装到当前的dependcies 表示是上线和开发的时候都需要
devDependencies 开发依赖 上线的时候不需要

> 有一天把模块发布了 别人会安装你发布的模块 如果你的模块被别人安装，你的模块中的dependencies 会默认一起被下载 devDependcies不会被下载的

sudo npm cache clean --force

常见的依赖项
dependcies
devDependcies
npm install --production 可以只安装dependcies

peerDependcies 回提示安装缺少的模块 默认要求带版本
bundleDependencies npm pack
optionalDependencies

#### 版本问题
-npm使用了 1.0.0 第一位如果变了 表示不兼容老代码 大规模的更新
第二位表示增加了一些功能
第三位表示小的补丁

> npm + git 
npm version major(1) minor(2) patch(3) 更改版本 并且可以同步 git tag
^2.0.0 只要不到3都可以 不能小于2 不超过第一位
~2.1.0 不超过第二位 就可以

alpha(内部测试初版) beta(内部测试) rc

> 你们项目如何发版

#### 协议问题
http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html

#### scirpts
scripts 配置执行的脚本
1）执行命令 echo xxx
2）执行node_modules/.bin下的文件

当我执行npm run 的时候 会把当前目录下的node_modules/.bin也拷贝到当前的系统path中，所以npm run 可以执行.bin下的文件

#### npx
可以直接执行node_modules/.bin版本文件 不需再去配置scripts
如果模块不存在可以安装，安装完后还会自己销毁，避免安装全局模块
npx create-react-app project-name

#### 发布
发布包的时候 @vue/cli @vue/service 作用域包
先切换到npm官方
nrm nvm npm 
``` bash
npm install nrm -g
nrm use npm
```

#### npm命令
- (npm install)安装包
    - 打开命令行或终端，进入要安装包的目录,然后执行以下命令安装依赖的模块：
        npm install <package-name>
        npm i mime
    - 也可以安装特定的版本
        npm install <package name>@<version spec>
        npm i mime@2.1
    - 还可以使用一个版本号范围来替换点位符
        npm i mime@2.x

- 卸载包
    - npm uninstall <package name>

- 更新包
    - npm update <package name>

- 登录
    - npm login

- 发布
    - npm publish

- npx
    - 调用项目安装的模块
        npx mocha --version
    - 避免全局安装模块
        npx create-react-app my-react-app

### yarn
> Yarn 是一个依赖管理工具。它能够管理你的代码，并与全世界的开发者分享代码。 代码是通过包（有时也被称为模块）进行共享的。 在每一个包中包含了所有需要共享的代码，另外还定义了一个package.json文件，用来描述这个包。

#### yarn命令
- 初始化一个新的项目 
    - yarn init

- 添加一个依赖包
    - yarn add [package]
    - yarn add [package]@[version]
    - yarn add [package]@[tag]

- 更新一个依赖包
    - yarn upgrade [package]
    - yarn upgrade [package]@[version]
    - yarn upgrade [package]@[tag]

- 删除一个依赖包
    - yarn remove [package]

- 安装所有的依赖包
    - yarn或yarn install

### EventEmitter
> 在Node.js的用于实现各种事件处理的event模块中，定义了EventEmitter类，所以可能触发事件的对象都是一个继承自EventEmitter类的子类实例对象

- addListener(event,listener)：对指定事件绑定事件处理函数
- on(event,listener)：对指定事件绑定事件处理函数
- once(event,listener)：对指定事件指定只执行一次的事件处理函数
- removeListener(event,listener)：对指定事件解除事件处理函数
- removeAllListeners([event])：对指定事件解除所有的事件处理函数
- setMaxListeners(n)：指定事件处理函数的最大数量.n为整数值，代表最大的可指定事件处理函数的数量
- listeners(event)：获取指定事件的所有事件处理函数
- emit(event,[arg1],[arg2],[...])：手工触发指定事件

### util
```
var util = require('util');
//util.inherit();
console.log(util.inspect({name:'zfpx'}));
console.log(util.isArray([]));
console.log(util.isRegExp(/\d/));
console.log(util.isDate(new Date()));
console.log(util.isError(new Error));
```