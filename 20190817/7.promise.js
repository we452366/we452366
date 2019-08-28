//Promise有哪些优缺点？ 优点：可以解决异步并发问题Promise.all 链式调用；缺点：

let p=new Promise((resolve,reject)=>{
    resolve();
})

//1) 链式中断
//中断Promise链 就是返回一个等待的Promise
let p1=p.then(()=>{
    console.log('ok');
    return new Promise(()=>{})
}).then(()=>{
    console.log(1);
})

//2) Promise.finally实现
//finally的实现
Promise.prototype.finally=function(callback){
    //callback 直接放到失败里 会导致无法继承上一次的失败
    return this.then(()=>{
        //等待finally中的函数执行完毕 继续执行 finally函数可能返还一个promise 用Promise.resolve等待返回的promise执行完
        Promise.resolve(callback()).then(()=>val);
        //return val;//如果上一个then是成功就将这个成功向下传递
    },(err)=>{
        Promise.resolve(callback()).then(()=>{throw err});
        //throw err;//如果上一个then是失败就将这个失败继续向下抛
    })
}

Promise.reject().finally(()=>{
    console.log(1);
    return new Promise((resovle,reject)=>{
        setTimeout(()=>{
            resovle();
        },1000)
    })
}).catch(e=>{
    console.log(e)
})

//3) Promise.race实现
// race 赛跑 哪个快 用哪个快 all是完成所有

let p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resovle('ok2')
    },1000);
});
let p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resovle('ok3')
    },2000);
});
Promise.race=function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(resovle,reject);//只要一个成功就成功
        }
    })
}
Promise.race((p2,p3)).then(data=>{
    console.log(data)
})

//4) 如何放弃某个promise的执行结果
function wrap(p1){
    let fail=null;
    let p2=new Promise((resolve,reject)=>{
        fail=reject;//先将p2的失败的方法暴露出来
    });
    let p= Promise.race([p2,p1]);
    p.abort=fail;
    return p;
}

let p=wrap(new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ok');
    },3000)
}))
p.abort('error');
p.then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})

//5) 既能捕获同步又能捕获异步
function fn(){
    //可能函数中抛出了 同步错误 要通过try-catch 捕获异常
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('xxx')
        },3000)
    })
}
Promise.try=function(callback){
    return new Promise((resolve,reject)=>{
        return Promise.resolve(callback()).then(resolve,reject)
    })
}
Promise.try(fn).then((data)=>{
    console.log(data);
},err=>{
    console.log('err'+err);
})