import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';


export const SkeletonWrapper = styled(Skeleton)(
    ({ theme }) => `
          margin-right: ${theme.spacing(1)};
          margin-bottom: ${theme.spacing(1)};
  `
  );