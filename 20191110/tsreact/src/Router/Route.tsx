import React from 'react';
import RouterContext from './context'
interface Props{
    path:string;
    component:React.JSXElementConstructor<any>
}
export default class extends React.Component<Props>{
    static contextType=RouterContext;
    render(){
        let {path,component:RouteComponent} = this.props;
        let pathname=this.context.location.pathname;
        let routerProps={
            location:this.context.location
        }
        if(pathname.startsWith(path)){
            return <RouteComponent {...routerProps}/>
        }
        return null;
    }
}