<template>
  <div id="app" style="width: 500px">
    <BarChart v-bind="barChartProps" :options="options" />
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
import { ref, computed, defineComponent, onMounted } from "vue";
import { shuffle } from "lodash";
Chart.register(...registerables);
import { useStore } from "vuex";

export default {
  components: { BarChart },
  setup(props) {
    const store = useStore();
    const data = ref([]);
    const mas = ref([]);
    let legendaDataMonths = ref([]);
    let chartDataMonths = ref([]);
    const getStoreProjects = computed(() => store.state.projects.projects);

    const chartData = computed(() => ({
      labels: legendaDataMonths.value,
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(201, 203, 207, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 205, 86)",
          ],
          borderWidth: 1,
        },
      ],
    }));

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Суммы проектов по месяцам",
          padding: 35,
          font: {
            size: 21,
          },
        },
      },
    });

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
    });

    // получить последние 12 месяцев
    const getLastTwelveMonths = () => {
      let theMonths = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];
      let dataMonths = [
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
      let now = new Date();
      for (let i = 0; i > -12; i--) {
        let future = new Date(now.getFullYear(), now.getMonth() + i, 1);
        let month = theMonths[future.getMonth()];
        let dataMonth = dataMonths[future.getMonth()];
        let year = future.getFullYear();
        legendaDataMonths.value.push(month + " " + year);
        chartDataMonths.value.push(dataMonth + " " + year);
      }
      legendaDataMonths.value.reverse();
    };

    onMounted(async () => {
      await store.dispatch("projects/loadProjects");
      getLastTwelveMonths();
      chartValues(chartDataMonths.value, getStoreProjects.value);
      data.value = mas.value;
      data.value.reverse();
    });

    const chartValues = (chartMonths, projects) => {
      chartMonths.forEach((item) => {
        let sum = ref(0);

        projects.forEach((proj) => {
          if (proj.endDate && proj.endDate.includes(item)) {
            sum.value = sum.value + parseInt(proj.projectPayment);
          }
        });
        mas.value.push(sum.value);
      });
    };

    return {
      barChartProps,
      barChartRef,
      options,
    };
  },
};
</script>
