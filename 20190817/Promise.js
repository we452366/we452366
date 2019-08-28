const PENDING='PENDING';
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
class Promise{
    constructor(executor){
        //创建promise executor会立即执行
        this.value=undefined;
        this.reason=undefined;
        this.status=PENDING;
        let resolve=(value)=>{
            if(this.status===PENDING){
                this.value=value;
                this.status=FULFILLED;
            } 
        };
        let reject=(reason)=>{
            if(this.status===PENDING){
                this.reason=reason;
                this.status=REJECTED;
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
        if(this.status === FULFILLED){
            onFulfiled(this.value);
        }
        if(this.status === REJECTED){
            onRejected(this.reason);
        }
    }
}
module.exports=Promise;