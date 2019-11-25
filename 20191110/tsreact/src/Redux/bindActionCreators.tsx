import {Dispatch,AnyAction} from './'

export interface ActionCreator<A>{
    (...args:any[]):A
}
export interface ActionCreatorsMapObject<A>{
    [key:string]:ActionCreator<A>
}

export default function bindActionCreators<A,M extends ActionCreatorsMapObject<A>>(
    actionCreators:M,
    dispatch:Dispatch<A>
):M
export default function bindActionCreators<A,M extends ActionCreatorsMapObject<A>>(
    actionCreators:M,
    dispatch:Dispatch<A>
):M{
    const boundActionCreators:ActionCreatorsMapObject<A>={};
    for(const key in actionCreators){
        const actionCreator=actionCreators[key];
        if(typeof actionCreator === 'function'){
            boundActionCreators[key]=bindActionCreator<A>(actionCreator,dispatch)
        }
    }
    return boundActionCreators as M
}

function bindActionCreator<A>(
    actionCreator:ActionCreator<A>,
    dispatch:Dispatch<A>    
){
    return function(this:any,...args:any[]){
        return dispatch(actionCreator.apply(this,args))
    }
}