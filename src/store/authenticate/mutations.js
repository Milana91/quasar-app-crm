export function setToken (state, idToken) {
        state.token = idToken
        localStorage.setItem('jwt-token', idToken)
        console.log(state.token)
}

export function removeToken(state) {
        state.token = null
        localStorage.removeItem('jwt-token')    
}