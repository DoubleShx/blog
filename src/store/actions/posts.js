import { httpGet } from 'src/api'
import { FETCH_POSTS, SET_POSTS } from '../types/posts'

export const fetchPosts = (users=[]) => async dispatch => {
  await httpGet({
    url: `/posts`
  })
    .then(res => {
      let posts = res.data.reduce((prevPost, post) => {
        let user_info
        if (post.userId !== prevPost.userId) {
        user_info = users.filter((user) => user.id === post.userId)[0]
        }
        else {
        user_info = prevPost.user_info
        }
        return [
          ...prevPost,
          {
          ...post,
          user_info,
          user_name: user_info?.name,
          user_address: `${user_info?.address?.city} ${user_info?.address?.street}`
          }
        ];
      }, []);
      dispatch({
        type: FETCH_POSTS,
        payload: posts || []
      })
    })
    .catch(e => console.log(e))
}

export const setPosts = (posts) => dispatch => {
  dispatch({
    type: SET_POSTS,
    payload: posts || []
  })
}


