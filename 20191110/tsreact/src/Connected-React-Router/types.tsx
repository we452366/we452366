import {LOCATION_CHANGE} from './constants';
import { History } from 'history';
type LocationState=History.LocationState;
export default function(history:History){
    let initState:LocationState={location:history.location,action:history.action};
    return function(state:LocationState=initState,action:any){
        return {
            location:action.payload.location,
            action:action.payload.action
        }
        return state;
    }
}