
import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', 
        alias: '/auth', 
        component: () => import('src/pages/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false
      } },
      { path: '/home', 
        component: () => import('src/pages/Home.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } },
      { path: '/services', 
        component: () => import('src/pages/Services.vue'), 
        meta: {
          layout: 'main',
          auth: true
      } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
