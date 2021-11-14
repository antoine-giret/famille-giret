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
    textSecondary: '#616161',
    background: '#fff',
    primary: '#009688',
    secondary: '#bf360c',
  },
  buttons: {
    icon: {
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      '&:hover': {
        bg: 'rgba(0, 0, 0, 0.1)',
      },
      '&:active': {
        bg: 'rgba(0, 0, 0, 0.2)',
      },
    },
    menu: {
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      '&:hover': {
        bg: 'rgba(0, 0, 0, 0.1)',
      },
      '&:active': {
        bg: 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
};
