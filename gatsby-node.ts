import { resolve } from 'path';
import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql<{ allPrismicResume: { nodes: Array<{ uid: string }> } }>(`
    {
      allPrismicResume {
        nodes {
          uid
        }
      }
    }
  `);

  pages.data.allPrismicResume.nodes.forEach(({ uid }) => {
    createPage({
      path: `resume/${uid}`,
      component: resolve(__dirname, 'src/templates/resume.tsx'),
      context: { uid },
    });
  });
};
