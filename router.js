import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('~/pages/login').then(m => m.default || m)
const SignUp = () => import('~/pages/signup').then(m => m.default || m)
const Dashboard = () => import('~/pages/dashboard').then(m => m.default || m)
const ErrorPage = () => import('~/layouts/error').then(m => m.default || m)

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
  }]
})

export function createRouter () {
  return router
}
