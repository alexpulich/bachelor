import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Climbingwall from '@/components/Climbingwall'
import Route from '@/components/Route'
import Routes from '@/components/Routes'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Traininglog from '@/components/Traininglog'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/climbingwall/:id/edit',
      name: 'ClimbingwallEdit',
      component: Climbingwall
    },
    {
      path: '/routes/',
      name: 'Routes',
      component: Routes
    },
    {
      path: '/routes/:id',
      name: 'Route',
      component: Route
    },
    {
      path: '/routes/:id/edit',
      name: 'RouteEdit',
      component: Route
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration/',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/traininglog/',
      name: 'Traininglog',
      component: Traininglog
    }

  ]
})
