import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast' //引用提示框组件
import Popup from '../components/common/Popup' //引用弹框框组件
import GroupDialog from '../components/shelf/ShelfGroupDialog' //引用弹框2框组件

//插件引用   vue-create-api
//插件功能帮助我们很好的全局调用组件并传递值


Vue.use(CreateAPI)//vue调用CreateAPI

//注册组件
Vue.createAPI(Toast,true)
Vue.createAPI(Popup,true)
Vue.createAPI(GroupDialog,true)



Vue.mixin({//把CreateAPI放进mixin进行全局调用
    methods:{
      toast(settings) {
        return this.$createToast({
          $props:settings
        })
      },
      popup(settings) {
        return this.$createPopup({
          $props:settings
        })
      },
      simpleToast(text){
        const toast = this.toast({text:text}).show()
        toast.updateText(text)
      },
      dialog(settings) {
        return this.$createGroupDialog({
          $props:settings
        })
      }
    }
})