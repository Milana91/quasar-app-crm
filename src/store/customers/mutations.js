export function setCustomers (state, customers) {
        customers.reverse()
        state.customers = customers
}

export function updateCustomers (state, payload) {
    state.customers[payload.idx] = payload.customer
}

export function addCustomer (state, customer) {
    state.customers.push(customer)
}

export function udateTotalСost (state, totalSum) {
    state.totalCost = totalSum
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

export function setShowConfirmationVal (state, val) {
    state.showUpdateConfirmation = val
}
  
export function setActiveUser (state, val) {
    state.activeUser = val
}