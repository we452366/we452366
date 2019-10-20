<template>
    <div>
        <div v-for="layer in layers" :key="layer.id">
            {{layer.message}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            layers:[]
        }
    },
    mounted(){
        this.id=0;
    },
    methods:{
        add(options){
            let layer={...options,id:++this.id}
            this.layers.push(layer);

            layer.timer=setTimeout(()=>{
                this.remove(layer)
            },options.duration)
        },
        remove(layer){
            clearTimeout(layer.timer);
            this.layers.filter(item=>layer.id !== item.id);
        }
    }
}
</script>