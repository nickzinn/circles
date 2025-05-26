import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'typeface-electrolize/index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
 typography: {
    fontFamily: 'Electrolize',
  },
  components: {
    MuiCssBaseline: {
    },
  },
});

theme.typography.h5 = {
  fontSize: '18px',
  '@media (min-width:600px)': {
    fontSize: '22px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '28px',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> 
    <App />
  </ThemeProvider>
);
