import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('~/pages/login').then(m => m.default || m)
const SignUp = () => import('~/pages/signup').then(m => m.default || m)
const Dashboard = () => import('~/pages/dashboard').then(m => m.default || m)
const ErrorPage = () => import('~/layouts/error').then(m => m.default || m)
const Products = () => import('~/pages/products').then(m => m.default || m)
const Bucket = () => import('~/pages/products/bucket').then(m => m.default || m)
const Orders = () => import('~/pages/orders').then(m => m.default || m)
const OrderDetail = () => import('~/pages/orders/detail').then(m => m.default || m)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/404',
    name: '404',
    component: ErrorPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    name: 'products',
    path: '/products',
    component: Products
  },
  {
    name: 'bucket',
    path: '/bucket',
    component: Bucket
  },
  {
    name: 'orders',
    path: '/orders/list',
    component: Orders
  },
  {
    name: 'orders/detail',
    path: '/orders/detail',
    component: OrderDetail
  }]
})

export function createRouter () {
  return router
}
