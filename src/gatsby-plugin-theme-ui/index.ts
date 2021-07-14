import theme from '@theme-ui/preset-roboto';

export default {
  ...theme,
  breakpoints: [
    '@media (min-width: 600px)',
    '@media (min-width: 960px)',
    '@media (min-width: 1200px)',
  ],
  colors: {
    text: '#212121',
    textSecondary: '#757575',
    background: '#fff',
    primary: '#009688',
    secondary: '#ffC107',
  },
  styles: {
    ...theme.styles,
    root: {
      ...theme.styles.root,
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },
  buttons: {
    menu: {
      cursor: 'pointer',
      '&:hover': {
        bg: 'rgba(0, 0, 0, 0.1)',
      },
      '&:active': {
        bg: 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
};
