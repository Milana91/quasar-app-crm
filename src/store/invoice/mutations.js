export function setCompany (state, company) {
        state.company = company
}

export function setProjectServices (state, projectServices) {
    state.projectServices = projectServices
    console.log('услуги проекта', state.projectServices)
}

export function setNumberOfInvoice (state, invoiceNumber) {
    state.invoiceNumber = invoiceNumber
}
