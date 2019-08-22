//并集
let a1=[1,2,3,1,2,3];
let a2=[4,5,6,1,2,3];
//let s1=new Set([...a1,...a2]);
//console.log([...s1])
//set方法只有forEach方法
//交集
let s1=new Set([...a1]);
let s2=new Set([...a2]);
let a3=[...s2].filter((item)=>{
    return !s1.has(item);//map是映射一个新的数组，但是不会比以前的项少
});
console.log(a3);