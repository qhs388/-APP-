<template>
    <div 
      class="shelf-item " 
      :class="{'shelf-item-shadow':data.type === 1 ||data.type === 2}"
      @click="onItemClick">
      <component 
        class="shelf-item-comp"
        :class="{'is-edit': isEditMode && data.type === 2}"
        :is="item" 
        :data="data"></component>
      <div 
        class="icon-selected"
        :class="{'is-selected': data.selected}" 
        v-show="isEditMode && data.type ==1"></div>
    </div>
</template>

<script>
import { storeShelfMxin } from '../../utils/mixin'
import shelfBook from './ShelfItemBook'
import shelfCategory from './ShelfItemCategory'
import shelfAdd from './ShelfItemAdd'
import { gotoStoreHome } from '../../utils/store'

export default {
  mixins:[storeShelfMxin],
  props:{
    data:Object
  },
  computed:{
    item(){
      return this.data.type === 1 ? this.book:( this.data.type === 2 ? this.category:this.add)
    }
  },
  data(){
    return {
        book:shelfBook,
        category:shelfCategory,
        add:shelfAdd,
    } 
  },
  methods:{
    onItemClick(){
      if(this.isEditMode){
        this.setIsAllMode(true)
        this.data.selected = !this.data.selected
        if(this.data.selected){
          this.shelfSelected.pushWithoutDuplicate(this.data)
        }else{
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      }else{
        if(this.data.type===1){
          this.showBookDetail(this.data)
        }else if(this.data.type===2){
          this.$router.push({
            path:'/store/category',
            query:{
              title:this.data.title
            }
          })
        }else{
          gotoStoreHome(this)
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-item{
    width: 100%;
    height: 100%;
    position: relative;
    &.shelf-item-shadow{
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200,200,200,.3)
    }
    .shelf-item-comp{
      opacity: 1;
      &.is-edit{
         opacity: 0.5;
      }
    }
    .icon-selected{
      position: absolute;
      bottom: px2rem(2);
      right: px2rem(2);
      font-size: px2rem(18);
      color:rgba(0,0,0,.4);
      &.is-selected{
        color:$color-blue;
      }
    }
  }
</style>
