import { ReactElement, FunctionComponent, ClassComponent } from './react';
/**
 * 
 * @param type React元素的类型
 * @param config 配置对象
 * @param children 儿子
 */
function createElement(type: string | FunctionComponent | ClassComponent, config: Record<string, any>, ...children: Array<any>): ReactElement {
    let propName: string;//属性名
    const props: Record<string, any> = {};
    for (propName in config) {//把config对象中的所有属性都拷贝到props对象上
        props[propName] = config[propName];
    }
    /* const childrenLength = arguments.length - 2;//1
    if (childrenLength == 1) {
        props.children = children;
    } else {
        props.children = Array.prototype.slice.call(arguments, 2);
    } */
    props.children = children;
    let element: ReactElement = { type, props }
    return element;
}

export default createElement;