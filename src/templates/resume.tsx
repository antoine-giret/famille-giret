import { AspectImage, Avatar, Box, Heading, Link, Paragraph, Text } from '@theme-ui/components';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import React from 'react';
import { AspectRatio } from 'theme-ui';

import Layout from '../layouts/default';

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
            Experiences
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
            ) => {
              const isSameCompany =
                experiences[index - 1]?.company_name.text.localeCompare(company) === 0;

              return (
                <>
                  {index > 0 && !isSameCompany && (
                    <Box sx={{ borderTop: '1px solid whitesmoke', marginTop: 16, width: '100%' }} />
                  )}
                  <Box
                    key={index}
                    sx={{
                      alignItems: ['center', 'flex-start', 'flex-start'],
                      display: 'flex',
                      flexDirection: ['column', 'row', 'row'],
                      marginTop: 24,
                    }}
                  >
                    <Box
                      sx={{
                        flexShrink: 0,
                        height: [isSameCompany ? 0 : 50, 80, 80],
                        width: [isSameCompany ? 0 : 50, 80, 80],
                      }}
                    >
                      {!isSameCompany && (
                        <AspectRatio ratio={1} sx={{ bg: 'whitesmoke' }}>
                          {companyLogo.url && (
                            <AspectImage alt={companyLogo.alt} ratio={1} src={companyLogo.url} />
                          )}
                        </AspectRatio>
                      )}
                    </Box>
                    <Box
                      sx={{
                        alignSelf: 'stretch',
                        margin: ['16px 0 0', '0 0 0 16px', '0 0 0 16px'],
                      }}
                    >
                      {!isSameCompany && (
                        <Heading
                          as="h5"
                          color="primary"
                          sx={{ fontSize: '1.1em', fontWeight: 200 }}
                        >
                          {companyUrl ? (
                            <Link href={companyUrl} rel="noreferrer" target="_blank">
                              {company}
                            </Link>
                          ) : (
                            company
                          )}
                        </Heading>
                      )}
                      <Heading
                        as="h6"
                        sx={{
                          fontSize: '1em',
                          fontWeight: 200,
                          marginTop: isSameCompany ? 0 : '8px',
                        }}
                      >
                        {experienceTitle}
                      </Heading>
                      <Paragraph color="textSecondary" sx={{ fontSize: '1em', fontWeight: 200 }}>
                        {location && <Text>{location}</Text>}
                        &nbsp;&#8729;&nbsp;
                        {current ? (
                          <Text>
                            Since{' '}
                            {DateTime.fromISO(startDate).setLocale('en').toFormat('MMMM yyyy')}
                          </Text>
                        ) : (
                          <Text>
                            From {DateTime.fromISO(startDate).setLocale('en').toFormat('MMMM yyyy')}{' '}
                            to {DateTime.fromISO(endDate).setLocale('en').toFormat('MMMM yyyy')}
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
                </>
              );
            },
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
