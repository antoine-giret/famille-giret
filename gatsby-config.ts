import linkResolver from './src/link-resolver';

export = {
  siteMetadata: {
    title: 'Famille Giret',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        linkResolver: () => linkResolver,
        fetchLinks: [],
        htmlSerializer:
          ({ node, key, value }) =>
          (type, element, content, children) => {
            //
          },
        schemas: {
          resume: require('./src/prismic-types/resume.json'),
        },
        lang: '*',
        shouldDownloadImage: ({ node, key, value }) => {
          //
        },
        imageImgixParams: {
          auto: 'compress,format',
          fit: 'max',
          q: 50,
        },
        imagePlaceholderImgixParams: {
          w: 100,
          blur: 15,
          q: 50,
        },
      },
    },
  ],
};
