export interface Action<T= any>{
    type:T
}

export interface AnyAction extends Action{
    [extraProps:string]:any
}

export type Reducer<S=any,A extends Action=AnyAction>=(
    state:S | undefined,
    action:A
)=>S

export interface Dispatch<A extends Action = AnyAction>{
    (action:A):A
}

export interface Unsubscribe {
    ():void
}

export interface Store<S=any,A extends Action=AnyAction>{
    dispatch:Dispatch<A>;
    getState():S;
    subscribe(listener:()=>void):Unsubscribe;
}

export interface StoreCreator{
    <S,A extends Action<any>,Ext,StateExt>(
        reducer:Reducer<S,A>,
        preloadedState?:S
    ):Store<S,A>
}