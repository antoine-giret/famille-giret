import { Box, Heading, Paragraph } from '@theme-ui/components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { IndexQuery } from '../../graphql-types';
import Layout from '../layouts/default';
import { headerTitleStyle, pageDescriptionStyle, pageTitleStyle } from '../theme';

function Index(): JSX.Element {
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allPrismicResume {
        edges {
          node {
            uid
            data {
              thumbnail {
                gatsbyImageData(width: 96, placeholder: BLURRED)
              }
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

  return (
    <Layout title="Famille Giret">
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Heading as="h2" color="primary" sx={pageTitleStyle}>
          Hello World !
        </Heading>
        <Paragraph color="textSecondary" sx={pageDescriptionStyle}>
          Welcome to our family&apos;s website
        </Paragraph>
        <Box sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
              marginTop: 16,
            }}
          >
            {data.allPrismicResume.edges.map(
              ({
                node: {
                  uid,
                  data: {
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
                    width: 'calc((100% - 16px) / 2)',
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
                    dangerouslySetInnerHTML={{ __html: resume }}
                    sx={{ ...pageDescriptionStyle, marginTop: 16 }}
                  />
                  <Link
                    className="secondary-button"
                    style={{
                      border: '1px solid #ff5722',
                      borderRadius: 4,
                      color: '#ff5722',
                      display: 'inline-block',
                      marginTop: 16,
                      padding: '4px 8px',
                      textDecoration: 'none',
                    }}
                    to={`/resume/${uid}`}
                  >
                    See my resume
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
