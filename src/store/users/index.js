import { useQuasar } from 'quasar'
import {useRouter} from 'vue-router'
import { getAuth} from "firebase/auth"
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
  setup() {
    // const auth = getAuth()
    // const $q = useQuasar()
    // const router = useRouter()
    // return{
    //   auth,
    //   $q,
    //   router
    // }
  },
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}