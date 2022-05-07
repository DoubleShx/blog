import {
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';

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


function TeamOverview({user}) {
  const theme = useTheme();

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

        </Card>
      </Grid>


    
  );
}

export default TeamOverview;
