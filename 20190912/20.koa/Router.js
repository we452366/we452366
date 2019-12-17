class Router{
    constructor() {
        this.middlewares = []
    }
    get(pathname,middleware){
        this.middlewares.push({
            path:pathname,
            middleware,
            method:'get'
        })
    }
    compose(arr,next,ctx){
        // reduce async+await
        function dispatch(index){
            // koa核心
            // 如果越界调用默认中间件
            if(index === arr.length) return next();
            // 先取出第一个路由执行
            let middle = arr[index];
            // 把第二个路由传入
            return Promise.resolve(middle.middleware(ctx,()=>dispatch(index+1)));
        }
        return dispatch(0);
    }
    routes(){
        return async(ctx,next)=>{
            let method = ctx.method.toLowerCase();
            let path = ctx.path;
            // 过滤出匹配的路由
            let arr = this.middlewares.filter((middleware)=>{
                return middleware.method===method && middleware.path === path;
            });

            // 如果组合后 一直调用next 最终 会走到原生的next中
            this.compose(arr,next,ctx);
        }
    }
}

module.exports = Router;