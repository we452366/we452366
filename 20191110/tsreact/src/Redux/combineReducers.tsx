import {Action,Reducer} from 'redux';
export type ReducersMapObject<S=any,A extends Action=Action>={
    [K in keyof S]:Reducer<S[K],A>
}
export default function combineReducers<S,A extends Action=Action>(){
    
}