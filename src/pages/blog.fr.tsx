import { HLocation } from '@reach/router';
import React from 'react';

import useLanguage from '../hooks/language';
import Blog from '../templates/blog';

function BlogFr({ location }: { location: HLocation }): JSX.Element {
  useLanguage('fr');

  return <Blog location={location} />;
}

export default BlogFr;
