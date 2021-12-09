<template>
  <q-page class="flex q-pa-md">
    Добро пожаловать
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth, signOut } from "firebase/auth"
import { useQuasar } from 'quasar'
import {useRouter} from 'vue-router'

export default {
  name: "Home",
  setup() {
      const auth = getAuth()
      const $q = useQuasar()
      const router = useRouter()


      const logout = function() {
        signOut(auth).then(() => {
          $q.notify({message: 'Выход осуществлен'})
          router.push('/auth')
        }).catch(e => { 
          const errorCode = e.code;
          $q.notify({message: error(errorCode)})}
        )
      }

      return {
          logout
      }
  },
}
</script>
