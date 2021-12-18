import { PrismicResume } from '../graphql-types';

import { defaultLanguage, prismicLanguagesMap } from './environment';

function linkResolver(doc: PrismicResume): string {
  const language = prismicLanguagesMap[doc.lang];

  if (doc.type === 'resume')
    return `${language === defaultLanguage ? '' : `/${language}`}/resumes/${doc.uid}`;
  if (doc.type === 'blog_post')
    return `${language === defaultLanguage ? '' : `/${language}`}/blog/${doc.uid}`;

  return '/';
}

export default linkResolver;
