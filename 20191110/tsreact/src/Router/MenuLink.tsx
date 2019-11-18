import React,{ReactNode} from 'react';
import {Route,Link} from './';
import {LocationDescriptor} from './history';
interface Props{
    to:LocationDescriptor;
    exact?:boolean;
    children?:React.ReactNode
}
// 判断地址栏中的路径和to中的路径是否匹配，如果相等，会给Link组件添加一个active的类
export default (props:Props)=>{
    let {to,exact,children}=props;
    return (
        <Route path={typeof to} exact={exact} children={
            (childProps:any)=>(
                <Link className={childProps.match?'active':''} to={to} {...childProps}></Link>
            )
        }/>
    )
}