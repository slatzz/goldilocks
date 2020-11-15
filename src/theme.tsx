import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Montserrat', 'sans-serif'";

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
  typography: {
    fontFamily: font,
    h3: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
      lineHeight: 1.65,
    },
    subtitle1: {
      lineHeight: 1.25,
    },
    overline: {
      color: 'black',
      lineHeight: 0.25,
    },
  },
});

export default theme;
