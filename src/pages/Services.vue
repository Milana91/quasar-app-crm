<template>
    <app-page title="Наши услуги">
      <template #header>
        <q-btn color="primary" label="Добавить услугу"  class="btn-fixed-width"  @click="modal = true"/>
      </template>
    </app-page>
</template>

<script>
import { defineComponent } from 'vue'
import AppPage from 'components/ui/AppPage'
import {ref} from 'vue'

export default defineComponent({
  name: 'Services',
  setup() {

    return {
      
    }
  },
  components: { AppPage }
})
</script>
