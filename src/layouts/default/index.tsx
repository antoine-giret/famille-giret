import { Box } from '@theme-ui/components';
import React from 'react';

import Header from './header';

interface IProps {
  children: JSX.Element;
  title: string;
}

function Layout({ title, children }: IProps): JSX.Element {
  return (
    <>
      <Header title={title} />
      <Box as="main" p={4}>
        {children}
      </Box>
    </>
  );
}

export default Layout;
