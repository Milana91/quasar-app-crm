
import store from '../store'
import { computed } from "vue"

const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', 
        alias: '/auth', 
        component: () => import('src/pages/Auth/index.vue'),
        meta: {
            layout: 'auth',
            auth: false
      } },
      { path: '/home', 
        component: () => import('src/pages/Home/index.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/projects', 
        component: () => import('src/pages/Projects/index.vue'), 
        meta: {
        layout: 'main',
        auth: true
      } },
      { path: '/services', 
        component: () => import('src/pages/Services/index.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/customers', 
        component: () => import('src/pages/Customers/index.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/calendar', 
        component: () => import('src/pages/Calendar/index.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/invoice', 
        component: () => import('src/pages/Invoice.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/help', 
        component: () => import('src/pages/Help.vue'), 
        meta: {
          layout: 'main',
          auth: false
      } },
      {  path: '/:catchAll(.*)*', 
        component: () => import('src/pages/Error404.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      // {
      //   path: '/:catchAll(.*)*',
      //   component: () => import('pages/Error404.vue')
      // }
      // { 
      //   path: '*', 
      //   redirect: '/404' 
      // }
      { path: '/users', 
        component: () => import('src/pages/Users/index.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/Error404.vue'),
  //   meta: {
  //     layout: 'main',
  //     auth: true
  // }
  // }
]

export default routes
