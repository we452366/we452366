<template>
  <div>
      <vee-table 
        :columns="columns" 
        :data="data" 
        border 
        stripe 
        :selectedItems.sync="selectedItems" 
        :orderBy.sync="orderBy"
        :height="200"
        checkable 
        >
      </vee-table>
  </div>
</template>

<script>
import veeTable from './components/vee-table'
export default {
  data() {
    return {
        orderBy:{
            name:true,
            age:'asc',
            address:'desc'
        },
        selectedItems:[],
        columns:[
            {
                title:'Name',
                key:'name'
            }
        ],
        data:[
            {
                id:1,
                name:'name',
                age:18,
                address:'北京市海淀区',
                date:'2019-11-23'
            }
        ]
    }
  },
  methods:{
      sort(r){
          console.log(r)
      }
  },
  components: {
      veeTable
  }
}
</script>

<style scoped>
 
</style>
