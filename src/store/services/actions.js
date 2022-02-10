import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {computed} from 'vue'

export async function createService({ state, commit, rootGetters}, payload) {
    try {
        commit('setActiveUser', true)
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
        console.log(state.services)
        commit('addService', {...payload,  id: data.name})
        console.log('sag', state.services)
        Notify.create('Услуга создана')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function loadServices({ state, commit, rootGetters}) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/services.json?auth=${token}`)
        const services = Object.keys(data).map(id => ({...data[id], id}))
        // const services = {...data, data[id]}
        console.log(services)
        commit('setServices', services)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function postServices({ commit, rootGetters}, payload) {
    try {
        commit('setActiveUser', true)
        commit('setServices', payload)
        const token = rootGetters['authenticate/token']
        console.log(payload)

        // при редактировании значений в таблице пересобрать объект из массива store
        //  с id в виде ключей
        const services = payload.reduce((acc, current, index) => {
            acc[current.id] = current;
            return acc;
          }, {});
        console.log('получилось', services)
          
        const {data} = await api.put(`/services.json?auth=${token}`, services)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}


export async function postByID({ state, commit, rootGetters}, payload) {
    try {
        commit('setActiveUser', true)
        // console.log(services)
        commit('updateServices',  {
            idx: payload.idx,
            service: payload.editedItem
          })
        commit('updateDate', payload.idx)
        const token = rootGetters['authenticate/token']
        // payload.editedItem.id - id услуги на сервере, обновленная строка payload.editedItem
        const {data} = await api.put(`/services/${payload.editedItem.id}.json?auth=${token}`, payload.editedItem)
        console.log(data)
        console.log(state.services)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}
