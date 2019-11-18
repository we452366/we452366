import { Message } from "..";

export type LocationState=any;
export interface Location<S = LocationState>{
    pathname:string;
    state?:S
}
// 在跳转路径的时候，传的可能是一个字符串，也可能是一个对象{pathname}
export type LocationDescriptor=string | Location; 

export interface History{
    push(to:LocationDescriptor):void;
    message?:any;
    block:(message:Message | null)=>void;
}