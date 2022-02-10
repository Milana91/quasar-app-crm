import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {computed} from 'vue'

export async function createCustomer({ state, commit, rootGetters}, payload) {
    try {
        commit('setActiveUser', true)
        const totalSum = 0
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
        commit('udateTotalСost', totalSum)
        commit('setCreationDate', dateOfCreate)
        commit('setUpdateDate', dateOfUpdate)

        const totalCost = computed(() => state.totalCost)
        const creationDate = computed(() => state.creationDate)
        const updateDate = computed(() => state.updateDate)

        payload = {...payload, totalCost: totalCost.value, creationDate: creationDate.value, updateDate: updateDate.value}
        console.log(payload)
        console.log('ssx', totalCost)
        const token = rootGetters['authenticate/token']
        const {data} = await api.post(`/customers.json?auth=${token}`, payload)
        commit('addCustomer', {...payload,  id: data.name})
        Notify.create('Клиент создан')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function loadCustomers({ state, commit, rootGetters}) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/customers.json?auth=${token}`)
        const customers = Object.keys(data).map(id => ({...data[id], id}))
        commit('setCustomers', customers)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function postCustomers({ commit, rootGetters}, payload) {
    try {
        commit('setActiveUser', true)
        commit('setCustomers', payload)
        const token = rootGetters['authenticate/token']
        console.log(payload)

        // при редактировании значений в таблице пересобрать объект из массива store
        //  с id в виде ключей
        const customers = payload.reduce((acc, current, index) => {
            acc[current.id] = current;
            return acc;
          }, {});
          
        const {data} = await api.put(`/customers.json?auth=${token}`, customers)
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
        commit('updateCustomers',  {
            idx: payload.idx,
            customer: payload.editedItem
          })
        commit('updateDate', payload.idx)
        const token = rootGetters['authenticate/token']
        // payload.editedItem.id - id клиента на сервере, обновленная строка payload.editedItem
        const {data} = await api.put(`/customers/${payload.editedItem.id}.json?auth=${token}`, payload.editedItem)
        console.log(data)
        console.log(state.customers)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function updateCustomerSumByID({ state, commit, rootGetters, rootState}, payload) {
    try {
        commit('setActiveUser', true)
        // commit('updateCustomers',  {
        //     idx: payload.idx,
        //     sum: payload.sum
        //   })
        // commit('updateDate', payload.idx)
        const token = rootGetters['authenticate/token']
        let sum = 0
        const totalSum = ()=>{
            rootState.projects.projects.forEach((item)=>{
                if(item.customerId == payload.idx){
                    if (item.projectPayment != '-'){
                        sum = sum + parseInt(item.projectPayment)
                    }
                }
            })
            return sum
        }
        // payload.editedItem.id - id клиента на сервере, обновленная строка payload.editedItem
        const {data} = await api.put(`/customers/${payload.idx}/totalCost.json?auth=${token}`, totalSum())
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function loadByID({ state, commit, rootGetters}, id) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/customers/${id}/customerCompany.json?auth=${token}`)
        commit('invoice/setCompany', data,  { root: true })
        console.log('компания', data)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

