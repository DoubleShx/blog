import { FETCH_USERS, SET_USERS } from "../types/users"

const initialState = {
  users: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload }
    case SET_USERS: 
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}


export default user
