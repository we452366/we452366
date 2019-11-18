import {Reducer,StoreCreator,Action,Dispatch,Store} from './';
const createStore:StoreCreator=<S,A extends Action,Ext,StateExt>(reducer:Reducer<S,A>,preloadedState?:S):Store<S,A>=>
{
    let currentState:S=preloadedState as S;
    let currentListeners:(()=>void)[]=[];
    
    function getState():S{
        return currentState;
    }

    function subscribe(listener:()=>void){
        currentListeners.push(listener);
        return function unsubscribe(){
            const index:number=currentListeners.indexOf(listener);
            currentListeners.splice(index,1);
        };
    }

    const dispatch:Dispatch<A>=(action:A):A=>{
        currentState=reducer(currentState,action);
        for(let i=0;i<currentListeners.length;i++){
            const listener=currentListeners[i];
            listener()
        }
        return action;
    }
    dispatch({type:'@@redux/INIT'} as A);
    const store:Store<S,A>= {
        dispatch,
        subscribe,
        getState
    };
    return store;
}
export default createStore;