// // Форматировать дату дедлайна 
// const formatDate = (date) => {
//     const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
//     const arr = date.split(" ")
//     const month = arr[1]
//     const day = arr[0]
//     const year = arr[2]
//     const idxMonth = months.findIndex(item => item == month)
//     const formDate = [year, idxMonth, day].join(', ')

//     // console.log("новая дата", formDate)
//     const d = new Date(year, idxMonth, day)
//     return d
//   }


// const date1 = new Date(formatDate(start))


export const tableColumnsProjects = [
    { 
        name: 'customer', 
        align: 'left', 
        label: 'Клиент', 
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
        // sort: (a, b, rowA, rowB) => a > b,
        // sortOrder: 'ad'
     },
    { 
        name: 'services', 
        style: 'width: 250px; max-height: 300px; white-space: normal; overflow: hidden', 
        align: 'left', 
        label: 'Услуги', 
        field: 'services',
        // sortable: true,
        // sortOrder: 'ad'
    },
    { 
        name: 'comment',
        style: 'width: 250px; max-height: 300px; white-space: normal; overflow: hidden', 
        align: 'left',
        label: 'Комментарий*', 
        field: 'comment',
        sortable: true 
    },
    { 
        name: 'status', 
        align: 'left', 
        label: 'Статус', 
        field: 'status',
        sortable: true,
    },
    { 
        name: 'projectSum', 
        align: 'center',
        label: 'Стоимость', 
        field: 'projectSum',
        sortable: true 
    },
    { 
        name: 'payment', 
        align: 'center',
        label: 'Оплачено', 
        field: 'payment',
        sortable: true 
    },
    { 
        name: 'paymentStatus', 
        align: 'left',
        label: 'Статус оплаты', 
        field: 'paymentStatus',
        sortable: true
    },
    { 
        name: 'deadline', 
        align: 'left',
        label: 'Дедлайн', 
        field: 'deadline',
        sortable: true,
        // sortOrder: 'da'
    },
    { 
        name: 'dateCreate', 
        align: 'left',
        label: 'Создан', 
        field: 'dateCreate',
        sortable: true
    },
    { 
        name: 'dateUpdate', 
        align: 'left',
        label: 'Обновлен', 
        field: 'dateUpdate',
        sortable: true
    },
    { 
        name: 'actions',
        align: 'center', 
        label: 'Действия', 
        field: 'actions',
        // sortable: true 
    }
]