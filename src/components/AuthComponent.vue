<template>
  <div class="row justify-center" v-if="loading">
      <q-spinner
              color="primary"
              size="11em"
              :thickness="2"
      />
  </div>
  <div v-else>
    <q-form @submit="submitForm">
      <q-input outlined class="q-mb-md" type="email" :rules="[val => !!val || 'Введите email']" label="Email" v-model="formData.email" />
      <q-input outlined class="q-mb-md" type="password" :rules="[val => !!val || 'Введите пароль']" label="Пароль" v-model="formData.password" />
      <div class="column items-center">
            <!-- <q-space /> -->
            <q-btn type="submit" color="primary" label="Войти" class="btn-fixed-width"/>
            <!-- <q-space /> -->
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
import {ref, computed, reactive} from 'vue'
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

    const loading = ref(false)

    const formData = reactive({
          email: '',
          password: ''
        })
    const resetPassword = ref(false)


    const signInExistingUser = function (email, password) {
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          loading.value = true
          const user = userCredential.user
          console.log(user)
          await store.dispatch('authenticate/getToken').then(() => {
            setTimeout(() => {
              loading.value = false
              $q.notify({message: 'Вход осуществлен'})
              router.push('/home')
            }, 1500);
          });
        })
        .catch(e => { 
            console.log(e.code)
            $q.notify({message: error(e.code)})}
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
      loading
    }
  },
  components: { ForgotPassword }
}
</script>

<style lang="sass" scoped>
.btn-fixed-width
  width: 140px
  height: 40px
</style>

