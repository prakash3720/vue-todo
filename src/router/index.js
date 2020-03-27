import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import { store } from '../store/store'

Vue.use(Router)

const router=new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        requiresAuth:true
      },
      beforeEnter:(to,from,next)=>{
        if(!store.getters.isLoggedIn){
          next({name:'Login'})
        }else{
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter:(to,from,next)=>{
        if(store.getters.isLoggedIn){
          next({name:'Home'})
        }else{
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter:(to,from,next)=>{
        if(store.getters.isLoggedIn){
          next({name:'Home'})
        }else{
          next()
        }
      }
    }
  ]
})

export default router