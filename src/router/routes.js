
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', alias: '/auth', component: () => import('src/pages/Index.vue'),
        meta: {
            layout: 'auth',
            auth: false
      } },
      { path: '/home', 
        component: () => import('src/pages/Home.vue'), 
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
