const obj={
    a:()=>console.log(this)
}
obj.a();
const test=obj.a;
test();
const test2={};
obj.a.call(test2)