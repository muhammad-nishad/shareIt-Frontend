import Cookies from "js-cookie"
export function userReducer(state = { refresh: false }, action) {
    state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return null;
        case 'REFRESH':
            console.log(state, 'previous');
            return { ...state, refresh: [] };
        // case 'SAVED_POST':
        //     console.log("saved post added to redux")
        //     if (!state.savedPosts.includes(action.payload)) {
        //         if (state?.savedPosts?.length) {
        //             console.log('second value')
        //             state.savedPosts = [...state?.savedPosts, action.payload]
        //         } else {
        //             state["savedPosts"] = [action.payload]
        //         }
        //     }

        //     Cookies.set("user", JSON.stringify(state))
        //     return { ...state }
        // case 'UNSAVE_POST':
        //     console.log("saved post removed to redux")
        //     let result = state?.savedPosts.filter((id) => id !== action.payload)
        //     state.savedPosts = result
        //     return { ...state }

        case 'ADD_PROFILE':
            return action.payload;
            // console.log(state,'state');


        default:
            return { ...state }
    }
}