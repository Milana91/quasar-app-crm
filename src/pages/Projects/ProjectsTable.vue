<template>
  <div class="q-pa-md">
  <AppSearch v-model="search"/>
   <q-table 
      binary-state-sort 
      :sort-method="customSort"
      :rows="rows"
      dense
      :columns="columns"
      :rows-per-page-options="[10, 15]"
      row-key="customer"
      :loading="loading"
      no-data-label="Ничего не найдено"
      no-results-label="The filter didn't uncover any results"
      :visible-columns="visibleColumns"
    >
    <template v-slot:top>
      <app-modal-edit :modelValue="showDialog" title="Редактировать клиента" @closeModal="closeModal" @submitUpdate="updateRow(); showDialog=false">
          <ProjectsEditModalFields 
              v-model:customerVal="customer" 
              v-model:servicesVal="services" 
              v-model:statusVal="status" 
              v-model:projectSumVal="projectSum"
              v-model:paymentVal="payment"
              v-model:paymentStatusVal="paymentStatus"
              v-model:deadlineVal="deadline"
              v-model:createDateVal="dateCreate"
              v-model:updateDateVal="dateUpdate"
              v-model:commentVal="comment"
              :customerOptions="customerOptions"
              :servicesOptions="servicesOptions"
              :statusOptions="statusOpt"
              :paymentStatusOptions="paymentStatusOpt"
          />
      </app-modal-edit>
    </template>

      <template v-slot:loading>
        <AppTableLoader/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td  key="customer" :props="props">
            {{ props.row.projectCustomer }}<AppIcon name="arrow_drop_down" />
            <q-popup-edit v-model="props.row.projectCustomer" buttons v-slot="scope"  @save="() => UpdateDocument(props.row)">
              <div class="q-pa-md" style="max-width: 200px">
                 <div class="q-gutter-md">
                  <AppSelect behavior="menu" :options="customerOptions" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td>
          <q-td  key="services" :props="props">
          <AppSelect :chips="true" stack-label  borderless v-model="props.row.projectServices" style="width: 310px"  behavior="menu">
          </AppSelect>
            <q-popup-edit v-model="props.row.projectServices" v-slot="scope" @save="() => { editSumIdx(props.row), UpdateDocument(props.row) }"  buttons>
               <div class="q-pa-md" style="max-width: 350px">
                 <div class="q-gutter-md">
                  <AppSelect   :chips="true" behavior="menu" multiple :options="servicesOptions" style="width:320px" v-model="scope.value" @update:modelValue="event => $emit('update:scope.value', getSelectedServices(event))" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td> 
          <q-td auto-width key="comment" :props="props">
            <div>
              {{ props.row.projectComment }}
            </div>
            <q-popup-edit v-model="props.row.projectComment" v-slot="scope" @save="() => UpdateDocument(props.row)"  buttons>
              <q-input  type="textarea" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props">
          <div>{{ props.row.projectStatus  }}<AppIcon name="arrow_drop_down" /></div>
            <q-popup-edit v-model="props.row.projectStatus " v-slot="scope" @save="() =>  {editStatusIdx(props.row); UpdateDocument(props.row)}"  buttons>
               <div class="q-pa-md" style="max-width: 200px">
                 <div class="q-gutter-md">
              <AppSelect behavior="menu" :options="statusOpt" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td> 
          <q-td key="projectSum" :props="props">
            {{ props.row.projectSum }}
            <q-popup-edit v-model="props.row.projectSum " v-slot="scope" @save="() => {props.row.projectSum = sum, UpdateDocument(props.row)}"  buttons>
              <q-input v-model="scope.value" dense autofocus  @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
           <q-td auto-width key="payment" :props="props">
              {{ props.row.projectPayment }}
            <q-popup-edit v-model="props.row.projectPayment" v-slot="scope" @save="() => UpdateDocument(props.row)"  buttons>
              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="paymentStatus" :props="props">
          <div>{{ props.row.projectPaymentStatus }}<AppIcon name="arrow_drop_down" /></div>
            <q-popup-edit v-model="props.row.projectPaymentStatus" v-slot="scope" @save="() => {editPaymentStatusIdx(props.row); UpdateDocument(props.row);}"  buttons>
               <div class="q-pa-md" style="max-width: 200px">
                    <div class="q-gutter-md">
                        <AppSelect behavior="menu" :options="paymentStatusOpt" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                    </div> 
                </div>
            </q-popup-edit>
          </q-td> 
          <q-td key="deadline" :props="props">
            {{ props.row.projectDeadline }}
            <q-popup-edit v-model="props.row.projectDeadline"  v-slot="scope" @save="() => {editRowIdx(props.row), props.row.projectDeadline = format, UpdateDocument(props.row)}"  buttons>
              <q-input type="date" v-model="scope.value" dense autofocus @update:modelValue="event => $emit('update:scope.value', formatDate(event))" @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="dateCreate" :props="props">
              {{ props.row.creationDate }}
          </q-td>
          <q-td key="dateUpdate" :props="props">
            {{ props.row.updateDate }}
          </q-td>
          <q-td key="actions" :props="props">
            <div class="row q-gutter-sm justify-center">
              <router-link v-slot="{navigate}"  custom to="/invoice">
                  <AppButton padding="xs" color="primary" @click="navigate" icon="article" @clickAction="openInvoice(props.row)" />
              </router-link>
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
import { tableColumnsProjects } from 'src/data/tableColumnsProjects'
import AppSearch from 'components/ui/AppSearch'
import AppTableLoader from 'components/ui/AppTableLoader'
import AppModalEdit from 'components/ui/AppModalEdit'
import AppButton from 'components/ui/AppButton'
import AppSelect from 'components/ui/AppSelect'
import AppIcon from 'components/ui/AppIcon'
import ProjectsEditModalFields from 'pages/Projects/ProjectsEditModalFields'
import {ref, reactive, computed, watch, onMounted, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'


export default {
   props: {
     customerOptions: [Array],
     servicesOptions: [Array],
   },
   setup(){
    const store = useStore()
    const $q = useQuasar()
    const visibleColumns = ref(['customer', 'comment', 'services', 'status', 'projectSum', 'payment', 'paymentStatus', 'deadline',  'dateUpdate', 'actions'])
    // const getVisibleColumns = ()=>{
    //   if($q.screen.gt.lg){
    //     visibleColumns.value.splice(0, 0, 'services')
    //   }
    // }
    const loading = ref(false)
    const columns = ref(tableColumnsProjects)
    const rows =  ref([])
    // const chips = ref()
    // для слежения за изменениями значений в таблице
    const updated = ref(0)
    // Услуги, выбранные в таблице
    const selectedItems = ref()
    const servicesText = ref('')
    // получить services из store
    const getStoreServices = computed(() => store.state.services.services)
    // получить projects из store
    const getStoreProjects = computed(() => store.state.projects.projects
            .filter(project => {
                if (search.value.searchText) {
                    return project['projectCustomer'].toLowerCase().includes(search.value.searchText)||
                    project['projectComment'].toLowerCase().includes(search.value.searchText)||
                    project['projectStatus'].toLowerCase().includes(search.value.searchText)||
                    project['projectPaymentStatus'].toLowerCase().includes(search.value.searchText) ||
                    String(project['projectSum']).toLowerCase().includes(search.value.searchText) ||
                    String(project['projectPayment']).toLowerCase().includes(search.value.searchText)
                }
                return project
            }))

    const getSelectedServices = (val) => {
        selectedItems.value = val
    }

    // Сортировка полей таблицы
     const customSort = (rows, sortBy, descending) => {
        const data = [...rows]

        if (sortBy) {
          data.sort((a, b) => {
            const x = descending ? b : a
            const y = descending ? a : b
            if (sortBy === 'status') {
              return x.projectStatus > y.projectStatus ? 1 : x.projectStatus < y.projectStatus ? -1 : 0
            }
            else if (sortBy === 'customer') {
              return x.projectCustomer > y.projectCustomer ? 1 : x.projectCustomer < y.projectCustomer ? -1 : 0
            }
             else if (sortBy === 'comment') {
              return x.projectComment > y.projectComment ? 1 : x.projectComment < y.projectComment ? -1 : 0
            }
            else if (sortBy === 'paymentStatus') {
              return x.projectPaymentStatus > y.projectPaymentStatus ? 1 : x.projectPaymentStatus < y.projectPaymentStatus ? -1 : 0
            }
            else if (sortBy === 'deadline') {
               const dateX = new Date(getFormatDate(x.projectDeadline))
              const dateY = new Date(getFormatDate(y.projectDeadline))
              
              return dateX > dateY ? 1 : dateX < dateY ? -1 : 0
            }
            else if (sortBy === 'deadline') {
               const dateX = new Date(getFormatDate(x.projectDeadline))
              const dateY = new Date(getFormatDate(y.projectDeadline))
             
              return dateX > dateY ? 1 : dateX < dateY ? -1 : 0
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
            else if (sortBy === 'projectSum') {
              
              return parseInt(x.projectSum) > parseInt(y.projectSum) ? 1 : parseInt(x.projectSum) < parseInt(y.projectSum) ? -1 : 0
            }
             else if (sortBy === 'payment') {
             
              return parseInt(x.projectPayment) > parseInt(y.projectPayment) ? 1 : parseInt(x.projectPayment) < parseInt(y.projectPayment) ? -1 : 0
            }
            else {
              // numeric sort
              return parseFloat(x.projectCustomer) - parseFloat(y.projectCustomer)
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




    let editedIndex = ref(-1)
    let editedItem = reactive({})
    let showDialog = ref(false)
    const customer = ref(null)
    const services = ref(null)
    const comment = ref('')
    const status = ref('')
    const projectSum = ref('')
    const payment = ref('')
    const paymentStatus = ref('')
    const deadline =  ref(null)
    const dateCreate =  ref(null)
    const dateUpdate =  ref(null)
    const projectDeadlineEditIdx = ref()
    const projectSumEditIdx = ref()
    const projectStatusEditIdx = ref()
    const projectPaymentStatusEditIdx = ref()
    // const projectServicesEditIdx = ref() 
    let deleteIndex = ref(null)
    const search = ref({})
    const paymentStatusOpt = ref(["Оплачен", "Не оплачен", "Частично оплачен"]) // Статус платежа: Оплачен/Не оплачен/Оплачен частично
    const statusOpt = ref(["Активен", "Завершен", "Просрочен"]) // Активен/Завершен/Просрочен(если уже дедлайн наступил)
    const open = ref(false)
    // при загрузке страницы загружить все услуги из БД
    onMounted(async()=>{
      loading.value = true
      await store.dispatch('projects/loadProjects')
      await store.dispatch('services/loadServices')
      await store.dispatch('customers/loadCustomers')
      loading.value = false
      console.log(getStoreProjects)
      console.log('rows.value', rows.value)
      // getVisibleColumns()
    })

    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStoreProjects, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val))
      rows.value = copyStore
      console.log(rows)
      console.log("vdxbxsb", getStoreProjects)
    })


    const format = ref()
    const formatDate = (date) => {
      console.log('data', date)
      const formatDate = new Date(date).toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
      format.value = formatDate
      console.log('1111111', format.value)
      return formatDate
    }

     const editStatusIdx = (item) => {
      projectStatusEditIdx.value = rows.value.indexOf(item)
      return projectStatusEditIdx.value
    }

    const editPaymentStatusIdx = (item) => {
      projectPaymentStatusEditIdx.value = rows.value.indexOf(item)
      return projectPaymentStatusEditIdx.value
    }

    const editRowIdx = (item) => {
      projectDeadlineEditIdx.value = rows.value.indexOf(item)
      return projectDeadlineEditIdx.value
    }

    const editSumIdx = (item) => {
      console.log('sgsz', item)
      projectSumEditIdx.value = rows.value.indexOf(item)
      console.log('индекс item', projectSumEditIdx.value)
      return projectSumEditIdx.value
    }

    // следить за редактированием пользователем значений в таблице 
    // watch(updated, (val) => {
    //     updateProjectsFB(rows.value)
    // } )


    const listServices = computed(() => store.state.services.services);
    const copyListServices = ref()
    const selectedServicesArr = ref([])

    watch(listServices, (val) =>{
      const copyStore = JSON.parse(JSON.stringify(val))
      copyListServices.value = copyStore
      console.log("услуги загружены из табл проекты", copyListServices.value)
    })

    const listCustomers = computed(() => store.state.customers.customers);
    const copyListCustomers = ref()

    watch(listCustomers, (val) =>{
      const copyStore = JSON.parse(JSON.stringify(val))
      copyListCustomers.value = copyStore
       console.log("клиенты загружены из табл проекты", copyListCustomers.value)
    })

    const getCountServicesOrders = (rows) =>{
       // получить массив выбранных услуг
      selectedServicesArr.value = []
      rows.forEach((item)=>{
        item.projectServices.forEach((item)=>{
          selectedServicesArr.value.push(item)
        })
      })

      // найти выбранные услуги в списке услуг и посчитать количество их заказов
      copyListServices.value.forEach((service)=>{
        service.numberOrders = 0
        console.log('количество заказов услуги', service.numberOrders)
        selectedServicesArr.value.forEach((selectService)=>{
          if(service.serviceTitle==selectService){
            console.log('совпадение', selectService, service.numberOrders )
            ++service.numberOrders 
          }
        })
      })
    } 

    const UpdateDocument = (row) => {
      updateProjectsFB(rows.value, row)
    }

    // обновить услуги в БД и хранилище
    const updateProjectsFB = async (rows, row) => {
      getCountServicesOrders(rows)
      console.log('получить измененные услуги',  copyListServices.value)
      await store.dispatch("services/postServices", copyListServices.value)


      // рассчитать общую стоимость
      sum.value = 0
      if(selectedItems.value){
        getTotalSumProject(selectedItems.value)
      }
 
      // перерассчитать количество заказов услуг
      if(projectStatusEditIdx.value>=0 && rows[projectStatusEditIdx.value].projectStatus == 'Завершен'
      && !rows[projectStatusEditIdx.value].endDate){
        console.log('условие', rows[projectStatusEditIdx.value].endDate)
        rows[projectStatusEditIdx.value].endDate =  new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
        rows[projectStatusEditIdx.value].projectPayment = rows[projectStatusEditIdx.value].projectSum
        rows[projectStatusEditIdx.value].projectPaymentStatus = "Оплачен"
      }
      if(projectDeadlineEditIdx.value>=0){
        rows[projectDeadlineEditIdx.value].projectDeadline = format.value
      }
      if(projectSumEditIdx.value>=0){
        rows[projectSumEditIdx.value].projectSum = sum.value
      }
       console.log('сколько оплачено', rows[projectPaymentStatusEditIdx.value])
      if(projectPaymentStatusEditIdx.value>=0 && rows[projectPaymentStatusEditIdx.value].projectPaymentStatus == "Оплачен"){
        console.log('сколько', rows[projectPaymentStatusEditIdx.value].projectPaymentStatus)
        rows[projectPaymentStatusEditIdx.value].projectPayment = rows[projectPaymentStatusEditIdx.value].projectSum
      }
      console.log('ыпяп', row)
      if(row){
        row.updateDate = new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
      }
      store.dispatch('projects/postProjects', rows)

      getPaymentSum()
      store.dispatch('customers/postCustomers', copyListCustomers.value)
    }

    // // получить индекс строки, в которой редактируем услуги
    // const editServicesIdx = (item) => {
    //   projectServicesEditIdx.value = rows.value.indexOf(item)
    //   return projectServicesEditIdx.value
    // }

    // update in actions (table)
    const editItem = (item) => {
                editedIndex = rows.value.indexOf(item)
                editedItem = Object.assign({}, item)
                console.log('дата дедлайна', editedItem.projectDeadline)
                customer.value = editedItem.projectCustomer
                services.value =  editedItem.projectServices
                comment.value =  editedItem.projectComment
                status.value =  editedItem.projectStatus
                console.log('сумма проектов', editedItem.projectSum)
                projectSum.value =  editedItem.projectSum
                payment.value =  editedItem.projectPayment
                paymentStatus.value =  editedItem.projectPaymentStatus
                deadline.value = editedItem.projectDeadline
                dateCreate.value =  editedItem.creationDate
                dateUpdate.value =  editedItem.updateDate
                rows.value[editedIndex] = editedItem
    }

    const deleteItem = (item) => {
      deleteIndex = rows.value.indexOf(item)
      rows.value.splice(deleteIndex, 1)
    }

    const confirm = (item) => {
      $q.dialog({
        title: 'Подтверждение',
        message: 'Вы хотите удалить проект?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        deleteItem(item)
        store.commit('projects/setProjects', rows.value)
        updateProjectsFB(rows.value)
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
    watch([customer, services, comment, status, projectSum, payment, paymentStatus, deadline], ([customer, services, comment, status, projectSum, payment, paymentStatus, deadline]) => {
      editedItem.projectCustomer = customer
      editedItem.projectServices = services
      editedItem.projectComment = comment
      editedItem.projectStatus = status
      editedItem.projectSum = projectSum
      editedItem.projectPayment = payment
      editedItem.projectPaymentStatus = paymentStatus
      editedItem.projectDeadline = deadline
      store.state.customers.customers.forEach((item)=>{
            if (item.customerName == customer){
                editedItem.customerId = item.id
            }
        })
      console.log('редактируемый проект',  editedItem)
      // let sum = 0
      // editedItem.projectServices.forEach((item)=> {
      //   store.state.services.services.forEach((service)=>{
      //       if(service.serviceTitle == item){
      //         totalProjectSum.value = totalProjectSum.value + parseInt(service.serviceCost)
      //         console.log('общ сумма', totalProjectSum.value)
      //         totalProjectSum.value = 0
      //       }
      //   })
      // })
      console.log('обновление',  store.state.projects.updateDate)
      if(editedItem.endDate == null && status == "Завершен"){
        editedItem.endDate =  new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
        })
      } else if (status != "Завершен") {
        editedItem.endDate = null
      }
    })

    // при изменении выбранных услуг, пересчитать общую СТОИМОСТЬ проекта
    // watch(services, (val) => {
    //   // getTotalSumProject(val)
    // })

    // watch(selectedItems.value, (val) => {
    //   console.log("меняется", selectedItems.value)
    //   getTotalSumProject(val)
    // })


    let sum = ref(0)
    const getTotalSumProject = (val) =>{
      console.log('услуги ыаыя', val)
      val.forEach((selectedService)=>{
        getStoreServices.value.forEach((service)=>{
          if(selectedService == service.serviceTitle){
            console.log('совпало', service.serviceCost)
              sum.value = sum.value + parseInt(service.serviceCost)
          }
        })
      })
      
      console.log('текущие услуги', val)
      console.log('новая сумма', sum.value)
      editedItem.projectSum = sum.value
      console.log('новая сумма в поле', editedItem.projectSum)
    }

    let totalPaymentSum = ref(0)

    const getPaymentSum = () =>{
      console.log('все клиенты', copyListCustomers.value)
      copyListCustomers.value.forEach((customer)=>{
        totalPaymentSum.value = 0
        store.state.projects.projects.forEach((item)=>{
              console.log('customer.id', customer.id)
              console.log('item.customerId', item.customerId)
                if(customer.id == item.customerId){
                        console.log('совпали', customer.id, item.customerId, item.projectPayment)
                        totalPaymentSum.value = totalPaymentSum.value + parseInt(item.projectPayment)
                        console.log('счет сумма', totalPaymentSum.value)
                }
            })
            console.log('клиент 1', customer.totalCost)
            customer.totalCost = totalPaymentSum.value
            console.log('клиент 1 новая сумма', customer.totalCost)
            console.log('обновлены  клиенты', copyListCustomers.value)
      })
      console.log('посчитали сумму оплат', totalPaymentSum.value)
    }

    // отредактировать ряд в таблице
    const updateRow = async() => {
      getCountServicesOrders(rows.value)
      await store.dispatch("services/postServices", copyListServices.value)
      sum.value = 0
      console.log('услуги отпр',  editedItem)
      getTotalSumProject(services.value)
      if(editedItem.projectStatus == "Завершен"){
        editedItem.projectPayment = editedItem.projectSum
        editedItem.projectPaymentStatus = "Оплачен"
      }
      if(editedItem.projectPaymentStatus == "Оплачен"){
        editedItem.projectPayment = editedItem.projectSum
      }
      const data = {idx: editedIndex, editedItem}
      await store.dispatch('projects/postByID', data)
      // const payload = {idx: editedItem.customerId}
      // console.log('отправляем', editedItem.customerId)
      // await store.dispatch('customers/updateCustomerSumByID', payload)
      showDialog.value = false
      getPaymentSum()
      store.dispatch('customers/postCustomers', copyListCustomers.value)
      // sum.value = 0
    }

    const closeModal = () => {
        showDialog.value = false
    }

    const openInvoice = async (row) => {
      //  await store.dispatch('invoice/createInvoiceCounter', {invoiceNumber: 0})
      await store.dispatch('customers/loadByID', row.customerId)
      store.commit('invoice/setProjectServices', row.projectServices)
      await store.dispatch('invoice/updateInvoiceCounter', 1)
    }

    return {
      rows,
      columns,
      loading,
      UpdateDocument,
      editItem,
      showDialog,
      editedItem,
      customer,
      services,
      comment,
      status,
      projectSum,
      paymentStatus,
      deadline,
      payment,
      dateCreate,
      dateUpdate,
      updateRow,
      closeModal,
      deleteItem,
      confirm,
      search,
      statusOpt,
      paymentStatusOpt,
      openInvoice,
      formatDate,
      format,
      editRowIdx,
      editStatusIdx,
      editPaymentStatusIdx,
      projectPaymentStatusEditIdx,
      projectStatusEditIdx,
      projectDeadlineEditIdx,
      projectSumEditIdx,
      // projectServicesEditIdx,
      editSumIdx,
      // editServicesIdx,
      customSort,
      // totalProjectSum,
      getSelectedServices,
      servicesText,
      sum,
      visibleColumns
      // chips
      // separator: ref('vertical'),
    }
  },
  components: { AppSearch, AppTableLoader, ProjectsEditModalFields, AppModalEdit, AppButton, AppSelect, AppIcon}
}
</script>

<style lang="sass">

</style>