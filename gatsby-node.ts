import { resolve } from 'path';

import { GatsbyNode } from 'gatsby';

import { defaultLanguage, prismicLanguagesMap } from './src/environment';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql<{
    allPrismicResume: { nodes: Array<{ uid: string; lang: string }> };
  }>(`
    {
      allPrismicResume {
        nodes {
          uid
          lang
        }
      }
    }
  `);

  pages.data?.allPrismicResume.nodes.forEach(({ uid, lang }) => {
    const language = prismicLanguagesMap[lang];

    createPage({
      path: language === defaultLanguage ? `resume/${uid}` : `${language}/resume/${uid}`,
      component: resolve(__dirname, 'src/templates/resume/index.tsx'),
      context: { uid, lang },
    });
  });
};
