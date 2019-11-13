## React全家桶

### 生命周期

#### getDerivedStateFromProps

#### getSnapshotBeforeUpdate
> getSnapshotBeforeUpdate()被调用于render之后，可以读取但无法使用DOM的时候，返回的任何值都将作为参数传递给componentDidUpdate()

### 上下文
> Context是React提供的一种在组件之间共享值的方式，不必显式地通过组件树的逐层传递props

#### 实现createContext()方法
```
    interface ContextProps<T>{
        value:T
    }
    function createContext<T>(defaultValue:T){
        interface State{
            value:T
        }
        class Provider extends React.Component<ContextProps<T>,State>{
            static value:T=defaultValue;
            constructor(props:ContextProps<T>){
                super(props);
                Provider.value=props.value;
                this.state={value:props.value};
            }
            static getDerivedStateFromProps(nextProps:ContextProps<T>,prevState:State){
                Provider.value=nextProps.value;
                return {...prevState,value:nextProps.value};
            }
            render(){
                return this.props.children;
            }
        }
        interface ConsumerProps{
            children:(value:T)=>React.ReactNode
        }
        class Consumer extends React.Component<ConsumerProps>{
            render(){
                return this.props.children(Provider.value)
            }
        }
        return {
            Provider,Consumer
        }
    }
``` 

### 高阶组件
> 高阶组件概念来源于高阶函数(函数可以作为方法的参数和返回值)，即组件可以作为函数的参数和返回值

### render props
> render prop是指一种在React组件之间使用一个值为函数的prop共享代码的简单技术，该函数返回一个React元素并调用它而不是实现自己的渲染逻辑

