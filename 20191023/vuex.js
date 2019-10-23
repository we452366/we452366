let Vue;
const forEach=(obj,cb)=>{
    Object.keys(obj).forEach(key=>{
        cb[key,obj[key]]
    })
}
const installModule=(store,rootState,path,rootModule)=>{
    let getters=rootModule._rawModule.getters;
    if(getters){
        forEach((getters,getterName,fn)=>{
            Object.defineProperty(store.getters,getterName,{
                get(){
                    // 将自己的状态传入
                    return fn(rootModule.state)
                }
            })
        })
    }
    let mutations=rootModule._rawModule.mutations;
    if(mutations){
        forEach(mutations,(mutationName,fn)=>{
            let mutations=store.mutations[mutationName] || [];
            mutations.push((payload)=>{
                fn(rootModule.state,payload)
            })
            store.mutations[mutationName]=mutations
        })
    }
}
class ModuleCollection{
    constructor(options){
        this.register([],options);// 将模块注册成树结构
    }
    register(path,rootModule){
        let module={ // 将模块格式化
            _rawModule:rootModule,
            _children:{},
            state:rootModule.state
        }
        if(path.length==0){
            this.root=module;
        }else{
            // 递归用reduce，通过_children进行查找
            let parent=path.slice(0,-1).reduce((root,current)=>{
                return root._children[current]
            },this.root)
            parent._children[path[path.length-1]]=module
        }

        if(rootModule.modules){
            forEach(rootModule.modules,(moduleName,module)=>{
                this.register(path.concat(moduleName),module)
            })
        }
    }
}
class Store{
    constructor(options={}){
        this.s=new Vue({
            data(){
                return {state:options.state}
            }
        });//用来维护全局数据
        this.getters={};
        this.mutations={};
        this.actions={};
        this._modules=new ModuleCollection(options)
        // 递归将结果进行分类 this代表整个store this.state代表当前根状态
        installModule(this,this.state,[],this._modules.root)
    }
    // 提交更改，订阅的函数执行
    commit = (mutationName,payload)=>{
        this.mutations[mutationName](payload)
    }
    dispatch=(actionName,payload)=>{
        this.actions[actionName](payload)
    }
    get state(){
        return this.s.state
    }
}
const install=(_Vue)=>{
    Vue=_Vue;
    Vue.mixin({
        // 每个组件创建之前会被执行
        beforeCreate(){
            // store属性，给每个组件都增加store属性
            if(this.$options && this.$options.store){
                this.$store=this.$options.store;
            }else{
                this.$store=this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    // 给用户提供一个install方法，默认会被调用
    install,
    Store
}