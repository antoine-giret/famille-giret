import { HLocation } from '@reach/router';
import { Box, Heading, Paragraph } from '@theme-ui/components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { IndexQuery } from '../../../graphql-types';
import { appTitle, defaultLanguage, prismicLanguagesMap } from '../../environment';
import Layout from '../../layouts/default';
import { headerTitleStyle, pageDescriptionStyle, pageTitleStyle } from '../../theme';

function Index({ location }: { location: HLocation }): JSX.Element {
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allPrismicResume {
        edges {
          node {
            uid
            lang
            data {
              thumbnail {
                gatsbyImageData(width: 96, placeholder: BLURRED)
              }
              is_draft
              first_name {
                text
              }
              resume {
                html
              }
            }
          }
        }
      }
    }
  `);
  const {
    i18n: { language },
    t,
  } = useTranslation();

  return (
    <Layout
      description={`Hello World ! ${t('home.baseline')}`}
      location={location}
      title={appTitle}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Heading as="h2" color="primary" sx={pageTitleStyle}>
          Hello World !
        </Heading>
        <Paragraph color="textSecondary" sx={{ ...pageDescriptionStyle, marginTop: '8px' }}>
          {t('home.baseline')}
        </Paragraph>
        <Box sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
            }}
          >
            {data.allPrismicResume.edges
              .filter(({ node: { lang } }) => prismicLanguagesMap[lang] === language)
              .map(
                ({
                  node: {
                    uid,
                    data: {
                      is_draft,
                      thumbnail: { gatsbyImageData: thumbnail },
                      first_name: { text: firstName },
                      resume: { html: resume },
                    },
                  },
                }) => (
                  <Box
                    key={uid}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      width: ['100%', 'calc((100% - 16px) / 2)', 'calc((100% - 16px) / 2)'],
                    }}
                  >
                    <GatsbyImage
                      alt={`Photo of ${firstName}`}
                      image={thumbnail}
                      style={{ borderRadius: '50%', height: 96, marginBottom: 16, width: 96 }}
                    />
                    <Heading as="h3" sx={headerTitleStyle}>
                      {firstName}
                    </Heading>
                    <Box
                      color="textSecondary"
                      dangerouslySetInnerHTML={{
                        __html: is_draft ? `<p>${t('resume.draft')}</p>` : resume,
                      }}
                      sx={{ ...pageDescriptionStyle, marginTop: 16 }}
                    />
                    <Link
                      className="secondary-button"
                      style={{ marginTop: 16 }}
                      to={`${language === defaultLanguage ? '' : `/${language}`}/resumes/${uid}`}
                    >
                      {t('home.actions.see_resume')}
                    </Link>
                  </Box>
                ),
              )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Index;
