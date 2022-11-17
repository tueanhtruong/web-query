import { createMuiTheme as createTheme } from '@material-ui/core/styles';
import { COLOR_CODE } from './constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_CODE.PRIMARY,
    },
    secondary: {
      main: COLOR_CODE.PRIMARY,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#484C4F',
        fontSize: 14,
        padding: '8px 12px',
      },
    },
  },
});

export const muiResponsive = {
  MOBILE: '(max-width:600px)',
  MEDIUM_SCREEN: '(max-width:900px)',
  TABLET_SCREEN: '(max-width:960px)',
  LARGE_SCREEN: '(max-width:1200px)',
  EXTRA_LARGE_SCREEN: '(max-width:1440px)',
};
