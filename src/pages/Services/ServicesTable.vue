<template>
  <div class="q-pa-md">
  <ServicesSearch v-model="search"/>
   <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      :rows="rows"
     
      :columns="columns"
      :rows-per-page-options="[10, 15]"
      row-key="title"
      :loading="loading"
    >
<template v-slot:top><div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="showDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Редактировать услугу</div>
            </q-card-section>

            <q-card-section>
              <div class="row">
                <q-input v-model="title" label="Название услуги"></q-input>
                <q-input v-model="cost" label="Стоимость"></q-input>
                <q-input v-model="createDate" disable label="Дата создания"></q-input>
                <q-input v-model="updateDate" disable label="Дата обновления"></q-input>
                <q-input v-model="numbers" disable label="Количество заказов"></q-input>
              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup @click="updateRow"></q-btn>
            </q-card-actions>
          </q-card>
      </q-dialog>
    </div></template>

    <slot name="loading"></slot>
    <template v-slot:loading>
        <q-inner-loading showing color="primary" />
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.serviceTitle }}
            <q-popup-edit v-model="props.row.serviceTitle" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="cost" :props="props">
            {{ props.row.serviceCost }}
            <q-popup-edit v-model.number="props.row.serviceCost" v-slot="scope" @save="(val, initialValue) => UpdateDocument(val, initialValue, props.row)"  buttons>
              <q-input type="number"  v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="dateCreate" :props="props">
              {{ props.row.creationDate }}
          </q-td>
          <q-td key="dateUpdate" :props="props">
            {{ props.row.updateDate }}
          </q-td>
          <q-td key="numberOrders" :props="props">
              {{ props.row.numberOrders }}
          </q-td>
          <q-td key="actions" :props="props">
            <div class="row q-gutter-sm justify-center">
              <q-btn color="blue" label="Редактировать" @click="showDialog = true, editItem(props.row)" size=sm no-caps></q-btn>
              <q-btn color="red" label="Удалить"  @click="confirm(props.row)" size=sm no-caps></q-btn>
            </div>
            <!-- <q-btn label="Confirm" color="primary" @click="deleteItem(props.row)" /> -->
            <!-- {{ props.row.sodium }}
            <q-popup-edit  disable v-model.number="props.row.sodium" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { tableColumns } from 'src/data/tableColumns'
import ServicesSearch from 'pages/Services/ServicesSearch'
import {ref, reactive, computed, watch, onMounted, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
   setup(){
    const store = useStore()
    const loading = ref(false)
    const columns = ref(tableColumns)
    const rows =  ref([])
    // для слежения за изменениями значений в таблице
    const updated = ref(0)
    // получить services из store
    const getStore = computed(() => store.state.services.services
            .filter(service => {
                if (search.value.searchText) {
                    return service['serviceTitle'].toLowerCase().includes(search.value.searchText)
                }
                return service
            }))
    let editedIndex = ref(-1)
    let editedItem = reactive({})
    let showDialog = ref(false)
    const title = ref('')
    const cost = ref(null)
    const numbers = ref(null)
    const createDate = ref(null)
    const updateDate =  ref(null)
    let deleteIndex = ref(null)
    const $q = useQuasar()
    const search = ref({})


    // обновить услуги в БД
    const updateServicesFB = async(rows) => {
      await store.dispatch('services/postServices', rows)
    }

    const UpdateDocument = (val, initialValue, tableString) => {
      updated.value = !(updated.value)
    }

    // при загрузке страницы загружить все услуги из БД
    onMounted(async ()=>{
      loading.value = true
      await store.dispatch('services/loadServices')
      loading.value = false
    })

    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStore, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val))
      rows.value = copyStore
    })

    // следить за редактированием пользователем значений в таблице 
    watch(updated, (val) => {
        updateServicesFB(rows.value)
    } )

    // watch(search, (val) => {
    //     console.log('Поисковая строка', val)
    //     console.log('Копия услуг из хранилища', getStore)
    //     console.log('Значения для таблицы', rows.value)
    // } )

     const pagination = ref({
      sortBy: 'desc',
    })

    const editItem = (item) => {
                editedIndex = rows.value.indexOf(item)
                editedItem = Object.assign({}, item)
                title.value = editedItem.serviceTitle
                cost.value =  editedItem.serviceCost
                createDate.value = editedItem.creationDate
                updateDate.value = editedItem.updateDate
                numbers.value = editedItem.numberOrders
                rows.value[editedIndex] = editedItem
    }

    const deleteItem = (item) => {
      deleteIndex = rows.value.indexOf(item)
      rows.value.splice(deleteIndex, 1)
    }

    const confirm = (item) => {
      $q.dialog({
        title: 'Подтверждение',
        message: 'Вы хотите удалить услугу?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        deleteItem(item)
        console.log(rows)
        store.commit('services/setServices', rows.value)
        updateServicesFB(rows.value)
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }


    // Если пользователь обновляет title и cost, 
    // обновляется копия объекта editedItem (данные для попапа)
    watch([title, cost], ([title, cost]) => {
      editedItem.serviceTitle = title
      editedItem.serviceCost = cost
    });

    const updateRow = async() => {
      const data = {idx: editedIndex, editedItem}
      await store.dispatch('services/postByID', data)
    }

    // watch(filter, val => {
    //   rows.value.filter(service => {
    //             if (filter.value.searchText) {
    //                 return service['serviceTitle'].includes(filter.value.searchText)
    //             }
    //             return 0
    //         })
    //   console.log(rows.value)
    //   console.log(filter.value.searchText)
    // })

    // Поиск

    //        rows.value.filter(service => {
    //             if (filter.value.title) {
    //                 return challenge['challenge-title'].includes(filter.value.title)
    //             }
    //             return challenge
    //         })
    // const services = computed(()=>store.state.services.services)
    //         .filter(service => {
    //             if (filter.value.title) {
    //                 return challenge['challenge-title'].includes(filter.value.title)
    //             }
    //             return challenge
    //         })
    //         .filter(challenge => {
    //             if (filter.value.status && filter.value.status != 'defVal') {
    //                 return filter.value.status === challenge.status
    //             }
    //             return challenge
    //         })
    //     )


    return {
      rows,
      columns,
      pagination,
      loading,
      UpdateDocument,
      editItem,
      showDialog,
      editedItem,
      title,
      numbers,
      createDate,
      updateDate,
      cost,
      updateRow,
      deleteItem,
      confirm,
      search
    }
  },
  components: { ServicesSearch }
}
</script>
