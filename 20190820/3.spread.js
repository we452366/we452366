//展开对象

//... Object.assign(es6语法)
//浅拷贝 拷贝出来的结果 和以前没关系 叫深拷贝 ... 如果用的是多层对象，那就是浅拷贝
let school={name:'zf',age:10};
let my = {address:'hlg'};

let newObj={...school,...my};
newObj=JSON.parse(JSON.stringify(newObj));//只能JSON形式的深拷贝
//如何实现深拷贝

//递归拷贝 引库 loadash cloneDeep

let shcool={name:"zf",age:10,a:{b:2},fn:()=>{},c:undefined,reg:/\d+/}

//1)怎么判断数据的类型
//typeof object Array
//Object.prototype.toString.call()
//instanceof 可以判断类型 判断是谁的实例
//constructor 构造函数

//V8引擎的垃圾回收
const deepClone=(value,hash=new WeakMap)=>{
    if(value==null) return value;//排除掉null和undefined 的情况
    if(typeof value !== 'object') return value;//这里包含了函数类型
    if(value instanceof RegExp) return new RegExp(value);
    if(value instanceof Date) return new Date(value);
    //...
    //拷贝的人可能是一个对象 或者是一个数组（循环）for in
    let instance=new value.constructor;//根据当前的属性构造一个新的实例
    if(hash.has(value)){//先去hash中查看一下是否存在过，如果存在就把以前拷贝的返回去
        return hash.get(value);//返回已经拷贝的结果
    }
    hash.set(value,instance);
    for(let key in value){
        if(value.hasOwnProperty(key)){//将hash 继续向下传递 保证这次拷贝能拿到以前拷贝的结果
            instance[key]=deepClone(value[key],hash);//产生的就是一个新的拷贝后的结果
        };//过滤掉原型链上的属性
    }
    return instance
};

//set /map 也是不能放重复的项