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
    <!-- <template v-slot:top>
      <app-modal-edit :modelValue="showDialog" title="Редактировать пользователя"  @submitUpdate="updateRow(); showDialog=false">
          <CustomersEditModalFields 
              v-model:nameVal="name" 
              v-model:emailVal="email" 
          />
      </app-modal-edit>
    </template> -->

      <template v-slot:loading>
        <AppTableLoader/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="role" :props="props">
            {{ props.row.role }}
          </q-td>
          <!-- <q-td key="actions" :props="props">
            <div class="row q-gutter-sm justify-center"> -->
              <!-- <AppButton color="blue" label="Редактировать" @clickAction="showDialog = true, editItem(props.row)" size=sm no-caps></AppButton> -->
              <!-- <AppButton v-if="props.row.role!='admin'" color="red" label="Удалить"  @clickAction="confirm(props.row)" size=sm no-caps></AppButton>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { tableColumnsUsers } from 'src/data/tableColumnsUsers'
import AppSearch from 'components/ui/AppSearch'
import AppTableLoader from 'components/ui/AppTableLoader'
import AppButton from 'components/ui/AppButton'
import {ref, reactive, computed, watch, onMounted, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
export default {
   setup(){
    const store = useStore()
    const loading = ref(false)
    const columns = ref(tableColumnsUsers)
    const rows =  ref([])
    // для слежения за изменениями значений в таблице
    const updated = ref(0)
    // получить services из store
    const getStoreUsers = computed(() => store.state.users.users
            .filter(users => {
                if (search.value.searchText) {
                    return users['userName'].toLowerCase().includes(search.value.searchText)
                }
                return users
            }))
    let showDialog = ref(false)
    const name = ref('')
    const email = ref('')
    let deleteIndex = ref(null)
    const $q = useQuasar()
    const search = ref({})
    // при загрузке страницы загружить все услуги из БД
    onMounted(async ()=>{
      loading.value = true
      await store.dispatch('users/loadUsers')
      loading.value = false
      console.log('юзеры', getStoreUsers.value)
    //   loading.value = true
    //   await store.dispatch('users/loadUsers')
    //   loading.value = false
    })
    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStoreUsers, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val))
      rows.value = copyStore
      console.log(rows)
      console.log(getStoreUsers)
    })
    const UpdateDocument = () => {
      updated.value = !(updated.value)
    }
    // // следить за редактированием пользователем значений в таблице 
    // watch(updated, (val) => {
    //     updateCustomersFB(rows.value)
    //     console.log(getStoreCustomers.value)
    // } )
    // // обновить услуги в БД и хранилище
    // const updateCustomersFB = async(rows) => {
    //   await store.dispatch('customers/postCustomers', rows)
    // }
    const pagination = ref({
      sortBy: 'desc',
    })

    const deleteUser = async (item) => {
      store.dispatch('users/deleteUser')
      deleteIndex = rows.value.indexOf(item)
      rows.value.splice(deleteIndex, 1)
    }
    const confirm = (item) => {
      $q.dialog({
        title: 'Подтверждение',
        message: 'Вы хотите удалить пользователя?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        deleteUser(item)
        store.commit('users/setUsers', rows.value)
        // updateCustomersFB(rows.value)
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    // const updateRow = async() => {
    //   const data = {idx: editedIndex, editedItem}
    //   await store.dispatch('customers/postByID', data)
    //   showDialog.value = false
    // }
    return {
      rows,
      columns,
      pagination,
      loading,
      UpdateDocument,
      showDialog,
      name,
      email,
      deleteUser,
      confirm,
      search,
    }
  },
  components: { AppSearch, AppTableLoader}
}
</script>

<style lang="sass">
</style>