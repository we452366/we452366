import React from 'react';
import {Location} from './history'
import RouterContext from './context'
import {ContextValue} from './'
interface Props{

}
interface State{
    location:Location
}
export default class extends React.Component<Props,State>{
    state={
        location:{
            pathname:window.location.hash.slice(1)
        }
    }
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
        let contextValue:ContextValue={
            location:this.state.location
        }
        return (
            <RouterContext.Provider value={contextValue}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}