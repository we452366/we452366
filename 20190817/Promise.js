const PENDING='PENDING';
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
// promise的处理函数
const resolvePromise=(promise2,x,resolve,reject)=>{
    // 处理x的类型 来决定是调用resolve还是reject
    if(promise2 === x){
        // 等待自己完成
        return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
    }
    // 判断x 是不是一个普通值
    if((typeof x === 'object' && typeof x !== null) || typeof x === 'function'){
        // 可能是promise
        let called; // 默认没有调用成功和失败
        try{
            let then = x.then; // 看是否有then方法
            if(typeof then === 'function'){
                // 是promise
                then.call(x,y=>{ // 如果是promise 就采用这个promise结果
                    if(called) return; // 防止多次调用
                    called=true;
                    // y可能还是一个promise 实现递归解析
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called) return; // 防止多次调用
                    called=true;
                    reject(r)
                })
            }else{
                resolve(x); // 常量直接抛出去
            }
        }catch(e){
            if(called) return; // 防止多次调用
            called=true;
            reject(e); // 取then抛出异常
        }
    }else{
        resolve(x)
    }
}
class Promise{
    constructor(executor){
        //创建promise executor会立即执行
        this.value=undefined;
        this.reason=undefined;
        this.status=PENDING;
        this.onResolvedCallback=[];
        this.onRejectedCallback=[];
        let resolve=(value)=>{
            if(value instanceof Promise){
                // 如果一个promise resolve了一个新的promise 会等到这个内部的promise的结果执行完成
                return value.then(resolve,reject); // 和resolvePromise的功能是一样的
            }
            if(this.status===PENDING){
                this.value=value;
                this.status=FULFILLED;
                this.onResolvedCallback.forEach(fn=>fn());
            } 
        };
        let reject=(reason)=>{
            if(this.status===PENDING){
                this.reason=reason;
                this.status=REJECTED;
                this.onRejectedCallback.forEach(fn=>fn());
            } 
        };
        //这里可能会发生异常
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }   
    }
    //then方法会判断当前状态
    then(onFulfiled,onRejected){
        onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : val=>val;
        onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err};
        let promise2=new Promise((resolve,reject)=>{
            // 应该在返回的promise中取到上一次的状态 来决定这个promise2是成功还是失败
            if(this.status === FULFILLED){
                setTimeout(()=>{
                    try{
                        let x= onFulfiled(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let x= onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status === PENDING){
                this.onResolvedCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x= onFulfiled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x= onRejected(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2;
    }
    catch(errCallback){
        // 没有成功的then
        return this.then(null,errCallback);
    }
    static reject(reason){ // 创建了失败的Promise
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }
    static resolve(value){ // 创建了成功的Promise
        return new Promise((resolve,reject)=>{
            resolve(value)
        })
    }
}
// 先全局安装 再进行测试 promises-aplus-tests 文件名
Promise.deferred = function(){
    let dfd ={};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve=resolve;
        dfd.reject=reject;
    })
    return dfd;
}
module.exports=Promise;