import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Climbingwall from '@/components/Climbingwall'
import Route from '@/components/Route'
import Login from '@/components/Login'
import Traininglog from '@/components/Traininglog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/climbingwall/:id',
      name: 'Climbingwall',
      component: Climbingwall
    },
    {
      path: '/route/:id',
      name: 'Route',
      component: Route
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/traininglog/',
      name: 'Traininglog',
      component: Traininglog
    }

  ]
})
