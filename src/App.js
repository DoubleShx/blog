import { useRoutes } from 'react-router-dom';
import routes from './router.jsx';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
        <CssBaseline />
        {content}
    </ThemeProvider>
  );
}
export default App;
