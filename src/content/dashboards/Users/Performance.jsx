import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { useEffect, useState } from 'react';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
    
    .MuiCardHeader-title {
      color: ${theme.colors.alpha.white[100]};
    }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        margin-right: ${theme.spacing(1)};
        height: 1px;
        background-color: ${theme.colors.error.main};

        .MuiLinearProgress-barColorPrimary {
          background-color: ${theme.colors.alpha.white[100]};
          border-top-right-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

function Performance({ users }) {
  const [addresses, setAddresses] = useState({
    suite: 0,
    apt: 0,
    otherAddress: 0
  });
  useEffect(() => {
    setAddresses(getAddreses(users));
  }, [users]);

  const getAddreses = (users = users) => {
    return users.reduce(
      (prevItem, item) => {
        if (item.address.suite.toUpperCase().includes('APT')) {
          console.log(prevItem);
          return { ...prevItem, apt: prevItem.apt + 1 };
        } else if (item.address.suite.toUpperCase().includes('SUITE')) {
          return { ...prevItem, suite: prevItem.suite + 1 };
        }
        return { ...prevItem, otherAddress: prevItem.otherAddress + 1 };
      },
      { suite: 0, apt: 0, otherAddress: 0 }
    );
  };
  return (
    <RootWrapper sx={{ p: 1 }}>
      <CardHeader
        title="Performance"
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Box display="flex" sx={{ px: 0, pb: 0 }} alignItems="center">
          <AvatarSuccess sx={{ mr: 1 }} variant="rounded">
            <AssignmentTurnedInTwoToneIcon fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography variant="h1">{addresses.apt}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Apt Addresses count
            </TypographySecondary>
          </Box>
        </Box>
        <Box display="flex" sx={{ px: 0, pb: 0 }} alignItems="center">
          <AvatarError sx={{ mr: 1 }} variant="rounded">
            <CancelPresentationTwoToneIcon fontSize="large" />
          </AvatarError>
          <Box>
            <Typography variant="h1">{addresses.suite}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Suite Addresses count
            </TypographySecondary>
          </Box>
        </Box>
        <Box pt={3}>
          <LinearProgressWrapper
            value={73}
            color="primary"
            variant="determinate"
          />
        </Box>
      </CardContent>
    </RootWrapper>
  );
}

export default Performance;
