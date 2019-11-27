function fib(n){
    return Array(n).fill().reduce(([a,b],_)=>{
        return [b,a+b]
    },[0,1])[0]
}
console.log(fib(1),fib(2),fib(3),fib(4),fib(5));

