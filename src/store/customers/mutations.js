export function setCustomers (state, customers) {
        state.customers = customers
}

export function updateCustomers (state, payload) {
    state.customers[payload.idx] = payload.customer
}

export function addCustomer (state, customer) {
    state.customers.push(customer)
}

export function udateTotalСost (state, totalSum) {
    state.totalСost = totalSum
}

export function setCreationDate (state, creationDate) {
    state.creationDate = creationDate
}

export function setUpdateDate (state, updateDate) {
    state.updateDate = updateDate
}


export function updateDate (state, idx) {
    const dateNow = new Date().toLocaleDateString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
    })
    state.customers[idx].updateDate = dateNow
}
