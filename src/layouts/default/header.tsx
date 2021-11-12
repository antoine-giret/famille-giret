import { HLocation } from '@reach/router';
import { Box, Heading, MenuButton } from '@theme-ui/components';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { flagIconsMap } from '../../components/icons/flags';
import { defaultLanguage, languages, languagesMap } from '../../languages';
import { headerTitleStyle, linkStyle } from '../../theme';

interface IProps {
  location: HLocation;
  openDrawer: (open: boolean) => void;
  title: string;
}

function Header({ location, title, openDrawer }: IProps): JSX.Element {
  const [scrollTop, setScrollTop] = useState<number>();
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    function getScrollTop() {
      if (typeof window === 'undefined') return 0;

      return (
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      );
    }

    function handleScroll() {
      setScrollTop(getScrollTop());
    }

    setScrollTop(getScrollTop());

    if (typeof window !== 'undefined') window.addEventListener('scroll', handleScroll);

    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          flexShrink: 0,
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
        <MenuButton
          onClick={() => openDrawer(true)}
          title="Menu"
          sx={{ flexShrink: 0, marginRight: 16 }}
        />
        <Heading as="h1" color="text" sx={{ flexShrink: 0, ...headerTitleStyle }}>
          <Link style={linkStyle} to={language === defaultLanguage ? '/' : `/${language}`}>
            Famille Giret
          </Link>
        </Heading>
        <Box sx={{ flexGrow: 1 }} />
        {languages
          .filter((key) => key !== language)
          .map((key) => {
            const { label } = languagesMap[key];
            const Icon = flagIconsMap[key];
            const to =
              language === defaultLanguage
                ? `/${key}${location.pathname}`
                : key === defaultLanguage
                ? location.pathname.split(language)[1]
                : `/${key}${location.pathname.split(language)[1]}`;

            return (
              <Link className="icon-button" key={key} to={to || '#'} title={label}>
                <Icon />
              </Link>
            );
          })}
      </Box>
    </>
  );
}

export default Header;
