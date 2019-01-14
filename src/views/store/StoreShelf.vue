<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"/>
    <scroll 
      :top="0" 
      :bottom="scrollBottom" 
      class="store-shelf-scroll-wrapper"  
      @onScroll="onScroll"
      ref="scroll">
      <shelf-search/>
      <shelf-list :data="shelfList" />
    </scroll>
    <shelf-footer/>
  </div> 
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import {storeShelfMxin} from '../../utils/mixin'
import Scroll from '../../components/common/Scroll'


export default {
  mixins:[storeShelfMxin],
  components:{
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList,
    ShelfFooter
  },
  watch:{
    isEditMode(isEditMode){
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(()=>{//书架界面响应完成
        this.$refs.scroll.refresh()//调用滚动组件刷新方法
      })
    }
  },
  data(){
    return{
      scrollBottom:0
    }
  },
  methods:{
    onScroll(offsetY){
      this.setOffsetY(offsetY)
    }
  },
  mounted() {
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .store-shelf{
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
    .store-shelf-scroll-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
