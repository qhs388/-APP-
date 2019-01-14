import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './lang'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/styles/global.scss'
import './assets/styles/icon.css'
import './assets/mock/index.js'
import './utils/bookst'
import './utils/create-api'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper, /* { default global options } */)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
