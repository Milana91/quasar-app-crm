import { getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import {Quasar} from 'quasar'
import { Notify } from 'quasar'



export async function createUser ({state, commit, dispatch, rootGetters}, userData) {
  commit('setActiveUser', true)
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, userData.userEmail, userData.userPassword)
  .then(async (userCredential) => {
    const token = rootGetters['authenticate/token']
    const user = userCredential.user
    const uidNum = user.uid
    await dispatch('getUidVals')
    const copyStore = JSON.parse(JSON.stringify(state.uidVals))
    const uidVals = copyStore
    uidVals.push( { [uidNum] : true} );
    console.log('получилось', uidVals)
    const obj = uidVals.reduce((newObj, item) => {
      newObj[item] = item
      return newObj
    }, {})
    console.log('новый пользователь', user)
    const userInfo = {email: user.email, name: userData.userName, role: 'manager', uid: uidNum}
    const {data} = await api.post(`/users.json?auth=${token}`, userInfo)
    const {uidValues} = await api.put(`/allowedUids.json?auth=${token}`, obj)
    commit('addUser', userInfo)
    console.log('zsdgxxg', {data})
      setTimeout(() => {
        Notify.create({
          message:  'Пользователь зарегистрирован'
        })
      }, 2000);
  })
  .catch(e => { 
    const errorCode = e.code;
    const errorMessage = e.message;
      Notify.create({
        message: errorMessage
      })}
    )
}

export async function loadUsers({ commit, rootGetters}) {
  try {
      const token = rootGetters['authenticate/token']
      const {data} = await api.get(`/users.json?auth=${token}`)
      const users = Object.keys(data).map(id => ({...data[id], id}))
      commit('setUsers', users)
  } catch (e) {
      console.log(e)
      Notify.create({
          message: error(e)
      })    
  }
}

export async function getUidVals({ state, commit, rootGetters}) {
  try {
      const token = rootGetters['authenticate/token']
      const {data} = await api.get(`/allowedUids.json?auth=${token}`)
      const uids = Object.keys(data)
      commit('setUidVals', uids)
      console.log('uids',  state.uidVals)
  } catch (e) {
      console.log(e)
      Notify.create({
          message: error(e)
      })    
  }
}


export function deleteUser ({commit, dispatch, rootGetters}, userData) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("удалить", user)
}