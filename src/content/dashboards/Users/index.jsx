import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import TeamOverview from './TeamOverview';
import Performance from './Performance';
import { SkeletonWrapper } from 'src/components/skeleton/skeletonWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'src/store/actions/users';

function Users() {
  const dispatch = useDispatch()
  const { users }  = useSelector(state => state.users)

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers())
    }      
  }, []);
  
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}></Grid>
          {users.length ? (
            <>
              <Grid container item xs={12} sm={6} md={4} spacing={1}>
                <PageTitleWrapper>
                  <PageHeader />
                </PageTitleWrapper>
              </Grid>
              <Grid container item xs={12} sm={6} md={4} spacing={1}>
                <Performance users={users} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {users.map((user) => {
                    return <TeamOverview key={user.id} user={user} users={users}/>;
                  })}
                </Grid>
              </Grid>
            </>
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
    </div>
  );
}

export default Users;
