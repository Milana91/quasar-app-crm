export const tableColumnsUsers = [
    { 
        name: 'name', 
        align: 'left', 
        label: 'Имя пользователя', 
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
        sortOrder: 'ad'
     },
    { 
        name: 'email', 
        align: 'left', 
        label: 'Email', 
        field: row => row.email,
        format: val => `${val}`,
        sortable: true,
        sortOrder: 'ad'
    },
    { 
        name: 'role', 
        align: 'left', 
        label: 'Права пользователя', 
        field: row => row.role,
        format: val => `${val}`,
        sortable: true,
        sortOrder: 'ad'
    },
    { 
        name: 'actions',
        align: 'center', 
        label: 'Действия', 
        field: 'actions',
        sortable: true 
    }
]