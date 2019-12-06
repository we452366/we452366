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

export function fork(task:any){
    return {
        type:'FORK',
        task
    }
}

export function*takeEvery(actionType:any,task:any){
    yield fork(function*(){
        while(true){
            yield take(actionType);
            yield task()
        }
    })
}