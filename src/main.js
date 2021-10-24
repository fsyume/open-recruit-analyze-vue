import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from "axios";
import * as echarts from 'echarts';


Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.prototype.$http = axios

axios.defaults.baseURL = 'https://ark.fsyume.com:9966'


// 自定义标签标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
