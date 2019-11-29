import {History,LocationState} from 'history';
import {AnyAction} from 'redux';
import {LocationChangeAction,LOCATION_CHANGE,RouterState} from './';
export default function connectRouter<S=LocationState>(history:History){
    let initialState:RouterState<S>={
        action:history.action,
        location:history.location
    }
    return function(state:RouterState<S>=initialState,action:AnyAction){
        if(action.type===LOCATION_CHANGE){
            return (action as LocationChangeAction).payload;
        }
        return state;
    }
}