import { Box } from '@theme-ui/components';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import { LayoutQuery } from '../../../graphql-types';

import Drawer from './drawer';
import Footer from './footer';
import Header from './header';

interface IProps {
  children: JSX.Element;
  title: string;
}

function Layout({ title, children }: IProps): JSX.Element {
  const [drawerOpen, openDrawer] = useState(false);
  const data = useStaticQuery<LayoutQuery>(graphql`
    query Layout {
      allPrismicResume {
        edges {
          node {
            uid
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

  return (
    <>
      <Header openDrawer={openDrawer} title={title} />
      <Box as="main" sx={{ backgroundColor: 'whitesmoke', padding: '96px 32px 32px' }}>
        {children}
      </Box>
      <Footer />
      <Drawer data={data} open={drawerOpen} openDrawer={openDrawer} />
    </>
  );
}

export default Layout;
