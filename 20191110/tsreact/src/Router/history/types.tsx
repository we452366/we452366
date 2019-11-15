export type LocationState=any;
export interface Location<S = LocationState>{
    pathname:string;
    state?:S
}