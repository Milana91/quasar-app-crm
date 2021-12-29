export function setServices (state, services) {
        state.services = services
}

export function addService (state, service) {
    state.services.push(service)
}

export function udateNumberOrders (state, numberOrders) {
    state.numberOrders = numberOrders
}

export function setCreationDate (state, creationDate) {
    state.creationDate = creationDate
}

export function setUpdateDate (state, updateDate) {
    state.updateDate = updateDate
}

// export function setCost (state, cost) {
//     state.services.serviceCost = cost
// }
// export function  updateCost (state, cost) {
//     state.services.services.servicesCost = cost
//   }