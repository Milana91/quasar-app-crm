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
import { useStore } from 'vuex'
import { useRouter }  from 'vue-router'

export default {
  name: "Home",
  setup() {
      const store = useStore()
      const router = useRouter()

      const logout = function() {
        store.dispatch('authenticate/logout')
        router.push('/auth')
      }

      return {
          logout
      }
  },
}
</script>
