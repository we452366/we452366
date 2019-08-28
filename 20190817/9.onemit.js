const fs=require('fs');
let school={};

let e={
    arr:[],
    on(fn){
        this.arr.push(fn);
    },
    emit(){
        this.arr.forEach(fn=>fn())
    }
}

e.on(()=>{ //订阅
    console.log('ok')
})

e.on(()=>{ //订阅
    if(Object.keys(school).length === 2){
        console.log(school)
    }
})

fs.readFile('name.txt','utf8',(err,data)=>{
    school['name']=data;
    e.emit(); //发布
});
fs.readFile('age.txt','utf8',(err,data)=>{
    school['age']=data;
    e.emit();
});