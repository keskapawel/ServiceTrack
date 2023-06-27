import { createTheme, Theme } from '@mui/material/styles';
import { Link } from 'components/common/Link';

import { fontFamily, fontSize, fontWeight } from './font';
import { palette } from './palette';

export const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    // add theme colors below
    primary: {
      main: palette.baseColor,
      dark: palette.baseColorHover,
      light: palette.baseColorHover,
      contrastText: palette.white,
    },
    secondary: {
      main: palette.baseColor,
      contrastText: palette.white,
    },
    // background: {},
    text: {
      primary: palette.baseColor,
      secondary: palette.lockedTextAndPlaceholder,
      disabled: palette.baseColor,
      // label: palette.lockedTextAndPlaceholder,
    },
    error: {
      main: palette.red,
    },
    warning: {
      main: palette.orange,
    },
    info: {
      main: palette.baseColor,
    },
    success: {
      main: palette.green,
    },
    action: {
      active: palette.baseColor,
      disabled: palette.lockedTextAndPlaceholder,
    },
    common: {
      black: palette.black,
      white: palette.white,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily,
    fontWeightLight: fontWeight.light,
    fontWeightRegular: fontWeight.regular,
    fontWeightMedium: fontWeight.medium,
    fontWeightBold: fontWeight.bold,
    // add text typography sizes below
    h1: { fontSize: fontSize[26], lineHeight: fontSize[32], fontWeight: 500 },
    h2: { fontSize: fontSize[22], lineHeight: fontSize[28], fontWeight: 500 },
    h3: { fontSize: fontSize[18], lineHeight: fontSize[22], fontWeight: 500 },
    body1: { fontSize: fontSize[14], lineHeight: fontSize[20], fontWeight: 500 },
    body2: { fontSize: fontSize[12], lineHeight: fontSize[16], fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'span',
          body2: 'span',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {
            /* variant: 'highlighted' */
          },
          style: {},
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outlineOffset: '2px',
            outline: `2px solid ${palette.blue}`,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outlineOffset: '2px',
            outline: `2px solid ${palette.blue}`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outlineOffset: '2px',
            outline: `2px solid ${palette.blue}`,
          },
        },
      },
    },
  },
});
