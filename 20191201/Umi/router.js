import React from 'react';
import history from './history';
import './polyfills';
import {Router,Route} from 'react-router-dom';
import routes from './routes';

function renderRoutes(routes=[]){
    return (routes.map(({exact=false,path,component:RouteComponent,routes,Routes:PrivateRoute},index)=>{
        <Route key={index} path={path} exact={exact} render={
            routeProps=>{
                let render=()=>(
                    <RouteComponent {...routeProps}>
                        {routes && routes.length>0 && renderRoutes(routes)}
                    </RouteComponent>
                )
                if(PrivateRoute){
                    return <PrivateRoute render={render}/>
                }else{
                    return (
                        render()
                    )
                }
                
            }
        }
        />
    }))
}

export default class RouterWrapper extends React.Component{
    render(){
        return <Router history={history}>{renderRoutes(routes)}</Router>
    }
}