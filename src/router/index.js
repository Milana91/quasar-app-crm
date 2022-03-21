import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '../store'
import { Notify } from 'quasar'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  // проверяем, есть ли у страниц требование "быть авторизованным"
  //   Router.beforeEach((to, from, next) => {
  //   const requiredAuth = to.meta.auth

  //   // если для перехода у роута есть требование авторизации и пользователь авторизован, осуществляем переход
  //   // const token = store().dispatch('authenticate/getToken')
  //   // console.log('есть', token)
  //   // && to.path == '/home'
  //   if (to.path == '/' && store().getters['authenticate/isAuthenticated']){
  //     console.log('переход', store().getters['authenticate/isAuthenticated'])  
  //     Router.push('/home')}  
  //   // else if (to.path == '/help'){ 
  //   //   Router.push('/help')
  //   // }
  //   else if (requiredAuth && store().getters['authenticate/isAuthenticated']){
  //     console.log('переход', store().getters['authenticate/isAuthenticated'])  
  //     next()
  //     } else if (requiredAuth && !store().getters['authenticate/isAuthenticated'] && to.path != '/help') {
  //       console.log('ошибка', store().getters['authenticate/isAuthenticated']) 
  //       Notify.create('Пожалуйста, войдите в систему')
  //       next('/auth?message=auth')
  //     } else {
  //       next()
  //     }
  // })

  return Router
})
