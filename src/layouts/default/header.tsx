import { Box, Heading, MenuButton } from '@theme-ui/components';
import React from 'react';
import { Helmet } from 'react-helmet';

import { headerTitleStyle } from '../../theme';

interface IProps {
  title: string;
}

function Header({ title }: IProps): JSX.Element {
  function handleMenuToggle() {
    //
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box
        as="header"
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: 64,
          padding: '0 16px',
        }}
      >
        <MenuButton onClick={handleMenuToggle} title="Menu" sx={{ marginRight: 16 }} />
        <Heading as="h1" color="text" sx={headerTitleStyle}>
          Famille Giret
        </Heading>
      </Box>
    </>
  );
}

export default Header;
