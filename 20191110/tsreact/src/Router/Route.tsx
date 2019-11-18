import React from 'react';
import RouterContext from './context';
import {pathToRegexp, Key} from 'path-to-regexp';
import { RouteComponentProps,match } from './types';
import {LocationDescriptor} from './history'
interface Props{
    path?:LocationDescriptor;
    exact?:boolean;
    component?:React.JSXElementConstructor<any>;
    render?:(props:any)=>React.ReactNode;
    children?:(props:RouteComponentProps<any>)=>React.ReactNode;
}
export default class extends React.Component<Props>{
    static contextType=RouterContext;
    render(){
        let {path='/',component:RouteComponent,exact=false,render,children} = this.props;
        let keys:Array<Key>=[];
        let routePath:string=typeof path=='object'?path.pathname:path;
        let regexp=pathToRegexp(routePath,keys,{end:exact});
        let pathname=this.context.location.pathname;
        let result=pathname.match(regexp);
        let routeComponentProps:RouteComponentProps<any>={
            location:this.context.location,
            history:this.context.history
        }
        if(result){
            let [url,...values]=result;
            let paramNames=keys.map((key:Key)=>key.name);
            let memo:Record<string,any>={};
            let params=values.reduce((memo: Record<string,any>,value:string,index:number)=>{
                memo[paramNames[index]]=value;
                return memo;
            },memo);
            type ParamsType=typeof params;
            let matchResult:match<ParamsType>={
                params,
                isExact:url===path,
                path:routePath,
                url
            }
            let props:RouteComponentProps<ParamsType>={
                location:this.context.location,
                history:this.context.history,
                match:matchResult
            }
            if(RouteComponent){
                return <RouteComponent {...routeComponentProps} />
            }else if(render){
                return render(props);
            }else if(children){
                return children(routeComponentProps)
            }else{
                return null;
            }
        }else{
            if(children){
                return children(routeComponentProps);
            }else{
                return null;
            } 
        }
        
    }
}