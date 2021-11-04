import { Box, Heading, MenuButton } from '@theme-ui/components';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { headerTitleStyle } from '../../theme';

interface IProps {
  openDrawer: (open: boolean) => void;
  title: string;
}

function Header({ title, openDrawer }: IProps): JSX.Element {
  const [scrollTop, setScrollTop] = useState(getScrollTop());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleScroll() {
        setScrollTop(getScrollTop());
      }

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  function getScrollTop() {
    if (typeof window === 'undefined') return 0;

    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
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
          backgroundColor: scrollTop === 0 ? 'transparent' : '#fff',
          display: 'flex',
          height: 64,
          left: 0,
          padding: '0 16px',
          position: 'fixed',
          right: 0,
          top: 0,
          transition: 'all 0.5s ease',
          zIndex: 2,
        }}
      >
        <MenuButton onClick={() => openDrawer(true)} title="Menu" sx={{ marginRight: 16 }} />
        <Heading as="h1" color="text" sx={headerTitleStyle}>
          Famille Giret
        </Heading>
      </Box>
    </>
  );
}

export default Header;
