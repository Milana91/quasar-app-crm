import { getAuth, signOut } from "firebase/auth"
import {error} from 'src/utils/error'
import {Quasar} from 'quasar'
import { Notify } from 'quasar'



export function getToken ({commit}) {
    const auth = getAuth()
    const user = auth.currentUser
    console.log(user)
    if (user !== null) {
        user.getIdToken(true)
        .then(function(idToken) {
                console.log(idToken)
                commit('setToken', idToken)
        }).catch(function(error) {
            console.log(error)
      });
    }
}


export function logout ({commit}) {
    const auth = getAuth()
    signOut(auth).then(() => {
        Notify.create({message: 'Выход осуществлен'})
        commit('removeToken')
      }).catch(e => { 
        Notify.create({
            message: error(e)
          })
        console.log(e)
        Notify.create(e)
    })
}
