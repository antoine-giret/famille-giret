import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TLanguage } from '../environment';

function useLanguage(key: TLanguage): void {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(key);
  }, []);
}

export default useLanguage;
