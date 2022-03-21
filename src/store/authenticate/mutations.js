export function setToken (state, idToken) {
        state.token = idToken
        localStorage.setItem('jwt-token', idToken)
        console.log(state.token)
}

export function setUid (state, userUid) {
        state.currentUid =  userUid
}

export function removeToken(state) {
        state.token = null
        localStorage.removeItem('jwt-token')    
}

export function loadingActive(state) {
        state.loading = true
}

export function loaded(state) {
        state.loading = null
}
