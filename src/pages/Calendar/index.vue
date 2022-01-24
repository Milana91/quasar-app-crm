<template>
  <div class="subcontent">
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />

    <div class="row justify-center">
      <div style="display: flex; max-width: 1000px; width: 100%;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="80"
          :day-height="0"
          locale="ru"
          @change="onChange"
          @moved="onMoved"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <div
                :class="badgeClasses(event, 'day')"
                :style="{backgroundColor: event.bgcolor}"
                class="my-event" @click.stop="onClickEvent(event)"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title + (event.time ? ' - ' + event.time : '') }}
                  <q-tooltip>{{ event.details }}</q-tooltip>
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
  <teleport to="body">
     <!-- @submitForm="createEvent" -->
      <app-modal @submitForm="addEvent" v-model="modal" title="Добавить событие">
        <CalendarModal :colorIcon="colorIcon" v-model:titleEvent="title" v-model:detailsEvent="details" v-model:dateEvent="clickDateModal" v-model:timeEvent="time" v-model:modelValue="bgcolor"  @created="modal = false" />
      </app-modal>
  </teleport>
  <teleport to="body">
     <CalendarPopupDescription :eventDate="eventDate" :eventTime="eventTime" :eventBgColor="eventBgColor" :eventDescription="eventDescription" :eventTitle="eventTitle" v-model="popupShow" @clickAct="popupShow = false" @deleteEvent="deleteEvent" @editEvent="editEvent"/>
  </teleport>
  <teleport to="body">
     <!-- @submitForm="createEvent" -->
      <app-modal @submitForm="changeEvent" v-model="modalEditable" title="Редактировать событие">
        <CalendarModal :colorIcon="colorIcon" v-model:titleEvent="eventTitle" v-model:detailsEvent="eventDescription" v-model:dateEvent="eventDate" v-model:timeEvent="eventTime" v-model:modelValue="eventBgColor"  @created="modalEditable = false" />
      </app-modal>
  </teleport>
</template>

<script>
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import AppModal from 'components/ui/AppModal'
import { defineComponent } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'
import { events } from 'src/data/events'
import CalendarModal from 'pages/Calendar/CalendarModal'
import CalendarPopupDescription from 'pages/Calendar/CalendarPopupDescription'
// import store from '../store/index'


// const CURRENT_DAY = new Date()
// function getCurrentDay (day) {
//   const newDay = new Date(CURRENT_DAY)
//   newDay.setDate(day)
//   const tm = parseDate(newDay)
//   return tm.date
// }


export default defineComponent({
  name: 'MonthSlotDay',
  components: {
    NavigationBar,
    QCalendarMonth,
    AppModal,
    CalendarModal,
    CalendarPopupDescription
  },
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
      },
      CURRENT_DAY: new Date(),
      selectedDate: today(),
      // events: events,
      modal: false,
      title: '',
      details: '',
      // .toLocaleString("ru", this.options)
      date: this.getCurrentDay(this.numberOfDay),
      time: '',
      bgcolor: '#148fb8',
      icon: '',
      daysData: {},
      numberOfDay: null,
      clickDate: '',
      clickEvents: [],
      colorIcon: 'colorize',
      popupShow: false,
      eventTitle: '',
      eventDescription: '',
      eventDate: '',
      eventTime: '',
      clickEvent: null,
      modalEditable: false,
      eventBgColor: ''
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log('прогруз', this.events)
      console.log('map', map)
      return map
    },
    eventsArr(){
       return this.$store.state.calendar.events
    },
    events(){
      return this.$store.state.calendar.events
    },
    eventsArrLength(){
      return this.events.length
    },
    clickDateModal(){
      return new Date(this.clickDate).toLocaleDateString('ru-RU', this.options)
    }
  },
  mounted() {
        // loading.value = true
      this.$store.dispatch('calendar/loadEvents')
      console.log('состояние events', this.$store.state.calendar.events)
      // loading.value = false
      // this.events = this.eventsArr
      setTimeout(() => {
      console.log('все события из хранилища', this.events)
      console.log('eventsMap', this.eventsMap)
      }, 5000)
  },
  methods: {
    getCurrentDay (day) {
      const newDay = new Date(this.CURRENT_DAY)
      newDay.setDate(day)
      const tm = parseDate(newDay)
      console.log('дата', this.selectedDate)
      console.log('дата', this.CURRENT_DAY)
      console.log('результат getCurrentDay',  tm.date)
      return tm.date
    },
    addEvent(){
      this.$store.dispatch('calendar/createEvent', {
          title: this.title,
          id: this.eventsArrLength + 1, 
          details: this.details,
          date: this.getCurrentDay(this.numberOfDay),
          time: this.time,
          bgcolor: this.bgcolor,
          reminderStatus: 'no'
      })
      this.title = ''
      this.details = ''
      this.time = ''
      this.bgcolor = ''
    },
    // // postEvents(data) {
    // //     // const events = this.eventsMap
    // //     // const calendarData = {data, events}
    // //     this.$store.dispatch('calendar/postEvents', data)
    // //     // console.log(calendarData)
    // // },
    badgeClasses (event, type) {
      return {
        // bg-${ event.bgcolor }
        [ `text-white` ]: true,
        'rounded-border': true
      }
    },
    // badgeStyles (day, event) {
    //   console.log('event-1', event)
    //   const s = {
    //     'background-color': event.bgcolor,
    //   }
    //   // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
    //   // s.top = 0
    //   // s.bottom = 0
    //   // s.width = (event.days * this.parsedCellWidth) + '%'
    //   return s
    // },
    onToday () {
      this.$refs.calendar.moveToToday()
    },
    onPrev () {
      this.$refs.calendar.prev()
    },
    onNext () {
      this.$refs.calendar.next()
    },
    onMoved (data) {
      console.log('onMoved', data)
    },
    onChange (data) {
      this.daysData = data
      console.log('onChange', data)
      console.log('записано', this.daysData)
    },
    onClickDate (data) {
      console.log('onClickDate', data)
    },
    onClickDay (data) {
      console.log('onClickDay', data)
      this.modal = true
      console.log('eventsMap', this.eventsMap)
      this.numberOfDay = data.scope.timestamp.day
      this.clickDate = data.scope.timestamp.date
      this.getClickDateEvent()
      console.log('Выбранная дата', this.clickDate)
      console.log('События дня', this.clickEvents)
      console.log('номер дня', this.numberOfDay)
    },
    onClickEvent (event) {
      console.log('clickEvent', event)
      this.clickEvent = event
      this.eventTitle = event.title
      this.eventDescription = event.details
      this.eventTime = event.time
      this.eventBgColor = event.bgcolor
      const date = new Date(event.date).toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
      this.eventDate = date
      this.popupShow = true
    },
    deleteEvent(){
      this.$q.dialog({
        title: 'Подтверждение',
        message: 'Вы хотите удалить событие?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('событие клика', this.clickEvent)
        console.log('событие клика ID', this.clickEvent.eventId)
        this.$store.dispatch('calendar/removeEvent', this.clickEvent.eventId)
        this.popupShow = false
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    editEvent(){
      this.modalEditable = true
    },
    changeEvent(){
      this.$store.dispatch('calendar/editEvent', {
          event: {
            title: this.eventTitle,
            id: this.clickEvent.id, 
            details: this.eventDescription,
            date: this.clickEvent.date,
            time: this.eventTime,
            bgcolor: this.eventBgColor,
            reminderStatus: 'no'
          },
          id: this.clickEvent.eventId       
      })
      this.popupShow = false
    },
    getClickDateEvent(){
      const eventsArr = this.events
      console.log('свойство events', eventsArr)
      eventsArr.forEach((item)=>{
        console.log('перебираем события', item)
          if(item.date == this.clickDate)
          {
            console.log('события', item)
            this.clickEvents.push(item)
            return this.clickEvents
          }
        }
      )
    },
    onClickWorkweek (data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek (data) {
      console.log('onClickHeadWorkweek', data)
    },
    // createEvent() {
    //   const eventNew = 
    //   this.$store.commit('increment')
    //   console.log(this.$store.state.count)
    // }
  }
})
</script>
<style lang="sass" scoped>
.my-event
  position: relative
  font-size: 12px
  width: 100%
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.rounded-border
  border-radius: 2px
  
</style>