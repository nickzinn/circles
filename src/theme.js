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

export default theme;