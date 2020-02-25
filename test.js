let nums=[1,0,1,2],k=1;
//var topKFrequent = function(nums, k) {
    if(nums.length>0 && nums.every(val=>{
        if(val === "" || val ==null){
            return false;
        }
        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    })){
        let obj={},arr=[],res=[],len=0;
        nums.forEach(item=>{
            console.log(item);
            if(obj[item]){
                obj[item]++;
            }else{
                obj[item]=1;
                len++;
            }
        });
        console.log(obj);
        console.log(len);
        if(k>=1 && k<=len){
            arr=Object.entries(obj);
        }
        
        arr.sort((a,b)=>b[1]-a[1]);
        for(let i=0;i<k;i++){
            res.push(Number(arr[i][0]))
        }
        if(arr.length>0){
            console.log(res);
            // return arr;
        }else{
            // return;
        }
        
    }else{
        // return;
    }
//};