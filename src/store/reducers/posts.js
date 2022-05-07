import { FETCH_POSTS } from "../types/posts"

const initialState = {
  posts: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload}
    default:
      return state
  }

}


export default user
