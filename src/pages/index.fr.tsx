import { HLocation } from '@reach/router';
import React from 'react';

import useLanguage from '../hooks/language';
import Index from '../templates/index';

function IndexFr({ location }: { location: HLocation }): JSX.Element {
  useLanguage('fr');

  return <Index location={location} />;
}

export default IndexFr;
