import { Box } from '@theme-ui/components';
import { graphql } from 'gatsby';
import React from 'react';

import { PageQuery } from '../../../graphql-types';
import Layout from '../../layouts/default';

import Experiences from './experiences';
import Header from './header';

export function ResumeTemplate({ data: _data }: { data: PageQuery }): JSX.Element {
  if (!_data) return null;
  const data = _data.allPrismicResume.edges[0].node.data;
  const {
    name: { text: name },
  } = data;

  return (
    <Layout title={`CV ${name}`}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Header data={data} />
        <Experiences data={data} />
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query Page($uid: String) {
    allPrismicResume(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          data {
            thumbnail {
              alt
              url
            }
            name {
              text
            }
            resume {
              html
            }
            experiences {
              company_logo {
                alt
                url
              }
              company_name {
                text
              }
              company_website {
                url
              }
              location {
                text
              }
              title {
                text
              }
              start_date
              current
              end_date
              description {
                html
              }
            }
          }
        }
      }
    }
  }
`;

export default ResumeTemplate;
