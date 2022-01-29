<template>
  <div id="app" style="width: 400px">
    <!-- <q-btn @click="shuffleData">Shuffle</q-btn> -->
    <BarChart v-bind="barChartProps" :options="options"/>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { BarChart, useBarChart } from 'vue-chart-3'
import { ref, computed, defineComponent, onMounted } from 'vue'
import { shuffle } from 'lodash'
Chart.register(...registerables)
import { useStore } from 'vuex'


export default {
    components: { BarChart },
    setup(props) {
        const store = useStore()
        const data = ref([])
        const mas = ref([])
        let legendaDataMonths = ref([])
        let chartDataMonths = ref([])
        const getStoreProjects = computed(()=>store.state.projects.projects)

        const chartData = computed(() => ({
             labels: legendaDataMonths.value,
             datasets: [
                {
                    data: data.value,
                    // backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    ],
                    borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 205, 86)',
                    ],
                    borderWidth: 1
                },
            ],
        }));

        const options = ref({
            responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Суммы проектов по месяцам',
                    },
                },
            });

        const { barChartProps, barChartRef } = useBarChart({
            chartData,
        });

        // function shuffleData() {
        // data.value = shuffle(data.value);
        // }


      // получить последние 12 месяцев
      const getLastTwelveMonths = () => {
            let theMonths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
            let dataMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
            let now = new Date()
            // console.log('12 мес', theMonths)
            // console.log('сегодня', now)
            for (let i = 0; i > -12; i--) {
                let future = new Date(now.getFullYear(), now.getMonth() + i, 1)
                // console.log('год', future)
                let month = theMonths[future.getMonth()]
                let dataMonth = dataMonths[future.getMonth()]
                // console.log('месяц', future)
                let year = future.getFullYear()
                // console.log('месяц и год', month, year)
                legendaDataMonths.value.push(month + ' ' + year)
                chartDataMonths.value.push(dataMonth + ' ' + year)
            }
      }

      onMounted(async ()=>{
            await store.dispatch('projects/loadProjects')
            getLastTwelveMonths()
            // console.log('для легенды', legendaDataMonths.value)
            // console.log('для графика', chartDataMonths.value)
            // console.log('получены проекты', getStoreProjects.value)
            chartValues(chartDataMonths.value, getStoreProjects.value)
            // console.log('месяцы для поиска', chartDataMonths.value)
            // console.log(data.value)
            data.value = mas.value
        })

      const chartValues = (chartMonths, projects) =>{
           chartMonths.forEach((item) => {
               let sum = ref(0)
                // console.log('тра', item)
                projects.forEach((proj)=>{
                    // console.log('фыа', proj)
                    if(proj.projectDeadline.includes(item))
                    {
                        // console.log('проекты вкл', proj)
                        sum.value = sum.value + proj.projectSum
                        // console.log('сумма', sum.value)
                    }
                })
                mas.value.push(sum.value)
                // console.log('массив значений', mas.value)
	       })
       }

    return {
        barChartProps, 
        barChartRef,
        options
    }
   }
}
</script>