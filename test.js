function maxStrLength(str){
    let i=0,res=0,n=0;
    for(let j=0;j<str.length;j++){
        n=str.slice(i,j).indexOf(str[j]);
        if(n==-1){
            res=Math.max(res,j+1-i);
        }else{
            i+=n+1;
        }
    }
    return res;
}

console.log(maxStrLength('pswwkew'))