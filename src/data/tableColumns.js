export const tableColumns = [
    { 
        name: 'title', 
        align: 'left', 
        label: 'Название услуги', 
        field: 'title',
        sortable: true,
        sortOrder: 'ad'
     },
    { 
        name: 'cost', 
        align: 'left', 
        label: 'Цена', 
        field: 'cost',
        sortable: true
    },
    { 
        name: 'dateCreate', 
        align: 'left',
        label: 'Дата создания', 
        field: 'dateCreate',
        sortable: true
    },
    { 
        name: 'dateUpdate', 
        align: 'left',
        label: 'Дата обновления', 
        field: 'dateUpdate',
        sortable: true
    },
    { 
        name: 'numberOrders', 
        align: 'center',
        label: 'Количество заказов', 
        field: 'numberOrders',
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