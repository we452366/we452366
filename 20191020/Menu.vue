<template>
    <vee-menu>
        <template v-for="menu in data">
            <vee-submenu v-if="menu.children" :key="menu.id">
                <template slot="title">{{menu.name}}</template>
            </vee-submenu>
            <vee-menu-item v-else :key="menu.children">

            </vee-menu-item>
        </template>
    </vee-menu>
</template>
<script>
import veeMenu from './vee-menu';
import veeSubmenu from './vee-submenu';
import veeMenuItem from './vee-menu-item';
export default {
    props:{
        data:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        veeMenu,
        veeSubmenu,
        veeMenuItem
    }
}
</script>