import { HLocation } from '@reach/router';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Index from '../templates/index';

function IndexEn({ location }: { location: HLocation }): JSX.Element {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage('en');
  }, []);

  return <Index location={location} />;
}

export default IndexEn;
