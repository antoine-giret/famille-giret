import { HLocation } from '@reach/router';
import { Box } from '@theme-ui/components';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import '../../i18n';
import { LayoutQuery } from '../../../graphql-types';

import Drawer from './drawer';
import Footer from './footer';
import Header from './header';

export interface IProps {
  children: JSX.Element;
  location: HLocation;
  title: string;
}

export function Layout({ location, title, children }: IProps): JSX.Element {
  const data = useStaticQuery<LayoutQuery>(graphql`
    query Layout {
      allPrismicResume {
        edges {
          node {
            uid
            lang
            data {
              thumbnail {
                gatsbyImageData(width: 24, placeholder: BLURRED)
              }
              first_name {
                text
              }
            }
          }
        }
      }
    }
  `);
  const [drawerOpen, openDrawer] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header location={location} openDrawer={openDrawer} title={title} />
      <Box
        as="main"
        sx={{
          backgroundColor: 'whitesmoke',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '96px 32px 32px',
        }}
      >
        {children}
      </Box>
      <Footer />
      <Drawer data={data} open={drawerOpen} openDrawer={openDrawer} />
    </Box>
  );
}

export default Layout;
