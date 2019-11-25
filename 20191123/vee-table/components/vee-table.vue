<template>
  <div class="table-wrapper" ref="tableWrapper">
      <div :style="{'height':height+'px'}" class="scroll-box" ref="scrollBox">
        <table class="table" :class="{border,stripe}" ref="table">
            <!-- 表头 -->
            <thead>
                <tr>
                    <th style="width:50px">
                        <input type="checkbox" :checked="checkAllStatus" ref="checkAll" @change="changeAllItems" />
                    </th>
                    <th v-for="column in columns" :key="column.key">
                        <div class="th-head">
                            {{column.title}}
                            <span v-if="column.key in orderBy" class="sorter" @click="sort(column)">
                                <i class="iconfont iconup" :class="{active:orderBy[column.key]==='asc'}"></i>
                                <i class="iconfont icondown" :class="{active:orderBy[column.key]==='desc'}"></i>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- 表体 -->
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td style="width:50px">
                        <input type="checkbox" @change="changeItem(row,$event)" :checked="isChecked(row)">
                    </td>
                    <td v-for="column in colunmns" :key="column.key">{{row[column.key]}}</td>
                </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  mounted(){
      if(this.height){
          let copyTable=this.$refs.table.cloneNode();
          let thead=this.$refs.table.children[0];
          
          this.tableWrapper.style.paddingTop=thead.getBoundingClientRect().height+'px';
          copyTable.appendChild(thead);
          this.tableWrapper.appendChild(copyTable);
          copyTable.classList.add('fiex-header')
      }
      
  },
  props: {
      height:{
          type:Number,
          default:400
      },
      selectedItems:{
          type:Array,
          default:()=>[]
      },
      stripe:{
          type:Boolean,
          default:true
      },
      border:{
          type:Boolean,
          default:false
      },
      columns:{
          type:Array,
          default:()=>[] // 为了防止所有组件共用一个对象
      },
      data:{
          type:Array,
          default:()=>[]
      },
      orderBy:{
          type:Object,
          default:()=>({})
      }
  },
  methods:{
      changeItem(row,e){
          let copySelectedItems=cloneDeep(this.selectedItems);
          if(e.target.checked){
              copySelectedItems.push(row)
          }else{
              let idx=copySelectedItems.findIndex(item=>item.id===row.id);
              copySelectedItems.splice(idx,1);
          }
          this.$emit('update:selectedItems',copySelectedItems)
      },
      changeAllItems(e){
          this.$emit('update:selectedItems',e.target.checked?this.data:[])
      },
      isChecked(row){
          return this.selectedItems.some(item=>item.id===row.id)
      },
      sort(column){
          let copyOrderBy=cloneDeep(this.orderBy);
          if(copyOrderBy[column.key]==='asc'){
              copyOrderBy[column.key]='desc'
          }else if(copyOrderBy[column.key]==='desc'){
              copyOrderBy[column.key]=true
          }else{
              copyOrderBy[column.key]='asc'
          }
          this.$emit('update:orderBy',copyOrderBy)
      }
  },
  watch:{
      selectedItems(){
          if(this.selectedItems.length!==this.data.length){
              if(this.selectedItems.length !==0){
                  return this.$refs.checkAll.indeterminate=true;
              }
          }
          this.$refs.checkAll.indeterminate=false;
      }
  },
  computed:{
      checkAllStatus(){
          return this.data.length===this.selectedItems.length
      }
  }
}
</script>

<style lang="stylus">
*{
    margin 0;
    padding 0;
    box-sizing border-box;
}

.scroll-box{
    overflow-y scroll;
}

.fiex-header{
    position absolute;
    top 0;
    left 0;
    width 100%;
}

.table-wrapper{
    width 80%;
    margin 0 auto;
    position relative;

    table{
        border-spacing 0;
        border-collapse collapse;
        width 100%;
        
        &.border{
            border 1px solid #ddd;

            th,td{
                border 1px solid #ddd
            }
        }

        &.stripe{
            tbody{
                tr:nth-chilid(even){
                    background #ddd;
                }
            }
        }

        th{
            background #eee;
        }

        th,td{
            border-bottom 1px solid #ddd;
            padding 5px;
            text-align left;
        }
    }
}

.th-thead{
    display flex;
    align-items center;

    .sorter{
        transform scale(.6);
        margin 0 4px;
        display flex;
        flex-direction column;
        cursor pointer;
    }

    .iconfont{
        color #ececec;
        
        &.active{
            color red;
        }
    }
}
</style>
