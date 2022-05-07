import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Pagination
} from '@mui/material';
import Footer from 'src/components/Footer';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { httpGet } from 'src/api';
import { SkeletonWrapper } from 'src/components/skeleton/skeletonWrapper';
import { PostSettings } from './postSettings';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

function Cards() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  useEffect(() => {
    getUsersAndPosts();
  }, []);

  const getPosts = (users) => {
    httpGet({ url: '/posts' })
      .then((res) => {
        let posts = res.data.map((post) => {
          let user_info = users.filter((user) => user.id === post.userId)[0]
          return {
            ...post,
            user_name: user_info?.name,
            user_address: `${user_info?.address?.city} ${user_info?.address?.street}`
          };
        });
        setPosts(posts);
        const start = (page - 1) * perPage;
        setPaginatedPosts([...posts.slice(start, start + perPage)]);
      })
      .catch((err) => console.log(err));
  };

  const getUsersAndPosts = () => {
    httpGet({ url: '/users' })
      .then((res) => {
        let fetchedUsers = res.data;
        setUsers(fetchedUsers);
        getPosts(fetchedUsers);
      })
      .catch((err) => console.log(err));
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (post) => {
    setExpanded((expanded) => (expanded !== post.id ? post.id : false));
  };

  const handlePaginate = (e, value) => {
    if (value !== page && value) {
      const start = (value - 1) * perPage;
      setPage(value);
      setPaginatedPosts([...posts.slice(start, start + perPage)]);
    }
  };
  console.log(posts, 'posts', 'users', users);
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Posts"
          subHeading="Posts with editable user name"
          docs="https://material-ui.com/components/cards/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {posts.length ? (
            <Grid container spacing={3}>
              {' '}
              {paginatedPosts.map((post) => (
                <Grid key={post.id} item sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                            >
                              R
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={post.user_name}
                          subheader={post.user_address}
                        />
                        <CardMedia
                          sx={{
                            height: 0,
                            paddingTop: '56.25%' // 16:9
                          }}
                          image={`https://picsum.photos/500/300?random=${post.id}`}
                          title="random image"
                        ></CardMedia>
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {post.title}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                          <ExpandMore
                            expand={expanded === post.id}
                            onClick={() => handleExpandClick(post)}
                            aria-expanded={expanded === post.id}
                            aria-label="show more"
                          >
                            <SettingsIcon />
                          </ExpandMore>
                        </CardActions>
                        <Collapse
                          in={expanded === post.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent>
                            <PostSettings post={post} />
                          </CardContent>
                        </Collapse>
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Pagination
                count={Math.ceil(posts.length / 9 - 1)}
                color="primary"
                page={page}
                onChange={handlePaginate}
              />
            </Grid>
          ) : (
            [...Array(20)].map((item, index) => {
              return (
                <SkeletonWrapper
                  key={index}
                  variant="rectangular"
                  width={`30%`}
                  height={150}
                />
              );
            })
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Cards;
