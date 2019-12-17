import program from 'commander';
import Server from './server';
// babl-polyfill 可以被  preset-env + corejs 取代了

program
    .option('-p, --port <val>', 'set http-server port')
    .parse(process.argv);


let config = {
    port:8080
}
Object.assign(config,program);


// 解析用户参数
// 1) 通过解析的参数启动一个服务

let server = new Server(config);
server.start();// 启动服务