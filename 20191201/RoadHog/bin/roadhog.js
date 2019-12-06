#!/usr/bin/env node
const spawn=require('cross-spawn');
const chalk=require('chalk');

const script=process.argv[2];
switch(script){
    case "-v":
    case "--version":
        console.log(require('../package.json').version);
        break;
    case "build":
    case "server":
        // spawn同步开启一个新的子进程
        let result=spawn.sync(
            "node",
            // resolve就是解析出此脚本的绝对路径
            [require.resolve(`../lib/${script}.js`)],
            {stdio:'inherit'}
        );
        process.exit(result.status);
        break;
    default:
        console.log(`Unknown script ${chalk.cyan(script)}`);
        break;
}