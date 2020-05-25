import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Calendar } from 'vue-calendar-xjq';
import 'vue-calendar-xjq/lib/index.css';
import directives from './plugins/directives'
import echarts from "echarts";
require('vue2-animate/dist/vue2-animate.min.css')
import VueParticles from 'vue-particles'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import vueTopprogress from 'vue-top-progress'

Vue.use(vueTopprogress)
Vue.use(contentmenu)
Vue.use(VueParticles)
var qs = require('qs');
var axios = require('axios')
axios.defaults.baseURL = 'http://www.ccocc.co:9786/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.use(directives)
Vue.use(Calendar)
Vue.use(mavonEditor)
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
