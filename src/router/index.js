import Vue from 'vue'
import Router from 'vue-router'
const Detail =() => import ("../views/detail/Detail")
const Home =() => import('../views/home/Home')   //路由懒加载
const Category =() => import('../views/category/Category')
const Shopcart =() => import('../views/shopcart/Shopcart')
const Profile =() => import('../views/profile/Profile')

Vue.use(Router) //安装插件

const routes =[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopcart',
    component:Shopcart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new Router({
  routes,
  mode:'history'
})

export default router
