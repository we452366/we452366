## 菲达康

### css

#### 用css实现一个从小到大的动画
```
@keyframes warn {  
    0% {  
        transform: scale(0);   
    }  
    50% {  
        transform: scale(0.5);  
    }   
    100% {  
        transform: scale(1);   
    }  
}  
@-webkit-keyframes "warn" {  
    0% {  
        -webkit-transform: scale(0);  
    }  
    50% {  
        -webkit-transform: scale(0.5);  
    }  
    100% {  
        -webkit-transform: scale(1);    
    }  
}  

.pulse {  
    width: 24px;   
    height: 24px;   
    -webkit-animation: warn 3s ease-out;  
    -moz-animation: warn 3s ease-out;  
    animation: warn 3s ease-out;  
    -webkit-animation-iteration-count: infinite;  
    -moz-animation-iteration-count: infinite;  
    animation-iteration-count: infinite;  
} 
```

### 原生js

#### 请手写一个冒泡排序
```
    function bubbleSort(arr){
        for(let i=0;i<arr.length-1;i++){
            for(let j=0;j<arr.length-1-i;j++){
                if(arr[j]>arr[j+1]){
                    let temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
        return arr;
    }
```

### 框架

#### vue中用来显示和隐藏有什么命令？有什么区别？
```
v-if是通过控制dom节点的存在与否来控制元素的显隐；v-show是通过设置DOM元素的display样式，block为显示，none为隐藏；
基于以上区别，因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
```