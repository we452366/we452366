## React全家桶

### 使用npm生成react的ts版开发环境
```
    npm i create-react-app -g
    create-react-app 项目名 --typescript
    cd 项目名
    npm start
```
|包名|用途|
|:-|-:|
|react|整个react的基础库|
|@types/react|react的声明定义|
|react-dom|dom相关的库|
|@types/react-dom|react-dom的声明定义|
|react-scripts|create-react-app相关脚本|
|typescript|ts的应用范围|
|@types/jest|ts测试声明|
|@types/node|node的声明文件|

### JSX

#### 什么是JSX
> 是一种JS和HTML混合的语法，将组件的结构、数据甚至样式都聚合在一起定义组件

#### 什么是React元素
> JSX只是一种语法糖，最终会通过babel.js转译成createElement语法；React元素是构成React应用的最小单位，用来描述你在屏幕上看到的内容，其实质只是一个普通的js对象，ReactDOM来确保浏览器中的DOM数据和React元素保持一致

#### JSX表达式
> 可以任意的在jsx中使用JavaScript表达式

#### JSX属性
> jsx属性不能包含关键字，向class需要写成className，for需要写成htmlFor，并且属性名需要采用驼峰命名法

#### jsx对象
> 可以在if或者for语句中使用jsx

#### 更新元素渲染
> React元素都是immutable不可变的，更新的唯一办法是将它传入ReactDOM.render(),且只会更新必要的部分
```
    import React from 'react';
    import ReactDOM from 'react-dom';
    let root: HTMLElement | null = document.getElementById('root');
    function tick(): void {
        const element: React.ReactElement = (
            <div>
                {new Date().toLocaleTimeString()}
            </div>
        );
        ReactDOM.render(element, root);
    }
    setInterval(tick, 1000);
```

### 组件 & Props

#### 函数式组件
```
    function 函数组件名(props: 接口): React.ReactElement {
        return jsx内容
    }
```

#### 类组件
```
    class 类组件名 extends React.Component<接口> {
        render(): React.ReactElement {
            return jsx内容
        }
    }
```

#### 复合组件 & 提取组件
> 组件由于嵌套而变得难以被修改，可以把大组件切分为小组件

#### 纯函数
> 纯函数是指没有改变自己的输入值，当传入的值相同时，总是会返回相同的结果

#### 类型检查
> 需要配置propTypes属性
|用法|含义|
|:-|-:|
|PropTypes.array|数组|
|PropTypes.bool|布尔类型|
|PropTypes.func|函数|
|PropTypes.number|数字|
|PropTypes.object|对象|
|PropTypes.string|字符串|
|PropTypes.symbol|Symbol|
|PropTypes.node|任何可被渲染的元素(包括数字、字符串、元素或数组)|
|PropTypes.element|一个React元素|
|PropTypes.instanceOf(Message)|Message类的实例|
|PropTypes.oneOf()|枚举类型|
|PropTypes.oneOfType()|几种类型中的任意一个类型|
|PropTypes.arrayOf()|一个数组由某一类型的元素组成|
|PropTypes.objectOf()|可以指定一个对象由某一类型的值组成|
|PropTypes.shape()|可以指定一个对象由特定类型的值组成|
|PropTypes.func.isRequired|函数类型必须|
|PropTypes.any.isRequired|任意类型必须|
|customProp:function(props,propName,componentName){}|自定义验证器，验证失败返回Error对象|

### 虚拟DOM
- lib
    - react
    - react-dom
    - types
    - element

### 状态
> 状态是自己内部的，改变状态唯一的方式是setState，构造函数时唯一可以给this.state赋值的地方；数据是向下流动的，子组件只能通过父组件的方法来修改，状态提升

### 事件处理

### 事件命名
> 采用小驼峰，而不是纯小写；需要传入事件处理函数，而不是字符串；不能通过返回false来阻止默认行为，必须显示的使用preventDefault

#### Ref
> Refs提供了一种方式，允许我们访问DOM结点或在render方法中创建的React元素。ref的值既可以是一个字符串，也可以是一个函数，同样也可以为DOM元素以及class组件添加ref，但不能给函数式组件添加ref，函数式组件可以用forwardRef来实现。前两种逐渐被废除，比较推荐第三种React.createRef()

### 生命周期

#### 旧版声明周期
- 初始化阶段：setup props and state
- 首次加载：constructor -> componentWillMount -> render -> componentDidMount
- 非首次加载：(只有props才有：componentWillReceiveProps) -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
- 卸载：componentWillUnmount

#### 新版声明周期
- 创建时：constructor -> render -> componentDidMount
- 更新时：getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> React更新DOM和refs -> componentDidUpdate
- 卸载时：componentWillUnmount

## 上传拖拽组件