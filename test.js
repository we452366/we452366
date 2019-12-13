setTimeout(()=>{
    console.log(1);
});

new Promise((resolve,reject)=>{
    resolve();
}).then(()=>{
    console.log(2);
});