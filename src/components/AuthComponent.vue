<template>
  <div>
    <template v-if="tab === 'register'">
      <div class="text-center q-mb-lg">Sign up with</div>
    </template>
    <template v-else>
      <div class="text-center q-mb-lg">Sign in with</div>
    </template>
    <div class="flex flex-center">
      <q-btn class="flex flex-center q-px-lg q-py-sm q-mb-md" color="primary" size="md"  label="Google" 
        @click="signInWithGoogle" 
      />
    </div>
    <template v-if="tab === 'register'">
      <p class="text-center">Sign up with credentials</p>
    </template>
    <template v-else>
      <p class="text-center">Sign in with credentials</p>
    </template>

    <q-form @submit="submitForm">
      <q-input outlined class="q-mb-md" type="email" label="Email" v-model="formData.email" />
      <q-input outlined class="q-mb-md" type="password" label="Password" v-model="formData.password" />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" :label="tab" />
      </div>
    </q-form>
    <div class="text-center q-my-md">
      <q-btn flat label="Forgot Password?" color="green" class="text-capitalize rounded-borders"
        v-if="tab !== 'register'" @click="forgotPassword" />
    </div>
    <q-dialog v-model="resetPassword">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import ForgotPassword from "@/components/ForgotPassword.vue"

export default {
  name: "AuthComponent",
  props: ['tab'],
  setup() {
    const formData = reactive({
          email: '',
          password: ''
        })
    const resetPassword = ref(false)

    const submitForm = function () {
      if (this.tab === 'login') {
         this.signInExistingUser(this.formData.email, this.formData.password)
      } else {
        this.createUser(this.formData.email, this.formData.password)
      }
    }

    const signInWithGoogle = function () {
      console.log('google login & signup')
    }

    const signInExistingUser = function (email, password) {
      console.log(email, password)
    }

    const createUser = function (email, password) {
      console.log(email, password)
    }

    const forgotPassword = function () {
      this.resetPassword = true
    }

    return {
      formData,
      resetPassword,
      submitForm,
      signInExistingUser,
      createUser,
      forgotPassword
    }
  },
  components: { ForgotPassword }
}
</script>
