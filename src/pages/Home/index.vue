<template>
  <TopCustomers/>
  <SalesAmountChart/>
  <q-page class="flex q-pa-md">
    Добро пожаловать
    <q-space />
    <!-- <div>
      <AppButton label="Выйти" @clickAction="logout"/>
    </div> -->
  </q-page>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter }  from 'vue-router'
// import AppButton from 'components/ui/AppButton'
import TopCustomers from 'components/TopCustomers'
import SalesAmountChart from 'components/SalesAmountChart'
import {onMounted} from "vue"

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
          logout,
      }
  },
  components: { TopCustomers, SalesAmountChart}
}
</script>

<style lang="sass">
</style>
