import {
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  CardActions,
  Collapse,
  CardContent,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

import { styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';
import { PostSettings } from 'src/content/pages/Posts/postSettings';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

function TeamOverview({ user, users }) {
  const [expanded, setExpanded] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 2.5 }}>
        <Box display="flex" alignItems="center" pb={3}>
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            overlap="circular"
            badgeContent={
              <Tooltip
                arrow
                placement="top"
                title={
                  'Offline since ' +
                  formatDistance(subDays(new Date(), 14), new Date(), {
                    addSuffix: true
                  })
                }
              >
                <DotLegend
                  style={{ background: `${theme.colors.error.main}` }}
                />
              </Tooltip>
            }
          >
            <AvatarWrapper
              alt={user.name}
              src={`https://picsum.photos/500/300?user=${user.id}`}
            />
          </Badge>
          <Box sx={{ ml: 1.5 }}>
            <Typography variant="h4" noWrap gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {user.phone}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          {user.company.bs}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <SettingsIcon onClick={() => handleExpandClick()} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <PostSettings
              post={user}
              users={users}
              allPosts={posts}
              type="user"
              closeAccordion={() => setExpanded(false)}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default TeamOverview;
