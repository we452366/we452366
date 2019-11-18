import React, { ReactNode } from 'react';
import {LocationDescriptor} from './history';
import RouterContext from './context';
type LinkProps=React.PropsWithChildren<{
    to:LocationDescriptor
}>
export default class extends React.Component<LinkProps>{
    static contextType=RouterContext;
    render():ReactNode{
        this.context.history.push(this.props.to);
        return null
    }
}