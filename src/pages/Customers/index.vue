<template>
  <app-page title="Наши клиенты">
    <template #header>
      <AppButton label="Добавить клиента" @clickAction="modal = true" />
    </template>
    <CustomersTable />

    <!-- Вынесем модальное окно в отдельный блок -->
    <teleport to="body">
      <app-modal
        leftBtn="Отмена"
        rightBtn="Создать"
        @submitForm="createCustomer"
        v-model="modal"
        title="Добавить клиента"
      >
        <CustomersModal
          v-model:comment="customerComment"
          v-model:company="customerCompany"
          v-model:phone="customerPhone"
          v-model:name="customerName"
          v-model:email.number="customerEmail"
          @created="modal = false"
        />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import AppPage from "components/ui/AppPage";
import { ref, onMounted, computed, watch } from "vue";
import AppButton from "components/ui/AppButton";
import AppModal from "components/ui/AppModal";
import CustomersModal from "pages/Customers/CustomersModal";
import CustomersTable from "pages/Customers/CustomersTable";

export default defineComponent({
  name: "Customers",
  setup() {
    const modal = ref(false);
    const store = useStore();
    const customerName = ref("");
    const customerEmail = ref("");
    const customerPhone = ref("");
    const customerCompany = ref("");
    const customerComment = ref("");
    const customerStatus = ref("Активен");

    const createCustomer = async () => {
      const data = {
        customerName: customerName.value,
        customerEmail: customerEmail.value,
        customerCompany: customerCompany.value,
        customerComment: customerComment.value,
        customerPhone: customerPhone.value,
        customerStatus: customerStatus.value,
      };
      await store.dispatch("customers/createCustomer", data);
      customerName.value = "";
      customerEmail.value = "";
      customerCompany.value = "";
      customerComment.value = "";
      customerPhone.value = "";
      await store.dispatch("customers/loadCustomers");
    };

    return {
      modal,
      createCustomer,
      customerName,
      customerEmail,
      customerComment,
      customerCompany,
      customerPhone,
    };
  },
  components: { AppPage, AppButton, AppModal, CustomersModal, CustomersTable },
});
</script>
