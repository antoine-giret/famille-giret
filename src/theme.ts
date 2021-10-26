import { ThemeUIStyleObject } from '@theme-ui/css';

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
};

export const sectionTitleStyle: ThemeUIStyleObject = {
  ...titleStyle,
  fontSize: '1.5em',
  textAlign: 'center',
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
