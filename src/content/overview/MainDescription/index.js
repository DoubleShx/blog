import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #fef8d8;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function MainDescription() {

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent="center" alignItems="center" container>
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Main Description
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            MINI TEST PROJECT
          </TypographyH2>
          <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
              <MuiAvatar>
                <img src="/static/images/logo/material-ui.svg" alt="Material-UI" />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}><b>Powered by Material-UI</b></Box>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <JsAvatar>
                <img src="/static/images/logo/javascript.svg" alt="javascript" />
              </JsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}><b>Built with Javascript</b></Box>
              </Typography>
            </Grid>
            <Typography component="span" variant="subtitle2"> - Also used Redux, Axios, Node-Sass, API from - https://jsonplaceholder.typicode.com/.</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainDescription;
