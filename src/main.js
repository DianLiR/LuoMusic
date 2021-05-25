import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css' //引用Tailwind

import {
  IndexAnchor,
  Button,
  Cell,
  CellGroup,
  Search,
  Tabbar,
  TabbarItem,
  Tag,
  IndexBar,
  Tab,
  Form,
  Lazyload,
  List,
  Icon,
  Toast,
  Loading,
  Tabs,
  NavBar,
  Image as VanImage,
  Slider,
  Overlay,
  Popover,
  Field
} from 'vant' //vant框架
import 'vant/lib/index.css' //vant-css文件
Vue.use(Button)
  .use(Lazyload, {
    lazyComponent: true
  })
  .use(Popover)
  .use(IndexBar)
  .use(Search)
  .use(Field)
  .use(Toast)
  .use(Form)
  .use(Overlay)
  .use(Loading)
  .use(Slider)
  .use(NavBar)
  .use(Icon)
  .use(List)
  .use(Tag)
  .use(Tabbar)
  .use(Tab)
  .use(Tabs)
  .use(TabbarItem)
  .use(VanImage)
  .use(IndexAnchor)
  .use(Cell)
  .use(CellGroup)

import './plugins/axios' //axios

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)
// // import 'swiper/dist/css/swiper.css'
// import 'swiper/css/swiper.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.min.css'

import './assets/iconfont/iconfont.css'

import 'amfe-flexible' //移动端适配

Vue.filter('playCount', v => {
  //TODO 播放数量格式化
  //   var param = {}
  //   var k = 10000,
  //     sizes = ['', '万', '亿', '万亿'],
  //     i
  //   if (value < k) {
  //     param.value = value
  //     param.unit = ''
  //   } else {
  //     i = Math.floor(Math.log(value) / Math.log(k))
  //     param.value = (value / Math.pow(k, i)).toFixed(2)
  //     param.unit = sizes[i]
  //   }
  //   return param.value + param.unit
  // }
  let param = {}
  if (v == null) {
    return 0
  }
  if (v > 100000000) {
    param.v = (v / 100000000).toFixed(1)
    param.u = '亿'
  } else if (v > 10000) {
    param.v = (v / 10000).toFixed(2)
    param.u = '万'
  } else {
    param.v = v
    param.u = ''
  }
  return param.v + param.u
})
// fontawesome
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(fas)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
// fontawesome

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
