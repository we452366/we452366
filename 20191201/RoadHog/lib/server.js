let WebpackDevServer=require('webpack-dev-server');
let webpack=require('webpack');
function runServer(){
    let config=require('./webpack.config');
    let compiler=webpack(config);
    let devServer=new WebpackDevServer(compiler,{
        contentBase:'dist'
    });
    
}