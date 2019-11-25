import compose from './compose'
import {Middleware,MiddlewareAPI,Store,StoreEnhancer,StoreCreator,Dispatch,Action,AnyAction,Reducer} from './types'
export function applyMiddleware<Ext,S>(
    ...middlewares:Middleware<any,S,any>[]
):StoreEnhancer
export default function applyMiddleware<Ext,S>(
    ...middlewares:Middleware<any,S,any>[]
):StoreEnhancer{
    return (createStore:StoreCreator)=><S,A extends Action>(
        reducer:Reducer<S,A>
    ):Store<S,A>=>{
        {
            let store=createStore(reducer);
            // 实现dispatch的包装
            let dispatch:Dispatch<AnyAction>;

            const middlewareAPI:MiddlewareAPI<Dispatch,S>={
                getState:store.getState,
                dispatch:(action)=>dispatch(action)
            }

            const chain=middlewares.map((middleware:any)=>middleware(middlewareAPI));
            dispatch=compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}