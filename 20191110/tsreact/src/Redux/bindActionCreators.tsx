import {Dispatch,AnyAction} from './'

export interface ActionCreator<A extends AnyAction=AnyAction>{
    (...args:any[]):A
}
export interface ActionCreatorsMapObject<A extends AnyAction=AnyAction>{
    [key:string]:ActionCreator<A>
}

export default function bindActionCreators<A extends AnyAction,M extends ActionCreatorsMapObject<A>>(
    actionCreators:M,
    dispatch:Dispatch
):M
export default function bindActionCreators<A extends AnyAction,M extends ActionCreatorsMapObject<A>>(
    actionCreators:M,
    dispatch:Dispatch
):M{
    const boundActionCreators:ActionCreatorsMapObject={};
    for(const key in actionCreators){
        const actionCreator=actionCreators[key];
        if(typeof actionCreator === 'function'){
            boundActionCreators[key]=bindActionCreator(actionCreator,dispatch)
        }
    }
    return boundActionCreators as M
}

function bindActionCreator<A extends AnyAction=AnyAction>(
    ActionCreator:ActionCreator<A>,
    dispatch:Dispatch    
){
    return function(this:any,...args:any[]){
        return dispatch(ActionCreator.apply(this,args))
    }
}