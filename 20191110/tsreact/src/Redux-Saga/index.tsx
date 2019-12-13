export default function createSagaMiddleware(){
    function createChannel(){
        let listener:any={};
        function subscribe(actionType:any,cb:any){
            listener[actionType]=cb;
        }
        function publish(action:any){
            if(listener[action.type]){
                let temp=listener[action.type];
                delete listener[action.type];
                temp(action);
            }
        }
        return {subscribe,publish}
    }
    let channel=createChannel();
    function sagaMiddleware({getState,dispatch}:any){
        function run(generator:any,callback:any){
            let it=typeof generator === 'function'?generator():generator;
            function next(val:any){
                let {value:effect,done}=it.next(val);
                if(!done){
                    if(typeof effect[Symbol.iterator]=='function'){
                        //@ts-ignore
                        run(effect);
                        //@ts-ignore
                        next();
                    }else if(effect.then){
                        effect.then(next);
                    }else{
                        switch(effect.type){
                            case 'TAKE':
                                channel.subscribe(effect.actionType,next);
                                break;
                            case 'PUT':
                                dispatch(effect.action);
                                //@ts-ignore
                                next();
                                break;
                            case 'CALL':
                                let {fn,args,context}=effect.payload;
                                fn.apply(context,...args).then(next);
                                break;
                            case 'FORK':
                                //@ts-ignore
                                run(effect.task);
                                //@ts-ignore
                                next();
                                break;
                            case 'CPS':
                                effect.fn(...effect.args,(error:any,value:any)=>{
                                    if(error){
                                        return it.return('发生错误');
                                    }
                                    next(value);
                                });
                                break;
                            case 'ALL':
                                let fns=effect.fns;// 拿到所有要执行的iterator数组
                                //@ts-ignore
                                let done=times(next,fns.length);
                                //@ts-ignore
                                fns.forEach(fn=>run(fn,done))
                                break;
                            default:
                                break;
                        }
                    }
                }else{
                    callback && callback();
                }
            }
            //@ts-ignore
            next();
        }
        //@ts-ignore
        sagaMiddleware.run=run;
        return function(next:any){
            return function(action:any){
                channel.publish(action)
                next(action);
            }
        }
    }
    return sagaMiddleware;
}