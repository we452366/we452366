import React from 'react';
import {Route} from './';
export default function(OldComponent:React.ComponentType<any>){
    return (props:any)=>{
        <Route render={
            routeProps => <OldComponent {...routeProps} {...props} />
        }/>
    }
}