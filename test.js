function A(){

}
function B(){
    return new A();
}
A.prototype=new A();
B.prototype=new B();
var a=new A();
var b=new B();
console.log(a.__proto__==b.__proto__)