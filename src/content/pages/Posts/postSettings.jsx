import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { httpPut } from 'src/api';
import { setPosts } from 'src/store/actions/posts';
import { setUsers } from 'src/store/actions/users';

export const PostSettings = ({
  post,
  users,
  allPosts,
  closeAccordion,
  type = 'post'
}) => {
  const [userName, setUserName] = useState(post.user_name || post.name);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserName = () => {
    httpPut({
      url: `/users/${post.userId || post.id}`,
      params: {
        name: userName
      }
    })
      .then((res) => {
        let idx = users.findIndex((user) => {
          return type === 'post'
            ? user.id === post.userId
            : user.id === post.id;
        });
        let newArrayOfUsers = [
          ...users.slice(0, idx),
          { ...users[idx], name: userName },
          ...users.slice(idx + 1)
        ];
        let newArrayOfPosts = allPosts.reduce((prevItem, item) => {
          if (item.userId === post.userId) {
            return [...prevItem, { ...item, user_name: userName }];
          } else {
            return [...prevItem, item];
          }
        }, []);
        dispatch(setUsers(newArrayOfUsers));
        dispatch(setPosts(newArrayOfPosts));
        closeAccordion();
      })
      .catch((err) => {
        console.log(err);
        closeAccordion();
      });
  };

  return (
    <Grid>
      <TextField
        size="small"
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        value={userName}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        size="medium"
        onClick={handleChangeUserName}
        disabled={
          (post.user_name === userName && type === 'post') ||
          post.name === userName
        }
      >
        Submit
      </Button>
    </Grid>
  );
};
