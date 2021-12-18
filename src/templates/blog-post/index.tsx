import { HLocation } from '@reach/router';
import { Box } from '@theme-ui/components';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BlogPostQuery } from '../../../graphql-types';
import { defaultLanguage, prismicLanguagesMap } from '../../environment';
import Layout from '../../layouts/default';

export function BlogPostTemplate({
  location,
  data: _data,
  pageContext: { lang },
}: {
  data: BlogPostQuery;
  location: HLocation;
  pageContext: { lang: string };
}): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(prismicLanguagesMap[lang] || defaultLanguage);
  }, []);

  if (!_data) return null;
  const data = _data.allPrismicBlogPost.edges[0].node.data;
  const {
    title: { text: title },
    lead: { text: description },
  } = data;

  return (
    <Layout description={description} location={location} title={title}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <></>
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
          data {
            title {
              text
            }
            lead {
              text
            }
          }
        }
      }
    }
  }
`;

export default BlogPostTemplate;
