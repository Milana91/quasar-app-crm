<template>
  <q-page class="flex row q-pa-md justify-around">

   <TopCustomers/>
    <SalesAmountChart/>
  </q-page>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter }  from 'vue-router'
// import AppButton from 'components/ui/AppButton'
import TopCustomers from 'components/TopCustomers'
import SalesAmountChart from 'components/SalesAmountChart'
import {ref, onMounted} from "vue"

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
  components: { TopCustomers, SalesAmountChart}
}
</script>

<style lang="sass">
</style>
