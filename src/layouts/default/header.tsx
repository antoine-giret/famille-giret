import { Box, Heading, MenuButton } from '@theme-ui/components';
import React from 'react';
import { Helmet } from 'react-helmet';

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
        <Heading as="h1" color="text" sx={{ fontSize: '1.5em', fontWeight: 200 }}>
          Famille Giret
        </Heading>
      </Box>
    </>
  );
}

export default Header;
