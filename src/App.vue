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
import { getDatabase, ref, onValue} from "firebase/database"
import { Notify } from 'quasar'
// import { getDatabase, ref, onValue} from "firebase/database";

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()

    const store = useStore()
    const db = getDatabase()
    const calendarShowUpdate = computed(()=>store.state.calendar.showUpdateConfirmation)
    const calendarActiveUser = computed(()=>store.state.calendar.activeUser)

    const events = ref(db, 'events/')

    // отследить изменения в БД
    const updateEvents = onValue(events, (snapshot) => {
      const data = snapshot.val()
      // Проверить, нужно ли показывать уведомление (показывать только не активному пользователю, кот вносил изм)
      if(route.path=="/calendar" && calendarShowUpdate.value == true && calendarActiveUser.value == false){
          Notify.create({
            message: 'Доступен обновленный контент. Пожалуйста, обновите страницу',
            color: 'primary',
            timeout: 0,
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            actions: [
              { label: 'Подтвердить', color: 'yellow', handler: () => { store.dispatch('calendar/loadEvents')} },
              { label: 'Отклонить', color: 'white', handler: () => { /* ... */ } }
            ]
          })
      }
      // после полученного snapshot сбросить активность пользователя
      store.commit('calendar/setActiveUser', false)
      // Установить статус показа уведомления об обновлении в системе
      store.commit('calendar/setShowConfirmationVal', true)
    })

    
    const projectsShowUpdate = computed(()=>store.state.projects.showUpdateConfirmation)
    const projectsActiveUser = computed(()=>store.state.projects.activeUser)

    const projects = ref(db, 'projects/')

    const updateProjects = onValue(projects, (snapshot) => {
      const data = snapshot.val()
    // Проверить, нужно ли показывать уведомление (показывать только не активному пользователю, кот вносил изм)
      if(route.path=="/projects" && projectsShowUpdate.value == true && projectsActiveUser.value == false){
        Notify.create({
          message: 'Доступен обновленный контент. Пожалуйста, обновите страницу',
          color: 'primary',
          timeout: 0,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Подтвердить', color: 'yellow', handler: () => { store.dispatch('projects/loadProjects')} },
            { label: 'Отклонить', color: 'white', handler: () => { /* ... */ } }
          ]
      })
    }
      // после полученного snapshot сбросить активность пользователя
      store.commit('projects/setActiveUser', false)
      // Установить статус показа уведомления об обновлении в системе
      store.commit('projects/setShowConfirmationVal', true)
    })

    const servicesShowUpdate = computed(()=>store.state.services.showUpdateConfirmation)
    const servicesActiveUser = computed(()=>store.state.services.activeUser)

    const services = ref(db, 'services/')

    const updateServices = onValue(services, (snapshot) => {
      const data = snapshot.val()
    // Проверить, нужно ли показывать уведомление (показывать только не активному пользователю, кот вносил изм)
      if(route.path=="/services" && servicesShowUpdate.value == true && servicesActiveUser.value == false){
        Notify.create({
          message: 'Доступен обновленный контент. Пожалуйста, обновите страницу',
          color: 'primary',
          timeout: 0,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Подтвердить', color: 'yellow', handler: () => { store.dispatch('services/loadServices')} },
            { label: 'Отклонить', color: 'white', handler: () => { /* ... */ } }
          ]
      })
    }
      // после полученного snapshot сбросить активность пользователя
      store.commit('services/setActiveUser', false)
      // Установить статус показа уведомления об обновлении в системе
      store.commit('services/setShowConfirmationVal', true)
    })

    const customersShowUpdate = computed(()=>store.state.customers.showUpdateConfirmation)
    const customersActiveUser = computed(()=>store.state.customers.activeUser)

    const customers = ref(db, 'customers/')

    const updateCustomers = onValue(customers, (snapshot) => {
      const data = snapshot.val()
    // Проверить, нужно ли показывать уведомление (показывать только не активному пользователю, кот вносил изм)
      if(route.path=="/customers" && customersShowUpdate.value == true && customersActiveUser.value == false){
        Notify.create({
          message: 'Доступен обновленный контент. Пожалуйста, обновите страницу',
          color: 'primary',
          timeout: 0,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Подтвердить', color: 'yellow', handler: () => { store.dispatch('customers/loadCustomers')} },
            { label: 'Отклонить', color: 'white', handler: () => { /* ... */ } }
          ]
      })
    }
      // после полученного snapshot сбросить активность пользователя
      store.commit('customers/setActiveUser', false)
      // Установить статус показа уведомления об обновлении в системе
      store.commit('customers/setShowConfirmationVal', true)
    })


    return {
      // layout зависит от текущего маршрута (переданных в него метаданных) 
      layout: computed(() => route.meta.layout),
      store,
      updateEvents, 
      updateProjects,
      updateServices,
      updateCustomers
    }
  },
  components: {MainLayout, AuthLayout}
})
</script>
