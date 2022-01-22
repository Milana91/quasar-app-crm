import { parseDate, } from '@quasar/quasar-ui-qcalendar/src/index.js'

const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export function setEvents (state, events) {
        state.events = events
}

// export function updateCustomers (state, payload) {
//     state.customers[payload.idx] = payload.customer
// }

export function addEvent (state, payload) {
    state.events.push(payload)
    console.log('события в store', state.events)
}

export function deleteEvent (state, id) {
  const index = state.events.findIndex(item => item.eventId === id);
  if (index !== -1) {
    state.events.splice(index, 1);
  }
  console.log('события в store после удаления', state.events)
}  

export function changeEvent (state, event) {
  const index = state.events.findIndex(item => item.eventId === event.id);
  if (index !== -1) {
    state.events[index] = event
  }
  console.log('события в store после изменения', state.events)
}  
// export function udateTotalСost (state, totalSum) {
//     state.totalCost = totalSum
// }

// export function setCreationDate (state, creationDate) {
//     state.creationDate = creationDate
// }

// export function setUpdateDate (state, updateDate) {
//     state.updateDate = updateDate
// }


// export function updateDate (state, idx) {
//     const dateNow = new Date().toLocaleDateString("ru", {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         timezone: 'UTC'
//     })
//     state.customers[idx].updateDate = dateNow
// }
