import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {computed} from 'vue'

export async function createService({ state, commit, rootGetters}, payload) {
    try {
        const countOfOrders = 0
        const dateOfCreate = new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
        const dateOfUpdate = new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
        commit('udateNumberOrders', countOfOrders)
        commit('setCreationDate', dateOfCreate)
        commit('setUpdateDate', dateOfUpdate)

        const numberOrders = computed(() => state.numberOrders)
        const creationDate = computed(() => state.creationDate)
        const updateDate = computed(() => state.updateDate)

        payload = {...payload, numberOrders: numberOrders.value, creationDate: creationDate.value, updateDate: updateDate.value}
        
        const token = rootGetters['authenticate/token']
        const {data} = await api.post(`/services.json?auth=${token}`, payload)
        // commit('addService', {...payload,  id: data.name})
        Notify.create('Услуга создана')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function loadService({ state, commit, rootGetters}, payload) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/services.json?auth=${token}`)
        // const services = Object.keys(data).map(id => ({...data[id], id}))
        const services = data
        console.log(services)
        commit('setServices', services)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}