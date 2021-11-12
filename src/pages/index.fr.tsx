import { HLocation } from '@reach/router';
import * as React from 'react';

import Index from '../templates/index';

function IndexFr({ location }: { location: HLocation }): JSX.Element {
  return <Index location={location} />;
}

export default IndexFr;
