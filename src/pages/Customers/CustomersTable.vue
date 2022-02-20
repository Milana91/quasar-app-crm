<template>
  <div class="q-pa-md">
    <AppSearch v-model="search" />
    <q-table
      binary-state-sort
      v-model:pagination="pagination"
      :sort-method="customSort"
      :rows="rows"
      dense
      :columns="columns"
      :rows-per-page-options="[10, 15]"
      row-key="name"
      :loading="loading"
      no-data-label="Ничего не найдено"
      no-results-label="The filter didn't uncover any results"
    >
      <template v-slot:top>
        <app-modal-edit
          :modelValue="showDialog"
          title="Редактировать клиента"
          @closeModal="closeModal"
          @submitUpdate="
            updateRow();
            showDialog = false;
          "
        >
          <CustomersEditModalFields
            v-model:nameVal="name"
            v-model:emailVal="email"
            v-model:phoneVal="phone"
            v-model:companyVal="company"
            v-model:commentVal="comment"
            v-model:sumCostVal="totalCost"
            v-model:statusVal="status"
            v-model:createDateVal="createDate"
            v-model:updateDateVal="updateDate"
            :optionsVal="statusOptions"
          />
        </app-modal-edit>
      </template>

      <template v-slot:loading>
        <AppTableLoader />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.customerName }}
            <q-popup-edit
              v-model="props.row.customerName"
              buttons
              v-slot="scope"
              @save="() => UpdateDocument()"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.customerEmail }}
            <q-popup-edit
              v-model="props.row.customerEmail"
              v-slot="scope"
              @save="() => UpdateDocument()"
              buttons
            >
              <q-input
                type="email"
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="phone" :props="props">
            {{ props.row.customerPhone }}
            <q-popup-edit
              v-model="props.row.customerPhone"
              v-slot="scope"
              @save="() => UpdateDocument()"
              buttons
            >
              <q-input
                type="tel"
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.customerCompany }}
            <q-popup-edit
              v-model="props.row.customerCompany"
              v-slot="scope"
              @save="() => UpdateDocument()"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td auto-width key="comment" :props="props">
            <div>
              {{ props.row.customerComment }}
            </div>
            <q-popup-edit
              v-model="props.row.customerComment"
              v-slot="scope"
              @save="() => UpdateDocument()"
              buttons
            >
              <q-input
                type="textarea"
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="totalCost" :props="props">
            {{ props.row.totalCost }}
          </q-td>
          <q-td key="status" :props="props">
            <div>
              {{ props.row.customerStatus }}<AppIcon name="arrow_drop_down" />
            </div>
            <q-popup-edit
              v-model="props.row.customerStatus"
              v-slot="scope"
              @save="() => UpdateDocument()"
              buttons
            >
              <div class="q-pa-md" style="max-width: 200px">
                <div class="q-gutter-md">
                  <AppSelect
                    behavior="menu"
                    :options="statusOptions"
                    style="width: 160px"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  ></AppSelect>
                </div>
              </div>
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
              <AppButton
                color="blue"
                label="Редактировать"
                @clickAction="(showDialog = true), editItem(props.row)"
                size="sm"
                no-caps
              ></AppButton>
              <AppButton
                color="red"
                label="Удалить"
                @clickAction="confirm(props.row)"
                size="sm"
                no-caps
              ></AppButton>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { tableColumnsCustomers } from "src/data/tableColumnsCustomers";
import AppSearch from "components/ui/AppSearch";
import AppTableLoader from "components/ui/AppTableLoader";
import AppModalEdit from "components/ui/AppModalEdit";
import AppButton from "components/ui/AppButton";
import AppSelect from "components/ui/AppSelect";
import AppIcon from "components/ui/AppIcon";
import CustomersEditModalFields from "pages/Customers/CustomersEditModalFields";
import { ref, reactive, computed, watch, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const columns = ref(tableColumnsCustomers);
    const rows = ref([]);
    // для слежения за изменениями значений в таблице
    const updated = ref(0);
    // получить services из store
    const getStoreCustomers = computed(() =>
      store.state.customers.customers.filter((customer) => {
        if (search.value.searchText) {
          return (
            customer["customerName"]
              .toLowerCase()
              .includes(search.value.searchText) ||
            String(customer["customerEmail"])
              .toLowerCase()
              .includes(search.value.searchText) ||
            customer["customerCompany"]
              .toLowerCase()
              .includes(search.value.searchText) ||
            customer["customerComment"]
              .toLowerCase()
              .includes(search.value.searchText) ||
            customer["customerStatus"]
              .toLowerCase()
              .includes(search.value.searchText) ||
            String(customer["totalCost"]).includes(search.value.searchText)
          );
        }
        return customer;
      })
    );
    let editedIndex = ref(-1);
    let editedItem = reactive({});
    let showDialog = ref(false);
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const company = ref("");
    const comment = ref("");
    const status = ref("");
    const createDate = ref(null);
    const updateDate = ref(null);
    const totalCost = ref(null);
    let deleteIndex = ref(null);
    const $q = useQuasar();
    const search = ref({});
    const statusOptions = ref(["Активен", "Не активен"]);

    // при загрузке страницы загружить все услуги из БД
    onMounted(async () => {
      loading.value = true;
      await store.dispatch("customers/loadCustomers");
      loading.value = false;
    });

    // следить за изменениями массива services в store
    // делать копию при изменении и передавать в rows, на основе которых отрисовывается таблица
    watch(getStoreCustomers, (val) => {
      const copyStore = JSON.parse(JSON.stringify(val));
      rows.value = copyStore;
      console.log(rows);
      console.log(getStoreCustomers);
    });

    const UpdateDocument = () => {
      updated.value = !updated.value;
    };
    // следить за редактированием пользователем значений в таблице
    watch(updated, (val) => {
      updateCustomersFB(rows.value);
      console.log(getStoreCustomers.value);
    });

    // обновить услуги в БД и хранилище
    const updateCustomersFB = async (rows) => {
      await store.dispatch("customers/postCustomers", rows);
    };

    const pagination = ref({
      sortBy: "desc",
    });

    // update in actions (table)
    const editItem = (item) => {
      editedIndex = rows.value.indexOf(item);
      editedItem = Object.assign({}, item);
      name.value = editedItem.customerName;
      email.value = editedItem.customerEmail;
      phone.value = editedItem.customerPhone;
      company.value = editedItem.customerCompany;
      comment.value = editedItem.customerComment;
      status.value = editedItem.customerStatus;
      totalCost.value = editedItem.totalCost;
      createDate.value = editedItem.creationDate;
      updateDate.value = editedItem.updateDate;
      rows.value[editedIndex] = editedItem;
    };

    const deleteItem = (item) => {
      deleteIndex = rows.value.indexOf(item);
      rows.value.splice(deleteIndex, 1);
    };

    const confirm = (item) => {
      $q.dialog({
        title: "Подтверждение",
        message: "Вы хотите удалить клиента?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          deleteItem(item);
          store.commit("customers/setCustomers", rows.value);
          updateCustomersFB(rows.value);
          $q.notify({ message: "Клиент удален" });
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    // Если пользователь обновляет  редиктируемые поля,
    // обновляется копия объекта editedItem (данные для попапа)
    watch(
      [name, email, phone, company, comment, status],
      ([name, email, phone, company, comment, status]) => {
        editedItem.customerName = name;
        editedItem.customerEmail = email;
        editedItem.customerPhone = phone;
        editedItem.customerCompany = company;
        editedItem.customerComment = comment;
        editedItem.customerStatus = status;
      }
    );

    const updateRow = async () => {
      const data = { idx: editedIndex, editedItem };
      await store.dispatch("customers/postByID", data);
      showDialog.value = false;
    };

    const closeModal = () => {
      showDialog.value = false;
    };

    // Сортировка
    const customSort = (rows, sortBy, descending) => {
      const data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;
          console.log("x", x);
          console.log("y", y);
          if (sortBy === "name") {
            return x.customerName > y.customerName
              ? 1
              : x.customerName < y.customerName
              ? -1
              : 0;
          } else if (sortBy === "email") {
            return x.customerEmail > y.customerEmail
              ? 1
              : x.customerEmail < y.customerEmail
              ? -1
              : 0;
          } else if (sortBy === "phone") {
            return x.customerPhone > y.customerPhone
              ? 1
              : x.customerPhone < y.customerPhone
              ? -1
              : 0;
          } else if (sortBy === "company") {
            return x.customerCompany > y.customerCompany
              ? 1
              : x.customerCompany < y.customerCompany
              ? -1
              : 0;
          } else if (sortBy === "comment") {
            return x.customerComment > y.customerComment
              ? 1
              : x.customerComment < y.customerComment
              ? -1
              : 0;
          } else if (sortBy === "totalCost") {
            return parseInt(x.totalCost) > parseInt(y.totalCost)
              ? 1
              : parseInt(x.totalCost) < parseInt(y.totalCost)
              ? -1
              : 0;
          } else if (sortBy === "status") {
            return x.customerStatus > y.customerStatus
              ? 1
              : x.customerStatus < y.customerStatus
              ? -1
              : 0;
          } else if (sortBy === "dateCreate") {
            const dateX = new Date(getFormatDate(x.creationDate));
            const dateY = new Date(getFormatDate(y.creationDate));
            return dateX > dateY ? 1 : dateX < dateY ? -1 : 0;
          } else if (sortBy === "dateUpdate") {
            const dateX = new Date(getFormatDate(x.updateDate));
            const dateY = new Date(getFormatDate(y.updateDate));
            return dateX > dateY ? 1 : dateX < dateY ? -1 : 0;
          }
        });
      }

      return data;
    };

    // Форматировать дату long
    const getFormatDate = (date) => {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      const arr = date.split(" ");
      const month = arr[1];
      const day = arr[0];
      const year = arr[2];
      const idxMonth = months.findIndex((item) => item == month);
      const formDate = [year, idxMonth, day].join(", ");

      // console.log("новая дата", formDate)
      const d = new Date(year, idxMonth, day);
      return d;
    };

    return {
      rows,
      columns,
      pagination,
      loading,
      UpdateDocument,
      editItem,
      showDialog,
      editedItem,
      name,
      email,
      phone,
      company,
      comment,
      status,
      totalCost,
      createDate,
      updateDate,
      updateRow,
      deleteItem,
      confirm,
      search,
      statusOptions,
      customSort,
      closeModal,
      // separator: ref('vertical'),
    };
  },
  components: {
    AppSearch,
    AppTableLoader,
    CustomersEditModalFields,
    AppModalEdit,
    AppButton,
    AppSelect,
    AppIcon,
  },
};
</script>

<style lang="sass"></style>
