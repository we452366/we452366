import { ClassComponent } from './react';
export interface ReactElement {
    type: string | FunctionComponent | ClassComponent,
    props: any
}

export interface FunctionComponent {
    (props:any):ReactElement
}