import { mapGetters , mapActions } from 'vuex'
import { themeList, addCss, removeAllCss ,getReadTimeByMinute} from './book'
import { getBookmark, saveLocation , getBookShelf, saveBookShelf  } from './localStorage'
import { shelf} from '../api/store'
import { appendAddToShelf ,removeAddFromShelf, computedID ,showBookDetail} from './store'

export const storeHomeMixin ={
  computed:{
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods:{
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail(book){
      showBookDetail(this,book)
    }
  }
}


export const ebookMixin = {
  computed:{
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
      ]),
    themeList(){
      return themeList(this)
    },
    getSectionName(){
      // if(this.section){
      //   const sectionInfo = this.currentBook.section(this.section)
      //   if(sectionInfo&&sectionInfo.href && this.currentBook && this.currentBook.navigation ){
      //     return this.currentBook.navigation.get(sectionInfo.href).label
      //   }
      // }
      return this.section ? this.navigation[this.section].label : ''
    }
    
  },
  methods:{
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if(currentLocation && currentLocation.start){
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        saveLocation(this.fileName, startCfi)
        const bookmark = getBookmark(this.fileName)
        if(bookmark){
          if(bookmark.some(item => item.cfi === startCfi)){
            this.setIsBookmark(true)
          }else{
            this.setIsBookmark(false)
          }
        }else{
          this.setIsBookmark(false)
        }
      }
    },
    display(target,cd){
      if(target){
        this.currentBook.rendition.display(target).then(()=>{
          this.refreshLocation()
          if(cd) cd()
        })
      }else{ 
        this.currentBook.rendition.display().then(()=>{
          this.refreshLocation()
          if(cd) cd()
        })
      }
    },
    hideTitleAndMenu(){
      this.$store.dispatch('setMenuVisible',false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
   },
   getReadTimeText(){
    return this.$t('book.haveRead').replace('$1',getReadTimeByMinute(this.fileName))
   }
  }
}

export const storeShelfMxin={
  computed: {
    ...mapGetters([
      'isEditMode',//是否进入编辑模式
      'isAllMode',//是否全选
      'shelfList',//书架图书列表
      'shelfSelected',//书架图书选中的列表
      'shelfTitleVisible',//书架标题的显示状态
      'offsetY',
      'shelfCategory',//书架分类列表数据
      'currentType',//书架列表为1，如果是在书架分类列表面为2
    ])
  },
  methods:{
    ...mapActions([
      'setIsEditMode',
      'setIsAllMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail(book){
      showBookDetail(this,book)
    },
    getShelfList(){
      let shelfList = getBookShelf()
      if(!shelfList){
        shelf().then(response=>{
          console.log(response.data.bookList)
          shelfList=appendAddToShelf(response.data.bookList)
          saveBookShelf(shelfList)
          return this.setShelfList(shelfList)
        })
      }else{
       return this.setShelfList(shelfList)
      }
    },
    getCategoryList(title){
      this.getShelfList().then(()=>{
        const categoryList = this.shelfList.filter(book=>book.type ===2 && book.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    },
    moveOutOfGroup(f){//公用移出分类方法
      this.setShelfList(  this.shelfList.map(book=>{
        if(book.type === 2 && book.itemList){
          book.itemList = book.itemList.filter(subBook=>!subBook.selected)
        }
        return book
      })
      ).then(()=>{
        const list= computedID(appendAddToShelf([].concat(removeAddFromShelf(this.shelfList),...this.shelfSelected)))
        this.setShelfList(list).then(()=>{
          this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
          this.onComplete()
          if(f) f()
        })
      })
    }
  }
}

