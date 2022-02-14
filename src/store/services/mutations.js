export function setServices (state, services) {
        services.reverse()
        state.services = services
}

export function updateServices (state, payload) {
    state.services[payload.idx] = payload.service
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


export function updateDate (state, idx) {
    const dateNow = new Date().toLocaleDateString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
    })
    state.services[idx].updateDate = dateNow
}

export function setShowConfirmationVal (state, val) {
    state.showUpdateConfirmation = val
  }
  
  export function setActiveUser (state, val) {
    state.activeUser = val
  }

// export function setCost (state, cost) {
//     state.services.serviceCost = cost
// }
// export function  updateCost (state, cost) {
//     state.services.services.servicesCost = cost
//   }