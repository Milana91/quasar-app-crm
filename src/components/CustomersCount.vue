<template>
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
    <q-btn @click="shuffleData">Shuffle</q-btn>
</template>  
<script>
import { shuffle } from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);


export default {
    components: { DoughnutChart  },
    setup(props) {
        
            const data = ref([30, 40, 60, 70, 5]);
            const doughnutRef = ref();

            const options = ref({
            responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Doughnut Chart',
                    },
                },
            });

            const testData = computed(() => ({
            labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
            datasets: [
                {
                data: data.value,
                backgroundColor:
                    [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                    ]
                },
            ],
            }));

            function shuffleData() {
            data.value = shuffle(data.value);
            }

            return {
                testData, 
                shuffleData, 
                doughnutRef,
                options
            }
    }
}
</script>