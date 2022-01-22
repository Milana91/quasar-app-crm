import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {computed} from 'vue'

export async function createEvent({ state, commit, rootGetters}, payload) {
    try {
        payload = {...payload}
        console.log(payload)
        const token = rootGetters['authenticate/token']
        const {data} = await api.post(`/events.json?auth=${token}`, payload)
        // commit('addCustomer', {...payload,  id: data.name})
        commit('addEvent', {...payload,  eventId: data.name })
        Notify.create('Добавлено новое событие')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function loadEvents({ state, commit, rootGetters}) {
    try {
        const token = rootGetters['authenticate/token']
        const events = []
        const {data} = await api.get(`/events.json?auth=${token}`)
        for (let key in data) {
          events.push({...data[key], eventId: key})
        }
        commit('setEvents', events)
        console.log('события в хранилище', state.events)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function removeEvent({ state, commit, rootGetters}, eventId) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.delete(`/events/${eventId}.json?auth=${token}`)
        commit('deleteEvent', eventId)
        Notify.create('Событие удалено')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}


export async function editEvent({ state, commit, rootGetters}, payload) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.put(`/events/${payload.id}.json?auth=${token}`, payload.event)
        commit('changeEvent', {...payload.event, id: payload.id})
        Notify.create('Событие изменено')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}



// export async function postEvents({ commit, rootGetters}, payload) {
//     try {
//         // commit('setCustomers', payload)
//         const token = rootGetters['authenticate/token']
//         console.log(payload)

//         // // при редактировании значений в таблице пересобрать объект из массива store
//         // //  с id в виде ключей
//         // const events = payload.reduce((acc, current, index) => {
//         //     acc[current.id] = current;
//         //     return acc;
//         //   }, {});
          
//         const {data} = await api.put(`/events.json?auth=${token}`, payload)
//         console.log('отправлено', data)
//     } catch (e) {
//         console.log(e)
//         Notify.create({
//             message: error(e)
//         })    
//     }
// }


// export async function postByID({ state, commit, rootGetters}, payload) {
//     try {
//         commit('updateCustomers',  {
//             idx: payload.idx,
//             customer: payload.editedItem
//           })
//         commit('updateDate', payload.idx)
//         const token = rootGetters['authenticate/token']
//         // payload.editedItem.id - id клиента на сервере, обновленная строка payload.editedItem
//         const {data} = await api.put(`/customers/${payload.editedItem.id}.json?auth=${token}`, payload.editedItem)
//         console.log(data)
//         console.log(state.customers)
//     } catch (e) {
//         console.log(e)
//         Notify.create({
//             message: error(e)
//         })    
//     }
// }
