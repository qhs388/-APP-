<template>
  <div class="store-home">
    <search-bar/>
    <flap-card :data="random"/>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <!-- <div class="banner-wrapper"> -->
        <swiper :options="swiperOption" class="banner-wrapper">
          <swiper-slide>
            <img class="banner-img"  src="http://img2.imgtn.bdimg.com/it/u=3697576038,3770315076&fm=26&gp=0.jpg" alt="">
          </swiper-slide>
          <swiper-slide>  
            <img class="banner-img"  src='http://img4.imgtn.bdimg.com/it/u=1014228455,2002290695&fm=26&gp=0.jpg' alt="">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      <!-- </div> -->
      <guess-you-like :data="guessYouLike"/>
      <recommend :data="recommend" class="recommend"/>
      <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"/>
      <div class="category-list-wrapper"  v-for="(item,index) in categoryList" :key="index">
        <category-book :data="item"/>
      </div>
      <category class="categories" :data="categories"/>
    </scroll>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import FlapCard from '../../components/home/FlapCard'
import { storeHomeMixin } from '../../utils/mixin'
import { home } from '../../api/store'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook'
import Category from '../../components/home/Category'


export default {
  mixins:[storeHomeMixin],
  components:{
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  data(){
    return{
      swiperOption: {
        loop : true,
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay:true
      },
      scrollTop:94,
      random:null,
      banner:[],
      guessYouLike:null,
      recommend:null,
      featured:null,
      categoryList:null,
      categories:null
    }
  },
  methods:{
    onScroll(offsetY){
      this.setOffsetY(offsetY)
      if(offsetY>0){
        this.scrollTop=52
      }else{
        this.scrollTop=94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted(){
    home().then(response=>{
    console.log(response)
     if(response && response.status === 200){
       const data = response.data
       const randomIndex=Math.floor(Math.random() * data.random.length)
       this.random = data.random[randomIndex]
       this.banner = data.banner
       this.guessYouLike= data.guessYouLike
       this.recommend= data.recommend
       this.featured = data.featured
       this.categoryList=data.categoryList
       this.categories = data.categories
     }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .store-home{
    width: 100%;
    height: 100%;
    .banner-wrapper{
      width: 95%;
      margin: px2rem(0) 2.5% px2rem(0) 2.5%;
      height: px2rem(150);
      box-sizing: border-box;
      border-radius: px2rem(5);
      .banner-img{
      width: 100%;
       height: 100%;
      }
    }
    .recommend{
      margin-top: px2rem(20)
    }
    .featured{
      margin-top: px2rem(20)
    }
    .category-list-wrapper{
       margin-top: px2rem(20)
    }
    .categories{
       margin-top: px2rem(20)
    }
  }
</style>
