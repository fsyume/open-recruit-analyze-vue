import Vue from 'vue'
import VueRouter from 'vue-router'
import Arknights from "@/views/Arknights";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Arknights,
    meta: {
      title: '明日方舟蛋池模拟'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
