import { store } from 'quasar/wrappers'
import { createStore, createLogger } from 'vuex'
import authenticate from './authenticate'
import services from './services'
import customers from './customers'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const plugins = []

if(process.env.NODE_ENV !== "production") {
  plugins.push(createLogger())
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    plugins,
    modules: {
      authenticate, services, customers
    },
    namespaced: true,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
