import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Electrolize',
  },
    overrides: {

        MuiCssBaseline: {
          '@global': {
            body: {
                width: '100%',
                height: '100%',
                margin: '0',
            }
          },
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

export default theme;