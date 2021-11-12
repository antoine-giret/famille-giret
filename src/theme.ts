import { ThemeUIStyleObject } from '@theme-ui/css';
import { CSSProperties } from 'react';

const titleStyle: ThemeUIStyleObject = {
  fontFamily: 'Roboto Condensed',
};

export const headerTitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '1.5em',
};

export const pageTitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '2em',
};

export const pageDescriptionStyle: ThemeUIStyleObject = {
  fontSize: '1em',
  maxWidth: '100%',
  textAlign: 'center',
  width: 800,
  '> p': {
    margin: 0,
    '&:not(:first-of-type)': {
      marginTop: 16,
    },
  },
};

export const sectionTitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '1.5em',
  textAlign: 'center',
};

export const listSubheaderStyle: ThemeUIStyleObject = {
  fontSize: '1em',
};

export const listItemTitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '1.2em',
};

export const listItemSubtitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '1.1em',
};

export const listItemSubheaderStyle: ThemeUIStyleObject = {
  fontSize: '1em',
};

export const listItemTextStyle: ThemeUIStyleObject = {
  fontSize: '0.9em',
};

export const linkStyle: CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
};
