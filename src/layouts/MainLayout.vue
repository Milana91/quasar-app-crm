<template>
  <q-layout  view="hHh Lpr lFf">
    <q-header elevated >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn dense color="indigo-8" round icon="notifications" class="q-mr-md" @click="openNotifications">
            <q-badge v-if="counterNotify > 0" color="red" floating>{{ counterNotify }}</q-badge>
        </q-btn>
        <div>Выйти</div>
      </q-toolbar>
    </q-header>

    <q-drawer
    class="menuleft bg-grey-3"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      bordered
      :width="250"
    >
      <q-list padding>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="primary"
            icon="chevron_left"
            @click="miniState = true"
          ></q-btn>
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {useRouter} from 'vue-router'

const linksList = [
  {
    title: 'Главная',
    icon: 'school',
    link: '/home'
  },
    {
    title: 'Проекты',
    icon: 'chat',
    link: '/projects'
  },
  {
    title: 'Услуги',
    icon: 'code',
    link: '/services'
  },
  {
    title: 'Клиенты',
    icon: 'chat',
    link: '/customers'
  },
  {
    title: 'Календарь',
    icon: 'record_voice_over',
    link: '/calendar'
  },
  // {
  //   title: 'Twitter',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
];

import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(false)
    const store = useStore()
    const $q = useQuasar()
    const counterNotify = ref(0)

    const router = useRouter()

    const getNotifications = (item) => {
            $q.notify({
              message: `<span style="font-size: 15px">Событие:</span><br> <span style="font-size: 17px">${item.title }</span>`,
              caption: `<span style="font-size: 16px">${item.details}</span> <br> ${new Date(item.date).toLocaleDateString("ru", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timezone: 'UTC'
              }) } ${item.time}`,
              classes: 'test',
              timeout: 0,
              color: "primary",
              position: 'top-right',
              html: true,
              icon: 'warning',
              textColor: 'white',
              actions: [
              { label: 'Просмотрено', color: 'yellow', handler: ()=>{
                console.log('Просмотрено', item)
                confirmReminder(item)
               } 
              },
              { label: 'Напомнить позже', color: 'white', handler: ()=>{ 
                ++counterNotify.value
                console.log('counterNotify.value', counterNotify.value)
                } }
              ]
           })
    }

    const getNotificationsProjects = (item) => {
            $q.notify({
              message: `<span style="font-size: 15px">Проект:</span><br> <span style="font-size: 17px">${item.id }</span>`,
              caption: `<span style="font-size: 16px"></span> <br> ${item.projectDeadline } `,
              classes: 'test',
              timeout: 0,
              color: "primary",
              position: 'top-right',
              html: true,
              icon: 'warning',
              textColor: 'white',
              actions: [
              { label: 'Просмотрено', color: 'yellow', handler: ()=>{
                console.log('Просмотрено', item)
                confirmReminderDeadline(item)
               } 
              },
              { label: 'Напомнить позже', color: 'white', handler: ()=>{ 
                ++counterNotify.value
                console.log('counterNotify.value', counterNotify.value)
                } }
              ]
           })
    }

    // Напоминания о дедлайнах после входа в систему
    const getProjectsStore = computed(()=> store.state.projects.projects) 
    const projectsForNotifications = ref([])
    const confirmReminderDeadline = async (item) => await store.dispatch('calendar/editReminderStatusDeadline', {
          selectedProject: item, 
          reminderStatus: 'done',
          id: item.id    
      })

    // Напоминания из календаря после входа в систему
    // После авторизации проверяем события в календаре
    const getEventsStore = computed(()=> store.state.calendar.events) 
    const todayDate = new Date().toLocaleDateString().slice(0, 10)
    const nowTime = new Date().toLocaleTimeString().slice(0,-3)
    const eventsToday = ref([])
    const confirmReminder = async (item) => await store.dispatch('calendar/editReminderStatusEvent', {
          selectedEvent: {
            title: item.title,
            id: item.id, 
            details: item.details,
            date: item.date,
            time: item.time,
            bgcolor: item.bgcolor,
          }, 
          reminderStatus: 'done',
          id: item.eventId       
      })
  
    onMounted(async ()=>{
      await store.dispatch('calendar/loadEvents')
      console.log(getEventsStore.value)
      getEventsStore.value.forEach((item) => {
          // console.log('текущее время', nowTime)
          // console.log('проекты в store', getProjectsStore)
          // console.log('текущ дата', todayDate)
          const dateFormat = new Date(item.date).toLocaleDateString().slice(0, 10)
          // console.log('дата из массива', dateFormat)
          if (dateFormat == todayDate && item.time > nowTime){
            // console.log('Ура', item)
            eventsToday.value.push(item)
          }
      })
      getProjectsStore.value.forEach((item) => {
          console.log('текущее время', nowTime)
          console.log('проекты в store', getProjectsStore)
          console.log('item', item)
          const today = new Date().toLocaleDateString("ru", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timezone: 'UTC'
              })
          console.log('дата проекта Сегодня', today )
          console.log('дата проекта', item.projectDeadline )
          if (item.projectDeadline == today){
            console.log('УраПроект', item)
            projectsForNotifications.value.push(item)
            console.log('Проекты - напоминания', projectsForNotifications.value)
          }
      })
      console.log('Ура', eventsToday.value)
      eventsToday.value.forEach((item)=>{
        if(item.reminderStatus != 'done'){
          setTimeout(() => {
            getNotifications(item)
          }, 2500);
         }
      })
      projectsForNotifications.value.forEach((item)=>{
        if(item.reminderStatus != 'done'){
          setTimeout(() => {
            getNotificationsProjects(item)
          }, 1000);
         }
      })
    })

    const openNotifications = () => {
      console.log('массив событий на сегодня', eventsToday.value)
      eventsToday.value.forEach((item)=>{
        if(item.reminderStatus != 'done'){
          getNotifications(item)
          --counterNotify.value
         }
      })
    }

    return {
      counterNotify,
      openNotifications,
      essentialLinks: linksList,
      leftDrawerOpen,
      router,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      miniState,

      drawerClick (e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation()
        }
      }
    }
  }
})
</script>
<style lang="sass">
.q-notifications__list--top
    top: 61px
</style>