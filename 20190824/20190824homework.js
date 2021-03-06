//1.反柯里化
const unCurrying=(fn)=>{
    return (...args)=>{
        return fn.call(...args);
    }
}
//2.数组扁平化
    //预处理
    let arr=[1,2,[3,[4,5]]];//默认值
    let str=JSON.stringify(arr);
    //1) 直接调用
    arr_flat=arr.flat(Infinity);
    //2) replace1
    arr=str.replace(/(\[\])/g,'').split(',');
    //3) replace2
    str=str.replace(/(\[\])/g,'');
    str='['+str+']';
    arr=JSON.parse(str);
    //4) 递归
    let result=[];
    let fn=function(arr){
        for(let i=0;i<arr.length;i++){
            let item=arr[i];
            if(Array.isArray(arr[i])){
                fn(item);
            }else{
                result.push(item);
            }
        }
    }
    //5) reduce
    Array.prototype.flat = function(deepth) { 
        function flatten(arr = [], deepth) {
            if (deepth === 0) return arr;
            deepth--;
            return arr.reduce((prev,current)=>{
                return prev.concat(Array.isArray(current) ? flatten(current) : current);
            },[])
        }
        return flatten(this,deepth);
    }
    //6) 扩展运算符
    arr=[].concat(...arr);
//3.实现reduce原理 Array.prototype.reduce
    Array.prototype.myReduce=function(fn,initialValue){
        if(this.length===0){
            if(initialValue===undefined){
                console.error("reduce of empty array with no initialValue")
            }else{
                return initialValue
            }
        }else{
            let prev=initialValue !== undefined ? initialValue : this[0];
            let startIndex = initialValue !== undefined ? 0 : 1;
            for(let i=startIndex;i<this.length;i++){
                prev = fn(prev,this[i]);
            }
            return prev;
        }
    }
//4.模块化打断点