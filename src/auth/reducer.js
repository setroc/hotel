const initialSate = {
    logged: false,
    role: null
}
export const AuthReducer = (state=initialSate, action) => {
    switch (action.type) {
        case "login":
            return {
                logged: true,
                ...action.payload,
            }
        case "logout":
            return {
                logged: false
            }
        default:
            return state
    }

}