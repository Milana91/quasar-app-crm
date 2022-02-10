import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth"
import {error} from 'src/utils/error'
import {Quasar} from 'quasar'
import { Notify } from 'quasar'



export function registerUser ({commit, dispatch}, userData) {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then(async (userCredential) => {
    commit('loadingActive')
    const user = userCredential.user
      setTimeout(() => {
        commit('loaded')
        Notify.create({
          message:  'Пользователь зарегистрирован'
        })
      }, 2000);
  })
  .catch(e => { 
      Notify.create({
        message: error(e.code)
      })}
    )
}