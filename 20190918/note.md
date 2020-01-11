## webpack

### webpack-common

#### file

##### 预备知识

###### toStringTag
Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。

console.log(Object.prototype.toString.call('foo'));     // "[object String]"
console.log(Object.prototype.toString.call([1, 2]));    // "[object Array]"
console.log(Object.prototype.toString.call(3));         // "[object Number]"
console.log(Object.prototype.toString.call(true));      // "[object Boolean]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null));      // "[object Null]"
let myExports={};
Object.defineProperty(myExports, Symbol.toStringTag, { value: 'Module' });
console.log(Object.prototype.toString.call(myExports));

###### Object.create(null)
- 使用create创建的对象，没有任何属性,把它当作一个非常纯净的map来使用，我们可以自己定义hasOwnProperty、toString方法,完全不必担心会将原型链上的同名方法覆盖掉
- 在我们使用for..in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了
var ns = Object.create(null);
if (typeof Object.create !== "function") {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}
console.log(ns)
console.log(Object.getPrototypeOf(ns));

###### getter
- defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    - obj 要在其上定义属性的对象。
    - prop 要定义或修改的属性的名称。
    - descriptor 将被定义或修改的属性描述符。

- 描述符可同时具有的键值

configurable | enumerable | value | writable | get | set
数据描述符 | Yes | Yes | Yes | Yes | No | No
存取描述符 | Yes | Yes | No | No | Yes | Yes

- 示例
var ageValue = 10;
let obj = {};
Object.defineProperty(obj, "age", {
    //value: 10,//数据描述符和存取描述符不能混合使用
    get() {
        return ageValue;
    },
    set(newValue) {
        ageValue = newValue;
    },
    //writable: true,//是否可修改
    enumerable: true,//是否可枚举
    configurable: true//是否可配置可删除
});
Object.defineProperty(obj, "name", {
    value: 'zhufeng',//数据描述符和存取描述符不能混合使用
    writable: true,//是否可修改
    enumerable: true,//是否可枚举
    configurable: true//是否可配置可删除
});
console.log(obj.age, obj.name);
obj.age = 100;
obj.name = 'jiagou';
console.log(obj.age, obj.name);

##### 同步加载

###### webpack.config.js
const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:"none",
  context: process.cwd(),
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer:{
    contentBase:path.resolve(__dirname,'./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets:["@babel/preset-env"]
          }
        },
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};

###### index.js
src\index.js

let title = require('./title.js');
console.log(title);

###### title.js
src\title.js
module.exports = "title";

###### 打包文件分析
(function(modules) {
  // webpack的启动函数
  //模块的缓存
  var installedModules = {};
  //定义在浏览器中使用的require方法
  function __webpack_require__(moduleId) {
    //检查模块是否在缓存中
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    //创建一个新的模块并且放到模块的缓存中
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });

    //执行模块函数
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    //把模块设置为已经加载
    module.l = true;

    //返回模块的导出对象
    return module.exports;
  }

  //暴露出模块对象
  __webpack_require__.m = modules;

  //暴露出模块缓存
  __webpack_require__.c = installedModules;

  //为harmony导出定义getter函数
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  //在导出对象上定义__esModule属性
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };

  /**
   * 创建一个模拟的命名空间对象
   * mode & 1 value是模块ID直接用__webpack_require__加载
   * mode & 2 把所有的属性合并到命名空间ns上
   * mode & 4 当已经是命名空间的时候(__esModule=true)可以直接返回值
   * mode & 8|1 行为类似于require
   */
  __webpack_require__.t = function(value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null); //定义一个空对象
    __webpack_require__.r(ns);
    Object.defineProperty(ns, "default", { enumerable: true, value: value });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport函数为了兼容那些非non-harmony模块
  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };

  //判断对象身上是否拥有此属性
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  //公共路径
  __webpack_require__.p = "";

  //加载入口模块并且返回导出对象
  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
  "./src/index.js": function(module, exports, __webpack_require__) {
    var title = __webpack_require__("./src/title.js");
    console.log(title);
  },
  "./src/title.js": function(module, exports) {
    module.exports = "title";
  }
});

###### 实现

- webpack_require

实现require方法
(function(modules){
    var installedModules = {};
    function __webpack_require__(moduleId){
        if(installedModules[moduleId]){
            return installedModules[moduleId];
        }
        var module = installedModules[moduleId] = {
            i:moduleId,
            l:false,
            exports:{}
        }
        modules[moduleId].call(modules.exports,module,module.exports,__webpack_require__);
        module.l = true;
        return module.exports;
    }
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
    "./src/index.js":function(module,exports,__webpack_require__){
        var title = __webpack_require__('./src/title.js');
        console.log(title);
    },
    "./src/title.js":function(module,exports){
       module.exports = "title";
    }
})

- d(defineProperty)
通过getter的方式增加属性
function d(exports, name, getter) {
    if (!exports.hasOwnProperty(name)) {
        Object.defineProperty(exports, name, { get: getter });
    }
}

let obj = {};
function ageGetter() {
    return 10;
}
d(obj, 'age', ageGetter);
console.log(obj.age);

- r
表示此对象是一个ES6模块对象
function r(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  Object.defineProperty(exports, '__esModule', { enumerable: true, value: true });
};
let obj2 = {};
r(obj2);
console.log(obj2);

- n
获取此对象的默认导出
function n(module) {
    var getter = module.__esModule ?
        function () { return module['default']; } :
        function () { return module; };
    d(getter, 'a', getter);
    return getter;
};
let m = { age: 10 };
let getter = n(m);
console.log(getter.a);
let m2 = { default: { age: 20 }, __esModule: true };
let getter2 = n(m2);
console.log(getter2.a);

- t
把任意模块包装成ES6模块
mode & 1: value is a module id, require it 表示传的是模块ID
mode & 2: merge all properties of value into the ns 需要合并属性
mode & 4: return value when already ns object 如果是ES6模块直接返回
mode & 8|1: behave like require 等同于require方法
let modules = {
    //相当于require
    'moduleA': function (module, exports) {
        module.exports = 'moduleA导出内容';
    },
    //是ES6模块直接返回
    'moduleB': function (module, exports) {
        module.exports = { __esModule: true, default: 'moduleB导出内容' };
    },
    //封装成ES6模块
    'moduleC': function (module, exports) {
        module.exports = { name: 'moduleC导出内容' };
    }
}
function __webpack_require__(moduleId) {
    var module = {
        i: moduleId,
        l: false,
        exports: {}
    }
    modules[moduleId].call(modules.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
}
function t(value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    Object.defineProperty(ns, Symbol.toStringTag, { value: 'Module' });
    Object.defineProperty(ns, '__esModule', { enumerable: true, value: true });
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
        for (var key in value)
            Object.defineProperty(ns, key, { enumerable: true, get: () => value[key] });
    return ns;
};
let result1 = t('moduleA', 0b1001);
console.log(result1);
let result2 = t('moduleB', 0b0101);
console.log(result2);
let result3 = t('moduleC', 0b0011);
console.log(result3, result3.name);

##### harmony

###### common.js加载 common.js

- index.js
let title = require('./title');
console.log(title.name);
console.log(title.age);

- title.js
exports.name = 'title_name';
exports.age = 'title_age';

- bundle.js
{
"./src/index.js":
  (function(module, exports, __webpack_require__) {
    var title = __webpack_require__("./src/title.js");
    console.log(title.name);
    console.log(title.age);
  }),
"./src/title.js":
  (function(module, exports) {
    exports.name = 'title_name';
    exports.age = 'title_age';
  })
}

###### common.js加载 ES6 modules

commes6

- index.js
let title = require('./title');
console.log(title);
console.log(title.default);
console.log(title.age);

- title.js
export default name = 'title_name';
export const age = 'title_age';

- bundle.js
{
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        var title = __webpack_require__(/*! ./title */ "./src/title.js");
        console.log(title.name);
        console.log(title.age);
      }),

    "./src/title.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "age", function () { return age; });
        /* harmony default export */
        __webpack_exports__["default"] = (name = 'title_name');
        var age = 'title_age';
      })
  }

###### ES6 modules 加载 ES6 modules

- index.js
import name,{age} from './title';
console.log(name);
console.log(age);

- title.js
export default name  = 'title_name';
export const age = 'title_age';

- bundle.js
{

    "./src/index.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title */ "./src/title.js");
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["default"]);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["age"]);
      }),
    "./src/title.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "age", function () { return age; });
        __webpack_exports__["default"] = (name = 'title_name');
        var age = 'title_age';
      })
  }

###### ES6 modules 加载 common.js

- index.js
import home, { name, age } from './title';
console.log(name);
console.log(age);
console.log(home);

- title.js
module.exports = { home: 'beijing' };
module.exports.name = 'title_name';
module.exports.age = 'title_age';

- bundle.js
  {
    "./src/index.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title */ "./src/title.js");
    /* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_title__WEBPACK_IMPORTED_MODULE_0__);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["name"]);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["age"]);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0___default.a);
      }),

    "./src/title.js":
      (function (module, exports) {
        module.exports = {
          home: 'beijing'
        };
        module.exports.name = 'title_name';
        module.exports.age = 'title_age';
      })
  }

##### 异步加载

###### 源文件

- index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
</body>
</html>

- src\index.js

let button = document.createElement("button");
button.innerHTML = "点我";
button.onclick = function () {
    import(/*webpackChunkName: 'title'*/'./title.js').then(function (result) {
        console.log(result, result.default);
    });
};
document.body.appendChild(button);

- src\title.js

module.exports = {
    name: 'title'
}
module.exports.age = 10;

###### 打包后的文件

- 

(function (modules) { // 启动函数
  //安装一个为了加载额外代码块的JSON回调函数
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];//代码块ID
    var moreModules = data[1];//更多的模块
    //向模块对象上增加更多的模块，然后把所有的chunkIds设置为已经加载并触发回调
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;//标识这个代码块为已经OK
    }
    for (moduleId in moreModules) {//把新拉下来的模块合并到模块对象上
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);//如果有父JSONP函数就调用

    while (resolves.length) {
      resolves.shift()();//让所有的promise都OK
    }
  };

  // 模块缓存
  var installedModules = {};

  //用来存放加载完成或加载中的代码块对象
  // undefined = 代码块未加载, null = 代码块正在预加载或者预获取
  // Promise = 代码块更在加载中, 0 = 代码块已经加载
  var installedChunks = {
    "main": 0
  };

  //JSON加载的路径
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + chunkId + ".bundle.js"
  }

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

  //这个文件只包含入口代码块
  //用来加载额外的代码块的函数
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    //JSONP代码块加载
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) { // 0的意思是已经安装
      // a Promise means "currently loading". 如果是一个Promise的话表示正在加载
      if (installedChunkData) {
        promises.push(installedChunkData[2]);//如果已经在加载中了，则添加Promise
      } else {
        //在代码块缓存中放置Promise
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // 开始加载代码块
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        //// HTMLElement 接口的 nonce 属性返回只使用一次的加密数字，被内容安全政策用来决定这次请求是否被允许处理。
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        //设置源文件路径
        script.src = jsonpScriptSrc(chunkId);

        //在栈展开之前创建错误以获取有用的堆栈信息
        var error = new Error();
        onScriptComplete = function (event) {
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  __webpack_require__.m = modules;

  __webpack_require__.c = installedModules;

  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  __webpack_require__.p = "";

  //异步加载中的错误处理函数
  __webpack_require__.oe = function (err) { console.error(err); throw err; };
  //刚开始的时候会把数组赋给window["webpackJsonp"],并且赋给jsonpArray
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  //绑定push函数为oldJsonpFunction
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  //狸猫换太子，把webpackJsonpCallback赋给了jsonpArray.push方法
  jsonpArray.push = webpackJsonpCallback;
  //把数组进行截取得到一个新的数组
  jsonpArray = jsonpArray.slice();
  //如果数组不为空，就把全部安装一次
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  //把oldJsonpFunction赋给parentJsonpFunction
  var parentJsonpFunction = oldJsonpFunction;

  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({

    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        var button = document.createElement("button");
        button.innerHTML = "点我";
        button.onclick = function () {
          __webpack_require__.e("title").then(__webpack_require__.t.bind(null, "./src/title.js", 7)).then(function (result) {
            console.log(result["default"]);
          });
        };
        document.body.appendChild(button);
      })
  });

- title.bundle.js

dist\title.bundle.js

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["title"], {
  "./src/title.js":
    (function (module, exports) {
      module.exports = {
        name: 'title'
      };
      module.exports.age = 10;
    })
}]);

###### 实现bundle.js
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
        }
        modules[moduleId].call(modules.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    var installedChunks = {
        "main": 0
    };

    function webpackJsonpCallback(data) {
        var chunkIds = data[0];//代码块ID
        var moreModules = data[1];//更多的模块
        var moduleId, chunkId, resolves = [];
        for (let i = 0; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            resolves.push(installedChunks[chunkId][0]);
            installedChunks[chunkId] = 0;//标识这个代码块为已经OK
        }
        for (moduleId in moreModules) {//把新拉下来的模块合并到模块对象上
            modules[moduleId] = moreModules[moduleId];
        }
        while (resolves.length) {
            resolves.shift()();//让所有的promise都OK
        }
    }
    __webpack_require__.t = function (value) {
        value = __webpack_require__(value);
        var ns = Object.create(null);
        ns.default = value;
        return ns;
    };
    __webpack_require__.e = function (chunkId) {
        var promises = [];
        var installedChunkData = installedChunks[chunkId];
        if (installedChunkData !== 0) {
            var promise = new Promise(function (resolve, reject) {
                installedChunkData = installedChunks[chunkId] = [resolve, reject];
            });
            installedChunkData[2] = promise;
            promises.push(promise);
            var script = document.createElement('script');
            script.src = chunkId + ".bundle.js";
            document.head.appendChild(script);
        }
        return Promise.all(promises);
    }
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    jsonpArray.push = webpackJsonpCallback;
    return __webpack_require__("./src/index.js");
})({
    "./src/index.js":
        (function (module, exports, __webpack_require__) {
            var button = document.createElement("button");
            button.innerHTML = "点我";
            button.onclick = function () {
                __webpack_require__.e("title").then(__webpack_require__.t.bind(null, "./src/title.js", 7)).then(function (result) {
                    console.log(result["default"]);
                });
            };
            document.body.appendChild(button);
        })
})

#### tapable

##### webpack的插件机制
- 在具体介绍webpack内置插件与钩子可视化工具之前，我们先来了解一下webpack中的插件机制。 webpack实现插件机制的大体方式是：
    - 创建 - webpack在其内部对象上创建各种钩子；
    - 注册 - 插件将自己的方法注册到对应钩子上，交给webpack；
    - 调用 - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法。
- Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例
- 通过事件和注册和监听，触发webpack生命周期中的函数方法
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');

##### tapable分类
- Hook 类型可以分为同步Sync和异步Async，异步又分为并行和串行
tapable

类型 | 使用要点
Basic | 不关心监听函数的返回值
Bail | 保险式: 只要监听函数中有返回值(不为undefined)，则跳过之后的监听函数
Waterfall | 瀑布式: 上一步的返回值交给下一步使用
Loop | 循环类型: 如果该监听函数返回true,则这个监听函数会反复执行，如果返回undefined则退出循环

##### SyncHook
1. 所有的构造函数都接收一个可选参数，参数是一个参数名的字符串数组
2. 参数的名字可以任意填写，但是参数数组的长数必须要根实际接受的参数个数一致
3. 如果回调函数不接受参数，可以传入空数组
4. 在实例化的时候传入的数组长度长度有用，值没有用途
5. 执行call时，参数个数和实例化时的数组长度有关
6. 回调的时候是按先入先出的顺序执行的，先放的先执行

const {SyncHook} = require('tapable');
/*
const slice = Array.prototype.slice;
 class SyncHook{
    constructor(args) {
        this.args= args;
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    call() {
        this.taps.forEach(fn=>fn(...slice.call(arguments,0,this.args.length)));
    }
}
*/

const hook = new SyncHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return 2;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);
1 zhufeng 10
2 zhufeng 10
3 zhufeng 10

##### SyncBailHook
1. BailHook中的回调函数也是顺序执行的
2. 调用call时传入的参数也可以传给回调函数
3. 当回调函数返回非undefined值的时候会停止调用后续的回调

//const {SyncBailHook} = require('tapable');
const slice = Array.prototype.slice;
class SyncBailHook{
    constructor(args) {
        this.args= args;
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    call() {
        let args = slice.call(arguments,0,this.args.length);
        let result;
        let i=0;
        while(i<this.taps.length&&!result){
            result = this.taps[i++](...args);
        }
    }
}

const hook = new SyncBailHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    //return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return 2;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);

##### SyncWaterfallHook
1. SyncWaterfallHook表示如果上一个回调函数的结果不为undefined,则可以作为下一个回调函数的第一个参数
2. 回调函数接受的参数来自于上一个函数的结果
3. 调用call传入的第一个参数，会被上一个函数的非undefined结果替换
4. 当回调函数返回非undefined不会停止回调栈的调用

//const {SyncWaterfallHook} = require('tapable');
const slice = Array.prototype.slice;
class SyncWaterfallHook{
    constructor(args) {
        this.args= args;
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    call() {
        let args = slice.call(arguments,0,this.args.length);
        let first=args[0];
        let result;
        let i=0;
        while(i<this.taps.length){
            first = result||first;
            result = this.taps[i++](first,...args.slice(1));
        }
    }
}

const hook = new SyncWaterfallHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return ;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);
1 zhufeng 10
2 1 10
3 1 10

##### SyncLoopHook
- SyncLoopHook的特点是不停的循环执行回调函数，直到函数结果等于undefined
- 要注意的是每次循环都是从头开始循环的

//const { SyncLoopHook } = require('tapable');
//当回调函数返回非undefined值的时候会停止调用后续的回调
class SyncLoopHook {
    constructor(args) {
        this._args = args;//['name','age']
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    call() {
        let args = Array.from(arguments).slice(0, this._args.length);
        let loop = true;
        while (loop) {
            for (let i = 0; i < this.taps.length; i++) {
                let fn = this.taps[i];
                let result = fn(...args);
                loop = typeof result != 'undefined';
                if (loop) break;
            }
        }
    }
}
let hook = new SyncLoopHook(['name', 'age']);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
hook.tap('1', (name, age) => {
    console.log(1, 'counter1', counter1);
    if (++counter1 == 1) {
        counter1 = 0
        return;
    }
    return true;
});
hook.tap('2', (name, age) => {
    console.log(2, 'counter2', counter2);
    if (++counter2 == 2) {
        counter2 = 0
        return;
    }
    return true;
});
hook.tap('3', (name, age) => {
    console.log(3, 'counter3', counter3);
    if (++counter3 == 3) {
        counter3 = 0
        return;
    }
    return true;
});
hook.call('zhufeng', 10);
1 counter1 0
2 counter2 0
1 counter1 0
2 counter2 1
3 counter3 0
1 counter1 0
2 counter2 0
1 counter1 0
2 counter2 1
3 counter3 1
1 counter1 0
2 counter2 0
1 counter1 0
2 counter2 1
3 counter3 2

##### AsyncParallelHook
- 异步并行执行钩子

- tap
同步注册
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        this.taps.forEach(fn => fn(...args));
        callback();
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapAsync
异步注册，全部任务完成后执行最终的回调
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.taps=[];
    }
    tapAsync(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,length = this.taps.length;
        function done(err) {
            if (++i == length) {
                callback(err);
            }
        }
        this.taps.forEach(fn => {
            fn(...args,done);
        });
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapPromise
promise注册钩子
全部完成后执行才算成功
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.taps=[];
    }
    tapPromise(name,fn) {
        this.taps.push(fn);
    }
    promise() {
        let promises = this.taps.map(fn => fn());
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
})

##### AsyncParallelBailHook
带保险的异步并行执行钩子
有一个任务返回值不为空就直接结束

- tap
用tap注册
如果有一个任务有返回值则调用最终的回调
//let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
    constructor() {
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        for (let i=0;i<this.taps.length;i++){
            let ret=this.taps[i](...args);
            if (ret) {
                return callback(ret);
            }
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapAsync
异步注册
有一个任务返回错误就直接调最终的回调
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.taps=[];
    }
    tapAsync(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.taps.length;
        function done(err) {
            if (err) {
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let fn=this.taps[i];
            fn(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapPromise
只要有一个任务有resolve或者reject值，不管成功失败都结束
//let { AsyncParallelBailHook } = require('tapable');

class AsyncParallelBailHook {
    constructor() {
        this.taps = [];
    }
    tapPromise(name, fn) {
        this.taps.push(fn);
    }
    promise() {
        let args = Array.from(arguments);
        let promises = this.taps.map(fn => fn(...arguments));
        //return Promise.race(promises);
        return new Promise(function (resolve, reject) {
            promises.forEach(promise => promise.then((data) => {
                if (data) resolve(data);
            }, error => {
                if (error) reject(error);
            }));
        });
    }
}
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1);
            resolve(1);
        }, 1000)
    });
});
queue.tapPromise('2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2);
            resolve();
        }, 2000)
    });
});

queue.tapPromise('3', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3);
            resolve();
        }, 3000)
    });
});

queue.promise('zfpx').then((result) => {
    console.log('成功', result);
    console.timeEnd('cost');
}, err => {
    console.error('失败', err);
    console.timeEnd('cost');
})

##### AsyncSeriesHook
异步串行钩子
任务一个一个执行,执行完上一个执行下一个

- tap
let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook1 {
    constructor() {
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        for (let i = 0; i < this.taps.length; i++) {
            let fn = this.taps[i];
            fn(...args);
        }
        finalCallback();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tap('1', function (name) {
    console.log(1);
});
queue.tap('2', function (name) {
    console.log(2);
});
queue.tap('3', function (name) {
    console.log(3);
});
queue.callAsync('zhufeng', err => {
    console.log(err);
    console.timeEnd('cost');
});

- tapAsync
class AsyncSeriesBailHook{
    constructor() {
        this.taps=[];
    }
    tapAsync(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.taps.length;
        let next = () => {
            let fn = this.taps[index++];
            if (fn) {
                fn(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapPromise
//let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.taps = [];
    }
    tapPromise(name, fn) {
        this.taps.push(fn);
    }
    promise() {
        let args = Array.from(arguments);
        //first是第一个函数， fns是剩下的函数
        let [first, ...fns] = this.taps;
        return fns.reduce((a, b) => {
           return a.then(() => b(...args));
        }, first(...args));
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(1, name);
            resolve();
        }, 1000)
    });
});
queue.tapPromise('2', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(2, name);
            resolve();
        }, 2000)
    });
});
queue.tapPromise('3', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(3, name);
            resolve();
        }, 3000)
    });
});
queue.promise('zfpx').then(data => {
    console.log(data);
    console.timeEnd('cost');
});

##### AsyncSeriesBailHook
只要有一个返回了不为undefined的值就直接结束

- tap
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tabAsync
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.taps=[];
    }
    tapAsync(name,fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.taps.length;
        let next=(err) => {
            if (err) return  callback(err);
            let fn=this.taps[i++];
            fn?fn(...args,next):callback();
        }
        next();
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});

- tapPromise
只要有一个promise失败了就整个失败了
//let {AsyncSeriesBailHook} = require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.taps=[];
    }
    tapPromise(name,fn) {
        this.taps.push(fn);
    }
    promise() {
        let args=Array.from(arguments);
        let [first, ...fns] = this.taps;
        let promise =  fns.reduce((a, b) => {
            return a.then(() => b(),(err)=>Promise.reject(err));
        }, first(...args));
        return promise;
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject('失败了');
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
},error=>{
    console.log(error);
    console.timeEnd('cost');
});

##### AsyncSeriesWaterfallHook
和SeriesWaterfallHook差不多

- tap
//let { AsyncSeriesWaterfallHook } = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let callback = args.pop();
        let first = args[0];
        let result;
        let i = 0;
        while (i < this.taps.length) {
            first = result || first;
            result = this.taps[i++](first, ...args.slice(1));
        }
        callback();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name', 'age']);
console.time('cost');
queue.tap('1', function (name, age) {
    console.log(1, name, age);
    return 'return1';
});
queue.tap('2', function (data, age) {
    console.log(2, data, age);
    return 'return2';
});
queue.tap('3', function (data, age) {
    console.log(3, data, age);
});
queue.callAsync('zfpx', 10, err => {
    console.log(err);
    console.timeEnd('cost');
});

- tapAsync
//let { AsyncSeriesWaterfallHook } = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.taps = [];
    }
    tapAsync(name, fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let callback = args.pop();
        let [first, ...otherArgs] = args;
        let i = 0, size = this.taps.length;
        let next = (err, data) => {
            if (err) return callback(err);
            let fn = this.taps[i++];
            if (fn) {
                if (i == 0) {
                    fn(...args, next);
                } else {
                    fn(data || first, ...otherArgs, next);
                }

            } else {
                callback(err, data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name', 'age']);
console.time('cost');
queue.tapAsync('1', function (name, age, callback) {
    setTimeout(function () {
        console.log(1, name, age);
        callback(null, 1);
    }, 1000)
});
queue.tapAsync('2', function (data, age, callback) {
    setTimeout(function () {
        console.log(2, data, age);
        callback(null, 2);
    }, 2000)
});
queue.tapAsync('3', function (data, age, callback) {
    setTimeout(function () {
        console.log(3, data, age);
        callback(null, 3);
    }, 3000)
});
queue.callAsync('zfpx', 10, (err, data) => {
    console.log(err, data);
    console.timeEnd('cost');
});

- tapPromise
let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.taps = [];
    }
    tapPromise(name, fn) {
        this.taps.push(fn);
    }
    promise(...args) {
        //first是第一个函数， fns是剩下的函数
        let [first, ...fns] = this.taps;
        return fns.reduce((a, b) => {
            return a.then((data) => b(data));
        }, first(...args));
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 1);
            resolve(1);
        }, 1000);
    });
});
queue.tapPromise('2', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 2);
            resolve(2);
        }, 2000);
    });
});
queue.tapPromise('3', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 3);
            resolve(3);
        }, 3000);
    });
});
queue.promise('zfpx').then(err => {
    console.timeEnd('cost');
});

##### intercept
所有钩子都提供额外的拦截器API
可以拦截钩子注册，钩子触发，和钩子函数的每次执行
//const { SyncHook } = require("tapable");
class SyncHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    intercept(options) {
        this.interceptOptions = options;
    }
    tap(name, fn) {
        this.interceptOptions.register && this.interceptOptions.register(
            { type: 'sync', fn, name }
        );
        this.taps.push(fn);
    }
    call() {
        this.interceptOptions.call && this.interceptOptions.call();
        this.taps.forEach(fn => {
            this.interceptOptions.tap && this.interceptOptions.tap();
            fn(...Array.from(arguments));
        });
    }
}
const hook = new SyncHook(["name"]);
hook.intercept({
    //call:(...args) => void当你的钩子触发之前,(就是call()之前),就会触发这个函数,你可以访问钩子的参数.多个钩子执行一次
    call: () => {
        console.log('call');
    },
    //tap: (tap: Tap) => void 每个钩子执行之前(多个钩子执行多个),就会触发这个函数
    tap() {
        console.log('tap');
    },
    // 每添加一个tap都会触发 你interceptor上的register,
    //你下一个拦截器的register 函数得到的参数 取决于你上一个register返回的值,所以你最好返回一个 tap 钩子.
    register: (tapInfo) => {
        console.log('register', tapInfo);
        return tapInfo;
    }
})
hook.tap("1", (name) => {
    console.log(1, name);
});
hook.tap("2", (name) => {
    console.log(2, name);
});


hook.call('zhufeng');
register { type: 'sync', fn: [Function], name: '1' }
register { type: 'sync', fn: [Function], name: '2' }
call
tap
1 zhufeng
tap
2 zhufeng

##### Context(上下文)
- 可以指定循环时候的上下文，循环的上下文在多次循环之间保持不变
const {SyncLoopHook} = require("tapable");
const hook = new SyncLoopHook(["name"]);
let counter=0;
//不是只传名称，而是传对象
hook.tap({context: true,name:"1"}, (context,name) => {
  context[counter] = counter;
  console.log(1, context,name);
  if(++counter >= 2){
    return;
  }
  return true;
});


hook.intercept({
    context: true,
    loop(context){//每次循环执行此拦截器
       console.log('loop',context);
    }
}) 
hook.call('zhufeng');

##### hook原理

- index.js

const SyncHook = require("./SyncHook");
//const {SyncHook} = require('tapable');
let syncHook = new SyncHook(["name"]);
syncHook.tap("1", name => {
  console.log(name, 1);
});
syncHook.tap("2", name => {
  console.log(name, 2);
});
syncHook.call("zhufeng");
/* 
(function anonymous(name) {
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  _fn0(name);
  var _fn1 = _x[1];
  _fn1(name);
}) 
*/

- SyncHook.js

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");
const factory = new HookCodeFactory();
class SyncHook extends Hook {
  compile(options) {
    factory.setup(this, options); //把回调函数数组赋给_x
    return factory.create(options);
  }
}
module.exports = SyncHook;

- Hook.js

class Hook {
  constructor(args) {
    if (!Array.isArray(args)) args = []; //参数
    this._args = args; // 这里存入初始化的参数
    this.taps = []; //这里就是回调栈用到的数组
    this._x = undefined; //这个比较重要，后面拼代码会用
  }
  tap(options, fn) {
    if (typeof options === "string") options = { name: options };
    options.fn = fn;
    this._insert(options); //参数处理完之后，调用_insert，这是关键代码
  }
  _insert(item) {
    this.taps[this.taps.length] = item;
  }
  call(...args) {
    let callMethod = this._createCall();
    return callMethod.apply(this, args);
  }
  _createCall(type) {
    return this.compile({
      taps: this.taps,
      args: this._args
    });
  }
}

module.exports = Hook;

- HookCodeFactory.js

class HookCodeFactory {
  args() {
    return this.options.args.join(",");
  }
  setup(instance, options) {
    this.options = options;
    instance._x = options.taps.map(t => t.fn);
  }
  header() {
    return "var _x = this._x;\n";
  }
  content() {
    let code = "";
    for (let idx = 0; idx < this.options.taps.length; idx++) {
      code += `var _fn${idx} = _x[${idx}];\n
               _fn${idx}(${this.args()});\n`; 
    }
    return code;
  }
  create(options) {
    return new Function(this.args(), this.header() + this.content());
  }
}
module.exports = HookCodeFactory;