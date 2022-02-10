export const tableColumnsProjects = [
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
]