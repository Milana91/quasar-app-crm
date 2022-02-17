<template>
  <div class="q-pa-md">
  <AppSearch v-model="search"/>
   <q-table 
      binary-state-sort
      :sort-method="customSort"
      ref="tableRef"
      v-model:pagination="pagination"
      :rows="rows"
     
      :columns="columns"
      :rows-per-page-options="[10, 15]"
      row-key="title"
      :loading="loading"
      no-data-label="Ничего не найдено"
    >
    <template v-slot:top>
      <app-modal-edit :modelValue="showDialog" title="Редактировать услугу" @submitUpdate="updateRow(); showDialog=false">
          <ServicesEditModalFields 
              v-model:titleVal="title" 
              v-model:costVal="cost" 
              v-model:createDateVal="createDate" 
              v-model:updateDateVal="updateDate"
              v-model:numbersVal="numbers"
          />
      </app-modal-edit>
    </template>

      <template v-slot:loading>
        <AppTableLoader/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.serviceTitle }}
            <q-popup-edit v-model="props.row.serviceTitle" buttons v-slot="scope"  @save="() => UpdateDocument()">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="cost" :props="props">
            {{ props.row.serviceCost }}
            <q-popup-edit v-model.number="props.row.serviceCost" v-slot="scope" @save="() => UpdateDocument()"  buttons>
              <q-input  type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
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
              <AppButton color="blue" label="Редактировать" @clickAction="showDialog = true, editItem(props.row)" size=sm no-caps></AppButton>
              <AppButton color="red" label="Удалить"  @clickAction="confirm(props.row)" size=sm no-caps></AppButton>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { tableColumns } from 'src/data/tableColumns'
import AppSearch from 'components/ui/AppSearch'
import AppTableLoader from 'components/ui/AppTableLoader'
import AppModalEdit from 'components/ui/AppModalEdit'
import AppButton from 'components/ui/AppButton'
import ServicesEditModalFields from 'pages/Services/ServicesEditModalFields'
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

    // при загрузке страницы загружить все услуги из БД
    onMounted(async ()=>{
      loading.value = true
      await store.dispatch('services/loadServices')
      loading.value = false
      console.log(typeof(rows.value[0].serviceCost))
    })

    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStore, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val))
      rows.value = copyStore
    })

    const UpdateDocument = () => {
      updated.value = !(updated.value)
    }
    // следить за редактированием пользователем значений в таблице 
    watch(updated, (val) => {
        updateServicesFB(rows.value)
        console.log(getStore.value)
    } )

    // обновить услуги в БД и хранилище
    const updateServicesFB = async(rows) => {
      await store.dispatch('services/postServices', rows)
    }

    const pagination = ref({
      sortBy: 'desc',
    })

    // update in actions (table)
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

    // Если пользователь обновляет  редиктируемые поля, 
    // обновляется копия объекта editedItem (данные для попапа)
    watch([title, cost], ([title, cost]) => {
      editedItem.serviceTitle = title
      editedItem.serviceCost = cost
    });

    const updateRow = async() => {
      const data = {idx: editedIndex, editedItem}
      await store.dispatch('services/postByID', data)
      showDialog.value = false
    }

     // Сортировка
     const customSort = (rows, sortBy, descending) => {
        const data = [...rows]

        if (sortBy) {
          data.sort((a, b) => {
            const x = descending ? b : a
            const y = descending ? a : b
            console.log('x', x)
            console.log('y', y)
            if (sortBy === 'title') {
              return x.serviceTitle > y.serviceTitle ? 1 : x.serviceTitle < y.serviceTitle ? -1 : 0
            }
            else if (sortBy === 'cost') {
              return parseInt(x.serviceCost) > parseInt(y.serviceCost) ? 1 : parseInt(x.serviceCost) < parseInt(y.serviceCost) ? -1 : 0
            }
            else if (sortBy === 'dateCreate') {
               const dateX = new Date(getFormatDate(x.creationDate))
              const dateY = new Date(getFormatDate(y.creationDate))
              return dateX > dateY ? 1 : dateX < dateY ? -1 : 0
            }
            else if (sortBy === 'dateUpdate') {
               const dateX = new Date(getFormatDate(x.updateDate))
              const dateY = new Date(getFormatDate(y.updateDate))
              return dateX > dateY ? 1 : dateX < dateY ? -1 : 0
            } 
            else if (sortBy === 'numberOrders') {
              return parseInt(x.numberOrders) > parseInt(y.numberOrders) ? 1 : parseInt(x.numberOrders) < parseInt(y.numberOrders) ? -1 : 0
            }
          })
        }

        return data
      }
    
    // Форматировать дату long
    const getFormatDate = (date) => {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
        const arr = date.split(" ")
        const month = arr[1]
        const day = arr[0]
        const year = arr[2]
        const idxMonth = months.findIndex(item => item == month)
        const formDate = [year, idxMonth, day].join(', ')

        // console.log("новая дата", formDate)
        const d = new Date(year, idxMonth, day)
        return d
    }

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
      search,
      customSort
    }
  },
  components: { AppSearch, AppTableLoader, ServicesEditModalFields, AppModalEdit, AppButton }
}
</script>
