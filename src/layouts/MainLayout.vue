<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-btn
          dense
          color="indigo-8"
          round
          icon="notifications"
          class="q-mr-md"
          @click="openNotifications"
        >
          <q-badge v-if="counterNotify > 0" color="red" floating>{{
            counterNotify
          }}</q-badge>
        </q-btn>
        <div><a href="#" @click.prevent="logout">Выйти</a></div>
        <!-- <router-link to="/logout" @click.prevent="logout">Выйти</router-link>
        <AppButton label="Выйти" @clickAction="logout"/> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      class="menuleft bg-grey-3"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      bordered
      :width="180"
    >
      <q-list padding>
        <q-item-label header style="font-size: 20px"> Меню </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="miniState = true"
        ></q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <teleport to="body">
    <app-modal
      v-model="modal"
      title="Подтверждение"
      leftBtn="Больше не напоминать"
      rightBtn="ОК"
      @leftBtnAct="clickLeftBtn"
      @submitForm="clickRightBtn"
    >
      <q-card-section class="q-pt-none"> Напомнить завтра? </q-card-section>
    </app-modal>
  </teleport>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import AppModal from "components/ui/AppModal.vue";

const linksList = [
  {
    title: "Главная",
    icon: "home",
    link: "/home",
  },
  {
    title: "Проекты",
    icon: "content_copy",
    link: "/projects",
  },
  {
    title: "Услуги",
    icon: "currency_ruble",
    link: "/services",
  },
  {
    title: "Клиенты",
    icon: "people",
    link: "/customers",
  },
  {
    title: "Календарь",
    icon: "event",
    link: "/calendar",
  },
  {
    title: "Помощь",
    icon: "record_voice_over",
    link: "/help",
  },
  {
    title: "Пользователи",
    icon: "account_circle",
    link: "/users",
  },
];

import { defineComponent, ref, onMounted, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    AppModal,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const miniState = ref(false);
    const store = useStore();
    const $q = useQuasar();
    const counterNotify = ref(0);
    let remindColor = ref("");
    const getCustomersStore = computed(() => store.state.customers.customers);
    const router = useRouter();
    let modal = ref(false);
    const route = useRoute();

    const today = new Date().toLocaleDateString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timezone: "UTC",
    });

    // Форматировать дату дедлайна
    const formatDate = (date) => {
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

      const d = new Date(year, idxMonth, day);

      return d;
    };

    // Найти разницу между датами (кол-во дней)
    function getNumberOfDays(start, end) {
      const date1 = new Date(formatDate(start));
      const date2 = new Date(formatDate(end));
      const oneDay = 1000 * 60 * 60 * 24;

      const diffInTime = date2.getTime() - date1.getTime();

      const diffInDays = Math.round(diffInTime / oneDay);

      return diffInDays;
    }
    let dismiss = ref();
    let dismiss1 = ref();
    // Получить напоминания о событиях
    const getNotifications = (item) => {
      dismiss = $q.notify({
        message: `<span style="font-size: 15px">Событие:</span><br> <span style="font-size: 17px">${item.title}</span>`,
        caption: `<span style="font-size: 16px">${item.details}</span> <br>  ${item.time}`,
        classes: "test",
        timeout: 0,
        badgeClass: "my-badge-class",
        color: "primary",
        position: "top-right",
        html: true,
        icon: "event",
        textColor: "white",
        actions: [
          {
            label: "Просмотрено",
            color: "yellow",
            handler: () => {
              const idx = eventsToday.value.findIndex((elem) => elem == item);
              eventsToday.value.splice(idx, 1);
              confirmReminder(item);
            },
          },
          {
            label: "Напомнить позже",
            color: "white",
            handler: () => {
              ++counterNotify.value;
            },
          },
        ],
      });
    };

    let clickProject = ref("");
    // Получить напоминания о проектах
    const getNotificationsProjects = (item) => {
      const customerName = computed(() =>
        getCustomersStore.value.find(
          (customer) => customer.id == item.customerId
        )
      );
      const countDays = computed(() => {
        return item.reminderStatus == "remindLater" ? 1 : 2;
      });
      //  console.log('имя клиента', customerName.value)
      dismiss1 = $q.notify({
        message: `<span style="font-size: 16px">Через ${countDays.value} дня срок сдачи проекта</span><br><span style="font-size: 16px"> для клиента</span> <span style="font-size: 18px"><strong>${customerName.value.customerName}</strong></span>`,
        caption: ` ${item.projectDeadline} `,
        classes: "test",
        timeout: 0,
        color: remindColor,
        position: "top-right",
        html: true,
        icon: "warning",
        badgeClass: "my-badge-class",
        textColor: "white",
        actions: [
          {
            label: "Просмотрено",
            color: "yellow",
            handler: () => {
              clickProject.value = item;
              if (item.reminderStatus != "remindLater") {
                modal.value = true;
              } else if (item.reminderStatus == "remindLater") {
                confirmReminderDeadline(item, "done");
                const idx = projectsForNotificationsLater.value.findIndex(
                  (elem) => elem == item
                );
                projectsForNotificationsLater.value.splice(idx, 1);
              }
            },
          },
          {
            label: "Напомнить позже",
            color: "white",
            handler: () => {
              ++counterNotify.value;
            },
          },
        ],
      });
    };

    onUnmounted(() => {
      if (eventsToday.value.length != 0) {
        dismiss();
      }
      if (projectsForNotificationsLater.value.length != 0) {
        dismiss1();
      }
      if (projectsForNotifications.value.length != 0) {
        dismiss1();
      }
    });

    const clickLeftBtn = () => {
      const idx = projectsForNotifications.value.findIndex(
        (elem) => elem == clickProject.value
      );
      projectsForNotifications.value.splice(idx, 1);
      confirmReminderDeadline(clickProject.value, "done");
      modal.value = false;
    };

    const clickRightBtn = () => {
      const idx = projectsForNotifications.value.findIndex(
        (elem) => elem == clickProject.value
      );
      projectsForNotifications.value.splice(idx, 1);
      confirmReminderDeadline(clickProject.value, "remindLater");
      modal.value = false;
    };

    // Напоминания о дедлайнах после входа в систему
    const getProjectsStore = computed(() => store.state.projects.projects);
    const projectsForNotifications = ref([]);
    const projectsForNotificationsLater = ref([]);
    const confirmReminderDeadline = async (item, status) =>
      await store.dispatch("projects/editReminderStatusDeadline", {
        selectedProject: item,
        reminderStatus: status,
        id: item.id,
      });

    // Напоминания из календаря после входа в систему
    // После авторизации проверяем события в календаре
    const getEventsStore = computed(() => store.state.calendar.events);
    const todayDate = new Date().toLocaleDateString().slice(0, 10);
    const nowTime = new Date().toLocaleTimeString().slice(0, -3);
    const eventsToday = ref([]);
    const confirmReminder = async (item) =>
      await store.dispatch("calendar/editReminderStatusEvent", {
        selectedEvent: {
          title: item.title,
          id: item.id,
          details: item.details,
          date: item.date,
          time: item.time,
          bgcolor: item.bgcolor,
        },
        reminderStatus: "done",
        id: item.eventId,
      });

    const auth = store.getters["authenticate.isAuthenticated"];
    onMounted(async () => {
      const auth = store.getters["authenticate.isAuthenticated"];
     
      if (route.path != "/help") {
        await store.dispatch("calendar/loadEvents");
        await store.dispatch("projects/loadProjects");
        await store.dispatch("customers/loadCustomers");
      }

      getEventsStore.value.forEach((item) => {
        const dateFormat = new Date(item.date)
          .toLocaleDateString()
          .slice(0, 10);
        if (dateFormat == todayDate && item.time > nowTime) {
          eventsToday.value.push(item);
        }
      });
      getProjectsStore.value.forEach((item) => {
        if (
          getNumberOfDays(today, item.projectDeadline) == 2 &&
          item.reminderStatus == "no" &&
          item.projectStatus != "Завершен"
        ) {
          projectsForNotifications.value.push(item);
          remindColor = "blue";
        }
        if (
          getNumberOfDays(today, item.projectDeadline) == 1 &&
          item.reminderStatus == "remindLater" &&
          item.projectStatus != "Завершен"
        ) {
          projectsForNotificationsLater.value.push(item);
        }
      });
      eventsToday.value.forEach((item) => {
        if (item.reminderStatus != "done") {
          setTimeout(() => {
            getNotifications(item);
          }, 2500);
        }
      });
      projectsForNotifications.value.forEach((item) => {
        if (item.reminderStatus != "done") {
          setTimeout(() => {
            remindColor = "blue-grey-10";
            getNotificationsProjects(item);
          }, 4000);
        }
      });
      projectsForNotificationsLater.value.forEach((item) => {
        if (item.reminderStatus == "remindLater") {
          setTimeout(() => {
            remindColor = "brown-13";
            getNotificationsProjects(item);
          }, 4000);
        }
      });
    });

    const openNotifications = () => {
      console.log("массив событий на сегодня", eventsToday.value);
      projectsForNotifications.value.forEach((item) => {
        if (item.reminderStatus != "done") {
          remindColor = "blue-grey-10";
          getNotificationsProjects(item);
        }
      });
      projectsForNotificationsLater.value.forEach((item) => {
        if (item.reminderStatus != "done") {
          remindColor = "brown-13";
          getNotificationsProjects(item);
        }
      });

      eventsToday.value.forEach((item) => {
        if (item.reminderStatus != "done") {
          getNotifications(item);
        }
      });
      counterNotify.value = 0;
    };

    return {
      counterNotify,
      openNotifications,
      essentialLinks: linksList,
      leftDrawerOpen,
      router,
      clickRightBtn,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      miniState,
      modal,
      clickLeftBtn,
      logout: () => {
        store.dispatch("authenticate/logout");
        router.push("/auth");
      },

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
});
</script>
<style lang="sass">
.q-notifications__list--top
    top: 61px

.my-badge-class
  display: none
</style>
