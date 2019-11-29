import { CALL_HISTORY_METHOD } from "./"
import {History} from 'history';
import { nextTick } from "q";
export default function (history:History){
    return function(api:any){
        return function(action:any){
            if(action.type=== CALL_HISTORY_METHOD){
                let method:'push' | 'go'=action.payload.method;
                history[method](action.payload.args[0]);
            }else{
                nextTick(action);
            }
        } 
    }
}