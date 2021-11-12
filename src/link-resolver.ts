import { PrismicResume } from '../graphql-types';

import { defaultLanguage, prismicLanguagesMap } from './languages';

function linkResolver(doc: PrismicResume): string {
  const language = prismicLanguagesMap[doc.lang];

  if (doc.type === 'resume')
    return `${language === defaultLanguage ? '' : `/${language}`}/resume/${doc.uid}`;

  return '/';
}

export default linkResolver;
