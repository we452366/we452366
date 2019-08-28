//数组的特性
//forEach filter map find findIndex some every reduce

//收敛函数
let total=[{price:10,count:5},{price:10,count:5},{price:10,count:5}].reduce((prev,current,index,arr)=>{
    return prev+current.price*current.count
},0)
console.log(total)

//有一个数组 可以求平均 求和 求最大值

//数组扁平化
//[1,[2,[3,[4,[5]]]]]
console.log([1,[2,[3,[4,[5]]]]].flat(100))

//函数的组合 compose redux

function sum(a,b){
    return a+b;
}
function len(str){
    return str.length;
}
function addCurreny(val){
    return '￥'+val
}

//用reduceRight实现

// function compose(...args){
//     return function(...values){
//         let lastFn=args.pop();//先取出最后一项
//         return args.reduceRight((prev,current)=>{// prev=abcbed
//             return current(prev);//把上一次计算的结果传递给下一个函数
//         },lastFn(...values));
//     }
// }
/* es6简写 */
// const compose=(...args)=>(...values)=>{
//     let lastFn=args.pop();//先取出最后一项
//     return args.reduceRight((prev,current)=>current(prev),lastFn(...values));
// }

//用reduce实现

// function compose(...args){
//     return args.reduce((prev,current)=>{
//         return function(...values){
//             return prev(current(...values))
//         }
//     })
// }

/* es6简写 */
const compose =(...args)=>args.reduce((prev,current)=>(...values)=>prev(current(...values)));

let r=compose(addCurreny,len,sum)('abc','bed');
console.log(r);