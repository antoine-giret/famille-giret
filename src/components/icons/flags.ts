import { TLanguage } from '../../environment';

import EnFlagIcon from './en-flag';
import FrFlagIcon from './fr-flag';

export const flagIconsMap: { [key in TLanguage]: () => JSX.Element } = {
  fr: FrFlagIcon,
  en: EnFlagIcon,
} as const;
