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
        function run(generator:any){
            let it=generator();
            function next(action:any){
                let {value:effect,done}=it.next(action);
                if(!done){
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
                        default:
                            break;
                    }
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