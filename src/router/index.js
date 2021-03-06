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
    Router.beforeEach((to, from, next) => {
    const requiredAuth = to.meta.auth

    const toggleClassBody = () => {
        if(to.path == '/' || to.path == '/auth' ) {
          document.body.className = 'home';
        }
        else {
          document.body.className = 'other';
        }
      }
    toggleClassBody()
    // если для перехода у роута есть требование авторизации и пользователь авторизован, осуществляем переход
    
    if (to.path == '/' && store().getters['authenticate/isAuthenticated']){
      console.log('переход', store().getters['authenticate/isAuthenticated'])  
      Router.push('/home')}  
    else if (requiredAuth && store().getters['authenticate/isAuthenticated']){
      console.log('переход', store().getters['authenticate/isAuthenticated'])  
      next()
      } else if (requiredAuth && !store().getters['authenticate/isAuthenticated']) {
        console.log('ошибка', store().getters['authenticate/isAuthenticated']) 
        Notify.create('Пожалуйста, войдите в систему')
        next('/auth?message=auth')
      } else {
        next()
      }
  })

  return Router
})
