<template>
    <app-page title="Пользователи">
      <template #header>
        <AppButton  label="Добавить пользователя"   @clickAction="modal = true"/>
      </template>
      <CustomersTable/>

    <!-- Вынесем модальное окно в отдельный блок -->
    <teleport to="body">
      <app-modal leftBtn="Отмена" rightBtn="Создать" @submitForm="createUser" v-model="modal" title="Добавить пользователя">
        <CustomersModal v-model:name="userName" v-model:email="userEmail" @created="modal = false" />
      </app-modal>
    </teleport>
   </app-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import AppPage from 'components/ui/AppPage'
import {ref, onMounted, computed, watch} from 'vue'
import AppButton from 'components/ui/AppButton'
import AppModal from 'components/ui/AppModal'
import UsersModal from 'pages/Users/UsersModal'
import UsersTable from 'pages/Users/UsersTable'


export default defineComponent({
  name: 'Customers',
  setup(){
    const modal = ref(false)
    const store = useStore()
    const userName = ref('')
    const userEmail = ref('')

    const createUser = async () => {
            const data = {userName: userName.value , userEmail: userEmail.value }
            await store.dispatch('users/createUser', data)
            userName.value = ''
            userEmail.value = ''
            await store.dispatch('users/loadUsers')
        }
        
    return {
      modal,
      createUser,
      userName,
      userEmail,
    }
  },
  components: { AppPage, AppButton, AppModal, CustomersModal, CustomersTable }
})
</script>
