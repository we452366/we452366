## 初始化包
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

## 版本问题
-npm使用了 1.0.0 第一位如果变了 表示不兼容老代码 大规模的更新
第二位表示增加了一些功能
第三位表示小的补丁

> npm + git 
npm version major(1) minor(2) patch(3) 更改版本 并且可以同步 git tag
^2.0.0 只要不到3都可以 不能小于2 不超过第一位
~2.1.0 不超过第二位 就可以

alpha(内部测试初版) beta(内部测试) rc

> 你们项目如何发版

## 协议问题
http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html

## scirpts
scripts 配置执行的脚本
1）执行命令 echo xxx
2）执行node_modules/.bin下的文件

当我执行npm run 的时候 会把当前目录下的node_modules/.bin也拷贝到当前的系统path中，所以npm run 可以执行.bin下的文件

## npx
可以直接执行node_modules/.bin版本文件 不需再去配置scripts
如果模块不存在可以安装，安装完后还会自己销毁，避免安装全局模块
npx create-react-app project-name

## 发布
发布包的时候 @vue/cli @vue/service 作用域包
先切换到npm官方
nrm nvm npm 
``` bash
npm install nrm -g
nrm use npm
```
