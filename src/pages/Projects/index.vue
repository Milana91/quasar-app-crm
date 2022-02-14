<template>
  <app-page title="Проекты">
    <template #header>
      <AppButton label="Добавить проект" @clickAction="modal = true" />
    </template>
    <ProjectsTable
      v-model:customerOptions="customerOpt"
      v-model:servicesOptions="servicesOpt"
    />

    <!-- Вынесем модальное окно в отдельный блок -->
    <teleport to="body">
      <app-modal
        leftBtn="Отмена"
        rightBtn="Создать"
        @submitForm="createProject"
        v-model="modal"
        title="Добавить проект"
      >
        <ProjectsModal
          v-model:customer="projectCustomer"
          v-model:services="projectServices"
          v-model:comment="projectComment"
          v-model:deadline="projectDeadline"
          v-model:customerOptions="customerOpt"
          v-model:servicesOptions="servicesOpt"
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
import ProjectsModal from "pages/Projects/ProjectsModal";
import ProjectsTable from "pages/Projects/ProjectsTable";

export default defineComponent({
  name: "Projects",
  setup() {
    const store = useStore();
    const modal = ref(false);
    const projectCustomer = ref(null);
    const projectServices = ref([]);
    const projectComment = ref("");
    const projectStatus = ref("Активен");

    let projectSum = ref(0);
    const projectPayment = ref("-");
    const projectPaymentStatus = ref("Не оплачен");
    const deadlineDate = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toLocaleDateString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timezone: "UTC",
    });
    const projectDeadline = ref(deadlineDate);

    // Для select customers
    const listCustomers = computed(() => store.state.customers.customers);
    const customerOpt = computed(() =>
      listCustomers.value.map((item) => item.customerName)
    );
    // Поиск выбранного при создании проекта клиента в store
    const customerInfo = computed(() =>
      listCustomers.value.find(
        (item) => item.customerName == projectCustomer.value
      )
    );

    // Для select customers
    const listServices = computed(() => store.state.services.services);
    const servicesOpt = computed(() =>
      listServices.value.map((item) => item.serviceTitle)
    );
    // Поиск выбранной при создании проекта услуги клиента в store
    let selectedServices = ref([]);
    let selectedServicesCost = ref([]);
    // id добавленных услуг
    const servicesId = ref([]);
    const serviceInfo = (val) => {
      listServices.value.forEach((item) => {
        if (item.serviceTitle == val) {
          selectedServices.value.push(item);
        }
      });
    };
    const getSelectedServicesCost = (val) => {
      selectedServicesCost.value.push(val.serviceCost);
    };

    const servicesSum = (arr) => arr.reduce((sum, current) => sum + current, 0);

    // При изм массива цен выбр услуг, рассчитать сумму выбранных услуг (Проекты - Стоимость)
    watch(selectedServicesCost, (val) => {
      console.log("стоимость выбранных услуг", selectedServicesCost);
      projectSum.value = servicesSum(val);
      store.commit("projects/updateProjectsSum", projectSum.value);
      console.log("сумма теперь", store.state.projects.projectsSum);

      console.log("сумма выбранных услуг", projectSum.value);
    });

    watch(projectServices, (val) => {
      if (val) {
        selectedServices.value = [];
        servicesId.value = [];
        selectedServicesCost.value = [];
        projectServices.value.forEach((item) => serviceInfo(item));
        console.log(val, selectedServices.value);
        selectedServices.value.forEach((item) =>
          servicesId.value.push(item.id)
        );
        console.log("aszgzdg", selectedServices.value);
        console.log("New", projectServices.value);
        console.log("ID", servicesId.value);
        selectedServices.value.forEach((item) => getSelectedServicesCost(item));
        console.log("сумма", selectedServicesCost.value);
        // projectSum = computed(() => selectedServicesCost.value.reduce((sum, current) => sum + current, 0))
      }
      //  selectedServices.value.forEach((item, i) => {
      //     projectServicesData[item.serviceTitle] = item[i].serviceTitle
      //     projectServicesData[item.id] = item[i].id
      //     console.log(projectServicesData.value)
      // })
    });

    onMounted(async () => {
      await store.dispatch("customers/loadCustomers");
      await store.dispatch("services/loadServices");
    });

    // watch(modal, val=>console.log(val, customerOpt1))

    const getFormatDate = (date) => {
      return new Date(date).toLocaleDateString("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
      });
    };

    const createProject = async () => {
      // const formatDate = new Date(projectDeadline.value).toLocaleDateString(
      //   "ru",
      //   {
      //     year: "numeric",
      //     month: "long",
      //     day: "numeric",
      //     timezone: "UTC",
      //   }
      // );
      // getFormatDate(projectDeadline.value)
      const data = {
        customerId: customerInfo.value.id,
        projectCustomer: projectCustomer.value,
        projectServices: projectServices.value,
        projectComment: projectComment.value,
        projectStatus: projectStatus.value,
        projectSum: projectSum.value,
        projectPayment: projectPayment.value,
        projectPaymentStatus: projectPaymentStatus.value,
        projectDeadline: getFormatDate(projectDeadline.value),
      };
      await store.dispatch("projects/createProject", data)
      projectCustomer.value = null
      projectServices.value = null
      projectComment.value = ""
      projectStatus.value = "Активен"
      projectPayment.value = 0
      projectPaymentStatus.value = "Не оплачен"
      projectDeadline.value = deadlineDate
      await store.dispatch("projects/loadProjects")
      selectedServices.value = null
    }

    return {
      modal,
      createProject,
      projectCustomer,
      projectServices,
      projectComment,
      projectDeadline,
      customerOpt,
      servicesOpt,
      projectPaymentStatus,
    };
  },
  components: { AppPage, AppButton, AppModal, ProjectsModal, ProjectsTable },
});
</script>
