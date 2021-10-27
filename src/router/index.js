import Vue from 'vue'
import VueRouter from 'vue-router'
import Arknights from "@/views/Arknights";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Arknights
  }
]

const router = new VueRouter({
  routes
})

export default router
