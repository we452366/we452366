import React from 'react';
import {ContextValue} from './types';
export const ReactReduxContext=React.createContext<ContextValue | null>(null)
export default ReactReduxContext;