import { HLocation } from '@reach/router';
import React from 'react';

import useLanguage from '../hooks/language';
import Blog from '../templates/blog';

function BlogEn({ location }: { location: HLocation }): JSX.Element {
  useLanguage('en');

  return <Blog location={location} />;
}

export default BlogEn;
