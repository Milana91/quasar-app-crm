<template>
  <div class="flex flex-center">
    <q-card style="width: 500px; max-width: 40vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Сброс пароля
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-md">
        <q-form ref="resetPasswordForm">
          <q-input
            type="email"
            v-model="form.email"
            label="Email *"
            lazy-rules
            :rules="[val => (!!val && val.length > 0) || 'Пожалуйста, введите свой email']"
          />
        </q-form>
        <q-card-actions align="right">
          <div class="row q-mt-xs">
            <q-btn
              class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
              label="Submit"
              color="primary"
              @click="resetPassword"
            />
          </div>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {getAuth, sendPasswordResetEmail} from "firebase/auth"
import { useQuasar } from 'quasar'
import {error} from 'src/utils/error'

export default {
  name: 'ForgotPassword',
  setup () {
    const auth = getAuth()
    const $q = useQuasar()
    const form = reactive({
      email: ''
    })

    const alertSubmit = function() {
      let seconds = 3

      const dialog = $q.dialog({
        title: 'Ссылка для сброса пароля отправлена на почту',
        message: `Окно будет закрыто автоматически через ${seconds} секунды`
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        clearTimeout(timer)
        // console.log('I am triggered on both OK and Cancel')
      })

      const timer = setInterval(() => {
        seconds--

        if (seconds > 0) {
          dialog.update({
            message: `Окно будет закрыто автоматически через ${seconds} секунд${seconds > 1 ? 'у' : ''}.`
          })
        }
        else {
          clearInterval(timer)
          dialog.hide()
        }
      }, 1000)
    }

    const  resetPassword = function(){
      console.log('resetPassword')
      sendPasswordResetEmail(auth, form.email)
        .then(() => {
          form.value = {email: ''}
          $q.notify({message: 'Ссылка для генерации нового пароля отправлена на ваш почтовый ящик'})
          console.log('письмо отправлено')
          alertSubmit()
       })
        .catch(e => {
          const errorCode = e.code;
          $q.notify({message: error(errorCode)})
          console.log(e)
          }
        )
    }

    return {form, resetPassword, alertSubmit}
  }
}
</script>
