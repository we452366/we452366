import React from 'react';
import ReactReduxContext from './context';
import {ContextValue,MapStateToProps} from './types';
import {Unsubscribe, bindActionCreators, ActionCreatorsMapObject,AnyAction} from '../Redux';
export default function<Action=AnyAction>(
    mapStateToProps:MapStateToProps<any>,
    mapDispatchToProps:ActionCreatorsMapObject<Action>
){  
    return function (WrappedComponent:React.ComponentType<any>){
        return class extends React.Component{
            static contextType=ReactReduxContext;
            unsubscribe:Unsubscribe;
            constructor(props:any,context:ContextValue){
                super(props);
                // 先把仓库映射出来的对象放在当前组件的状态对象中
                this.state=mapStateToProps(context.store.getState());
            };
            componentDidMount(){
                this.unsubscribe=this.context.store.subscribe(()=>
                    this.setState(mapStateToProps(this.context.store.getState()))
                );
            };
            componentWillUnmount(){
                this.unsubscribe();
            };
            render(){
                let actions=bindActionCreators<Action,ActionCreatorsMapObject<Action>>(
                    mapDispatchToProps,
                    this.context.store.dispatch
                );
                return <WrappedComponent {...this.state} {...actions} />
            }
        }
    }
}