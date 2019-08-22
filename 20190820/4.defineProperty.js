//Object.defineProperty getter setter
let obj={
    a:1,
    b:2
}
function observer(obj){//缺陷是无法监控数组的变化
    if(typeof obj !== 'object'){
        return;
    }
    for(let key in obj){
        //因为defineProperty 需要一个公共的值去修改
        defineReactive(obj,key,obj[key]);
    }
}
let updateView=()=>{
    console.log('视图更新')
}
function defineReactive(obj,key,value){
    observer(value);//递归增加getter和setter
    Object.defineProperty(obj,key,{
        get(){
            return value;
        },
        set(val){
            updateView();
            value=val;
        }
    })
}
observer(obj);
obj.a=100;
console.log(obj.a);