export function adminReducer(state, action) {
    state = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null
    console.log(state, 'stateinadmn');
    switch (action.type) {
        case "ADMIN_LOGIN":
            return action.payload

        default:
            return { ...state }
    }
}