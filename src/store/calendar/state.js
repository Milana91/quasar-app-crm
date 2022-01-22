import { parseDate, } from '@quasar/quasar-ui-qcalendar/src/index.js'

const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

// export const events = [
//     {
//       id: 1,
//       title: '1st of the Month',
//       details: 'Everything is funny as long as it is happening to someone else',
//       date: getCurrentDay(1),
//       bgcolor: 'orange'
//     },
//     {
//       id: 2,
//       title: 'Sisters Birthday',
//       details: 'Buy a nice present',
//       date: getCurrentDay(4),
//       bgcolor: 'green',
//       icon: 'fas fa-birthday-cake'
//     },
//   ]

export default function () {
  return {
    events: [],
    // totalCost: null,
    // creationDate: null,
    // updateDate: null,
  }
}


