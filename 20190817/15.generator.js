// 生成器 生成迭代器的 es6语法
// async + await
// redux-saga

// 返回值叫迭代器
function * read(){
    yield 1;
    yield 2;
    yield 3;
}
// iterator 迭代器
let it=read();
console.log(it.next()); // {value:1,done:false}
console.log(it.next()); // {value:2,done:false}
console.log(it.next()); // {value:3,done:false}
console.log(it.next()); // {value:undefined,done:true}

// 将类数组转化成数组
// 类数组的定义：1）索引；2）长度
function add(){ // ... 或 forof 必须给当前对象 提供一个生成器方法
    console.log([...{0:1,1:2,length:2,
        [Symbol.iterator]:function *(){
            let index=0;
            while(index !== this.length){
                yield this[index++]
            }
        }
        // [Symbol.iterator](){
        //     let len=this.length;
        //     let index=0;
        //     // 迭代器 是由next方法 而且方法执行后 需要返回 value done
        //     return {
        //         next:()=>{
        //             return {value:this[index++],done:index===len+1}
        //         }
        //     }
        // }
    }])
}
add(1,2,3,4,5)

// ... 和 Array.from 区别 
// Array.from 没有iterator

// function * read(){
//     try{
//         let a=yield 1;
//         console.log(a);
//         let b=yield 2;
//         console.log(b);
//         let c=yield 3;
//         console.log(c)
//     }catch(e){
//         console.log(e)
//     }
// }
// let it = read();
// console.log(it.next('xxx')); // 第一次next的参数没有任何参数
// it.throw('aaa')

// let it =read();
// it.next().value.then(data=>{
//     it.next(data).value.then(data=>{
//         let r=it.next(data);
//         console.log(r.vlaue);
//     })
// })