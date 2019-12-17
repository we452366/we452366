"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// babl-polyfill 可以被  preset-env + corejs 取代了
_commander.default.option('-p, --port <val>', 'set http-server port').parse(process.argv);

let config = {
  port: 8080
};
Object.assign(config, _commander.default); // 解析用户参数
// 1) 通过解析的参数启动一个服务

let server = new _server.default(config);
server.start(); // 启动服务