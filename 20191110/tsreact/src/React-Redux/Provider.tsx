import React,{Component} from 'react';
import {Store,AnyAction} from '../Redux';
import ReactReduxContext from './context';
interface Props{
    store:Store
}
export default class Provider extends Component<Props>{
    render(){
        return (
            <ReactReduxContext.Provider value={{store:this.props.store}}>
                {this.props.children}
            </ReactReduxContext.Provider>
        )
    }
}