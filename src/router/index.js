import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const ProFile = () => import('../views/profile/ProFile')
const Detail = () => import('../views/detail/Detail')
const Login = () => import('../views/login/Login')

//安装插件
Vue.use(VueRouter)

//创造router

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'home'
  },
  {
    path: '/category',
    component: Category,
    name: 'category'
  },
  {
    path: '/cart',
    component: Cart,
    name: 'cart'
  },
  {
    path: '/profile',
    component: ProFile,
    name: 'profile'
  },
  {
    path: '/detail/:iid',
    component: Detail,
    name: 'detail'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router