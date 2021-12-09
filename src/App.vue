<template>
  <component :is="layout + '-layout'" v-if="layout"/>
</template>
<script>
import { defineComponent } from 'vue';
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import MainLayout from 'layouts/MainLayout'
import AuthLayout from 'layouts/AuthLayout' 

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()


    return {
      // layout зависит от текущего маршрута (переданных в него метаданных) 
      layout: computed(() => route.meta.layout),
    }
  },
  components: {MainLayout, AuthLayout}
})
</script>
