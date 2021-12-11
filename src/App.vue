<template>
  <component :is="layout + '-layout'" v-if="layout"/>
</template>
<script>
import { defineComponent } from 'vue';
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import MainLayout from 'layouts/MainLayout'
import AuthLayout from 'layouts/AuthLayout' 
import { useStore } from 'vuex'
import {onMounted} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()

    const store = useStore()
    onMounted(() => {
      console.log(store.getters['authenticate/isAuthenticated'])
    })
    

    return {
      // layout зависит от текущего маршрута (переданных в него метаданных) 
      layout: computed(() => route.meta.layout),
      store
    }
  },
  components: {MainLayout, AuthLayout}
})
</script>
