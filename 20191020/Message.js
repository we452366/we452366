import MessageComponent from './Message.js';
let instance;
let getVueInstance=()=>{
    instance=new Vue({
        render:h=>h(MessageComponent)
    }).$mount();
    document.body.appendChild(vm.$el);
}
const Message={
    success(options){
        !instance && getVueInstance();
        instance.$children[0].add({
            ...options,
            type:'success'
        });
    },
    info(){

    },
    warn(){

    }
}

export {
    Message
}

export default {
    install(_Vue){
        let $message={};
        Object.keys(Message).forEach(key=>{
            $message[key]=Message[key];
        })
        Vue.prototype.$message=$message;
    }
}