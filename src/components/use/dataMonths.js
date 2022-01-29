import { ref, computed } from 'vue'


export function getLastTwelveMonths(legendaData, serachData) {
        let theMonths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        let dataMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        let now = new Date()
        console.log('12 мес', theMonths)
        console.log('сегодня', now)
        for (let i = 0; i > -12; i--) {
            let future = new Date(now.getFullYear(), now.getMonth() + i, 1)
            console.log('год', future)
            let month = theMonths[future.getMonth()]
            let dataMonth = dataMonths[future.getMonth()]
            console.log('месяц', future)
            let year = future.getFullYear()
            console.log('месяц и год', month, year)
            legendaData.value.push(month + ' ' + year)
            serachData.value.push(dataMonth + ' ' + year)
        }
}

export function getSalesSumValues(chartMonths, projects, salesVals) {
    chartMonths.forEach((item) => {
        let sum = ref(0)
         projects.forEach((proj)=>{
             // console.log('фыа', proj)
             if(proj.endDate && proj.endDate.includes(item))
             {
                 // console.log('проекты вкл', proj)
                 sum.value = sum.value + parseInt(proj.projectPayment)
                 // console.log('сумма', sum.value)
             }
         })
         salesVals.value.push(sum.value)
         console.log('массив значений', mas.value)
    })
}


