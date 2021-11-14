import { HLocation } from '@reach/router';
import React from 'react';

import useLanguage from '../hooks/language';
import Index from '../templates/index';

function IndexEn({ location }: { location: HLocation }): JSX.Element {
  useLanguage('en');

  return <Index location={location} />;
}

export default IndexEn;
