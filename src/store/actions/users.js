import { httpGet } from 'src/api'
import { FETCH_USERS } from '../types/users'

export const fetchUsers = (type = 'users') => async dispatch => {
  await httpGet({
    url: `/users`
  })
    .then(res => {
      dispatch({
        type: FETCH_USERS,
        payload: res.data || []
      })
    })
    .catch(e => console.log(e))
}


