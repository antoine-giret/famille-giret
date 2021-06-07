import { AspectImage, Avatar, Box, Heading, Link, Paragraph, Text } from '@theme-ui/components';
import { graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';

import Layout from '../layouts/default';

moment.locale('fr');

export function ResumeTemplate({ data }: { data: IData }): JSX.Element {
  if (!data) return null;
  const {
    thumbnail,
    name: { text: name },
    resume: { html: resume },
    experiences,
  } = data.allPrismicResume.edges[0].node.data;

  return (
    <Layout title={`CV ${name}`}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar alt={thumbnail.alt} src={thumbnail.url} sx={{ height: 96, width: 96 }} />
        <Heading as="h2" color="primary" sx={{ fontSize: '2em', fontWeight: 200, marginTop: 24 }}>
          {name}
        </Heading>
        <Paragraph
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: resume }}
          sx={{
            fontSize: '1em',
            fontWeight: 200,
            maxWidth: '100%',
            textAlign: 'center',
            width: 800,
          }}
        />
        <Box as="section" sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
          <Heading
            as="h3"
            color="secondary"
            sx={{ fontSize: '1.5em', fontWeight: 200, textAlign: 'center' }}
          >
            Expériences
          </Heading>
          {experiences.map(
            (
              {
                company_logo: companyLogo,
                company_name: { text: company },
                company_website: { url: companyUrl },
                location: { text: location },
                start_date: startDate,
                end_date: endDate,
                current,
                title: { text: experienceTitle },
                description: { html: experienceDescription },
              },
              index,
            ) => (
              <Box key={index} sx={{ display: 'flex', marginTop: 24 }}>
                <Box sx={{ backgroundColor: 'whitesmoke', height: 100, width: 100 }}>
                  {companyLogo.url && (
                    <AspectImage alt={companyLogo.alt} ratio={1} src={companyLogo.url} />
                  )}
                </Box>
                <Box sx={{ marginLeft: 16 }}>
                  <Heading as="h5" sx={{ fontSize: '1.1em', fontWeight: 200 }}>
                    {experienceTitle}
                  </Heading>
                  <Paragraph color="textSecondary" sx={{ fontSize: '1em', fontWeight: 200 }}>
                    {companyUrl ? (
                      <Link
                        color="textSecondary"
                        href={companyUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {company}
                      </Link>
                    ) : (
                      <Text>{company}</Text>
                    )}
                    {location && (
                      <>
                        &nbsp;&#8729;&nbsp;<Text>{location}</Text>
                      </>
                    )}
                    &nbsp;&#8729;&nbsp;
                    {current ? (
                      <Text>Depuis {moment(startDate).format('MMMM YYYY')}</Text>
                    ) : (
                      <Text>
                        De {moment(startDate).format('MMMM YYYY')} à{' '}
                        {moment(endDate).format('MMMM YYYY')}
                      </Text>
                    )}
                  </Paragraph>
                  <Box
                    color="textSecondary"
                    dangerouslySetInnerHTML={{ __html: experienceDescription }}
                    sx={{ fontSize: '0.9em', fontWeight: 200 }}
                  />
                </Box>
              </Box>
            ),
          )}
        </Box>
      </Box>
    </Layout>
  );
}

interface IData {
  allPrismicResume: {
    edges: Array<{
      node: {
        uid: string;
        data: {
          thumbnail: {
            alt: string | null;
            url: string | null;
          };
          name: { text: string };
          resume: { html: string };
          experiences: Array<{
            company_logo: {
              alt: string | null;
              url: string | null;
            };
            company_name: {
              text: string;
            };
            company_website: {
              url: string;
            };
            location: {
              text: string;
            };
            title: {
              text: string;
            };
            start_date: string | null;
            current: boolean;
            end_date: string | null;
            description: {
              html: string;
            };
          }>;
        };
      };
    }>;
  };
}

export const query = graphql`
  query PageQuery($uid: String) {
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
