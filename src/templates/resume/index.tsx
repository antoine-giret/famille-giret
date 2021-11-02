import { Box } from '@theme-ui/components';
import { graphql } from 'gatsby';
import React from 'react';

import { PageQuery } from '../../../graphql-types';
import Layout from '../../layouts/default';

import ExperiencesList from './experiences/list';
import Header from './header';
import SkillsList from './skills/list';
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
        <SkillsList data={data} />
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
              gatsbyImageData(width: 96, placeholder: BLURRED)
            }
            name {
              text
            }
            resume {
              html
            }
            experiences {
              company_logo {
                gatsbyImageData(width: 80, backgroundColor: "transparent", placeholder: BLURRED)
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
                gatsbyImageData(width: 80, backgroundColor: "transparent", placeholder: BLURRED)
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
            technical_skills {
              logo {
                gatsbyImageData(height: 30, backgroundColor: "transparent", placeholder: BLURRED)
              }
              title {
                text
              }
            }
            other_skills {
              title {
                text
              }
            }
          }
        }
      }
    }
  }
`;

export default ResumeTemplate;
