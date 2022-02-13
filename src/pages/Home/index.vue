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
import TopCustomers from 'components/graphics/TopCustomers'
import SalesAmountChart from 'components/graphics/SalesAmountChart'
import {ref, onMounted} from "vue"

export default {
  name: "Home",
  setup() {
      const store = useStore()
      const router = useRouter()

      // onMounted(async()=>{
      //     await store.dispatch('users/loadUsers')
      // })

      // const logout = function() {
      //   store.dispatch('authenticate/logout')
      //   router.push('/auth')
      // }

      return {
          // logout
      }
  },
  components: { TopCustomers, SalesAmountChart}
}
</script>

<style lang="sass">
</style>
