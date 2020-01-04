## 鲸航科技

### 原生js

#### 请你简述原型和原型链
```
什么是原型链：只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被称为原型链
所有的实例有一个内部指针(prototype)，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。
```

#### 三等和双等的区别是什么？谁的效率更高？
```
- '==='会首先进行类型判断，屏蔽了自动类型转换;而'=='会先进行自动类型转换为数字后再比较。'==='是屏蔽了自动类型转换的'=='
```
性能
```
我们来看一看两种解释的区别。 
根据第一种解释（不准确的版本）， === 似乎比 == 做的事情更多，因为它还要检查值的 
类型。第二种解释中 == 的工作量更大一些，因为如果值的类型不同还需要进行强制类型 
转换。 
有人觉得 == 会比 === 慢，实际上虽然强制类型转换确实要多花点时间，但仅仅是微秒级 
（百万分之一秒）的差别而已。 
如果进行比较的两个值类型相同，则 == 和 === 使用相同的算法，所以除了 JavaScript 引擎 
实现上的细微差别之外，它们之间并没有什么不同。 
如果两个值的类型不同，我们就需要考虑有没有强制类型转换的必要，有就用 == ，没有就 
用 === ，不用在乎性能。 
== 和 === 都会检查操作数的类型。区别在于操作数类型不同时它们的处理方 
式不同
```
https://www.jianshu.com/p/36217b8a41b6
```
一、结论

1 == 抽象相等，比较时，会先进行类型转换，然后再比较值。
2 === 严格相等，会比较两个值的类型和值。
3 在明确知道操作数的数据类型情况下，建议使用 ===；否则，使用 ==。
二、比较过程

这里呢，我去网上找了很多资料，发现都不太全面，所以直接看看ECMA的规范标准是怎么样描述的。

Abstract Equality Comparison

The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:
  1.If Type(x) is the same as Type(y), then
   a. Return the result of performing Strict Equality Comparison x === y.
  2.If x is null and y is undefined, return true.
  3.If x is undefined and y is null, return true.
  4.If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
  5.If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.
  6.If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
  7.If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
  8.If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x ==    ToPrimitive(y).
  9.If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison
   ToPrimitive(x) == y.
  10.Return false.
==

如果Type(x)和Type(y)相同，返回x===y的结果
如果Type(x)和Type(y)不同
如果x是null，y是undefined，返回true
如果x是undefined，y是null，返回true
如果Type(x)是Number，Type(y)是String，返回 x==ToNumber(y) 的结果
如果Type(x)是String，Type(y)是Number，返回 ToNumber(x)==y 的结果
如果Type(x)是Boolean，返回 ToNumber(x)==y 的结果
如果Type(y)是Boolean，返回 x==ToNumber(y) 的结果
如果Type(x)是String或Number或Symbol中的一种并且Type(y)是Object，返回 x==ToPrimitive(y) 的结果
如果Type(x)是Object并且Type(y)是String或Number或Symbol中的一种，返回 ToPrimitive(x)==y 的结果
其他返回false
Strict Equality Comparison

The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:
  1.If Type(x) is different from Type(y), return false.
  2.If Type(x) is Number, then
   a. If x is NaN, return false.
   b. If y is NaN, return false.
   c. If x is the same Number value as y, return true.
   d. If x is  +0 and y is ‐0, return true.
   e. If x is ‐0 and y is +0, return true.
   f. Return false.
  3.If Type(x) is Number, then
   NOTE This algorithm differs from the SameValue Algorithm in its treatment of signed zeroes and NaNs.
===

如果Type(x)和Type(y)不同，返回false
如果Type(x)和Type(y)相同
如果Type(x)是Undefined，返回true
如果Type(x)是Null，返回true
如果Type(x)是String，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
如果Type(x)是Boolean，如果x,y都是true或x,y都是false返回true，否则返回false
如果Type(x)是Symbol，如果x,y是相同的Symbol值，返回true,否则返回false
如果Type(x)是Number类型
如果x是NaN，返回false
如果y是NaN，返回false
如果x的数字值和y相等，返回true
如果x是+0，y是-0，返回true
如果x是-0，y是+0，返回true
其他返回false
上面两个片段是ecma262规范中对===和==计算过程的定义，我摘录过来并做了翻译。

可能一时半会有点不好理解，慢慢解释。

其中涉及到几个es定义的抽象操作：

Type(x) : 获取x的类型
ToNumber(x) : 将x转换为Number类型
ToBoolean(x) : 将x转换为Boolean类型
ToString(x) : 将x转换为String类型
SameValueNonNumber(x, y) : 计算非数字类型x, y是否相同
ToPrimitive(x) : 将x转换为原始值
这里的每个操作都有其严格并复杂的定义，可以直接查阅ECMA规范文档对其的详细说明。
附上在线文档地址：ECMA262-7th

这里看下SameValueNonNumber()和ToPrimitive()两个操作。

SameValueNonNumber (x, y)

The internal comparison abstract operation SameValueNonNumber(x, y), where neither x nor y are Number values, produces true or false. Such a comparison is performed as follows:
  1. Assert: Type(x) is not Number.
  2. Assert: Type(x) is the same as Type(y).
  3. If Type(x) is Undefined, return true.
  4. If Type(x) is Null, return true.
  5. If Type(x) is String, then
    a. If x and y are exactly the same sequence of code units (same length and same code units at
    corresponding indices), return true; otherwise, return false.
  6. If Type(x) is Boolean, then
    a. If x and y are both true or both false, return true; otherwise, return false.
  7. If Type(x) is Symbol, then
    a. If x and y are both the same Symbol value, return true; otherwise, return false.
  8. Return true if x and y are the same Object value. Otherwise, return false.
断言：Type(x)不是Number类型
断言：Type(x)和Type(y)不同
如果Type(x)是Undefined，返回true
如果Type(x)是Null，返回true
如果Type(x)是String，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
如果Type(x)是Boolean，如果x, y都是true或x, y都是false返回true，否则返回false
如果Type(x)是Symbol，如果x, y是相同的Symbol值，返回true,否则返回false
如果x和y是同一个对象值，返回ture，否则返回false
这个SameValueNonNumber操作说的就是，如果x,y两个值类型相同，但又不同时是Number类型时的比较是否相等的操作。

ToPrimitive ( input [ , PreferredType ] )

The abstract operation ToPrimitive takes an input argument and an optional argument PreferredType. The abstract operation ToPrimitive converts its input argument to a non‐Object type. If an object is capable of converting to more than one primitive type, it may use the optional hint PreferredType to favour that type.
Conversion occurs according to Table 9:
Table 9: ToPrimitive Conversions
Input Type	Result
Undefined	Return input.
Null	Return input.
Boolean	Return input.
Number	Return input.
String	Return input.
Symbol	Return input.
Object	Perform the steps following this table.
When Type(input) is Object, the following steps are taken:
  1. If PreferredType was not passed, let hint be “default”.
  2. Else if PreferredType is hint String, let hint be “string”.
  3. Else PreferredType is hint Number, let hint be “number”.
  4. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
  5. If exoticToPrim is not undefined, then
    a. Let result be ? Call(exoticToPrim, input, « hint »).
    b. If Type(result) is not Object, return result.
    c. Throw a TypeError exception.
  6. If hint is “default”, let hint be “number”.
  7. Return ? OrdinaryToPrimitive(input, hint).
    When the abstract operation OrdinaryToPrimitive is called with arguments O and hint, the following steps are
    taken:
  8. Assert: Type(O) is Object.
  9. Assert: Type(hint) is String and its value is either “string” or “number”.
  10. If hint is “string”, then
    a. Let methodNames be « “toString”, “valueOf” ».
  11. Else,
    a. Let methodNames be « “valueOf”, “toString” ».
  12. For each name in methodNames in List order, do
    a. Let method be ? Get(O, name).
    b. If IsCallable(method) is true, then
      i. Let result be ? Call(method, O).
      ii. If Type(result) is not Object, return result.
  13. Throw a TypeError exception.
NOTE When ToPrimitive is called with no hint, then it generally behaves as if the hint were Number. However, objects may over‐ride this behaviour by de ining a @@toPrimitive method. Of the objects de ined in this speci ication only Date objects (see 20.3.4.45) and Symbol objects (see 19.4.3.4) over‐ride the default ToPrimitive behaviour. Date objects treat no hint as if the hint were String.
ToPrimitive() 方法

转换成原始类型方法。
js中的原始类型：

Null: null值.
Undefined: undefined 值.
Number: 所有的数字类型，例如0,1,3.14等 以及NaN, 和 Infinity.
Boolean: 两个值true和false.
String: 所有的字符串，例如’abc’和’’.
其他的都是’非原始’的，像Array,Function,Object等。
注意：typeof null 得到的结果是object。这里是由于js在最初的设计的问题。但其实null应该是属于原始类型的.

上面规范对 ToPrimitive 操作的说明大致可翻译如下：

ToPrimitive ( input [ , PreferredType ] )方法传递两个参数input和PreferredType，其中PreferredType是可选的。input输入,PreferredType可选的期望类型。
ToPrimitive 运算符把其值参数转换为非对象类型。如果对象有能力被转换为不止一种原语类 型,可以使用可选的 期望类型 来暗示那个类型。根据下表完成转换:

输入类型	结果
Undefined	不转换
Null	不转换
Boolean	不转换
Number	不转换
String	不转换
Symbol	不转换
Object	返回该对象的默认值。（调用该对象的内部方法[[DefaultValue]]一样）
当input的类型是Object时，按照下面步骤进行操作：

如果PreferredType没有传，令hint为”default”
如果PreferredType参数是String类型，那么令hint为”string”
如果PreferredType参数是Number类型，那么令hint为”number”
令exoticToPrim为GetMethod(input, @@toPrimitive).
如果exoticToPrim不是undefined，那么
令result为 Call(exoticToPrim, input, « hint »).
如果result类型不是Object，直接返回result
扔出TypeError异常
如果hint为”default”,令hint为”number”
返回OrdinaryToPrimitive(input, hint)的值
当抽象操作OrdinaryToPrimitive被执行，传递参数O和hint，按照下面步骤执行：

断言：O的类型是Object
断言：hint的类型是String，它的值只能是’string’或’number’
如果hint是’string’
令methodNames是« “toString”, “valueOf” »
否则
令methodNames是« “valueOf”, “toString” ».
在有顺序的methodNames列表中，对于每个项目：
令method为Get(O, name).
如果IsCallable(method)返回true,然后
令result为Call(method, O).
如果result的类型不是Object，返回result
返回TypeError异常
注意：当调用ToPrimitive而没有传hint参数时，默认情况下hint将被赋值Number。但是可以重写对象的@@toPrimitive方法来覆盖这个行为。在本规范中，只有Date和Symbol两个对象重写了默认的ToPrimitive操作。对于Date对象，如果没有传hint，hint将被默认赋值为String

看到这里如果你还没晕，说明你很厉害，那你应该接着往下看；反之，你更应该往下看了

对于一个Object，ToPrimitive()方法是如何转换成原始类型的呢，最后转换成的原始类型的值又是多少呢？
下面来看看js的源码实现：

// ECMA-262, section 9.1, page 30. Use null/undefined for no hint,
// (1) for number hint, and (2) for string hint.
function ToPrimitive(x, hint) {
  // Fast case check.
  // 如果为字符串，则直接返回
  if (IS_STRING(x)) return x;
  // Normal behavior.
  if (!IS_SPEC_OBJECT(x)) return x;
  if (IS_SYMBOL_WRAPPER(x)) throw MakeTypeError('symbol_to_primitive', []);
  if (hint == NO_HINT) hint = (IS_DATE(x)) ? STRING_HINT : NUMBER_HINT;
  return (hint == NUMBER_HINT) ? %DefaultNumber(x) : %DefaultString(x);
}
默认情况下，如果不传hint参数，x如果是Date类型，则hint为String,否则hint为Number类型。
然后根据hint将处理结果返回。
例如对于[10]数组这个例子，默认hint应该为Number类型。
处理函数为 DefaultNumber(x) 。
那么，DefaultNumber()又是如何处理的呢？

DefaultNumber()方法：

// ECMA-262, section 8.6.2.6, page 28.
function DefaultNumber(x) {
  if (!IS_SYMBOL_WRAPPER(x)) {
    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (%IsPrimitive(v)) return v;
    }

    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (%IsPrimitive(s)) return s;
    }
  }
  throw %MakeTypeError('cannot_convert_to_primitive', []);
}
首先通过valueOf 转换，即 obj.valueOf()方法的返回值
如果 obj.valueOf()方法的返回值是原始类型，那么直接返回
如果不是，再通过 obj.toString()方法转换
如果obj.toString()返回的是原始类型，直接返回该值
如果还不是原始类型，抛出不能转换异常。
DefaultString()方法：

// ECMA-262, section 8.6.2.6, page 28.
function DefaultString(x) {
  if (!IS_SYMBOL_WRAPPER(x)) {
    // 转换为字符串原始类型时首先通过toString
    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (%IsPrimitive(s)) return s;
    }

    // 否则通过valueOf
    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (%IsPrimitive(v)) return v;
    }
  }
  // 否则抛出异常
  throw %MakeTypeError('cannot_convert_to_primitive', []);
}
首先使用toString()转换
如果obj.toString()返回的是原始类型的值，直接返回该值
如果不是，再使用obj.valueOf()转换
如果obj.valueOf()返回的是原始类型的值，返回该值
如果还不是，抛出不能转换异常
简单总结下：

ToPrimitive(input,hint)转换为原始类型的方法，根据hint目标类型进行转换。
hint只有两个值：String和Number
如果没有传hint，Date类型的input的hint默认为String,其他类型的input的hint默认为Number
Number 类型先判断 valueOf()方法的返回值，如果不是，再判断 toString()方法的返回值
String 类型先判断 toString()方法的返回值，如果不是，再判断 valueOf()方法的返回值
来两个简单的例子看一下ToPrimitive()的结果可能会更有效。

求 ToPrimitive([10])
对于数组，默认的hint应该为Number ,所以先判断 valueOf()
> [10].valueOf()
[10]
数组的valueOf()方法返回的是数组本身，不是一个原始类型，我们继续判断 toString()

> [10].toString();
'10'
toString()返回的是一个字符串 ‘10’ 是一个原始类型，因此，ToPrimitive([10]) = '10'

ToPrimitive(function sayHi(){})
var sayHi = function (name) {
    console.log('hi ' + name);
}
console.log(sayHi.valueOf());
console.log(typeof sayHi.valueOf());
console.log(sayHi.toString());
console.log(typeof sayHi.toString());
结果：

[Function]
function
function (name) {
    console.log('hi ' + name);
}
string
先判断 valueOf() ，返回的是一个function类型，只能继续判断 toString()返回的是string类型的，是原始类型，因此，
ToPrimitive(sayHi)是源码字符串。

有了上面费了这么大劲准备的基础知识，我们再看看==就简单多了，我们回过头来看 == 的那几个例子。

首先 [10]==10
类型不同，Type([10])是Object，而Type(10)是Number,我们应该判断ToPrimitive([10])==10的结果
由上面的分析，ToPrimitive([10])的结果为 字符串’10’，因此结果变为要判断 ‘10’==10
Type(‘10’)为String,(10)为Number，因此结果变为 ToNumber(‘10’)==10
ToNumber(‘10’)的值是 数字 10 ，因此，最后要判断的是 10==10
很明显，类型相同，值也相同，最终返回的就是 true

再来看 []==0
同样地道理，ToPrimitive([])==’’
而 ToNumber(‘’)==0
因此 []==0 的结果是 true

[]==false也很简单了
false是Boolean类型的，我们要比较 []==ToNumber(false)即 []==0，就是上面这个啊，结果是 true

既然[]==false返回的是true，那么，![]==false应该返回的false吧，我靠，怎么还是true?
首先，左边 ![] 进行取反，要转换成Boolean类型，然后取反。Boolean([])的结果是true,取反是false
也就是，最终比较的是 false==false 结果当然是 true 了。

从上面我们可以看出，[]==![]是成立的，神奇吧，对，js就是这么神奇。

null==false的结果是false，==运算规则的最后一条，前面所有的都不满足，最后返回false，没什么好纠结的。
null==false的结果是false，但这并不代表 null==true 。因为 null==true 最后走的还是最后一条，返回false。
```

#### 如何实现instance of？
```
    function instance_of(L, R) {
        var O = R.prototype; 
        L = L.__proto__; 
        while (true) {
            if (L === null) return false;
            if (O === L)
            return true;
            L = L.__proto__;
        }
    }
```

#### 如何实现new？
```
    function _new(P){
        let o={};
        let arg=Array.prototype.slice.call(arguments,1);
        o.__proto__=P.prototype;
        P.apply(o,arg);
        return o;
    }
```

#### 如何实现合并两个数组并去重
```
// es6
function uniqueArr(arr1,arr2) {
    //合并两个数组
    arr1.push(...arr2)//或者arr1 = [...arr1,...arr2]
    //去重
    let arr3 = Array.from(new Set(arr1))   //let arr3 = [...new Set(arr1)]
    console.log(arr3) 
}
// es5
function uniqueArr(arr1, arr2){
    var arr3 = arr1.concat(arr2)
    var arr4 = []
    for(var i=0,len=arr3.length; i<len; i++) {
        if(arr4.indexOf(arr3[i]) === -1) {
            arr4.push(arr3[i])
        }
    }
    console.log(arr4)
}
```

#### 怎么遍历对象？
```
1.for ... in 循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).

2.Object.keys(obj),返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).

3.Object.getOwnPropertyNames(obj),返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).

4.Object.getOwnPropertySymbols(obj),返回一个数组,包含对象自身的所有Symbol属性.

5.Reflect.ownKeys(obj),返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.

6.Reflect.enumerate(obj),返回一个Iterator对象,遍历对象自身的和继承的所有可枚举属性(不含Symbol属性),与for ... in 循环相同.

7.Object.entries(obj),Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。通俗点就是 Object.entries() 可以把一个对象的键值以数组的形式遍历出来，结果和 for...in 一致，但不会遍历原型属性。
```

#### 谈谈你对微前端的理解
```
将 Vue 和 React 一起开发，其实一点都不难，只要自己能造出 Redux 这样的轮子，熟悉两个框架原理，就能一起开发，难的是将这些在一个合适的场景中使用。之前看到网上有微前端的实践，但是并不是那么完美，当然，类似 Electron 这样的应用，混合开发很正常，微前端并不是只单单多个框架混合开发，更多是多个框架引入后解决了什么问题、带来的问题怎么解决？毕竟 5G 还没完全普及，数据传输还是不那么快。过大的包容易带来客户端的过长白屏时间（自己给自己挖坑）
```