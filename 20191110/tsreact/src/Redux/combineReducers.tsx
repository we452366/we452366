import {Action,AnyAction,Reducer,ReducersMapObject} from './';
export type ReducersMapObject<S=any,A extends Action=Action>={
    [K in keyof S]:Reducer<S[K],A>
}
export default function combineReducers<S,A extends Action=AnyAction>(
    reducers:ReducersMapObject<S,A>
):Reducer<S>
export default function combineReducers<S,A extends Action=AnyAction>(reducers:ReducersMapObject<S,A>){
    // reducer的作用就是要返回新的状态
    return function(state:S={} as S,action:A){
        const nextState:S={} as S;
        let key:keyof S;
        for(key in reducers){
            let reducer:Reducer<S[typeof key],A>=reducers[key];
            let previousStateForKey:S[typeof key]=state[key];
            let nextStateForKey:S[typeof key]=reducer(previousStateForKey,action);
            nextState[key]=nextStateForKey;
        }
        return nextState;
    }
}