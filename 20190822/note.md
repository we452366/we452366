## ES2015

### Reflect 13种
- apply()：对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
- construct()：对构造函数进行 new 操作，相当于执行 new target(...args)。
- defineProperty()：和 Object.defineProperty() 类似。
- deleteProperty()：作为函数的delete操作符，相当于执行 delete target[name]。
- get()：获取对象身上某个属性的值，类似于 target[name]。
- getOwnPropertyDescriptor()：类似于 Object.getOwnPropertyDescriptor()。
- getPrototypeOf()：类似于 Object.getPrototypeOf()。
- has()：判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- isExtensible()：类似于 Object.isExtensible().
- ownKeys()：返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响)
- preventExtensions()：类似于 Object.preventExtensions()。返回一个Boolean。
- set()：将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
- setPrototypeOf()：类似于 Object.setPrototypeOf()。

### Symbol 11种
- match
- replace
- search
- split
- hasInstance：一个确定一个构造器对象识别的对象是否为它的实例的方法。被 instanceof 使用。
- isConcatSpreadable：一个布尔值，表明一个对象是否应该flattened为它的数组元素。被 Array.prototype.concat() 使用。
- unscopables：拥有和继承属性名的一个对象的值被排除在与环境绑定的相关对象外。
- species：一个用于创建派生对象的构造器函数。
- toPrimitive：一个将对象转化为基本数据类型的方法。
- toStringTag：用于对象的默认描述的字符串值。被 Object.prototype.toString() 使用。
- for()：使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。
- keyFor()：从全局symbol注册表中，为给定的symbol检索一个共享的?symbol key。
