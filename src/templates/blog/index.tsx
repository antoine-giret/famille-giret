import { HLocation } from '@reach/router';
import { Box, Card, Heading, Paragraph, Text } from '@theme-ui/components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { DateTime } from 'luxon';
import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { BlogQuery } from '../../../graphql-types';
import { defaultLanguage, prismicLanguagesMap } from '../../environment';
import Layout from '../../layouts/default';
import { pageDescriptionStyle, pageTitleStyle } from '../../theme';

function Blog({ location }: { location: HLocation }): JSX.Element {
  const data = useStaticQuery<BlogQuery>(graphql`
    query Blog {
      allPrismicBlogPost {
        edges {
          node {
            uid
            lang
            first_publication_date
            data {
              title {
                text
              }
              image {
                gatsbyImageData(width: 800, placeholder: BLURRED)
              }
              author {
                document {
                  ... on PrismicResume {
                    data {
                      first_name {
                        text
                      }
                    }
                  }
                }
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

  const languageData = data.allPrismicBlogPost.edges.filter(
    ({ node: { lang } }) => prismicLanguagesMap[lang] === language,
  );

  return (
    <Layout description={`${t('blog.description')}`} location={location} title={t('blog.title')}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Heading as="h2" color="primary" sx={pageTitleStyle}>
          {t('blog.title')}
        </Heading>
        <Paragraph color="textSecondary" sx={{ ...pageDescriptionStyle, marginTop: '8px' }}>
          {t('blog.description')}
        </Paragraph>
        {languageData.length > 0 ? (
          <Box sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                justifyContent: 'flex-start',
                marginTop: 16,
              }}
            >
              {languageData
                .sort(
                  (a, b) =>
                    DateTime.fromISO(a.node.first_publication_date).valueOf() -
                    DateTime.fromISO(b.node.first_publication_date).valueOf(),
                )
                .map(
                  ({
                    node: {
                      uid,
                      first_publication_date: publicationDate,
                      data: {
                        title: { text: title },
                        image: { gatsbyImageData: image },
                        author: {
                          document: {
                            data: {
                              first_name: { text: author },
                            },
                          },
                        },
                      },
                    },
                  }) => (
                    <Box
                      key={uid}
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        width: ['100%', 'calc((100% - 16px) / 2)', 'calc((100% - 32px) / 3)'],
                      }}
                    >
                      <Link
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        to={
                          language === defaultLanguage ? `/blog/${uid}` : `/${language}/blog/${uid}`
                        }
                      >
                        <Card
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                            borderRadius: 4,
                            width: '100%',
                            ':hover': {
                              borderColor: '#ccc',
                            },
                          }}
                        >
                          <GatsbyImage
                            alt={title}
                            image={image}
                            imgStyle={{ borderRadius: '4px 4px 0 0' }}
                          />
                          <Box sx={{ padding: '16px' }}>
                            <Heading as="h6" sx={{ fontSize: '1em' }}>
                              {title}
                            </Heading>
                            <Text color="textSecondary" sx={{ fontSize: '0.8em', marginTop: 4 }}>
                              <Trans
                                components={[<span key={0} />]}
                                i18nKey="blog.published_by_on"
                                values={{
                                  author,
                                  date: DateTime.fromISO(publicationDate)
                                    .setLocale(language)
                                    .toLocaleString(DateTime.DATE_MED),
                                }}
                              />
                            </Text>
                          </Box>
                        </Card>
                      </Link>
                    </Box>
                  ),
                )}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="96px"
              viewBox="0 0 24 24"
              width="96px"
              fill="var(--theme-ui-colors-textSecondary)"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <circle cx="15.5" cy="9.5" r="1.5" />
              <circle cx="8.5" cy="9.5" r="1.5" />
              <path d="M12 14c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5zm-.01-12C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
            <Text
              color="textSecondary"
              sx={{ fontSize: '1em', maxWidth: '80ch', textAlign: 'center' }}
            >
              {t('blog.empty_list')}
            </Text>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default Blog;
