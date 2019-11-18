import React from 'react';
import {History,Location,LocationDescriptor} from './history'
import RouterContext from './context'
import {ContextValue,Message} from './'
interface Props{

}
interface State{
    location:Location
}
export default class extends React.Component<Props,State>{
    locationState:any;
    state={
        location:{
            pathname:window.location.hash.slice(1),

        }
    }
    message: Message;
    componentDidMount(){
        window.addEventListener('hashchange',(event:HashChangeEvent)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.hash.slice(1) || '/'
                }
            });
        });
        window.location.hash.slice(1) || '/'
    }
    render(){
        let that=this; // 缓存this指针
        let contextValue:ContextValue={
            location:this.state.location,
            history:{
                push(to:LocationDescriptor){
                    if(that.message){
                        let allow=window.confirm(that.message(typeof to==='object'?to:{pathname:to}));
                        if(!allow) return;
                    }
                    if(typeof to === 'object'){
                        let {pathname,state}=to;
                        that.locationState=state;
                        window.location.hash=pathname
                    }else{
                        that.locationState=null;
                        window.location.hash=to;
                    }
                },
                message:null,
                block:(message:Message)=>{
                    that.message=message;
                }
            },

        }
        return (
            <RouterContext.Provider value={contextValue}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}