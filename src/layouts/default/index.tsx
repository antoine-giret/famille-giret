import { Box } from '@theme-ui/components';
import React from 'react';

import Footer from './footer';
import Header from './header';

interface IProps {
  children: JSX.Element;
  title: string;
}

function Layout({ title, children }: IProps): JSX.Element {
  return (
    <>
      <Header title={title} />
      <Box as="main" sx={{ backgroundColor: 'whitesmoke', padding: '96px 32px 32px' }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
