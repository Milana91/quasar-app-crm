export const tableColumnsCustomers = [
    { 
        name: 'name', 
        align: 'left', 
        style: 'max-width: 90px; white-space: normal; overflow: hidden', 
        label: 'ФИО', 
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
     },
    { 
        name: 'email', 
        style: 'min-width: 150px; max-width: 190px; white-space: normal; overflow: hidden', 
        align: 'left', 
        label: 'Email', 
        field: 'email',
        sortable: true,
    },
    { 
        name: 'phone', 
        align: 'left', 
        label: 'Телефон', 
        field: 'phone',
        sortable: true,
    },
    { 
        name: 'company', 
        align: 'left', 
        style: 'min-width: 150px; max-width: 150px; white-space: normal; overflow: hidden', 
        label: 'Компания', 
        field: 'company',
        sortable: true,
    },
    { 
        name: 'comment',
        style: 'min-width: 200px; max-width: 200px; max-height: 300px; white-space: normal; overflow: hidden', 
        align: 'left',
        label: 'Комментарий*', 
        field: 'comment', 
        sortable: true
    },
    { 
        name: 'totalCost', 
        align: 'center',
        label: 'Стоимость услуг', 
        field: 'totalCost',
        sortable: true 
    },
    { 
        name: 'status', 
        align: 'center',
        label: 'Активность', 
        field: 'status',
        sortable: true 
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
    }
]