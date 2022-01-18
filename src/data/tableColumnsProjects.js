export const tableColumnsProjects = [
    { 
        name: 'customer', 
        align: 'left', 
        label: 'Клиент', 
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
        sortOrder: 'ad'
     },
    { 
        name: 'services', 
        style: 'width: 250px; max-height: 300px; white-space: normal; overflow: hidden', 
        align: 'left', 
        label: 'Услуги', 
        field: 'services',
        sortable: true,
        sortOrder: 'ad'
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
        sortOrder: 'ad'
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
        sortable: true 
    }
]