import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {ref, computed} from 'vue'

// export async function createService({ state, commit, rootGetters}, payload) {
//     try {
//         const countOfOrders = 0
//         const dateOfCreate = new Date().toLocaleDateString("ru", {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             timezone: 'UTC'
//         })
//         const dateOfUpdate = new Date().toLocaleDateString("ru", {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             timezone: 'UTC'
//         })
//         commit('udateNumberOrders', countOfOrders)
//         commit('setCreationDate', dateOfCreate)
//         commit('setUpdateDate', dateOfUpdate)

//         const numberOrders = computed(() => state.numberOrders)
//         const creationDate = computed(() => state.creationDate)
//         const updateDate = computed(() => state.updateDate)

//         payload = {...payload, numberOrders: numberOrders.value, creationDate: creationDate.value, updateDate: updateDate.value}
        
//         const token = rootGetters['authenticate/token']
//         const {data} = await api.post(`/services.json?auth=${token}`, payload)
//         console.log(state.services)
//         commit('addService', {...payload,  id: data.name})
//         console.log('sag', state.services)
//         Notify.create('Услуга создана')
//     } catch (e) {
//         console.log(e)
//         Notify.create(e.message)
//     }
// }

const id = ref()
const counter = ref()

export async function getInvoiceCounter({ state, commit, rootGetters }) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/invoice.json?auth=${token}`)
        console.log('сначала', data)
        id.value = Object.keys(data)[0]
        const counterIvoice = await api.get(`/invoice/${id.value}/invoiceNumber.json?auth=${token}`)
        console.log('счетчик', counterIvoice.data)
        console.log('номер счета', Object.keys(data))
        counter.value = counterIvoice.data
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function updateInvoiceCounter({ state, commit, dispatch, rootGetters }, payload) {
    try {
        await dispatch('getInvoiceCounter')
        const token = rootGetters['authenticate/token']
        const val = counter.value==null? 0 : counter.value + payload
        const {data} = await api.put(`/invoice/${id.value}/invoiceNumber.json?auth=${token}`, val)
        console.log('обновить', data)
        commit('setNumberOfInvoice', data)
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

// export async function createInvoiceCounter({ state, commit, rootGetters }, payload) {
//     try {
//         const token = rootGetters['authenticate/token']
//         const {data} = await api.post(`/invoice.json?auth=${token}`, payload)
//     } catch (e) {
//         console.log(e)
//         Notify.create(e.message)
//     }
// }

