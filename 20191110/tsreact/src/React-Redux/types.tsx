import {Store} from '../Redux'
export interface MapStateToProps<S>{
    (state:S):any
}
export interface ContextValue{
    store:Store
}