## React全家桶

### react-hooks
> Hook是React 16.8的新增特性，可以在不编写class的情况下使用state以及其他的React特性，可以用hook将组件中相互关联的部分拆分为更小的函数

### useState
> useState是一个hook，通过在函数组件里调用它来给组件添加一些内部state，React会在重复渲染时保留这个state

### useReducer
> useState的替代方案，接收一个形如(state,action)=>newState的reducer，并返回当前的state以及与其配套的dispatch方法，当state中包含多个子值，或下一个state依赖于之前的state的时候满足

```
    function useState(initialState){
        const reducer=useCallback((state,action)=>action.payload);
        let [state,dispatch]=useReducer(reducer,initialState);
        function setState(){
            dispatch({type:'DISPATCH',payload})
        }
        return [state,setState];
    }
```

### useContext
> 当接收一个context对象(React.createContext的返回值)并返回该context的当前值

### useEffect
> 使用useEffect完成副作用操作，给函数组件增加操作副作用的能力

### useRef
> useRef返回一个可变的ref对象，ref对象在组件的整个生命周期内保持不变

### useLayoutEffect
> 会在所有的DOM变更之后同步调用effect，读取DOM布局并同步触发重渲染，浏览器执行绘制之前useLayoutEffect内部的更新计划将被同步刷新，尽可能使用标准的useEffect来避免阻塞视图更新

### 自定义hook
> 自定义hook是一种约定。如果函数的名字以use开头，并且调用了其他的hook，就称其为一个自定义hook
