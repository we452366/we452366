import React, { Component } from 'react'
import Context from './context';
import { Message } from './';
import { LocationDescriptor, Location } from './history';
declare global {
    interface Window {
        onpushstate: (state: any, pathname: string) => void;
    }
}

export default class BrowserRouter extends Component {
    state = {
        location: { pathname: '/' }
    }
    message: Message | null
    componentDidMount() {
        window.onpopstate = (event: PopStateEvent) => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: document.location.pathname,
                    state: event.state
                }
            });
        };
        window.onpushstate = (state: any, pathname: string) => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname,
                    state
                }
            });
        };
    }
    render() {
        let that = this;
        let value = {
            location: that.state.location,
            history: {
                push(to: LocationDescriptor) {
                    if (that.message) {
                        let allow = window.confirm(that.message(typeof to == 'object' ? to : { pathname: to }));
                        if (!allow) return;
                    }
                    if (typeof to === 'object') {
                        let { pathname, state } = to;
                        window.history.pushState(state, '', pathname);
                    } else {
                        window.history.pushState('', '', to);
                    }
                },
                block(message: Message) {
                    that.message = message;
                }
            }
        }
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}