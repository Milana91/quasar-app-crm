import { api } from 'boot/axios'
import {error} from 'src/utils/error'
import { Notify } from 'quasar'
import {ref, computed} from 'vue'

export async function createProject({ state, commit, rootGetters}, payload) {
    try {
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
        commit('setCreationDate', dateOfCreate)
        commit('setUpdateDate', dateOfUpdate)

        const creationDate = computed(() => state.creationDate)
        const updateDate = computed(() => state.updateDate)
        const endDate = ref(null)

        payload = {...payload, creationDate: creationDate.value, updateDate: updateDate.value, endDate: endDate.value, reminderStatus: 'no'}
        const token = rootGetters['authenticate/token']
        const {data} = await api.post(`/projects.json?auth=${token}`, payload)
        commit('addProject', {...payload,  id: data.name})
        Notify.create('Проект создан')
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function loadProjects({ commit, rootGetters}) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.get(`/projects.json?auth=${token}`)
        const projects = Object.keys(data).map(id => ({...data[id], id}))
        commit('setProjects', projects)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}

export async function editReminderStatusDeadline({ state, commit, rootGetters}, payload) {
    try {
        const token = rootGetters['authenticate/token']
        const {data} = await api.put(`/projects/${payload.id}.json?auth=${token}`, {...payload.selectedProject, reminderStatus: payload.reminderStatus})
        commit('changeProject', {...payload.selectedProject, reminderStatus: payload.reminderStatus, id: payload.id})
        if (payload.reminderStatus == "done"){
            Notify.create('Просмотрено. Напоминание больше не будет показано')
        } else if(payload.reminderStatus == "remindLater") {
            Notify.create('Напоминание будет показано завтра')
        }
    } catch (e) {
        console.log(e)
        Notify.create(e.message)
    }
}

export async function postProjects({ commit, rootGetters}, payload) {
    try {
        commit('setProjects', payload)
        const token = rootGetters['authenticate/token']
        console.log(payload)

        // при редактировании значений в таблице пересобрать объект из массива store
        //  с id в виде ключей
        const projects = payload.reduce((acc, current, index) => {
            acc[current.id] = current;
            return acc;
          }, {});
          
        const {data} = await api.put(`/projects.json?auth=${token}`, projects)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}


export async function postByID({ state, commit, rootGetters, rootState}, payload) {
    try {
        commit('updateProjects',  {
            idx: payload.idx,
            project: payload.editedItem
          })
        commit('updateDate', payload.idx)
        const token = rootGetters['authenticate/token']
        console.log('bip', payload.editedItem)
        // const setCustomerId = rootState.customers.customers.forEach((item)=>{
        //     if (item.customerName == payload.editedItem.projectCustomer){
        //         payload.editedItem.customerId = item.id
        //     }
        // })
        // payload.editedItem.id - id клиента на сервере, обновленная строка payload.editedItem
        const {data} = await api.put(`/projects/${payload.editedItem.id}.json?auth=${token}`, payload.editedItem)
        console.log(data)
        console.log(state.projects)
    } catch (e) {
        console.log(e)
        Notify.create({
            message: error(e)
        })    
    }
}
