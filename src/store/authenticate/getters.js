export function token (state) {
    return state.token
}


export function isAuthenticated (_, getters) {
    return !!getters.token
}

