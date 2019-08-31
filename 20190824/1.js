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
let total = [
    {price:10, count:5},
    {price:10, count:5},
    {price:10, count:5},
    {price:10, count:5},
    {price:10, count:5},
    {price:10, count:5},
    {price:10, count:5},
  ].myReduce((prev, current, index, arr) => {
    return prev + current.price * current.count
  },0)
  console.log(total);

