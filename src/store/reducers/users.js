import { FETCH_USERS } from "../types/users"

const initialState = {
  users: [],
}

const user = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }

}


export default user
