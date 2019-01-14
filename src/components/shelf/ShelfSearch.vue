<template>
  <div class="shelf-search-wrapper" :class="{'search-top':ifInputClicked,'hide-shadow':ifHideShadow}">
    <div class="shelf-search" :class="{'search-top':ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input 
            type="text" 
            class="search-input"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            v-model="searchText">
        </div>
        <div 
          class="icon-clear-wrapper" 
          v-show="searchText.length>0"
          @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>

      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
        <span class="icon-cn" v-if="lang ==='cn'"></span>
        <span class="icon-en" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-te">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="tab-wrapper" v-if="ifInputClicked">
        <div class="tab-item" v-for="(item, index) in tabs" :key="index" @click="onTabClick(item)">
          <span class="tab-item-text" :class="{'is-selected': item.selected}">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {setLocalStorage } from '../../utils/localStorage'
import { storeShelfMxin } from '../../utils/mixin'
export default {
  mixins:[storeShelfMxin],
  watch:{
    offsetY(OffsetY){
      if(OffsetY>0 &&this.ifInputClicked){
        this.ifHideShadow=false//显示阴影
      }else{
         this.ifHideShadow=true//隐藏阴影
      }
    }
  },
  computed:{
    lang(){
      return this.$i18n.locale
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default'),
          selected: true
        },
        {
          id: 2,
          text: this.$t('shelf.progress'),
          selected: false
        },
        {
          id: 3,
          text: this.$t('shelf.purchase'),
          selected: false
        }
      ]
    }
  },
  data(){
    return{
      ifInputClicked:false,
      ifShowCancel: false,
      ifShowClear: false,
      ifHideShadow: true,
      searchText: ''
    }
  },
  methods:{
    onTabClick(item) {
      this.tabs.forEach(tab => {
        if (tab.id === item.id) {
          tab.selected = true
        } else {
          tab.selected = false
        }
      })
      this.$emit('onTabClick', item.id)
      this.$forceUpdate()
    },
    onSearchClick(){
      this.ifInputClicked=true,
      this.setShelfTitleVisible(false)
    },
    onCancelClick(){
      this.ifInputClicked=false
       this.setShelfTitleVisible(true)
    },
    switchLocale(){
      if(this.lang === "en"){
        this.$i18n.locale='cn'
      }else{
        this.$i18n.locale='en'
      }
      setLocalStorage('locale',this.$i18n.locale)
    },
    clearSearchText(){
      this.searchText=''
    }

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

.shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.search-top {
      position: fixed;
      top: 0;
      left: 0;
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-search {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 101;
      width: 100%;
      height: px2rem(52);
      display: flex;
      transition: all $animationTime linear;
      &.search-top {
        top: 0;
      }
      .search-wrapper {
        display: flex;
        flex: 1;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;
          .icon-search {
            font-size: px2rem(12);
          }
        }
        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;
          .search-input {
            width: 100%;
            // height: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper{
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn, .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .cancel-btn {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
    .tab-wrapper {
      position: absolute;
      top: px2rem(52);
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: px2rem(42);
      .tab-item {
        flex: 1;
        @include center;
        .tab-item-text {
          font-size: px2rem(12);
          color: #999;
          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
  }
</style>
