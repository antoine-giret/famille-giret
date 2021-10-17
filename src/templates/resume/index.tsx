import { Box } from '@theme-ui/components';
import { graphql } from 'gatsby';
import React from 'react';

import { PageQuery } from '../../../graphql-types';
import Layout from '../../layouts/default';

import ExperiencesList from './experiences/list';
import Header from './header';
import TrainingList from './training/list';

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
        <ExperiencesList data={data} />
        <TrainingList data={data} />
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
            training {
              school_logo {
                alt
                url
              }
              school_name {
                text
              }
              school_website {
                url
              }
              degree {
                text
              }
              start_date
              end_date
              additional_data {
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
