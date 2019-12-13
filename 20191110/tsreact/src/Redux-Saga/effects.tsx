export function take(actionType:any){
    return {
        type:'TAKE',
        actionType
    }
}

export function put(action:any){
    return {
        type:'PUT',
        action
    }
}

export function* cps(fn:any,...args:any){
    return {
        type:'CPS',
        fn,
        args   
    }
}

export function all(fns:any){
    return {
        type:'ALL',
        fns
    }
}

function delayP(ms:any,val:any){
    return new Promise(function(resolve){
        setTimeout(
            function(){
                resolve(val)
            },ms
        );
    });
}

export function fork(task:any){
    return {
        type:'FORK',
        task
    }
}

export function* takeEvery(actionType:any,task:any){
    yield fork(function*(){
        while(true){
            yield take(actionType);
            yield task()
        }
    })
}

