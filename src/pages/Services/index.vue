<template>
    <app-page title="Наши услуги">
      <template #header>
        <AppButton  label="Добавить услугу"   @clickAction="modal = true"/>
      </template>
      <ServicesTable/>

    <!-- Вынесем модальное окно в отдельный блок -->
    <teleport to="body">
      <app-modal leftBtn="Отмена" rightBtn="Создать" @submitForm="createService" v-model="modal" title="Добавить услугу">
        <ServicesModal v-model:title="serviceTitle" v-model:cost.number="serviceCost" @created="modal = false" />
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
import ServicesModal from 'pages/Services/ServicesModal'
import ServicesTable from 'pages/Services/ServicesTable'

export default defineComponent({
  name: 'Services',
  setup(){
    const modal = ref(false)
    const store = useStore()
    const serviceTitle = ref('')
    const serviceCost = ref('')

    const createService = async () => {
            const data = {serviceTitle: serviceTitle.value , serviceCost: serviceCost.value}
            await store.dispatch('services/createService', data)
            serviceTitle.value = ''
            serviceCost.value = ''
            await store.dispatch('services/loadServices')
        }
        
    return {
      modal,
      createService,
      serviceTitle,
      serviceCost,
    }
  },
  components: { AppPage, AppButton, AppModal, ServicesModal, ServicesTable }
})
</script>
