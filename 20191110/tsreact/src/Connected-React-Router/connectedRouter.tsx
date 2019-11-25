import React from 'react';
import {ReactReduxContext} from 'react-redux';
import {Router} from 'react-router';
import {LOCATION_CHANGE} from './constants';
import {History,UnregisterCallback} from 'history';

export default class ConnectedRouter extends React.Component{
    static contextType=ReactReduxContext;
    unlisten:UnregisterCallback;
    componentDidMount(){
        this.unlisten=this.props.history.listen((location,action)=>{
            this.context.store.dispatch({
                type:LOCATION_CHANGE,
                payload:{
                    location,
                    action
                }
            })
        })
    }
    componentWillMount(){
        this.unlisten();
    }
    render(){
        let {history,children}=this.props;
        return (
            <Router history={history}>
                {children}
            </Router>
        )
    }
}