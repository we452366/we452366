import {CALL_HISTORY_METHOD} from './constants';
export default function(path:string){
    return {
        type:CALL_HISTORY_METHOD,
        payload:{
            method:'push',
            path
        }
    }
}