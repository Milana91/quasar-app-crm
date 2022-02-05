<template>
  <div class="q-pa-md">
  <AppSearch v-model="search"/>
   <q-table 
      v-model:pagination="pagination"
      :rows="rows"
      dense
      :columns="columns"
      :rows-per-page-options="[10, 15]"
      row-key="name"
      :loading="loading"
      no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
    >
    <template v-slot:top>
      <app-modal-edit :modelValue="showDialog" title="Редактировать клиента" @submitUpdate="updateRow(); showDialog=false">
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
          <q-td key="customer" :props="props">
            {{ props.row.projectCustomer }}<AppIcon name="arrow_drop_down" />
            <q-popup-edit v-model="props.row.projectCustomer" buttons v-slot="scope"  @save="() => UpdateDocument()">
              <div class="q-pa-md" style="max-width: 200px">
                 <div class="q-gutter-md">
                  <AppSelect behavior="menu" :options="customerOptions" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td>
          <q-td key="services" :props="props">
          <div>{{ props.row.projectServices }}<AppIcon name="arrow_drop_down" /></div>
            <q-popup-edit v-model="props.row.projectServices" v-slot="scope" @save="() => UpdateDocument()"  buttons>
               <div class="q-pa-md" style="max-width: 200px">
                 <div class="q-gutter-md">
                  <AppSelect behavior="menu" multiple :options="servicesOptions" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td> 
          <q-td auto-width key="comment" :props="props">
            <div>
              {{ props.row.projectComment }}
            </div>
            <q-popup-edit v-model="props.row.projectComment" v-slot="scope" @save="() => UpdateDocument()"  buttons>
              <q-input  type="textarea" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props">
          <div>{{ props.row.projectStatus  }}<AppIcon name="arrow_drop_down" /></div>
            <q-popup-edit v-model="props.row.projectStatus " v-slot="scope" @save="() =>  UpdateDocument()"  buttons>
               <div class="q-pa-md" style="max-width: 200px">
                 <div class="q-gutter-md">
              <AppSelect behavior="menu" :options="statusOpt" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                </div> </div>
            </q-popup-edit>
          </q-td> 
          <q-td key="projectSum" :props="props">
            {{ props.row.projectSum }}
            <q-popup-edit v-model="props.row.projectSum " v-slot="scope" @save="() => UpdateDocument()"  buttons>
              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
           <q-td auto-width key="payment" :props="props">
              {{ props.row.projectPayment }}
            <q-popup-edit v-model="props.row.projectPayment" v-slot="scope" @save="() => UpdateDocument()"  buttons>
              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="paymentStatus" :props="props">
          <div>{{ props.row.projectPaymentStatus }}<AppIcon name="arrow_drop_down" /></div>
            <q-popup-edit v-model="props.row.projectPaymentStatus" v-slot="scope" @save="() => UpdateDocument()"  buttons>
               <div class="q-pa-md" style="max-width: 200px">
                    <div class="q-gutter-md">
                        <AppSelect behavior="menu" :options="paymentStatusOpt" style="width:160px" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></AppSelect>
                    </div> 
                </div>
            </q-popup-edit>
          </q-td> 
          <q-td key="deadline" :props="props">
            {{ props.row.projectDeadline }}
            <!-- <q-popup-edit v-model="props.row.projectDeadline" v-slot="scope" @save="() => UpdateDocument()"  buttons>
              <q-input type="date" v-model="scope.value" dense autofocus @keyup.enter="scope.set"></q-input>
            </q-popup-edit> -->
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
                  <AppButton round color="primary" @click="navigate" icon="shopping_cart" @clickAction="openInvoice(props.row)" />
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
import { doc, onSnapshot } from "firebase/firestore"

export default {
   props: {
     customerOptions: [Array],
     servicesOptions: [Array],
   },
   setup(){
    const store = useStore()
    const loading = ref(false)
    const columns = ref(tableColumnsProjects)
    const rows =  ref([])
    // для слежения за изменениями значений в таблице
    const updated = ref(0)
    // const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //   console.log("Current data: ", doc.data())
    // });
    // получить services из store
    const getStoreServices = computed(() => store.state.services.services)
    const getStoreProjects = computed(() => store.state.projects.projects
            .filter(project => {
                if (search.value.searchText) {
                    return project['projectCustomer'].toLowerCase().includes(search.value.searchText)
                }
                return project
            }))
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
    let deleteIndex = ref(null)
    const $q = useQuasar()
    const search = ref({})
    const paymentStatusOpt = ref(["Оплачен", "Не оплачен", "Частично оплачен"]) // Статус платежа: Оплачен/Не оплачен/Оплачен частично
    const statusOpt = ref(["Активен", "Завершен", "Просрочен"]) // Активен/Завершен/Просрочен(если уже дедлайн наступил)
    const open = ref(false)
    // при загрузке страницы загружить все услуги из БД
    onMounted(async()=>{
      loading.value = true
      await store.dispatch('projects/loadProjects')
      await store.dispatch('services/loadServices')
      loading.value = false
      console.log(getStoreProjects)
      console.log('rows.value', rows.value)
    })

    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStoreProjects, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val))
      rows.value = copyStore
      console.log(rows)
      console.log("vdxbxsb", getStoreProjects)
    })

    const UpdateDocument = () => {
      updated.value = !(updated.value)
    }

    // const UpdateR = (row) => {
    //   // idx = rows.value.indexOf(item)
    //   const ef = JSON.parse(JSON.stringify(row))
    //   store.commit('projects/changeProject', ef)
    //   console.log('!в store', store.state.projects.projects)
    //   // editedItem = ef
    //   // const data = {idx: editedIndex, editedItem}
    //   // await store.dispatch('projects/postByID', data)
    //   // console.log('!после dispatch', data)
    // }

    // следить за редактированием пользователем значений в таблице 
    watch(updated, (val) => {
        updateProjectsFB(rows.value)
    } )

    // обновить услуги в БД и хранилище
    const updateProjectsFB = async(rows) => {
      console.log('редактирование', rows)
      await store.dispatch('projects/postProjects', rows)
    }

    const pagination = ref({
      sortBy: 'desc',
    })

    // update in actions (table)
    const editItem = (item) => {
                editedIndex = rows.value.indexOf(item)
                editedItem = Object.assign({}, item)
                customer.value = editedItem.projectCustomer
                services.value =  editedItem.projectServices
                comment.value =  editedItem.projectComment
                status.value =  editedItem.projectStatus
                projectSum.value =  editedItem.projectSum
                payment.value =  editedItem.projectPayment
                paymentStatus.value =  editedItem.paymentStatus
                deadline.value =  editedItem.projectDeadline
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
    watch(services, (val) => {
      let sum = ref(0)
      console.log('jg', val)
      console.log('услуги', getStoreServices)
      val.forEach((selectedService)=>{
        console.log('12345', selectedService)
        getStoreServices.value.forEach((service)=>{
          console.log('67890', service)
          if(selectedService == service.serviceTitle){
            console.log('совпало', service.serviceCost)
              sum.value = sum.value + service.serviceCost
          }
        })
      })
      console.log('новая сумма', sum.value)
      editedItem.projectSum = sum.value
      console.log('новая сумма в поле', editedItem.projectSum)
    })

    // отредактировать ряд в таблице
    const updateRow = async() => {
      const data = {idx: editedIndex, editedItem}
      console.log('индекс', editedIndex)
      console.log('новка', editedItem)
      await store.dispatch('projects/postByID', data)
      console.log('отредактировали', editedItem.customerId)
      const payload = {idx: editedItem.customerId}
      await store.dispatch('customers/updateCustomerSumByID', payload)
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
      pagination,
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
      deleteItem,
      confirm,
      search,
      statusOpt,
      paymentStatusOpt,
      openInvoice,
      // separator: ref('vertical'),
    }
  },
  components: { AppSearch, AppTableLoader, ProjectsEditModalFields, AppModalEdit, AppButton, AppSelect, AppIcon}
}
</script>

<style lang="sass">

</style>