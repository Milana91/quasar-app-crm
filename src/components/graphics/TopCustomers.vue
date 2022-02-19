<template>
    <div style="width: 500px">
        <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
    </div>
</template>  
<script>
import { computed, ref, onMounted } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables  } from 'chart.js'
import { useStore } from 'vuex'
Chart.register(...registerables);


export default {
    components: { DoughnutChart  },
    setup(props) {
            const getStoreCustomers = computed(()=>store.state.customers.customers)
            const customers = ref([])
            const totalVals = ref([])
            const data = ref([30, 40, 60, 70, 5])
            const doughnutRef = ref()
            const store = useStore()
            
            const compareSum = (a, b) => {
                if (a > b) return -1
                if (a == b) return 0
                if (a < b) return 1
            }

            const getCustomers = () => {
                // console.log("суммы1", totalVals.value.sort(compareSum))
                    totalVals.value.forEach((sum)=>{
                        getStoreCustomers.value.forEach((item)=>{
                            if( sum == item.totalCost){
                                console.log("клиенты оплаты", item, item.totalCost, sum)
                                customers.value.push(item.customerName)
                                console.log("клиенты", customers.value)
                            }
                        })
                    })
            }


            const getVals = () => {
                getStoreCustomers.value.forEach((item)=>{
                    totalVals.value.push(item.totalCost)
                })
                // console.log('значения', totalVals.value)
                totalVals.value.sort(compareSum)
                totalVals.value.splice(5, (totalVals.value.length - 5))
                // console.log('сортировка', totalVals.value)
            }

            onMounted(async()=>{
                await store.dispatch('customers/loadCustomers')
                getVals()
                getCustomers()
                console.log('все значения', totalVals.value)
                data.value = totalVals.value
            })

            const options = ref({
            responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 13
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Топ 5 клиентов',
                        padding: 35,
                        font: {
                            size: 21
                        }
                    },
                },
            });

            const testData = computed(() => ({
            labels: customers.value,
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
            }))

            return {
                testData, 
                doughnutRef,
                options
            }
    }
}
</script>