import { HLocation } from '@reach/router';
import { Box } from '@theme-ui/components';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ResumeQuery } from '../../../graphql-types';
import { appTitle, defaultLanguage, prismicLanguagesMap } from '../../environment';
import Layout from '../../layouts/default';

import ExperiencesList from './experiences/list';
import Header from './header';
import SkillsList from './skills/list';
import TrainingList from './training/list';

export function ResumeTemplate({
  location,
  data: _data,
  pageContext: { lang },
}: {
  data: ResumeQuery;
  location: HLocation;
  pageContext: { lang: string };
}): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(prismicLanguagesMap[lang] || defaultLanguage);
  }, []);

  if (!_data) return null;
  const data = _data.allPrismicResume.edges[0].node.data;
  const {
    full_name: { text: fullName },
  } = data;

  return (
    <Layout
      description={data.resume.text}
      location={location}
      title={`CV ${fullName} | ${appTitle}`}
    >
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
  query Resume($uid: String, $lang: String) {
    allPrismicResume(filter: { uid: { eq: $uid }, lang: { eq: $lang } }) {
      edges {
        node {
          uid
          data {
            thumbnail {
              gatsbyImageData(width: 96, placeholder: BLURRED)
            }
            full_name {
              text
            }
            resume {
              text
              html
            }
            linkedin_profile_url {
              url
            }
            github_profile_url {
              url
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
