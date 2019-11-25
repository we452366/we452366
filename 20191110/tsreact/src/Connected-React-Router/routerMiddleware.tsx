import { CALL_HISTORY_METHOD } from "./constants"
import {History} from '../Router/history';
import {MiddlewareAPI} from '../Redux'
export default function routerMiddleware(history:History){
    return function(store:MiddlewareAPI){
        return function(next:any){
            return function(action:any){
                if(action.type!== CALL_HISTORY_METHOD){
                    return next(action);
                }
                let method:'push'=action.payload.method;
                history[method](action.payload.path)
            }
        }
    }
}