## TypeScript

### 类型变换

#### 交叉类型

#### typeof
> 获取一个变量的类型

#### 索引访问操作符
> 可以通过[]获取一个类型的子类型

#### keyof
> 返回接口的key的集合

#### 映射类型
> 用in操作符去遍历原接口中的key值，?为可选类给你洗
```
    type 新的类型组合={
        [键名 in keyof 接口名]?:接口名[键名]
    }
```
或用泛型来定义
```
    type 新的类型组合<T>={
        [键名 in keyof T]?:T[键名]
    }
```

#### 内置工具类型
- Partial
- Required
> 使用-？修饰符来实现
```
    type 新的类型组合<T>={
        [键名 in keyof T]-?:T[键名]
    }
```
- Readonly
> 为传入的属性的每一项都加上readonly修饰符来实现
```
    type 新的类型组合<T>={
        readonly [键名 in keyof T]:T[键名]
    }
```
- Pick
> 通过获取集合中的某一个来约束
```
    type 新的类型组合<T,K extends keyof T>={
        [键名 in K]?:T[键名]
    }
```

#### 条件类型
> 定义泛型时可以添加逻辑分支，以使其更加灵活

##### 内置条件类型
> TS中内置了一些常用的条件类型
- Exclude
> 从后者中排除前者
```
    Exclude<类型1 | 类型1,类型2>
```
- Extract
> 从后者中取出前者
```
    Extract<类型1 | 类型1,类型2>
```
- NonNullable
- ReturnType
> 拿到函数中返回值的类型
```
    function 函数名(){
        return {}
    }
    type 类型名 =ReturnType<typeof 函数名>
```
- InstanceType
> 获取类的实例类型

### 模块 vs 命名空间

#### 模块
> 模块是TypeScript中外部模块的简称

#### 命名空间
> 命名空间是内部模块

### 类型声明
> 声明文件可以让我们不需要将js重构为ts，只需加上声明文件就可以使用系统；类型声明在编译的时候会被删除，不会影响真正的代码

#### 普通类型声明
> declare const/let 变量名:(形参名:形参类型)=>{}

#### 外部枚举
> declare enum

#### namespace
> declare namespace 变量名:(形参名:形参类型)=>{}

#### 类型声明文件
> 文件命名规范为 *.d.ts

#### 第三方声明文件
> @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀

#### 扩展全局变量的类型

#### 合并声明
> 同一名称的两个独立声明会被合并成一个单一声明，合并后的声明拥有原先两个声明的特性；类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用

|关键字|作为类型使用|作为值使用|
|:-|:-:|-:|
|class|yes|yes|
|enum|yes|yes|
|interface|yes|no|
|type|yes|no|
|function|no|yes|
|var,let,const|no|yes|

#### 生成声明文件