<template>
  <div>
    <q-form @submit="submitForm">
      <q-input outlined class="q-mb-md" type="email" :rules="[val => !!val || 'Введите email']" label="Email" v-model="formData.email" />
      <q-input outlined class="q-mb-md" type="password" :rules="[val => !!val || 'Введите пароль']" label="Password" v-model="formData.password" />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" label="Войти" />
      </div>
    </q-form>
    <div class="text-center q-my-md">
      <q-btn flat label="Forgot Password?" color="green" class="text-capitalize rounded-borders"
        @click="forgotPassword" />
    </div>
    <q-dialog v-model="resetPassword">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import ForgotPassword from "components/ForgotPassword.vue"
import firebase from 'firebase/compat/app'
import {useRouter} from 'vue-router'
import { useQuasar } from 'quasar'
import {error} from 'src/utils/error'
import { useStore } from 'vuex'

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"

export default {
  name: "AuthComponent",
  setup() {
    const auth = getAuth()
    const $q = useQuasar()
    const router = useRouter()
    const store = useStore()

    const formData = reactive({
          email: '',
          password: ''
        })
    const resetPassword = ref(false)


    const signInExistingUser = function (email, password) {
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          store.dispatch('authenticate/getToken')
          $q.notify({message: 'Вход осуществлен'})
          router.push('/home')
          console.log(user)
          console.log(store.dispatch('authenticate/getToken'))
        })
      .catch(e => { 
          const errorCode = e.code;
          console.log(errorCode)
          $q.notify({message: error(errorCode)})}
        )
    }

    const submitForm = function () {
        signInExistingUser(formData.email, formData.password)
    }

    const forgotPassword = function () {
      resetPassword.value = true
    }

    return {
      formData,
      resetPassword,
      submitForm,
      signInExistingUser,
      forgotPassword,
    }
  },
  components: { ForgotPassword }
}
</script>

<style lang="sass" scoped>
.btn-fixed-width
  width: 220px
</style>

