import theme from '@theme-ui/preset-roboto';

export default {
  ...theme,
  colors: {
    text: '#212121',
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
};
