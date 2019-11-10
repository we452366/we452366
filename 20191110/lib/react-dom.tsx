import React, { ReactElement, FunctionComponent, ClassComponent } from './react';
//1. element={type:'h1',props:{className,style,children}}
function render(element: ReactElement, container: HTMLElement): any {
    if (typeof element == 'string') {
        return container.appendChild(document.createTextNode(element));
    }
    let type: string | FunctionComponent | ClassComponent, props;
    type = element.type;
    props = element.props;
    let domElement: HTMLElement;
    if ((type as ClassComponent).isReactComponent) {
        element = new (type as ClassComponent)(props).render()!;
        type = element.type;
        props = element.props;
    } else if (typeof type === 'function') {
        element = type(props);
        type = element.type;
        props = element.props;
    }
    domElement = document.createElement(type as string);
    for (let propName in props) {
        if (propName === 'className') {
            domElement.className = props[propName];//处理类名
        } else if (propName === 'style') {
            let styleObject: CSSStyleDeclaration = props.style;//{ color: 'red', fontSize: 25 };
            for (let attr in styleObject) {
                domElement.style[attr] = styleObject[attr];
            }
            /*  let cssText = Object.keys(styleObject).map((attr: string) => {
                 return (attr.replace(/([A-Z])/g, function () {
                     return '-' + arguments[1].toLowerCase()
                 })) + ':' + styleObject[attr];
             }).join(';');//color:red;font-size:25
 
             domElement.style.cssText = cssText; */
        } else if (propName === 'children') {
            props.children.forEach((child: any) => {
                render(child, domElement);
            });
        } else {
            domElement.setAttribute(propName, props[propName]);
        }
    }
    container.appendChild(domElement);
}
export default { render }