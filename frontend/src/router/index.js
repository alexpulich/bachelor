import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Climbingwall from '@/components/Climbingwall'
import Route from '@/components/Route'
import Routes from '@/components/Routes'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Profile from '@/components/Profile'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/climbingwall/:id',
      name: 'Climbingwall',
      component: Climbingwall,
      children: [
        {
          path: 'edit',
          name: 'ClimbingwallEdit',
          component: Climbingwall,
          meta: { auth: true },
          children: [
            {
              path: 'pics',
              name: 'ClimbingwallEditPics',
              component: Climbingwall,
            },
          ],
        },
      ],
    },

    {
      path: '/routes/',
      name: 'Routes',
      component: Routes,
    },
    {
      path: '/routes/:id',
      name: 'Route',
      component: Route,
      children: [
        {
          path: 'edit',
          name: 'RouteEdit',
          component: Route,
          children: [
            {
              path: 'pics',
              name: 'RouteEditPics',
              component: Route,
            },
          ],
        },
      ],
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/registration/',
      name: 'Registration',
      component: Registration,
    },
    {
      path: '/profile/',
      name: 'Profile',
      component: Profile,
      meta: { auth: true },
      children: [
        {
          path: 'edit',
          name: 'ProfileEdit',
          component: Profile,
        },
        { path: 'trainings',
          name: 'ProfileTrainingAdd',
          component: Profile
        }
      ]
    },
    {
      path: '/competition/:id',
      name: 'Competition',
      component: Climbingwall,
      children: [
        {
          path: 'addresults',
          name: 'AddResults',
          component: Climbingwall,
          meta: { auth: true }
        }
      ]
    }
  ],
})
