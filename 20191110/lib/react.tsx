//createElement
import createElement from './element';
import { ReactElement } from './types';
export class Component<P = any>{
    isReactComponent = true
    static isReactComponent = true
    public props: P;
    constructor(props: P) {
        this.props = props;
    }
    render(): ReactElement | null {
        return null;
    }
}
export type ClassComponent = typeof Component;
export default {
    createElement,
    Component
}
export * from './types';