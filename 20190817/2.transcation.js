//事务 开始的时候 做某件事 结束的时候再做某件事

const perform =(anymethod,wrappers)=>{
    wrappers.forEach(wrap=>{
        wrap.initilize();
    });
    anymethod();
    wrappers.forEach(wrap=>{
        wrap.close();
    })
}

performance(()=>{
    console.log('说话')
},[
    {//wrapper
        initilize(){
            console.log('您好')
        },
        close(){
            console.log('再见')
        }
    },
    {//wrapper
        initilize(){
            console.log('您好')
        },
        close(){
            console.log('再见')
        }
    }
])