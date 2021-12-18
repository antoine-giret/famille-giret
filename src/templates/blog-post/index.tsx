import { HLocation } from '@reach/router';
import { Box, Heading, Text } from '@theme-ui/components';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { BlogPostQuery } from '../../../graphql-types';
import { defaultLanguage, prismicLanguagesMap } from '../../environment';
import Layout from '../../layouts/default';
import { pageDescriptionStyle, pageTitleStyle } from '../../theme';

export function BlogPostTemplate({
  location,
  data: _data,
  pageContext: { lang },
}: {
  data: BlogPostQuery;
  location: HLocation;
  pageContext: { lang: string };
}): JSX.Element {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(prismicLanguagesMap[lang] || defaultLanguage);
  }, []);

  if (!_data) return null;
  const { node } = _data.allPrismicBlogPost.edges[0];
  const { first_publication_date: publicationDate, data } = node;
  const {
    title: { text: title },
    author: {
      document: {
        uid: authorUid,
        data: {
          first_name: { text: author },
        },
      },
    },
    image: { gatsbyImageData: image },
    lead: { text: description, html: lead },
  } = data;

  return (
    <Layout description={description} location={location} title={title}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          margin: '0 auto',
          maxWidth: '80ch',
          width: '100%',
        }}
      >
        <Box as="nav" sx={{ display: 'flex', fontSize: '0.8em', gap: '8px' }}>
          <Link
            style={{ color: 'var(--theme-ui-colors-secondary)' }}
            to={i18n.language === defaultLanguage ? '/' : `/${i18n.language}`}
          >
            {t('navigation.home')}
          </Link>
          <Text color="textSecondary">/</Text>
          <Link
            style={{ color: 'var(--theme-ui-colors-secondary)' }}
            to={`${i18n.language === defaultLanguage ? '' : `/${i18n.language}`}/blog`}
          >
            {t('navigation.blog')}
          </Link>
        </Box>
        <Heading as="h2" color="primary" sx={pageTitleStyle}>
          {title}
        </Heading>
        <Text color="textSecondary" sx={{ fontSize: '0.8em' }}>
          <Trans
            components={[
              <Link
                key={0}
                style={{ color: 'var(--theme-ui-colors-secondary)' }}
                to={`${
                  i18n.language === defaultLanguage ? '' : `/${i18n.language}`
                }/resumes/${authorUid}`}
              />,
            ]}
            i18nKey="blog.published_by_on"
            values={{
              author,
              date: DateTime.fromISO(publicationDate)
                .setLocale(i18n.language)
                .toLocaleString(DateTime.DATE_MED),
            }}
          />
        </Text>
        <GatsbyImage
          alt={title}
          image={image}
          style={{ margin: '0 auto', maxWidth: 400, width: '100%' }}
        />
        <Box
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: lead }}
          sx={{ ...pageDescriptionStyle, textAlign: 'left' }}
        />
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query BlogPost($uid: String, $lang: String) {
    allPrismicBlogPost(filter: { uid: { eq: $uid }, lang: { eq: $lang } }) {
      edges {
        node {
          uid
          first_publication_date
          data {
            title {
              text
            }
            author {
              document {
                ... on PrismicResume {
                  uid
                  data {
                    first_name {
                      text
                    }
                  }
                }
              }
            }
            image {
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
            lead {
              text
              html
            }
          }
        }
      }
    }
  }
`;

export default BlogPostTemplate;
