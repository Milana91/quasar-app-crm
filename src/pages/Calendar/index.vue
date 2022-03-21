<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 1000px; width: 100%">
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
                :style="{ backgroundColor: event.bgcolor }"
                class="my-event"
                @click.stop="onClickEvent(event)"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title + (event.time ? " - " + event.time : "") }}
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
    <app-modal
      leftBtn="Отмена"
      rightBtn="Создать"
      @submitForm="addEvent"
      v-model="modal"
      title="Добавить событие"
    >
      <CalendarModal
        :colorIcon="colorIcon"
        :colorIconTime="colorIconTime"
        v-model:titleEvent="title"
        v-model:detailsEvent="details"
        v-model:dateEvent="clickDateModal"
        v-model:timeEvent="time"
        v-model:modelValue="bgcolor"
        @created="modal = false"
      />
    </app-modal>
  </teleport>
  <teleport to="body">
    <CalendarPopupDescription
      :eventDate="eventDate"
      :eventTime="eventTime"
      :eventBgColor="eventBgColor"
      :eventDescription="eventDescription"
      :eventTitle="eventTitle"
      v-model="popupShow"
      @clickAct="popupShow = false"
      @deleteEvent="deleteEvent"
      @editEvent="editEvent"
    />
  </teleport>
  <teleport to="body">
    <!-- @submitForm="createEvent" -->
    <app-modal
      leftBtn="Отмена"
      rightBtn="Создать"
      @submitForm="changeEvent"
      v-model="modalEditable"
      title="Редактировать событие"
    >
      <CalendarModal
        :colorIcon="colorIcon"
        :colorIconTime="colorIconTime"
        v-model:titleEvent="eventTitle"
        v-model:detailsEvent="eventDescription"
        v-model:dateEvent="eventDate"
        v-model:timeEvent="eventTime"
        v-model:modelValue="eventBgColor"
        @created="modalEditable = false"
      />
    </app-modal>
  </teleport>
</template>

<script>
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";

import AppModal from "components/ui/AppModal";
import { defineComponent, computed, watch } from "vue";
import NavigationBar from "components/NavigationBar.vue";
import { events } from "src/data/events";
import CalendarModal from "pages/Calendar/CalendarModal";
import CalendarPopupDescription from "pages/Calendar/CalendarPopupDescription";
import { getDatabase, ref, onValue } from "firebase/database";
import { useStore } from "vuex";
import { Notify } from "quasar";
// import store from '../store/index'

// const CURRENT_DAY = new Date()
// function getCurrentDay (day) {
//   const newDay = new Date(CURRENT_DAY)
//   newDay.setDate(day)
//   const tm = parseDate(newDay)
//   return tm.date
// }

export default defineComponent({
  name: "MonthSlotDay",

  components: {
    NavigationBar,
    QCalendarMonth,
    AppModal,
    CalendarModal,
    CalendarPopupDescription,
  },
  data() {
    return {
      options: {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
      },
      CURRENT_DAY: new Date(),
      selectedDate: today(),
      // events: events,
      modal: false,
      title: "",
      details: "",
      // .toLocaleString("ru", this.options)
      date: this.getCurrentDay(this.numberOfDay),
      time: "",
      bgcolor: "#148fb8",
      icon: "",
      daysData: {},
      numberOfDay: null,
      clickDate: "",
      clickEvents: [],
      colorIcon: "colorize",
      popupShow: false,
      eventTitle: "",
      eventDescription: "",
      eventDate: "",
      eventTime: "",
      clickEvent: null,
      modalEditable: false,
      eventBgColor: "",
      colorIconTime: "av_timer",
    };
  },
  computed: {
    eventsMap() {
      const map = {};
      if (this.events.length > 0) {
        this.events.forEach((event) => {
          (map[event.date] = map[event.date] || []).push(event);
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date);
            let days = event.days;
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 });
              if (!map[timestamp.date]) {
                map[timestamp.date] = [];
              }
              map[timestamp.date].push(event);
              // already accounted for 1st day
            } while (--days > 1);
          }
        });
      }
      return map;
    },
    eventsArr() {
      return this.$store.state.calendar.events;
    },
    events() {
      return this.$store.state.calendar.events;
    },
    eventsArrLength() {
      return this.events.length;
    },
    clickDateModal() {
      return new Date(this.clickDate).toLocaleDateString("ru-RU", this.options);
    },
  },
  mounted() {
    this.$store.dispatch("calendar/loadEvents");
  },
  methods: {
    getCurrentDay(day) {
      console.log('this day', day)
      let newDay = new Date(this.CURRENT_DAY);
      newDay = new Date(day);
      const tm = parseDate(newDay);
      console.log('клик tm', newDay)
      return tm.date;
    },
    getFormatDate(clickDate) {
      const arr = clickDate.split("-")
      const month = arr[1]
      const day = arr[2]
      const year = arr[0]
      const formDate = [year, month, day].join(', ')

      // console.log("новая дата", formDate)
      const d = new Date(year, month, day)
      console.log('дата события', formDate)
      return formDate
    },
    addEvent() {
            this.getFormatDate(this.clickDate)
      this.$store.dispatch("calendar/createEvent", {
        title: this.title,
        id: this.eventsArrLength + 1,
        details: this.details,
        date: this.getCurrentDay(this.getFormatDate(this.clickDate)),
        time: this.time,
        bgcolor: this.bgcolor,
        reminderStatus: "no",
      });
      this.title = "";
      this.details = "";
      this.time = "";
      this.bgcolor = "";
      console.log('svsvsv', this.getCurrentDay(this.numberOfDay))
    },
    badgeClasses(event, type) {
      return {
        // bg-${ event.bgcolor }
        [`text-white`]: true,
        "rounded-border": true,
      };
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
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onMoved(data) {
      console.log("onMoved", data);
    },
    onChange(data) {
      this.daysData = data;
    },
    onClickDate(data) {
      console.log("onClickDate", data);
    },
    onClickDay(data) {
      // сравнить екущий месяц с месяцем выбранной даты
      this.numberOfDay = data.scope.timestamp.day;
      this.clickDate = data.scope.timestamp.date;
      console.log('дата клика', this.clickDate)
      console.log('день клика', this.numberOfDay)
      // if (
      //   parseInt(new Date().getMonth() + 1) ==
      //   parseInt(this.clickDate.split("-")[1])
      // ) {
        this.modal = true;
      // }
      this.getClickDateEvent();
    },
    onClickEvent(event) {
      this.clickEvent = event;
      this.eventTitle = event.title;
      this.eventDescription = event.details;
      this.eventTime = event.time;
      this.eventBgColor = event.bgcolor;
      const date = new Date(event.date).toLocaleDateString("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
      });
      this.eventDate = date;
      this.popupShow = true;
    },
    deleteEvent() {
      this.$q
        .dialog({
          title: "Подтверждение",
          message: "Вы хотите удалить событие?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$store.dispatch("calendar/removeEvent", this.clickEvent.eventId);
          this.popupShow = false;
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    editEvent() {
      this.modalEditable = true;
    },
    changeEvent() {
      this.$store.dispatch("calendar/editEvent", {
        event: {
          title: this.eventTitle,
          id: this.clickEvent.id,
          details: this.eventDescription,
          date: this.clickEvent.date,
          time: this.eventTime,
          bgcolor: this.eventBgColor,
          reminderStatus: "no",
        },
        id: this.clickEvent.eventId,
      });
      this.popupShow = false;
    },
    getClickDateEvent() {
      const eventsArr = this.events;
      console.log("Соыбтия", eventsArr);
      console.log("this.clickEvents", this.clickEvents);
      eventsArr.forEach((item) => {
        if (item.date == this.clickDate) {
          this.clickEvents.push(item);
          return this.clickEvents;
        }
      });
    },
    onClickWorkweek(data) {
      console.log("onClickWorkweek", data);
    },
    onClickHeadDay(data) {
      console.log("onClickHeadDay", data);
    },
    onClickHeadWorkweek(data) {
      console.log("onClickHeadWorkweek", data);
    },
  },
});
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
