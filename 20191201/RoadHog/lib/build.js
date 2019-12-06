const webpack=require('webpack');
const chalk=require('chalk');
function done(err,stats){
    console.log(stats.toJSON().assets)
}
function build(){
    let config=require('./webpack.config');
    let compiler=webpack(config);
    compiler.run(done)
}
build()