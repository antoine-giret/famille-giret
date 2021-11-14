import { appTitle, defaultLanguage } from './src/environment';
import linkResolver from './src/link-resolver';

export = {
  siteMetadata: {
    siteUrl: process.env.FRONTEND_HOST,
    title: appTitle,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        linkResolver: () => linkResolver,
        schemas: {
          resume: require('./src/prismic-types/resume.json'),
        },
        lang: '*',
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
    'gatsby-plugin-graphql-codegen',
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: defaultLanguage,
        useLangKeyLayout: false,
        prefixDefault: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.FRONTEND_HOST,
        sitemap: `${process.env.FRONTEND_HOST}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
};
