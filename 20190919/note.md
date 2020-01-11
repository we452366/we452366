## webpack

### webpack-source

#### sources

##### 初始化项目
doskey /history
mkdir webpack-source
cd webpack-source
npm init -y
cnpm i webpack webpack-cli -D
cnpm i lodash -S
npx webpack

##### 配置文件

###### src\index.js

import _ from 'lodash';
console.log(_.isArray([]));

###### webpack.config.js

const path = require('path');
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path:path.join(__dirname,'dist'),
        filename: 'bundle.js'
    }
};

##### 可执行命令

###### 直接调用
可以直接打开node_modules\webpack-cli\bin\cli.js文件
然后直接打开调试窗口，然后点击启动编译就可以了

###### 如何生成调试文件
打开工程目录，点击调试按钮，再点击小齿轮的配置按钮系统就会生成launch.json配置文件
修改好了以后直接点击F5就可以启动调试
.vscode\launch.json

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "debug webpack",
            "cwd": "${workspaceFolder}",
            "program": "${workspaceFolder}/node_modules/_webpack-cli@3.3.10@webpack-cli/bin/cli.js"
        }
    ]
}

###### webpack.cmd
webpack-source\node_modules.bin\webpack.cmd

- %~dp0是批处理文件所在的盘符:+路径(%~dp0 C:\vipdata\vipproject\webpack-source\node_modules.bin)
- SETLOCAL主要针对临时环境变量，不会影响到系统的变量环境设置，应与endlocal联用
- PATHEXT当在一个相同的目录结构下，有相同的多个主文件名，不同的文件后缀名时，系统会根据PATHEXT中的后缀名，选择其中顺序最靠前的那一个
@IF EXIST "%~dp0\node.exe" (//如果当前盘符的根目录下存在node.exe,用当前的node执行
"%~dp0\node.exe"  "%~dp0\..\_webpack@4.39.3@webpack\bin\webpack.js" %*
) ELSE (//如果当前的盘符没有node.exe
@SETLOCAL
@SET PATHEXT=%PATHEXT:;.JS;=;%
node  "%~dp0\..\_webpack@4.39.3@webpack\bin\webpack.js" %*
)

###### webpack.js

node_modules\webpack\bin\webpack.js

const path = require("path");
const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
    // eslint-disable-next-line node/no-missing-require
const pkg = require(pkgPath);
    // eslint-disable-next-line node/no-missing-require
require(path.resolve(
    path.dirname(pkgPath),
    pkg.bin[installedClis[0].binName]
));
const path = require("path");
const pkgPath = require.resolve(`webpack-cli/package.json`);
const pkg = require(pkgPath);
require(path.resolve(path.dirname(pkgPath),pkg.bin['webpack-cli']));
- npx webpack就相当于用node执行cli.js脚本
npx webpack = node ./node_modules/webpack-cli/bin/cli.js

###### 阅读思路
- 先折叠无关的分支的逻辑，只看主体流程代码
- 寻找关键路径，根据变量名和方法名猜测意图，然后通过阅读源码来验证想法
- debugger关键路径，理解整个执行过程

###### 重要文件
- Webpack 类似于一个公司
- Compiler 类似于公司的董事长，只把握战略方向
- Compilation 就像各个事业部的总监,负责各个部门的管理
- ModuleFactory 就像各个具体部门了,负责具体工作产出产品

##### 启动编译
- Compiler和Compilation都继承自Tapable
- Compiler是每个Webpack配置对应一个Compiler对象，记录着Webpack的生命周期
- 在构建的过程中，每次构建都会产生一个Compilation,Compilation是构建周期的产物
- Compiler模块是Webpack最核心的模块
- 每次执行构建的时候，都会先实例化一个 Compiler对象，然后调用它的run方法来开启一次完整的编译
说明 | 代码
1.读取配置文件 | requireConfig
2.创建compiler | webpack(options)
3.开始编译 | compiler.run

node debug.js

debug.js

const webpack = require("webpack");
const config = require('./webpack.config.js');//1.读取配置文件
const compiler = webpack(config);
function compilerCallback(err, stats) {
    const statsString = stats.toString();
    console.log(statsString);
}
compiler.run((err,stats)=>{
    compilerCallback(err, stats);
});

##### 钩子

###### Compiler
Object.keys(this.hooks).forEach(hookName => {
    const hook = this.hooks[hookName];
    if (hook.tap) {
        hook.tap('flow', () => {
            console.log(`|compiler|${hookName}|${Object.getPrototypeOf(hook).constructor.name}|${hook._args}|`);
        });
    }
});

###### Compilation
Object.keys(this.hooks).forEach(hookName => {
    const hook = this.hooks[hookName];
    if (hook.tap) {
        hook.tap('flow', () => {
            console.log(`|compilation|${hookName}|${Object.getPrototypeOf(hook).constructor.name}|${hook._args}|`);
        });
    }
});

|compiler|environment|SyncHook||
|:-|:-|:-|
|compiler|afterEnvironment|SyncHook||
|compiler|entryOption|SyncBailHook|context,entry|
|compiler|afterPlugins|SyncHook|compiler|
|compiler|afterResolvers|SyncHook|compiler|
|compiler|beforeRun|AsyncSeriesHook|compiler|
|compiler|run|AsyncSeriesHook|compiler|
|compiler|normalModuleFactory|SyncHook|normalModuleFactory|
|compiler|contextModuleFactory|SyncHook|contextModulefactory|
|compiler|beforeCompile|AsyncSeriesHook|params|
|compiler|compile|SyncHook|params|
|compiler|thisCompilation|SyncHook|compilation,params|
|compiler|compilation|SyncHook|compilation,params|
|compiler|make|AsyncParallelHook|compilation|
|compilation|addEntry|SyncHook|entry,name|
|compilation|buildModule|SyncHook|module|
|compilation|normalModuleLoader|SyncHook|loaderContext,module|
|compilation|succeedModule|SyncHook|module|
|compilation|buildModule|SyncHook|module|
|compilation|normalModuleLoader|SyncHook|loaderContext,module|
|compilation|succeedModule|SyncHook|module|
|compilation|buildModule|SyncHook|module|
|compilation|normalModuleLoader|SyncHook|loaderContext,module|
|compilation|buildModule|SyncHook|module|
|compilation|normalModuleLoader|SyncHook|loaderContext,module|
|compilation|succeedModule|SyncHook|module|
|compilation|succeedModule|SyncHook|module|
|compilation|succeedEntry|SyncHook|entry,name,module|
|compilation|finishModules|AsyncSeriesHook|modules|
|compilation|seal|SyncHook||
|compilation|optimizeDependenciesBasic|SyncBailHook|modules|
|compilation|optimizeDependencies|SyncBailHook|modules|
|compilation|optimizeDependenciesAdvanced|SyncBailHook|modules|
|compilation|afterOptimizeDependencies|SyncHook|modules|
|compilation|beforeChunks|SyncHook||
|compilation|dependencyReference|SyncWaterfallHook|dependencyReference,d|
|compilation|dependencyReference|SyncWaterfallHook|dependencyReference,d|
|compilation|dependencyReference|SyncWaterfallHook|dependencyReference,d|
|compilation|dependencyReference|SyncWaterfallHook|dependencyReference,d|
|compilation|log|SyncBailHook|origin,logEntry|
|compilation|log|SyncBailHook|origin,logEntry|
|compilation|afterChunks|SyncHook|chunks|
|compilation|optimize|SyncHook||
|compilation|optimizeModulesBasic|SyncBailHook|modules|
|compilation|optimizeModules|SyncBailHook|modules|
|compilation|optimizeModulesAdvanced|SyncBailHook|modules|
|compilation|afterOptimizeModules|SyncHook|modules|
|compilation|optimizeChunksBasic|SyncBailHook|chunks,chunkGroups|
|compilation|optimizeChunks|SyncBailHook|chunks,chunkGroups|
|compilation|optimizeChunksAdvanced|SyncBailHook|chunks,chunkGroups|
|compilation|afterOptimizeChunks|SyncHook|chunks,chunkGroups|
|compilation|optimizeTree|AsyncSeriesHook|chunks,modules|
|compilation|afterOptimizeTree|SyncHook|chunks,modules|
|compilation|optimizeChunkModulesBasic|SyncBailHook|chunks,modules|
|compilation|optimizeChunkModules|SyncBailHook|chunks,modules|
|compilation|optimizeChunkModulesAdvanced|SyncBailHook|chunks,modules|
|compilation|afterOptimizeChunkModules|SyncHook|chunks,modules|
|compilation|shouldRecord|SyncBailHook||
|compilation|reviveModules|SyncHook|modules,records|
|compilation|optimizeModuleOrder|SyncHook|modules|
|compilation|advancedOptimizeModuleOrder|SyncHook|modules|
|compilation|beforeModuleIds|SyncHook|modules|
|compilation|moduleIds|SyncHook|modules|
|compilation|optimizeModuleIds|SyncHook|modules|
|compilation|afterOptimizeModuleIds|SyncHook|modules|
|compilation|reviveChunks|SyncHook|chunks,records|
|compilation|optimizeChunkOrder|SyncHook|chunks|
|compilation|beforeChunkIds|SyncHook|chunks|
|compilation|optimizeChunkIds|SyncHook|chunks|
|compilation|afterOptimizeChunkIds|SyncHook|chunks|
|compilation|recordModules|SyncHook|modules,records|
|compilation|recordChunks|SyncHook|chunks,records|
|compilation|beforeHash|SyncHook||
|compilation|chunkHash|SyncHook|chunk,chunkHash|
|compilation|contentHash|SyncHook|chunk|
|compilation|afterHash|SyncHook||
|compilation|recordHash|SyncHook|records|
|compilation|beforeModuleAssets|SyncHook||
|compilation|shouldGenerateChunkAssets|SyncBailHook||
|compilation|beforeChunkAssets|SyncHook||
|compilation|chunkAsset|SyncHook|chunk,filename|
|compilation|additionalChunkAssets|SyncHook|chunks|
|compilation|record|SyncHook|compilation,records|
|compilation|additionalAssets|AsyncSeriesHook||
|compilation|optimizeChunkAssets|AsyncSeriesHook|chunks|
|compilation|afterOptimizeChunkAssets|SyncHook|chunks|
|compilation|optimizeAssets|AsyncSeriesHook|assets|
|compilation|afterOptimizeAssets|SyncHook|assets|
|compilation|needAdditionalSeal|SyncBailHook||
|compilation|afterSeal|AsyncSeriesHook||
|compiler|afterCompile|AsyncSeriesHook|compilation|
|compiler|shouldEmit|SyncBailHook|compilation|
|compiler|emit|AsyncSeriesHook|compilation|
|compiler|assetEmitted|AsyncSeriesHook|file,content|
|compiler|afterEmit|AsyncSeriesHook|compilation|
|compilation|needAdditionalPass|SyncBailHook||
|compiler|done|AsyncSeriesHook|stats|

|类型|事件名称|类型|参数|说明|发射事件代码|对应插件|
|:-|:-|:-|:-|:-|:-|:-|
|compiler|environment|SyncHook|空|准备编译环境，webpack plugins配置初始化完成之后|webpack.js#L55|NodeEnvironmentPlugin|
|compiler|afterEnvironment|SyncHook|空|编译环境准备好之后|webpack.js#L56||
|compiler|entryOption|SyncBailHook|context,entry|在 webpack 中的 entry 配置处理过之后|WebpackOptionsApply.js#L291|EntryOptionPlugin,SingleEntryPlugin|
|compiler|afterPlugins|SyncHook|compiler|初始化完内置插件之后|WebpackOptionsApply.js#L506||	
|compiler|afterResolvers|SyncHook|compiler|resolver 完成之后|WebpackOptionsApply.js#L541||	
|compiler|beforeRun|AsyncSeriesHook|compiler|开始正式编译之前|Compiler.js#L312||	
|compiler|run|AsyncSeriesHook|compiler|开始编译之后，读取 records 之前；监听模式触发watch-run|Compiler.js#L315||	
|compiler|normalModuleFactory|SyncHook|normalModuleFactory|NormalModuleFactory 创建之后|Compiler.js#L631||	
|compiler|contextModuleFactory|SyncHook|contextModulefactory|ContextModuleFactory 创建之后|Compiler.js#L631||	
|compiler|beforeCompile|AsyncSeriesHook|params|compilation 实例化需要的参数创建完毕之后|Compiler.js#L652||	
|compiler|compile|SyncHook|params|一次 compilation 编译创建之前|Compiler.js#L652||	
|compiler|thisCompilation|SyncHook|compilation,params|触发 compilation 事件之前执行|Compiler.js#L620||	
|compiler|compilation|SyncHook|compilation,params|compilation创建成功之后|Compiler.js#L620||	
|compiler|make|AsyncParallelHook|compilation|完成编译之前|Compiler.js#L659|SingleEntryPlugin|
|compilation|addEntry|SyncHook|entry,name|增加入口|Compilation.js#L1106||	
|compilation|buildModule|SyncHook|module|在模块构建开始之前触发|Compilation.js#L701||	
|compilation|normalModuleLoader|SyncHook|loaderContext,module|普通模块 loader，真正（一个接一个地）加载模块图（graph）中所有模块的函数|NormalModule.js#L233||	
|compilation|succeedModule|SyncHook|module|模块构建成功时执行|Compilation.js#744||	
|compilation|succeedEntry|SyncHook|entry,name,module||Compilation.js#L1147||	
|compilation|finishModules|AsyncSeriesHook|modules|所有模块都完成构建|Compilation.js#L1216||	
|compilation|seal|SyncHook||编译（compilation）停止接收新模块时触发|Compilation.js#L1246||	
|compilation|optimizeDependenciesBasic|SyncBailHook|modules|基础依赖优化开始时触发|Compilation.js#L1249||	
|compilation|optimizeDependencies|SyncBailHook|modules|依赖优化开始时触发|Compilation.js#L1250||	
|compilation|optimizeDependenciesAdvanced|SyncBailHook|modules|高级依赖优化开始时触发|Compilation.js#L1251||	
|compilation|afterOptimizeDependencies|SyncHook|modules|优化结束|Compilation.js#L1255||	
|compilation|beforeChunks|SyncHook||开始生成代码块|Compilation.js#L1257||	
|compilation|dependencyReference|SyncWaterfallHook|dependencyReference,dependency,module|依赖引用|Compilation.js#L1565||	
|compilation|log|SyncBailHook|origin,logEntry|打印日志|Compilation.js#L542||	
|compilation|afterChunks|SyncHook|chunks|代码块生成之后|Compilation.js#L1282||	
|compilation|optimize|SyncHook||优化阶段开始时触发|Compilation.js#L1284||	
|compilation|optimizeModulesBasic|SyncBailHook|modules|基础模块的优化|Compilation.js#L1284||	
|compilation|optimizeModules|SyncBailHook|modules|模块的优化|Compilation.js#L1284||	
|compilation|optimizeModulesAdvanced|SyncBailHook|modules|高级模块的优化|Compilation.js#L1284||	
|compilation|afterOptimizeModules|SyncHook|modules|模块优化结束时触发|Compilation.js#L1293||	
|compilation|optimizeChunksBasic|SyncBailHook|chunks,chunkGroups|基础chunk优化	Compilation.js#L1296||	
|compilation|optimizeChunks|SyncBailHook|chunks,chunkGroups|优化 chunks|Compilation.js#L1297||	
|compilation|optimizeChunksAdvanced|SyncBailHook|chunks,chunkGroups|高级chunk优化|Compilation.js#L1298||	
|compilation|afterOptimizeChunks|SyncHook|chunks,chunkGroups|chunk 优化完成之后触发|Compilation.js#L1302||	
|compilation|optimizeTree|AsyncSeriesHook|chunks,modules|异步优化依赖树|Compilation.js#L1304||	
|compilation|afterOptimizeTree|SyncHook|chunks,modules|异步优化依赖树完成时|Compilation.js#L1309||	
|compilation|optimizeChunkModulesBasic|SyncBailHook|chunks,modules|基础优化单个chunk中的 modules 开始|Compilation.js#L1312||	
|compilation|optimizeChunkModules|SyncBailHook|chunks,modules|优化单个chunk中的 modules 开始|Compilation.js#L1313||	
|compilation|optimizeChunkModulesAdvanced|SyncBailHook|chunks,modules|高级优化单个chunk中的 modules 开始|Compilation.js#L1314||	
|compilation|afterOptimizeChunkModules|SyncHook|chunks,modules|优化单个chunk中的 modules结束后|Compilation.js#L1318||	
|compilation|shouldRecord|SyncBailHook||是否应该记录|Compilation.js#L1320||	
|compilation|reviveModules|SyncHook|modules,records|从 records 中恢复模块信息|Compilation.js#L1322||	
|compilation|optimizeModuleOrder|SyncHook|modules|将模块从最重要的到最不重要的进行排序|Compilation.js#L1323||	
|compilation|advancedOptimizeModuleOrder|SyncHook|modules|高级将模块从最重要的到最不重要的进行排序|Compilation.js#L1324||	
|compilation|beforeModuleIds|SyncHook|modules|处理 modulesId 之前|Compilation.js#L1325||	
|compilation|moduleIds|SyncHook|modules|处理 modulesId|Compilation.js#L1326||	
|compilation|optimizeModuleIds|SyncHook|modules|优化 modulesId|Compilation.js#L1328||	
|compilation|afterOptimizeModuleIds|SyncHook|modules	优化 modulesId之后|Compilation.js#L1329||	
|compilation|reviveChunks|SyncHook|chunks,records|从 records 中恢复 chunk 信息|Compilation.js#L1333||	
|compilation|optimizeChunkOrder|SyncHook|chunks|将 chunk 从最重要的到最不重要的进行排序|Compilation.js#L1334||	
|compilation|beforeChunkIds|SyncHook|chunks|chunk id 优化之前触发|Compilation.js#L1335||	
|compilation|optimizeChunkIds|SyncHook|chunks|chunk id 优化开始触发|Compilation.js#L1337||	
|compilation|afterOptimizeChunkIds|SyncHook|chunks|chunk id 优化结束触发|Compilation.js#L1338||	
|compilation|recordModules|SyncHook|modules,records|将模块信息存储到 records|Compilation.js#L1343||	
|compilation|recordChunks|SyncHook|chunks,records|将 chunk 信息存储到records|Compilation.js#L1344||	
|compilation|beforeHash|SyncHook||在编译被哈希（hashed）之前|Compilation.js#L1347||	
|compilation|chunkHash|SyncHook|chunk,chunkHash|生成chunkHash|Compilation.js#L1937||
|compilation|contentHash|SyncHook|chunk|生成contentHash|Compilation.js#L1941||	
|compilation|afterHash|SyncHook||在编译被哈希（hashed）之后|Compilation.js#L1349||	
|compilation|recordHash|SyncHook|records|记录hash|Compilation.js#L1352||	
|compilation|beforeModuleAssets|SyncHook||在创建模块的资源之前|Compilation.js#L1355||	
|compilation|shouldGenerateChunkAssets|SyncBailHook||是否要生成chunk资源|Compilation.js#L1357||	
|compilation|beforeChunkAssets|SyncHook||在创建 chunk 资源（asset）之前|Compilation.js#L1358||	
|compilation|chunkAsset|SyncHook|chunk,filename|一个 chunk 中的一个资源被添加到编译中|Compilation.js#L2019||	
|compilation|additionalChunkAssets|SyncHook|chunks|additionalChunkAssets|Compilation.js#L1361||	
|compilation|record|SyncHook|compilation,records|将 compilation 相关信息存储到 records 中|Compilation.js#L1364||	
|compilation|additionalAssets|AsyncSeriesHook||为编译（compilation）创建附加资源（asset）|Compilation.js#L1367||	
|compilation|optimizeChunkAssets|AsyncSeriesHook|compilation|优化所有 chunk 资源（asset）|Compilation.js#L1343||	
|compilation|afterOptimizeChunkAssets|SyncHook|chunks|chunk 资源（asset）已经被优化|Compilation.js#L1371||	
|compilation|optimizeAssets|AsyncSeriesHook|assets|优化存储在 compilation.assets 中的所有资源（asset|Compilation.js#L1371||	
|compilation|afterOptimizeAssets|SyncHook|assets|优化compilation.assets 中的所有资源（asset）之后|Compilation.js#L1380||	
|compilation|needAdditionalSeal|SyncBailHook||是否需要额外的seal|Compilation.js#L1381||	
|compilation|afterSeal|AsyncSeriesHook||seal之后|Compilation.js#L1383||	
|compiler|afterCompile|AsyncSeriesHook|compilation|完成编译和封存（seal）编译产出之后|Compiler.js#L668||	
|compiler|shouldEmit|SyncBailHook|compilation|发布构建后资源之前触发，回调必须返回true/false，true则继续|Compiler.js#L267||	
|compiler|emit|AsyncSeriesHook|compilation|生成资源到output目录之前|Compiler.js#L481||	
|compiler|assetEmitted|AsyncSeriesHook|file,content|assetEmitted|Compiler.js#L437||	
|compiler|afterEmit|AsyncSeriesHook|compilation|生成资源到output目录之后|Compiler.js#L472||
|compilation|needAdditionalPass|SyncBailHook||是否需要额外的|Compiler.js#L281||
|compiler|done|AsyncSeriesHook|stats|compilation完成之后|Compiler.js#L304||

##### Stats 对象
- 在 Webpack 的回调函数中会得到stats对象
- 这个对象实际来自于Compilation.getStats()，返回的是主要含有modules、chunks和assets三个属性值的对象。
- Stats对象本质上来自于lib/Stats.js的类实例

|字段|含义|
|:-|:-|
|modules|记录了所有解析后的模块|
|chunks|记录了所有chunk|
|assets|记录了所有要生成的文件|

npx webpack --profile --json > stats.json

{
  "errors": [],// 错误字符串 (error string) 的数组
  "warnings": [],//警告字符串 (warning string) 的数组
  "version": "4.39.3",// 用来编译的 webpack 的版本
  "hash": "3e945ec6b2c56d0b010e",//编译使用的 hash
  "time": 66, // 编译耗时 (ms)
  "builtAt": 1567225465347,//编译的时间
  "publicPath": "",//资源访问路径
  "outputPath": "C:\\vipdata\\vipproject\\webpack-source\\dist",//webpack输出目录
  "assetsByChunkName": {//用作映射的 chunk 的名称
    "lazy": "lazy.bundle.js",//chunk的名字叫lazy,lazy.bundle.js
    "main": "bundle.js"//chunk的名字叫main,打包出来了bundle.js
  },
  "assets": [//asset 对象 (asset objects) 的数组
    {
      "name": "bundle.js",//文件名
      "size": 9043,//大小
      "chunks": [//包含的代码块
        "main"
      ],
      "chunkNames": [//包含的代码块名称
        "main"
      ],
      "emitted": true//是否要生成
    },
    {
      "name": "lazy.bundle.js", // 输出的文件名
      "size": 336,// 文件的大小
      "chunks": [ // 这个 asset 包含的 chunk 的 id
        "lazy"
      ],
      "chunkNames": [// 这个 asset 包含的 chunk
        "lazy"
      ],
      "emitted": true  // 表示这个 asset 是否会让它输出到 output 目录
    }
  ],
  "filteredAssets": 0,
  "entrypoints": {
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "bundle.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "namedChunkGroups": {
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "bundle.js"
      ],
      "children": {},
      "childAssets": {}
    },
    "lazy": {
      "chunks": [
        "lazy"
      ],
      "assets": [
        "lazy.bundle.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "chunks": [ //chunk 对象 (chunk objects) 的数组
    {
      "id": "lazy", // 这个 chunk 的id
      "rendered": true,// 表示这个 chunk 是否会参与进编译
      "initial": false,
      "entry": false,// 表示这个 chunk 是否包含 webpack 的运行时
      "size": 24,//预估的模块大小
      "names": [// 包含在这个 chunk 内的 chunk 的名字的数组
        "lazy"
      ],
      "files": [
        "lazy.bundle.js"
      ],
      "hash": "d08a8b502d30324f81e1",
      "siblings": [],
      "parents": [// 父 chunk 的 ids
        "main"
      ],
      "children": [],
      "childrenByOrder": {},
      "modules": [
        {
          "id": "./src/lazy.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\lazy.js",
          "name": "./src/lazy.js",
          "index": 2,
          "index2": 2,
          "size": 24,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "lazy"
          ],
          "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "issuerId": "./src/index.js",
          "issuerName": "./src/index.js",
          "issuerPath": [
            {
              "id": "./src/index.js",
              "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "name": "./src/index.js",
              "profile": {
                "factory": 18,
                "building": 14
              }
            }
          ],
          "profile": {
            "factory": 4,
            "building": 2
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [// 生成 assets 的原因
            {
              "moduleId": "./src/index.js",//模块的ID
              "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",//唯一标识
              "module": "./src/index.js",//模块
              "moduleName": "./src/index.js",//模块名称
              "type": "import()",//类型
              "userRequest": "./lazy",//用户请求方式
              "loc": "2:0-46"//在父模块中的位置
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 1,
          "source": "module.exports = 'lazy';"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "moduleId": "./src/index.js",// 模块的ID
          "module": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的位置
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的地址
          "moduleName": "./src/index.js",//模块的相对地址
          "loc": "2:0-46",
          "request": "./lazy",
          "reasons": [] // 具体是哪行生成了这个chunk
        }
      ]
    },
    {
      "id": "main",
      "rendered": true,
      "initial": true,
      "entry": true,
      "size": 162,
      "names": [
        "main"
      ],
      "files": [
        "bundle.js"
      ],
      "hash": "263cadc0459e8470151b",
      "siblings": [],
      "parents": [],
      "children": [// 自己引用哪些chunk
        "lazy"
      ],
      "childrenByOrder": {}, // 引用的顺序
      "modules": [
        {
          "id": "./src/hello.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\hello.js",
          "name": "./src/hello.js",
          "index": 1,
          "index2": 0,
          "size": 25,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "issuerId": "./src/index.js",
          "issuerName": "./src/index.js",
          "issuerPath": [
            {
              "id": "./src/index.js",
              "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "name": "./src/index.js",
              "profile": {
                "factory": 18,
                "building": 14
              }
            }
          ],
          "profile": {
            "factory": 4,
            "building": 2
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": "./src/index.js",
              "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
              "module": "./src/index.js",
              "moduleName": "./src/index.js",
              "type": "cjs require",
              "userRequest": "./hello",
              "loc": "1:12-30"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 1,
          "source": "module.exports = 'hello';"
        },
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "index": 0,
          "index2": 1,
          "size": 137,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": null,
          "issuerId": null,
          "issuerName": null,
          "issuerPath": null,
          "profile": {
            "factory": 18,
            "building": 14
          },
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": null,
              "moduleIdentifier": null,
              "module": null,
              "moduleName": null,
              "type": "single entry",
              "userRequest": "./src/index.js",
              "loc": "main"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 0,
          "source": "let hello = require('./hello');\r\nimport(/* webpackChunkName: \"lazy\" */'./lazy').then(result=>{\r\n    console.log(hello,resut.default)\r\n});"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "module": "",
          "moduleIdentifier": "",
          "moduleName": "",
          "loc": "main",
          "request": "./src/index.js",
          "reasons": []
        }
      ]
    }
  ],
  "modules": [// 模块对象 (module objects) 的数组
    {
      "id": "./src/hello.js",//模块ID
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\hello.js",//webpack内部使用的唯一的标识
      "name": "./src/hello.js",// 实际文件的地址
      "index": 1,//索引
      "index2": 0,//索引
      "size": 25,// 预估模块的大小 (byte)
      "cacheable": true,// 表示这个模块是否会被缓存
      "built": true,// 表示这个模块会参与 Loaders , 解析, 并被编译
      "optional": false,// 每一个对这个模块的请求都会包裹在 `try... catch` 内
      "prefetched": false,// 表示这个模块是否会被 prefetched
      "chunks": [//此模块在哪个代码块内
        "main"
      ],
      "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",//使用者唯一标识
      "issuerId": "./src/index.js",//使用者ID
      "issuerName": "./src/index.js",//使用者名称
      "issuerPath": [//使用者路径
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "profile": { //这个模块特有的编译时间数据(ms)
            "factory": 18,// 解决依赖的时间
            "building": 14 // 载入和解析的时间
          }
        }
      ],
      "profile": {
        "factory": 4,// 解决依赖的时间
        "building": 2// 载入和解析的时间
      },
      "failed": false,//是否失败
      "errors": 0,// 处理模块时错误的数量
      "warnings": 0,// 处理模块时警告的数量
      "assets": [],//在哪个资源内
      "reasons": [
        {
          "moduleId": "./src/index.js",// 模块的 ID
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",// 模块的地址
          "module": "./src/index.js",// 所基于模块的相对地址 context
          "moduleName": "./src/index.js",
          "type": "cjs require",// 使用的请求的种类 (require或import)
          "userRequest": "./hello",// 用来 `import` 或者 `require` 的源字符串
          "loc": "1:12-30" // 导致这个被加入依赖图标的代码行数
        }
      ],
      "providedExports": null,//提供的导出对象
      "optimizationBailout": [],//失败时的优化
      "depth": 1,//模块深度
      "source": "module.exports = 'hello';"// 字符串化的输入
    },
    {
      "id": "./src/index.js",
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
      "name": "./src/index.js",
      "index": 0,
      "index2": 1,
      "size": 137,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "main"
      ],
      "issuer": null,
      "issuerId": null,
      "issuerName": null,
      "issuerPath": null,
      "profile": {
        "factory": 18,
        "building": 14
      },
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": null,
          "moduleIdentifier": null,
          "module": null,
          "moduleName": null,
          "type": "single entry",
          "userRequest": "./src/index.js",
          "loc": "main"
        }
      ],
      "providedExports": null,
      "optimizationBailout": [],
      "depth": 0,
      "source": "let hello = require('./hello');\r\nimport(/* webpackChunkName: \"lazy\" */'./lazy').then(result=>{\r\n    console.log(hello,resut.default)\r\n});"
    },
    {
      "id": "./src/lazy.js",
      "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\lazy.js",
      "name": "./src/lazy.js",
      "index": 2,
      "index2": 2,
      "size": 24,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "lazy"
      ],
      "issuer": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
      "issuerId": "./src/index.js",
      "issuerName": "./src/index.js",
      "issuerPath": [
        {
          "id": "./src/index.js",
          "identifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "name": "./src/index.js",
          "profile": {
            "factory": 18,
            "building": 14
          }
        }
      ],
      "profile": {
        "factory": 4,
        "building": 2
      },
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": "./src/index.js",
          "moduleIdentifier": "C:\\vipdata\\vipproject\\webpack-source\\src\\index.js",
          "module": "./src/index.js",
          "moduleName": "./src/index.js",
          "type": "import()",
          "userRequest": "./lazy",
          "loc": "2:0-46"
        }
      ],
      "providedExports": null,
      "optimizationBailout": [],
      "depth": 1,
      "source": "module.exports = 'lazy';"
    }
  ],
  "filteredModules": 0,
  "logging": {
    "webpack.buildChunkGraph.visitModules": {
      "entries": [],
      "filteredEntries": 5,
      "debug": false
    }
  },
  "children": []
}

##### 主要工作流程
- Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的run方法开始执行编译； 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
- 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
webpackcode

###### 初始化阶段

|事件名|解释|代码位置|
|:-|:-|:-|
|读取命令行参数|从命令行中读取用户输入的参数|require("./convert-argv")(argv)|
|实例化Compiler|1.用上一步得到的参数初始化 Compiler 实例 2.Compiler 负责文件监听和启动编译 3.Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。|compiler = webpack(options);|
|加载插件|1.依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。|plugin.apply(compiler)|
|处理入口|读取配置的 Entrys，为每个 Entry 实例化一个对应的 EntryPlugin，为后面该 Entry 的递归解析工作做准备|new EntryOptionPlugin().apply(compiler)、new SingleEntryPlugin(context, item, name)、compiler.hooks.make.tapAsync|

###### 编译阶段
|事件名|解释|代码位置|
|:-|:-|:-|
|run|启动一次新的编译|this.hooks.run.callAsync|
|compile|该事件是为了告诉插件一次新的编译将要启动，同时会给插件传入compiler 对象。|compile(callback)|
|compilation|当 Webpack 以开发模式运行时，每当检测到文件变化，一次新的 Compilation 将被创建。一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。Compilation 对象也提供了很多事件回调供插件做扩展。|newCompilation(params)|
|make|一个新的 Compilation 创建完毕主开始编译|this.hooks.make.callAsync|
|addEntry|即将从 Entry 开始读取文件	compilation.addEntry
this._addModuleChain|
|moduleFactory|创建模块工厂|const moduleFactory = this.dependencyFactories.get(Dep)|
|create|创建模块|moduleFactory.create|
|factory|开始创建模块|factory(result, (err, module)
resolver(result
this.hooks.resolver.tap("NormalModuleFactory"|
|resolveRequestArray|解析loader路径|resolveRequestArray|
|resolve|解析资源文件路径|resolve|
|userRequest|得到包括loader在内的资源文件的绝对路径用!拼起来的字符串|userRequest|
|ruleSet.exec|它可以根据模块路径名，匹配出模块所需的loader|this.ruleSet.exec|
|_run|它可以根据模块路径名，匹配出模块所需的loader|_run|
|loaders|得到所有的loader数组|results[0].concat(loaders, results[1], results[2])|
|getParser|获取AST解析器|this.getParser(type, settings.parser)|
|buildModule|开始编译模块|this.buildModule(module
buildModule(module, optional, origin, dependencies, thisCallback)|
|build|开始真正编译入口模块|build(options|
|doBuild|开始真正编译入口模块|doBuild|
|执行loader|使用loader进行转换|runLoaders
runLoaders|
|iteratePitchingLoaders|开始递归执行pitch loader|iteratePitchingLoaders|
|loadLoader|加载loader|loadLoader|
|runSyncOrAsync|执行pitchLoader|runSyncOrAsync|
|processResource|开始处理资源|processResource
options.readResource
iterateNormalLoaders
iterateNormalLoaders|
|createSource|创建源代码对象|this.createSource|
|parse|使用parser转换抽象语法树|this.parser.parse|
|parse|解析抽象语法树|parse(source, initialState)|
|acorn.parse|解析语法树|acorn.parse(code, parserOptions)|
|ImportDependency|遍历并添加添加依赖|parser.state.module.addDependency(clearDep)|
|succeedModule|生成语法树后就表示一个模块编译完成|this.hooks.succeedModule.call(module)|
|processModuleDependencies|递归编译依赖的模块|this.processModuleDependencies(module
processModuleDependencies(module, callback)
this.addModuleDependencies
buildModule|
|make后|结束make|this.hooks.make.callAsync(compilation, err => {}|
|finish|编译完成|compilation.finish();|

###### 结束阶段

|事件名|解释|代码位置|
|:-|:-|:-|
|seal|封装|compilation.seal
seal(callback)|
|addChunk|生成资源|addChunk(name)|
|createChunkAssets|创建资源|this.createChunkAssets()|
|getRenderManifest|获得要渲染的描述文件|getRenderManifest(options)|
|render|渲染源码|source = fileManifest.render();|
|afterCompile|编译结束|this.hooks.afterCompile|
|shouldEmit|所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。|this.hooks.shouldEmit|
|emit|确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。|this.emitAssets(compilation
this.hooks.emit.callAsync
const emitFiles = err
this.outputFileSystem.writeFile|
|this.emitRecords|写入记录|this.emitRecords|
|done|全部完成|this.hooks.done.callAsync
dependency|

#### loader

##### loader运行的总体流程
1. Compiler.js中会将用户配置与默认配置合并，其中就包括了loader部分
2. webpack就会根据配置创建两个关键的对象——NormalModuleFactory和ContextModuleFactory。它们相当于是两个类工厂，通过其可以创建相应的NormalModule和ContextModule
3. 在工厂创建NormalModule实例之前还要通过loader的resolver来解析loader路径
4. 在NormalModule实例创建之后，则会通过其.build()方法来进行模块的构建。构建模块的第一步就是使用loader来加载并处理模块内容。而loader-runner这个库就是webpack中loader的运行器
5. 最后，将loader处理完的模块内容输出，进入后续的编译流程
loader

##### loader配置
loader是导出为一个函数的node模块。该函数在loader转换资源的时候调用。给定的函数将调用loader API，并通过this上下文访问。

###### 匹配(test)单个 loader

匹配(test)单个 loader，你可以简单通过在 rule 对象设置 path.resolve 指向这个本地文件

{
  test: /\.js$/
  use: [
    {
      loader: path.resolve('path/to/loader.js'),
      options: {/* ... */}
    }
  ]
}

###### 匹配(test)多个 loaders

，你可以使用 resolveLoader.modules 配置，webpack 将会从这些目录中搜索这些 loaders。

resolveLoader: {
   modules: [path.resolve('node_modules'), path.resolve(__dirname, 'src', 'loaders')]
},

###### npm link
- 第1步: 确保正在开发的本地 Npm 模块（也就是正在开发的 Loader）的 package.json 已经正确配置好
- 第2步: 在本地npm模块根目录下执行npm link,把本地模块注册到全局
- 第3步: 在项目根目录下执行 npm link loader-name,把第2步注册到全局的本地 npm 模块链接到项目的 node_modules目录 下，其中的loader-name是指在第1步中的 package.json 文件中配置的模块名称
npm link

###### alias

resolveLoader: {
        alias: {
            "babel-loader": resolve('./loaders/babel-loader.js'),
            "css-loader": resolve('./loaders/css-loader.js'),
            "style-loader": resolve('./loaders/style-loader.js'),
            "file-loader": resolve('./loaders/file-loader.js'),
            "url-loader": resolve('./loaders/url-loader.js')
        }
    },

##### loader用法

###### 单个loader用法
- loader只能传入一个包含包含资源文件内容的字符串
- 同步 loader 可以简单的返回一个代表模块转化后的值
- loader 也可以通过使用 this.callback(err, values...) 函数，返回任意数量的值
- loader 会返回一个或者两个值。第一个值的类型是 JavaScript 代码的字符串或者 buffer。第二个参数值是 SourceMap,它是个 JavaScript 对象

###### 多个loader
- 当链式调用多个 loader 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。
- 最后的 loader 最早调用，将会传入原始资源内容。
- 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map(可选)
- 中间的 loader 执行时，会传入前一个 loader 传出的结果。

##### 用法准则

###### 简单
loaders 应该只做单一任务。这不仅使每个 loader 易维护，也可以在更多场景链式调用。

###### 链式(Chaining)
利用 loader 可以链式调用的优势。写五个简单的 loader 实现五项任务，而不是一个 loader 实现五项任务

###### 模块化(Modular)
保证输出模块化。loader 生成的模块与普通模块遵循相同的设计原则。

###### 无状态(Stateless)
确保 loader 在不同模块转换之间不保存状态。每次运行都应该独立于其他编译模块以及相同模块之前的编译结果。

###### loader工具库
loader-utils 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 loader 的选项
schema-utils 包配合 loader-utils，用于保证 loader 选项，进行与 JSON Schema 结构一致的校验

###### loader依赖
如果一个 loader 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 loaders 无效，以及在观察模式(watch mode)下重编译。

###### 模块依赖
根据模块类型，可能会有不同的模式指定依赖关系。例如在 CSS 中，使用 @import 和 url(...) 语句来声明依赖。这些依赖关系应该由模块系统解析。

###### 绝对路径
不要在模块代码中插入绝对路径，因为当项目根路径变化时，文件绝对路径也会变化。
loader-utils 中的 stringifyRequest 方法，可以将绝对路径转化为相对路径。

###### 同等依赖
- 如果你的 loader 简单包裹另外一个包，你应该把这个包作为一个 peerDependency 引入。
- 这种方式允许应用程序开发者在必要情况下，在package.json 中指定所需的确定版本。

##### API

###### 缓存结果
在有些情况下，有些转换操作需要大量计算非常耗时，如果每次构建都重新执行重复的转换操作，构建将会变得非常缓慢。 为此，Webpack 会默认缓存所有 Loader 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时， 是不会重新调用对应的 Loader 去执行转换操作的。
module.exports = function(source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};

###### 异步
Loader 有同步和异步之分,上面介绍的 Loader 都是同步的 Loader，因为它们的转换流程都是同步的，转换完成后再返回结果。
但在有些场景下转换的步骤只能是异步完成的，例如你需要通过网络请求才能得出结果，如果采用同步的方式网络请求就会阻塞整个构建，导致构建非常缓慢
module.exports = function(source) {
    // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    var callback = this.async();
    someAsyncOperation(source, function(err, result, sourceMaps, ast) {
        // 通过 callback 返回异步执行后的结果
        callback(err, result, sourceMaps, ast);
    });
};

###### 返回其它结果
Loader有些场景下还需要返回除了内容之外的东西。

module.exports = function(source) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
  // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
  return;
};
完整格式

this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);

###### raw loader
在默认的情况下，Webpack 传给 Loader 的原内容都是UTF-8格式编码的字符串。
但有些场景下 Loader 不是处理文本文件，而是处理二进制文件，例如 file-loader,就需要 Webpack 给 Loader 传入二进制格式的数据。 为此，你需要这样编写 Loader
module.exports = function(source) {
  // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
  source instanceof Buffer === true;
  // Loader 返回的类型也可以是 Buffer 类型的
  // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
  return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据 
module.exports.raw = true;

###### 获得options
可以获得给Loader配置的options
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
};

###### 其它 Loader API
完整API
|方法名|含义|
|:-|:-|
|this.context|当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src|
|this.resource|当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。|
|this.resourcePath|当前处理文件的路径，例如 /src/main.js|
|this.resourceQuery|当前处理文件的 querystring|
|this.target|等于 Webpack 配置中的 Target|
|this.loadModule|但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时,就可以通过 this.loadModule(request: string, callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果|
|this.resolve|像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))|
|this.addDependency|给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)|
|this.addContextDependency|和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)|
|this.clearDependencies|清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()|
|this.emitFile|输出一个文件，使用方法为 emitFile(name: string, content: Buffer/string, sourceMap: {...})|
|loader-utils.stringifyRequest|Turns a request into a string that can be used inside require() or import while avoiding absolute paths. Use it instead of JSON.stringify(...) if you're generating code inside a loader 把一个请求字符串转成一个字符串，以便能在require或者import中使用以避免绝对路径。如果你在一个loader中生成代码的话请使用这个而不要用JSON.stringify()|
|loader-utils.interpolateName|Interpolates a filename template using multiple placeholders and/or a regular expression. The template and regular expression are set as query params called name and regExp on the current loader's context. 使用多个占位符或一个正则表达式转换一个文件名的模块。这个模板和正则表达式被设置为查询参数，在当前loader的上下文中被称为name或者regExp|

##### loader实战

###### 项目准备

cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin @babel/core @babel/preset-env  babel-loader css-loader file-loader less less-loader style-loader url-loader -D

- webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  context: process.cwd(),
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolveLoader: {
    modules: [path.resolve('./loaders'), 'node_modules']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
        },
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

- src\index.js
const sum = (a, b) => {
    return a + b;
}
console.log(sum(1, 2));

- src\index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>

###### babel-loader
- babel-loader
- @babel/core

|属性|值|
|:-|:-|
|this.request|/loaders/babel-loader.js!/src/index.js'|
|this.userRequest|/src/index.js|
|this.rawRequest|./src/index.js|
|this.resourcePath|/src/index.js|

const babel = require("@babel/core");
function loader(source) {
    //C:\vipdata\prepare6\zhufeng_loader\loaders\babel-loader.js!C:\vipdata\prepare6\zhufeng_loader\src\index.js
    console.log('this.request', this.request);
    const options = {
        presets: ['@babel/preset-env'],
        //sourceMaps: true 如果没有此参数，则不会生成sourcemap文件
        //注意此处的sourceMap是从转译前的代码到转译后的代码的map映射,如果此处不生成无法调试真正的源码了
        sourceMaps: true,
        //如果没有此参数则生成的map文件里文件中unknown
        filename: this.request.split('!')[1].split('/').pop()
    }
    //在webpack.config.js中 增加devtool: 'source-map',这个source-map是从转译后的源码到bundle.js之间的map映射
    let { code, map, ast } = babel.transform(source, options);
    return this.callback(null, code, map, ast);
}

module.exports = loader;
本案例是是学习如何编写loader以及如何通过this.callback返回多个值

###### banner-loader

本案例学习如何获取参数，验证参数，实现异步loader以及使用缓存

- banner-loader.js
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');
function loader(source) {
    //把loader改为异步,任务完成后需要手工执行callback
    let cb = this.async();
    //启用loader缓存
    this.cacheable && this.cacheable();
    //用来验证options的合法性
    let schema = { 
        type: 'object',
        properties: {
            filename: {
                type: 'string'
            },
            text: {
                type: 'string'
            }
        }
    }
    //通过工具方法获取options
    let options = loaderUtils.getOptions(this);
    //用来验证options的合法性
    validateOptions(schema, options);
    let {filename } = options;
    fs.readFile(filename, 'utf8', (err, text) => {
        cb(err, text + source);
    });
}

module.exports = loader;

- banner.js
/**copyright: zhufengjiagu*/

- webpack.config.js
module: {
  rules: [
    {
      test: /\.jsx?$/,
      use: [{
        loader: 'banner-loader',
        options: { filename: path.resolve(__dirname, 'loaders/banner.js') }
      }, {
        loader: "babel-loader"
      }],
      include: path.join(__dirname, "src"),
      exclude: /node_modules/
    }
  ]
},

###### file
- file-loader 并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。
- 主案例主要是学习loader-utils用法

- file-loader
  - loader-utils
  - file-loader
  - public-path

const { getOptions, interpolateName } = require('loader-utils');
function loader(content) {
  let options=getOptions(this)||{};
  let url = interpolateName(this, options.filename || "[hash].[ext]", {content});
  this.emitFile(url, content);
  return `module.exports = ${JSON.stringify(url)}`;
}
loader.raw = true;
module.exports = loader;

通过 loaderUtils.interpolateName 方法可以根据 options.name 以及文件内容生成一个唯一的文件名 url（一般配置都会带上hash，否则很可能由于文件重名而冲突）
通过 this.emitFile(url, content) 告诉 webpack 我需要创建一个文件，webpack会根据参数创建对应的文件，放在 public path 目录下
返回 module.exports = ${JSON.stringify(url)},这样就会把原来的文件路径替换为编译后的路径

- url-loader
let { getOptions } = require('loader-utils');
var mime = require('mime');
function loader(source) {
    let options=getOptions(this)||{};
    let { limit, fallback='file-loader' } = options;
    if (limit) {
      limit = parseInt(limit, 10);
    }
    const mimeType=mime.getType(this.resourcePath);
    if (!limit || source.length < limit) {
        let base64 = `data:${mimeType};base64,${source.toString('base64')}`;
        return `module.exports = ${JSON.stringify(base64)}`;
    } else {
        let fileLoader = require(fallback || 'file-loader');
        return fileLoader.call(this, source);
    }
}
loader.raw = true;
module.exports = loader;

###### pitch
1. 以a!b!c!module为例,正常调用顺序应该是c=>b=>a,但是真正调用顺序是 a(pitch)=>b(pitch)=>c(pitch)=>c=>b=>a,如果其中任何一个pitching loader返回了值就相当于在它以及它右边的loader已经执行完毕
2. 比如如果b返回了字符串result_b, 接下来只有a会被系统执行，且a的loader收到的参数是result_b
3. loader根据返回值分为两种，一种是返回js代码(一个module的代码，含有类似module.export语句)的loader,另一种是不能作为最左边loader的其他loader
有时候我们想把两个第一种loader 连接起来，比如style-loader!css-loader! 问题是css-loader的返回值是一串js代码，如果按正常方式写style-loader的参数就是一串代码字符串
4. 为了解决这种问题，我们需要在style-loader里执行require(css-loader!resources)
pitch与loader本身方法的执行顺序图

|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution

- loaders\loader1.js
function loader(source) {
    console.log('loader1',this.data);
    return source+"//loader1";
}
loader.pitch = function (remainingRequest,previousRequest,data) {
    data.name = 'pitch1';
    console.log('pitch1');
}
module.exports = loader;

- loaders\loader2.js
function loader(source) {
    console.log('loader2');
    return source+"//loader2";
}
loader.pitch = function (remainingRequest,previousRequest,data) {
    console.log('remainingRequest=',remainingRequest);
    console.log('previousRequest=',previousRequest);
    console.log('pitch2');
    //return 'console.log("pitch2")';
}
module.exports = loader;

- loaders\loader3.js
function loader(source) {
    console.log('loader3');
    return source+"//loader3";
}
loader.pitch = function () {
    console.log('pitch3');
}
module.exports = loader;

- webpack.config.js
{
  test: /\.js$/,
  use: ['loader1', 'loader2', 'loader3']
}

###### run-loader
- LoaderRunner
- NormalModuleFactory-noPreAutoLoaders
- NormalModule-runLoaders

run-loader.js

//@ts-check
const path = require('path');
const fs = require('fs');
const readFile = fs.readFileSync;
//入口文件
let entry = './src/title.js';
let options = {
    resource: path.join(__dirname, entry),//要加载的资源,它是个绝对路径
    loaders: [
        path.join(__dirname, 'loaders/a-loader.js'),//C:\vipdata\lesson\201911projects\7.loader\loaders\a-loader.js
        path.join(__dirname, 'loaders/b-loader.js'),//C:\vipdata\lesson\201911projects\7.loader\loaders\b-loader.js
        path.join(__dirname, 'loaders/c-loader.js')//C:\vipdata\lesson\201911projects\7.loader\loaders\c-loader.js
    ]
}
function createLoaderObject(loaderPath) {
    let loaderObject = { data: {} };
    loaderObject.path = loaderPath;// 存放此loader的绝地路径
    loaderObject.normal = require(loaderPath);
    loaderObject.pitch = loaderObject.normal.pitch;
    return loaderObject;
}

function runLoaders(options, finalCallback) {
    let loaderContext = {};//这个对象将会成为webpack loader中的this
    let resource = options.resource;//获取要加载的资源 C:\vipdata\lesson\201911projects\7.loader\src\title.js
    let loaders = options.loaders;
    loaders = loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;//当前正在执行的loader的索引
    loaderContext.readResource = readFile;//指定一个读取文件的方法 readFile
    loaderContext.resource = resource;//resource放置着要读取的资源
    loaderContext.loaders = loaders;//缓存了loaderObject的数组

    Object.defineProperty(loaderContext, 'request', {
        get() {
            return loaderContext.loaders.map(loaderObject => loaderObject.path)
                .concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loaderObject => loaderObject.path)
                .join('!')
        }
    });
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loaderObject => loaderObject.path)
                .concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'data', {
        get() {
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    iteratePitchingLoaders(loaderContext, finalCallback);
    //在这里要读取要加载的模块的内容
    function processResource(loaderContext, finalCallback) {
        let buffer = loaderContext.readResource(loaderContext.resource);// 读取文件的内容 
        iterateNormalLoaders(loaderContext, buffer, finalCallback);//进行正掌中的loader执行
    }
    function convertArgs(args, raw) {
        if (!raw && Buffer.isBuffer(args))
            args = args.toString("utf8");
        else if (raw && typeof args === "string")
            args = new Buffer(args, "utf8"); // eslint-disable-line
    }
    //执行正常的 
    function iterateNormalLoaders(loaderContext, args, finalCallback) {
        if (loaderContext.loaderIndex < 0) {
            return finalCallback(null, args);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let normalFn = currentLoaderObject.normal;//拿到当前的normal函数
        let isSync = true;//默认当前的执行模式是同步模式
        const innerCallback = loaderContext.callback = (err, args) => {
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, finalCallback)
        }
        loaderContext.async = () => {//如果调了它，会把同步变成异步
            isSync = false;
            return innerCallback;
        }
        args = convertArgs(args, normalFn.raw)
        args = normalFn.call(loaderContext, args);
        if (isSync) {//如果是同步的话。
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {
            //如果是异步，就不会再递归迭代了
        }
    }
    function iteratePitchingLoaders(loaderContext, finalCallback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            loaderContext.loaderIndex--;//因为已经越界了,所以让索引减1 
            return processResource(loaderContext, finalCallback);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];//0 获取当前的loaderObject
        let pitchFn = currentLoaderObject.pitch;
        if (!pitchFn) {//如果没有pitch函数，则直接 跳过当前loader,执行下一个loader
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
        let args = pitchFn.call(loaderContext, loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data);
        if (args) {//如果有返回值，则跳过当前和后面的normal函数以及读取模块文件的逻辑 ，直接把结果返回给前一个loader的normal参数
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
    }

}
console.time('cost');
runLoaders(options, (err, result) => {
    //   title//c-loader//b-loader//a-loader
    console.log('经过loader编译后的结果', result);
    console.timeEnd('cost');
});

###### 样式处理
css-loader 的作用是处理css中的 @import 和 url 这样的外部资源
style-loader 的作用是把样式插入到 DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的 innerHTML里
less-loader 把less编译成css
pitching-loader
loader-utils
!!

1. loader类型
loader的叠加顺序 = post(后置)+inline(内联)+normal(正常)+pre(前置)
let result = [useLoadersPost,useLoaders,useLoadersPre];
loaders = results[0].concat(loaders, results[1], results[2]);
useLoadersPost+inlineLoader+useLoaders(normal loader)+useLoadersPre
Configuration

|符号|变量|含义|
|:-|:-|:-|	
|-!|noPreAutoLoaders|不要前置和普通loader	Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders|
|!|noAutoLoaders|不要普通loader	Prefixing with ! will disable all configured normal loaders|
|!!|noPrePostAutoLoaders|不要前后置和普通loader,只要内联loader	Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders)|

2. 使用less-loader


- src\index.js
import './index.less';
 
- src\index.less
@color:red;
#root{
    color:@color;
}

- src\index.html
<div id="root">hello</div>

- webpack.config.js
{
  test: /\.less$/,
  use: [
    'style-loader',
    'less-loader'
  ]
}

###### less-loader.js
let less = require('less');
function loader(source) {
    let callback = this.async();
    less.render(source, { filename: this.resource }, (err, output) => {
        callback(err, output.css);
    });
}
module.exports = loader;

###### style-loader
function loader(source) {
  let script=(`
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(style);
  module.exports = "";
  `);
  return script;
} 
module.exports = loader;

###### 两个左侧模块连用

- less-loader.js
let less = require('less');
function loader(source) {
    let callback = this.async();
    less.render(source, { filename: this.resource }, (err, output) => {
        callback(err, `module.exports = ${JSON.stringify(output.css)}`);
    });
}
module.exports = loader;

- style-loader.js
let loaderUtils = require("loader-utils");
function loader(source) {

}
//https://github.com/webpack/webpack/blob/v4.39.3/lib/NormalModuleFactory.js#L339
loader.pitch = function (remainingRequest, previousRequest, data) {
  //C:\webpack-analysis2\loaders\less-loader.js!C:\webpack-analysis2\src\index.less
  console.log('previousRequest', previousRequest);//之前的路径
  //console.log('currentRequest', currentRequest);//当前的路径
  console.log('remainingRequest', remainingRequest);//剩下的路径
  console.log('data', data);
  // !! noPrePostAutoLoaders 不要前后置和普通loader
  //__webpack_require__(/*! !../loaders/less-loader.js!./index.less */ "./loaders/less-loader.js!./src/index.less");
  let style = `
    var style = document.createElement("style");
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
    document.head.appendChild(style);
 `;
  return style;
}
module.exports = loader;

- css-loader.js
css-loader 的作用是处理css中的 @import 和 url 这样的外部资源
postcss
Avoid CSS @import CSS @importallows stylesheets to import other stylesheets. When CSS @import isused from an external stylesheet, the browser is unable to downloadthe stylesheets in parallel, which adds additional round-trip timesto the overall page load.
1. src\index.js
require('./style.css');

2. src\style.css
@import './global.css';
.avatar {
  width: 100px;
  height: 100px;
  background-image: url('./baidu.png');
  background-size: cover;
}
div{
  color:red;
}

3. src\global.css
body {
    background-color: green;
}

4. webpack.config.js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
},
{
  test: /\.png$/,
  use: [
    'file-loader'
  ]
}

5. css-loader.js
var postcss = require("postcss");
var loaderUtils = require("loader-utils");
var Tokenizer = require("css-selector-tokenizer");

const cssLoader = function (inputSource) {
    const cssPlugin = (options) => {
        return (root) => {
            root.walkAtRules(/^import$/i, (rule) => {
                rule.remove();
                options.imports.push(rule.params.slice(1, -1));
            });
            root.walkDecls((decl) => {
                var values = Tokenizer.parseValues(decl.value);
                values.nodes.forEach(function (value) {
                    value.nodes.forEach(item => {
                        if (item.type === "url") {
                            item.url = "`+require(" + loaderUtils.stringifyRequest(this, "!!" + item.url) + ")+`";
                        }
                    });
                });
                decl.value = Tokenizer.stringifyValues(values);
            });
        };
    }

    let callback = this.async();
    let options = { imports: [] };
    let pipeline = postcss([cssPlugin(options)]);
    pipeline.process(inputSource).then((result) => {
        let importCss = options.imports.map(url => "`+require(" + loaderUtils.stringifyRequest(this, "!!css-loader!" + url) + ")+`").join('\r\n');
        callback(
            null,
            'module.exports=`' + importCss + '\r\n' + result.css + '`'
        );
    });
};

module.exports = cssLoader;

##### 参考
1. PostCSS
- PostCSS是一个用 JavaScript 工具和插件转换 CSS 代码的工具
- 增强代码的可读性
- 将未来的 CSS 特性带到今天！
- 终结全局 CSS
- 避免 CSS 代码中的错误
- 强大的网格系统

2. 文档
- api
- astexplorer postcss会帮我们分析出css的抽象语法树

3. 类型
- CSS AST主要有3种父类型
  - AtRule @xxx的这种类型，如@screen
  - Comment 注释
  - Rule 普通的css规则
- 子类型
  - decl 指的是每条具体的css规则
  - rule 作用于某个选择器上的css规则集合

4. AST节点
- nodes: CSS规则的节点信息集合
  - decl: 每条css规则的节点信息
  - prop: 样式名,如width
  - value: 样式值,如10px
- type: 类型
- source: 包括start和end的位置信息，start和end里都有line和column表示行和列
- selector: type为rule时的选择器
- name: type为atRule时@紧接rule名，譬如@import 'xxx.css'中的import
- params: type为atRule时@紧接rule名后的值，譬如@import 'xxx.css'中的xxx.css
- text: type为comment时的注释内容

5. 操作方法

- 遍历
  - walk: 遍历所有节点信息，无论是atRule、rule、comment的父类型，还是rule、 decl的子类型
  - walkAtRules：遍历所有的AtRules
  - walkComments 遍历所有的Comments
  - walkDecls 遍历所有的Decls
  - walkRules 遍历所有的Rules

root.walkDecls(decl => {
    decl.prop = decl.prop.split('').reverse().join('');
});

- 处理
  - postCss给出了很多操作css规则的方法
  - api
  - 处理css的方式其实有2种：编写postcss plugin，如果你的操作非常简单也可以直接利用postcss.parse方法拿到css ast后分析处理

- postcss plugin
  - postcss插件如同babel插件一样，有固定的格式
  - 注册个插件名，并获取插件配置参数opts
  - 返回值是个函数，这个函数主体是你的处理逻辑，有2个参数，一个是root,AST的根节点。另一个是result，返回结果对象，譬如result.css，获得处理结果的css字符串

export default postcss.plugin('postcss-plugin-name', function (opts) {
  opts = opts || {};
  return function (root, result) {
    // 处理逻辑
  };
});

- 直接调用postcss命名空间下的方法
  - 可以用postcss.parse来处理一段css文本，拿到css ast，然后进行处理，再通过调用toResult().css拿到处理后的css输出

#### plugin

##### plugin
插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。创建插件比创建 loader 更加高级，因为你将需要理解一些 webpack 底层的内部特性来做相应的钩子

###### 为什么需要一个插件
- webpack基础配置无法满足需求
- 插件几乎能够任意更改webpack编译结果
- webpack内部也是通过大量内部插件实现的

###### 可以加载插件的常用对象
|对象|钩子|
|:-|:-|
|Compiler|run,compile,compilation,make,emit,done|
|Compilation|buildModule,normalModuleLoader,succeedModule,finishModules,seal,optimize,after-seal|
|Module|Factory	beforeResolver,afterResolver,module,parser|
|Module||	
|Parser|program,statement,call,expression|
|Template|hash,bootstrap,localVars,render|

##### 创建插件
webpack 插件由以下组成：
- 一个 JavaScript 命名函数。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。

##### Compiler 和 Compilation
在插件开发中最重要的两个资源就是compiler和compilation对象。理解它们的角色是扩展webpack引擎重要的第一步。
- compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
- compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

##### 基本插件架构 
- 插件是由「具有 apply 方法的 prototype 对象」所实例化出来的
- 这个 apply 方法在安装插件时，会被 webpack compiler 调用一次
- apply 方法可以接收一个 webpack compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象

###### 使用插件代码
[使用插件]https://github.com/webpack/webpack/blob/master/lib/webpack.js#L60-L69)
if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
        plugin.apply(compiler);
    }
}

###### Compiler插件
done: new AsyncSeriesHook(["stats"])

1. 同步
class DonePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log('Hello ', this.options.name);
        });
    }
}
module.exports = DonePlugin;

2. 异步
class DonePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
            console.log('Hello ', this.options.name);
            callback();
        });
    }
}
module.exports = DonePlugin;

3. 使用插件
要安装这个插件，只需要在你的 webpack 配置的 plugin 数组中添加一个实例
const DonePlugin=require('./plugins/DonePlugin');
module.exports={
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename:'bundle.js'
    },
    plugins: [
        new DonePlugin({name:'zfpx'})
    ]
}

4. 触发钩子执行
done
if (this.hooks.shouldEmit.call(compilation) === false) {
    const stats = new Stats(compilation);
    stats.startTime = startTime;
    stats.endTime = Date.now();
    this.hooks.done.callAsync(stats, err => {
        if (err) return finalCallback(err);
        return finalCallback(null, stats);
    });
    return;
}

##### compilation插件
使用 compiler 对象时，你可以绑定提供了编译 compilation 引用的回调函数，然后拿到每次新的 compilation 对象。这些 compilation 对象提供了一些钩子函数，来钩入到构建流程的很多步骤中

###### asset-plugin.js
class AssetPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('AssetPlugin', function (compilation) {
            compilation.hooks.chunkAsset.tap('AssetPlugin', function (chunk, filename) {
                console.log('filename=', filename);
            });
        });
    }
}
module.exports = AssetPlugin;

###### compilation.call
newCompilation(params) {
    const compilation = this.createCompilation();
    this.hooks.compilation.call(compilation, params);
    return compilation;
}

###### chunkAsset.call
chunk.files.push(file);
this.hooks.chunkAsset.call(chunk, file);
关于 compiler, compilation 的可用回调，和其它重要的对象的更多信息，请查看 插件 文档。

##### 打包zip

###### zip-plugin.js
const { RawSource } = require("webpack-sources");
const JSZip = require("jszip");
const path = require("path");
class ZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let that = this;
        compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
            var zip = new JSZip();
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                zip.file(filename, source);
            }
            zip.generateAsync({ type: "nodebuffer" }).then(content => {
                compilation.assets[that.options.filename] = new RawSource(content);
                callback();
            });
        });
    }
}
module.exports = ZipPlugin;

###### webpack.config.js
webpack.config.js
plugins: [
  new zipPlugin({
    filename: 'assets.zip'
  })
]

##### 自动外链

###### 使用外部类库
- 手动指定 external
- 手动引入 script
能否检测代码中的import自动处理这个步骤?

###### 思路
- 解决import自动处理external和script的问题，需要怎么实现，该从哪方面开始考虑
- 依赖 当检测到有import该library时，将其设置为不打包类似exteral,并在指定模版中加入script,那么如何检测import？这里就用Parser
- external依赖 需要了解external是如何实现的，webpack的external是通过插件ExternalsPlugin实现的，ExternalsPlugin通过tap NormalModuleFactory 在每次创建Module的时候判断是否是ExternalModule
- webpack4加入了模块类型之后，Parser获取需要指定类型moduleType,一般使用javascript/auto即可

###### 使用plugins
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename:'index.html'
    }),
    new AutoExternalPlugin({
        jquery: {
            expose: '$',
            url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
        }
    })
]

###### AutoExternalPlugin
- ExternalsPlugin.js
- ExternalModuleFactoryPlugin
- ExternalModule.js
- parser
- factory
- htmlWebpackPluginAlterAssetTags
const ExternalModule = require('webpack/lib/ExternalModule');
class AutoExternalPlugin {
    constructor(options) {
        this.options = options;
        this.externalModules = {};
    }
    apply(compiler) {
        //1.在解析语法树的过程中查找那些需要外部引入的模块名称
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', normalModuleFactory => {
            normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap('AutoExternalPlugin', parser => {
                    parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
                        if (this.options[source])
                            this.externalModules[source] = true;
                    });
                });
            //2.在生产模块的过程中发现如果是外部模块则返回外部模块
            normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', factory => (data, callback) => {
                const dependency = data.dependencies[0];
                let value = dependency.request;//jquery
                if (this.externalModules[value]) {
                    let varName = this.options[value].expose;
                    callback(null, new ExternalModule(varName, 'window'));
                } else {
                    factory(data, callback);
                }
            });
        });
        compiler.hooks.compilation.tap('AutoExternalPlugin', compilation => {
            //3.向body底部插入全局变量的脚本
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('normalModuleFactory', (htmlPluginData, callback) => {
                Object.keys(this.externalModules).forEach(name => {
                    let src = this.options[name].url;
                    htmlPluginData.body.unshift({
                        tagName: 'script',
                        closeTag: true,
                        attributes: { type: 'text/javascript', src }
                    });
                });
                callback(null, htmlPluginData);
            });
        });
    }
}
module.exports = AutoExternalPlugin;

#### hand

##### 跑通webpack

###### webpack.config.js
const path = require('path');
module.exports = {
    context:process.cwd(),
    mode:'development',
    devtool:'none',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }
}

###### cli.js
const webpack = require("webpack");
const webpackOptions = require("./webpack.config");
const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
  console.log(err);
  console.log(
    stats.toJson({
      entries: true,
      chunks: true,
      modules: true,
      _modules: true,
      assets: true
    })
  );
});

###### index.js
let title = require('./title');
console.log(title);

###### title.js

###### main.js
(function(modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }


    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function(exports, name, getter) {
        if(!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
    };

    // define __esModule on exports
    __webpack_require__.r = function(exports) {
        if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function(value, mode) {
        if(mode & 1) value = __webpack_require__(value);
        if(mode & 8) return value;
        if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
        return ns;
    };
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    // __webpack_public_path__
    __webpack_require__.p = "";
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
 "./src/index.js":
 (function(module, exports, __webpack_require__) {
  let title = __webpack_require__(/*! ./title */ "./src/title.js");
  console.log(title);
 }),
 "./src/title.js":
 (function(module, exports) {
   module.exports = "title";
 })
});

##### 创建Compiler.js

###### webpack\index.js
const NodeEnvironmentPlugin = require("./plugins/NodeEnvironmentPlugin");
const WebpackOptionsApply = require("./WebpackOptionsApply");
const Compiler = require("./Compiler");
function webpack(options) {
  options.context = options.context || path.resolve(process.cwd());
  //创建compiler
  let compiler = new Compiler(options.context);
  //给compiler指定options
  compiler.options = Object.assign(compiler.options, options);
  //设置读写文件的API
  new NodeEnvironmentPlugin().apply(compiler);
  //调用配置文件里配置的插件并依次调用
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler);
    }
  }
  compiler.hooks.environment.call(); //设置变量
  compiler.hooks.afterEnvironment.call(); //设置变量完成后
  new WebpackOptionsApply().process(options, compiler); //处理参数
  return compiler;
}

module.exports = webpack;

###### Compiler.js
const {
  Tapable,
  SyncHook,
  SyncBailHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require("tapable");
class Compiler extends Tapable {
  constructor(context) {
    super();
    this.hooks = {
      environment: new SyncHook([]),
      afterEnvironment: new SyncHook([]),
      afterPlugins: new SyncHook(["compiler"])
    };
    this.options = {};
    this.context = context; //设置上下文路径
  }
  run() {
    console.log("开始编译");
  }
}
module.exports = Compiler;

###### NodeEnvironmentPlugin.js
const fs = require("fs");
class NodeEnvironmentPlugin {
  apply(compiler) {
    compiler.inputFileSystem = fs; //设置读文件的模块
    compiler.outputFileSystem = fs; //设置写文件的模块
  }
}
module.exports = NodeEnvironmentPlugin;

###### WebpackOptionsApply.js
module.exports = class WebpackOptionsApply {
  process(options, compiler) {
    //插件绑定结束
    compiler.hooks.afterPlugins.call(compiler);
  }
};

##### 监听make事件

###### WebpackOptionsApply.js
const EntryOptionPlugin = require("./plugins/EntryOptionPlugin");
module.exports = class WebpackOptionsApply {
  process(options, compiler) {
     //挂载入口文件插件
    new EntryOptionPlugin().apply(compiler);
    //触发entryOption事件执行
    compiler.hooks.entryOption.call(options.context, options.entry);
    //插件绑定结束
    compiler.hooks.afterPlugins.call(compiler);
  }
};

###### EntryOptionPlugin.js
const SingleEntryPlugin = require("./SingleEntryPlugin");
class EntryOptionPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
      new SingleEntryPlugin(context, entry, "main").apply(compiler);
    });
  }
}

module.exports = EntryOptionPlugin;

###### SingleEntryPlugin.js
module.exports = class EntryOptionPlugin {
  constructor(context, entry, name) {
    this.context = context;
    this.entry = entry;
    this.name = name;
  }
  apply(compiler) {
    compiler.hooks.make.tapAsync(
      "SingleEntryPlugin",
      (compilation, callback) => {
          //入口文件 代码块的名称 context上下文绝对路径
        const { entry, name, context } = this;
        compilation.addEntry(context, entry, name, callback);
      }
    );
  }
};

##### make

###### webpack\Compiler.js

const {Tapable,SyncHook,SyncBailHook,AsyncSeriesHook,AsyncParallelHook} = require("tapable");
const Compilation  = require('./Compilation');
class Compiler extends Tapable {
  constructor(context) {
    super();
    this.hooks = {
      environment: new SyncHook([]),
      afterEnvironment: new SyncHook([]),
      afterPlugins: new SyncHook(["compiler"]),
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      done: new AsyncSeriesHook(["stats"])
    };
    this.options = {};
    this.context = context; //设置上下文路径
  }

  run(finalCallback) {
    //编译完成后的回调
    const onCompiled = (err, compilation) => {
     
    };
    //准备运行编译
    this.hooks.beforeRun.callAsync(this, err => {
      //运行
      this.hooks.run.callAsync(this, err => {
        //开始编译,编译完成后执行conCompiled回调
        this.compile(onCompiled);
      });
    });
  }
  newCompilation(params){
    const compilation = new Compilation(this);
    this.hooks.thisCompilation.call(compilation, params);
      this.hooks.compilation.call(compilation, params);
    return compilation;
  }
  compile(onCompiled){
    this.hooks.beforeCompile.callAsync({}, err => {
      this.hooks.compile.call();
      const compilation = this.newCompilation();
      this.hooks.make.callAsync(compilation, err => {
          console.log(err,'make完成')
      });
    });
  }
}
module.exports = Compiler;

###### Compilation.js
const normalModuleFactory = require('./NormalModuleFactory');
const {Tapable,SyncHook,SyncBailHook,AsyncSeriesHook,AsyncParallelHook} = require("tapable");
const path = require('path');
class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
            this.outputFileSystem = compiler.outputFileSystem;
        this.hooks = {
          addEntry: new SyncHook(["entry", "name"])
        }
        this.entries=[];
    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, finallyCallback) {
      this.hooks.addEntry.call(entry, name);//开始增加入口
      this._addModuleChain(context,entry,name);
      finallyCallback();
   }
   _addModuleChain(context,entry,name){
     let module = normalModuleFactory.create(
         {name,  //模块所属的代码块的名称
         context:this.context,//上下文
         request:path.posix.join(context,entry)});//模块完整路径
     module.build(this);//开始编译模块
     this.entries.push(module);//把编译好的模块添加到入口列表里面
   }
}
module.exports = Compilation;

###### NormalModuleFactory.js
const path = require("path");
const NormalModule = require('./NormalModule');
class NormalModuleFactory{
  create(data) {
    return new NormalModule(data);
  }
}
module.exports = new NormalModuleFactory();

###### NormalModule.js
class NormalModule{
    constructor({name,context,request}){
      this.name = name;
      this.context = context;
      this.request = request;  
    }
    build(compilation){
        console.log('开始编译入口模块');
    }
}
module.exports = NormalModule;

##### build

###### Compilation.js
const normalModuleFactory = require('./NormalModuleFactory');
const {Tapable,SyncHook,SyncBailHook,AsyncSeriesHook,AsyncParallelHook} = require("tapable");
const path = require('path');
class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
            this.outputFileSystem = compiler.outputFileSystem;
        this.hooks = {
          addEntry: new SyncHook(["entry", "name"])
        }
        this.entries=[];
        this._modules = {}; //模块代码
        this.modules=[];
    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, finallyCallback) {
      this.hooks.addEntry.call(entry, name);//开始增加入口
      this._addModuleChain(context,entry,name);
      console.log('编译完成');
      console.log(this);
      finallyCallback();
   }
   //增加模块链
   _addModuleChain(context,entry,name){
     let module = normalModuleFactory.create(
         {name,  //模块所属的代码块的名称
         context:this.context,//上下文
         request:path.posix.join(context,entry)});//模块完整路径
     module.build(this);//开始编译模块
     this.entries.push(module);//把编译好的模块添加到入口列表里面
   }
   //编译依赖的模块
   buildDependencies(module,dependencies){
    module.dependencies = dependencies.map(data =>{//映射老模块到新的模块
       let module = normalModuleFactory.create(data);//创建新的模块
       return module.build(this);//编译模块并返回自己
    });
  }
}
module.exports = Compilation;

###### NormalModule.js
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const babylon = require('babylon');
const t = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;
class NormalModule{
    constructor({name,context,request}){
      this.name = name;
      this.context = context;
      this.request = request;  
      this.dependencies = [];
      this.moduleId;
      this._ast;
      this._source;
    }
    build(compilation){
        let originalSource = compilation.inputFileSystem.readFileSync(this.request,'utf8');
        const ast = babylon.parse(originalSource);
        let dependencies = [];
        traverse(ast,{
            CallExpression:(nodePath)=>{
                if (nodePath.node.callee.name == 'require') {
                    //获取当前节点
                    let node = nodePath.node;
                    //修改require为__webpack_require__
                    node.callee.name = '__webpack_require__';
                    //获取要加载的模块ID
                    let moduleName = node.arguments[0].value;
                    let extension = moduleName.split(path.posix.sep).pop().indexOf('.')==-1?'.js':'';
                    //获取依赖模块的绝对路径
                    let dependencyRequest = path.posix.join(path.posix.dirname(this.request),moduleName+extension);
                    //获取依赖模块的模块ID
                    let dependencyModuleId = './'+path.posix.relative(this.context,dependencyRequest);
                    //把依赖对象添加到依赖列表里
                    dependencies.push({name:this.name,context:this.context,request:dependencyRequest});
                    //修改加载的模块ID名称
                    node.arguments = [t.stringLiteral(dependencyModuleId)];
                }
            }
        });
        //生成新的代码
        let {code} = generate(ast);
        //获取模块的来源代码
        this._source = code;
        //获得语法树
        this._ast = ast;
        //获取模块ID
        this.moduleId = './'+path.posix.relative(this.context,this.request);
        //添加到模块数组里
        compilation.modules.push(this);
        //KEY为模块的绝对路径 值为模块转译后的代码
        compilation._modules[this.request] = code;
        //编译依赖项
        compilation.buildDependencies(this,dependencies);
        return this;
    }
}
module.exports = NormalModule;

##### seal封装chunk

###### Compiler.js
this.hooks = {
      compilation: new SyncHook(["compilation", "params"]),
      afterCompile:new SyncHook(["params"]),
      done: new AsyncSeriesHook(["stats"])
    };

compile(onCompiled){
    this.hooks.beforeCompile.callAsync({}, err => {
      this.hooks.compile.call();
      const compilation = this.newCompilation();
      this.hooks.make.callAsync(compilation, err => {
         compilation.seal(err => {
           this.hooks.afterCompile.callAsync(compilation, err => {
              return onCompiled(null, compilation);
           });
         });
      });
    });
  }

###### Compilation.js
let Chunk = require('./Chunk');
class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.hooks = {
          addEntry: new SyncHook(["entry", "name"]),
          seal: new SyncHook([]),
                beforeChunks: new SyncHook([]),
                afterChunks: new SyncHook(["chunks"])
        }
        this.entries=[];    //入口模块
        this._modules = {}; //模块代码
        this.modules=[];    //所有模块
        this.chunks = [];   //代码块
    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, finallyCallback) {
      this.hooks.addEntry.call(entry, name);//开始增加入口
      this._addModuleChain(context,entry,name);
      finallyCallback();
   }

  seal(callback){
    this.hooks.seal.call();
    this.hooks.beforeChunks.call();//生成代码块之前
    for (const module of this.entries) {//循环入口模块
      const chunk = new Chunk(module);//创建代码块
          this.chunks.push(chunk);//把代码块添加到代码块数组中
      //把代码块的模块添加到代码块中
      chunk.modules = this.modules.filter(module=>module.name == chunk.name);
    }
    this.hooks.afterChunks.call(this.chunks);//生成代码块之后
    callback();//封装结束
  }
}
module.exports = Compilation;

##### emit

###### Compiler.js
const {Tapable,SyncHook,SyncBailHook,AsyncSeriesHook,AsyncParallelHook} = require("tapable");
const Compilation  = require('./Compilation');
const Stats = require('./Stats');
const mkdirp = require('mkdirp');
const path = require('path');
class Compiler extends Tapable {
  constructor(context) {
    super();
    this.hooks = {
      environment: new SyncHook([]),
      afterEnvironment: new SyncHook([]),
      afterPlugins: new SyncHook(["compiler"]),
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      afterCompile:new SyncHook(["params"]),
      emit: new AsyncSeriesHook(["compilation"]),
      done: new AsyncSeriesHook(["stats"])
    };
    this.options = {};
    this.context = context; //设置上下文路径
  }
   emitAssets(compilation,callback){
     const emitFiles = err => {
       let assets = compilation.assets;
       for(let file in assets){
         let source = assets[file];
         const targetPath = path.posix.join(this.options.output.path,file);
         let content = source;
         this.outputFileSystem.writeFileSync(targetPath, content);
       }
       callback();
     }
    this.hooks.emit.callAsync(compilation, err => {
            mkdirp(this.options.output.path, emitFiles);
        });
  }
  run(finalCallback) {
    //编译完成后的回调
    const onCompiled = (err, compilation) => {
       this.emitAssets(compilation, err => {
         const stats = new Stats(compilation);
         this.hooks.done.callAsync(stats, err => {
            return finalCallback(null, stats);
         });
       })
    };
    //准备运行编译
    this.hooks.beforeRun.callAsync(this, err => {
      //运行
      this.hooks.run.callAsync(this, err => {
        //开始编译,编译完成后执行conCompiled回调
        this.compile(onCompiled);
      });
    });
  }
  newCompilation(params){
    const compilation = new Compilation(this);
    this.hooks.thisCompilation.call(compilation, params);
      this.hooks.compilation.call(compilation, params);
    return compilation;
  }
  compile(onCompiled){
    this.hooks.beforeCompile.callAsync({}, err => {
      this.hooks.compile.call();
      const compilation = this.newCompilation();
      this.hooks.make.callAsync(compilation, err => {
          compilation.seal(err => {
            this.hooks.afterCompile.callAsync(compilation, err => {
              return onCompiled(null, compilation);
            });
          });
      });
    });
  }
}
module.exports = Compiler;

###### Compilation.js

webpack\Compilation.js

const normalModuleFactory = require('./NormalModuleFactory');
const {Tapable,SyncHook,SyncBailHook,AsyncSeriesHook,AsyncParallelHook} = require("tapable");
const path = require('path');
const Chunk = require('./Chunk');
const fs = require('fs');
const ejs = require('ejs');
const mainTemplate = fs.readFileSync(path.join(__dirname, 'main.ejs'), 'utf8');
const mainRender = ejs.compile(mainTemplate);
class Compilation extends Tapable {
    constructor(compiler) {
        super();
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
            this.outputFileSystem = compiler.outputFileSystem;
        this.hooks = {
          addEntry: new SyncHook(["entry", "name"]),
          seal: new SyncHook([]),
                beforeChunks: new SyncHook([]),
                afterChunks: new SyncHook(["chunks"])
        }
        this.entries=[];    //入口模块
        this._modules = {}; //模块代码
        this.modules=[];    //所有模块
        this.chunks = [];   //代码块
        this.files=[];
        this.assets = {};   //资源 
    }
    //context ./src/index.js main callback(终级回调)
    addEntry(context, entry, name, finallyCallback) {
      this.hooks.addEntry.call(entry, name);//开始增加入口
      this._addModuleChain(context,entry,name);
      finallyCallback();
   }
   //增加模块链
   _addModuleChain(context,entry,name){
     let module = normalModuleFactory.create(
         {name,  //模块所属的代码块的名称
         context:this.context,//上下文
         request:path.posix.join(context,entry)});//模块完整路径
     module.build(this);//开始编译模块
     this.entries.push(module);//把编译好的模块添加到入口列表里面
   }
   //编译依赖的模块
   buildDependencies(module,dependencies){
    module.dependencies = dependencies.map(data =>{//映射老模块到新的模块
       let module = normalModuleFactory.create(data);//创建新的模块
       return module.build(this);//编译模块并返回自己
    });
  }
  seal(callback){
    this.hooks.seal.call();
    this.hooks.beforeChunks.call();//生成代码块之前
    for (const module of this.entries) {//循环入口模块
      const chunk = new Chunk(module);//创建代码块
          this.chunks.push(chunk);//把代码块添加到代码块数组中
      //把代码块的模块添加到代码块中
      chunk.modules = this.modules.filter(module=>module.name == chunk.name);
    }
    this.hooks.afterChunks.call(this.chunks);//生成代码块之后
    this.createChunkAssets();
    callback();//封装结束
  }
   createChunkAssets(){
     for (let i = 0; i < this.chunks.length; i++) {
       const chunk = this.chunks[i];
       chunk.files = [];
             const file = chunk.name+'.js';
       const source = mainRender({ entryId:chunk.entryModule.moduleId, modules:chunk.modules});
       chunk.files.push(file);
       this.emitAsset(file, source);
     }
   }
   emitAsset(file, source){
      this.assets[file] = source;
      this.files.push(file);
   }
}
module.exports = Compilation;

###### main.ejs
(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.l = true;
      return module.exports;
    }
    return __webpack_require__(__webpack_require__.s = "<%-entryId%>");
  })
    ({
        <%
          for(let id in modules){
              let {moduleId,_source} = modules[id];%>
              "<%-moduleId%>":
              (function (module, exports,__webpack_require__) {
                <%-_source%>
              }),
           <%}
        %>
    });

###### Stats.js
class Stats{
    constructor(compilation){
        this.files = compilation.files;
        this.modules = compilation.modules;
        this.chunks = compilation.chunks;
    }
}
module.exports = Stats;

##### 支持loader

###### NormalModule.js
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const babylon = require('babylon');
const t = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;
class NormalModule{
    constructor({name,context,request}){
      this.name = name;
      this.context = context;
      this.request = request;  
      this.dependencies = [];
      this.moduleId;
      this._ast;
      this._source;
    }
    getSource(request,compilation){
        let source = compilation.inputFileSystem.readFileSync(this.request,'utf8');
        let { module: { rules } } = compilation.options;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule.test.test(request)) {
                let loaders = rule.use;
                let loaderIndex = loaders.length - 1;
                let iterateLoaders = ()=>{
                    let loaderName = loaders[loaderIndex];
                    let loader = require(path.resolve(this.context, 'loaders', loaderName));
                    source = loader(source);
                    if (loaderIndex > 0) {
                        loaderIndex--;
                        iterateLoaders();
                    }
                }
                iterateLoaders();
                break;
            }
        }
        return source;
    }
    build(compilation){
        let originalSource = this.getSource(this.request,compilation);
        const ast = babylon.parse(originalSource);
        let dependencies = [];
        traverse(ast,{
            CallExpression:(nodePath)=>{
                if (nodePath.node.callee.name == 'require') {
                    //获取当前节点
                    let node = nodePath.node;
                    //修改require为__webpack_require__
                    node.callee.name = '__webpack_require__';
                    //获取要加载的模块ID
                    let moduleName = node.arguments[0].value;
                    let extension = moduleName.split(path.posix.sep).pop().indexOf('.')==-1?'.js':'';
                    //获取依赖模块的绝对路径
                    let dependencyRequest = path.posix.join(path.posix.dirname(this.request),moduleName+extension);
                    //获取依赖模块的模块ID
                    let dependencyModuleId = './'+path.posix.relative(this.context,dependencyRequest);
                    //把依赖对象添加到依赖列表里
                    dependencies.push({name:this.name,context:this.context,request:dependencyRequest});
                    //修改加载的模块ID名称
                    node.arguments = [t.stringLiteral(dependencyModuleId)];
                }
            }
        });
        //生成新的代码
        let {code} = generate(ast);
        //获取模块的来源代码
        this._source = code;
        //获得语法树
        this._ast = ast;
        //获取模块ID
        this.moduleId = './'+path.posix.relative(this.context,this.request);
        //添加到模块数组里
        compilation.modules.push(this);
        //KEY为模块的绝对路径 值为模块转译后的代码
        compilation._modules[this.request] = code;
        //编译依赖项
        compilation.buildDependencies(this,dependencies);
        return this;
    }
}
module.exports = NormalModule;

###### index.js
require('./index.less');
let title = require('./title');
console.log(title);

###### src\index.less
@color:red;
body{
    background-color:@color;
}

###### less-loader.js
var less = require('less');
module.exports = function (source) {
    let css;
    less.render(source, (err, output) => {
        css = output.css;
    });
    return css;
}

###### style-loader.js
module.exports = function (source) {
    let str = `
      let style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(source)};
      document.head.appendChild(style);
    `;
    return str;
}

#### prepare

##### yargs
yargs模块能够解决如何处理命令行参数

###### 安装
cnpm install yargs --save

###### 读取命令行参数
yargs模块提供了argv对象，用来读取命令行参数

- hello.js
#!/usr/bin/env node
let argv = require('yargs')
    .alias('n', 'name')//还可以指定参数别名  -n的别名是--name
    .demand(['n'])//是否必填
    .default({ name: 'zhufeng' })//默认值
    .describe({ name: '你的姓名' })// 参数描述
    .boolean(['private'])
    .argv;
console.log(process.argv);
console.log(argv);
console.log('hello', argv.name);
console.log(argv._);//argv对象有一个下划线属性，可以获取非连词线开头的参数

#!/usr/bin/env node
let argv = require('yargs')
    .option('n',//参数n
        {
            alias: 'name',//别名name
            demand: true,//必填
            default: 'zhufeng',//默认值
            describe: '你的姓名',//描述
            type: 'string',//参数类型
        }).usage('Usage: hello [options]')// 用法格式
    .example('hello -n zhufeng', 'hello zhufeng')//示例
    .help('h')//显示帮助 信息
    .alias('h', 'help')//显示帮助信息
    .epilog('copyright 2019')//出现在帮助信息的结尾
    .argv
console.log(process.argv);
console.log(argv);
console.log('hello', argv.name);
console.log(argv._);//argv对象有一个下划线属性，可以获取非连词线开头的参数

##### Semaphore
- this.semaphore
- Semaphore.js
- Semaphore
- Semaphore(信号量)控制并发访问量

###### 使用Semaphore
let Semaphore = require('semaphore');
let semaphore = new Semaphore(2);
console.time('cost');
semaphore.take(function () {
    setTimeout(() => {
        console.log(1);
        semaphore.leave();
    }, 1000);
});
semaphore.take(function () {
    setTimeout(() => {
        console.log(1);
        semaphore.leave();
    }, 2000);
});
semaphore.take(function () {
    console.log(3);
    semaphore.leave();
    console.timeEnd('cost');
});

###### 实现Semaphore
class Semaphore {
    constructor(available) {
        this.available = available;
        this.waiters = [];
        this._continue = this._continue.bind(this);
    }

    take(callback) {
        if (this.available > 0) {
            this.available--;
            callback();
        } else {
            this.waiters.push(callback);
        }
    }

    leave() {
        this.available++;
        if (this.waiters.length > 0) {
            process.nextTick(this._continue);
        }
    }

    _continue() {
        if (this.available > 0) {
            if (this.waiters.length > 0) {
                this.available--;
                const callback = this.waiters.pop();
                callback();
            }
        }
    }
}

###### webpack中的Semaphore
class Semaphore {
    constructor(available) {
        this.available = available;
        this.waiters = [];
        this._continue = this._continue.bind(this);
    }

    acquire(callback) {
        if (this.available > 0) {
            this.available--;
            callback();
        } else {
            this.waiters.push(callback);
        }
    }

    release() {
        this.available++;
        if (this.waiters.length > 0) {
            process.nextTick(this._continue);
        }
    }

    _continue() {
        if (this.available > 0) {
            if (this.waiters.length > 0) {
                this.available--;
                const callback = this.waiters.pop();
                callback();
            }
        }
    }
}

##### neo-async
- webpack\lib\Compilation.js
- neo-async
- neo-async库和async库类似，都是为异步编程提供一些工具方法，但是会比async库更快

###### 使用
let {forEach} = require('neo-async');
console.time('cost');
let array = [1, 2, 3];
forEach(array, function (num, done) {
    setTimeout(function () {
        console.log(num);
        done();
    }, num * 1000);
}, function (err) {
    console.timeEnd('cost');
});

###### 实现
function forEach(array, iterator, callback) {
    let length = array.length;
    function done() {
        if (--length == 0)
            callback();
    }
    array.forEach((item, index) => {
        iterator(item, done);
    });
}

##### acorn

###### 介绍
- astexplorer可以把代码转成语法树
- acorn A small, fast, JavaScript-based JavaScript parser
- acorn 解析结果符合The Estree Spec规范(（这是 Mozilla 的工程师给出的 SpiderMonkey 引擎输出的 JavaScript AST 的规范文档SpiderMonkey)
ast

const ast = acorn.parse(code, options);

###### 配置项
- ecmaVersion 你要解析的 JavaScript 的 ECMA 版本,默认是 ES7
- sourceType 这个配置项有两个值：module 和 script，默认是 script.主要是严格模式和 import/export 的区别.
- locations 默认值是 false，设置为 true 之后会在 AST 的节点中携带多一个 loc 对象来表示当前的开始和结束的行数和列数。
- onComment 传入一个回调函数，每当解析到代码中的注释时会触发，可以获取当年注释内容，参数列表是：[block, text, start, end],block 表示是否是块注释，text 是注释内容，start 和 end 是注释开始和结束的位置

###### 查找依赖
const acorn = require("acorn")
const walk = require("acorn-walk");
const escodegen = require('escodegen');
const ast = acorn.parse(`
import $ from 'jquery';
let _ = require('lodash');
`, { locations: true, ranges: true, sourceType: 'module', ecmaVersion: 8 });
let resources = [];
walk.simple(ast, {
    CallExpression(node) {
        if (
            node.type === 'CallExpression' &&
            node.callee.type === 'Identifier' &&
            node.callee.name === 'require' &&
            node.arguments.length === 1 &&
            node.arguments[0].type === 'Literal'
        ) {
            const args = node.arguments;
            resources.push({
                module: args[0].value
            })
        }
    },
    ImportDeclaration(node) {
        node.specifiers[0].local.name = 'jQuery';
        resources.push({
            module: node.source.value
        })
    }
})
console.log('resources', resources);
let result = escodegen.generate(ast);
console.log(result);