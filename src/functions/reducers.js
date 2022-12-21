export function postsReducer(state, action) {
  switch (action.type) {
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "NEW_POST":
      return {
        ...state,
        loading: false,
        posts: [action.payload,...state.posts],
        error: "",
      };
      // case "SAVED_POST":
      //   return{
      //     ...state,
      //     loading :false,
      //     posts:action.payload,
      //     error:"",
      //   }
    default:
      return state;
  }
}