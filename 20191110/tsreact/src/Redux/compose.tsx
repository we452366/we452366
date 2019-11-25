export default function compose(...funcs:Array<Function>){
    if(funcs.length===1){
        return funcs[0];
    }
    return funcs.reduce((a:Function,b:Function)=>(...args:any[])=>a(b(...args)))
}