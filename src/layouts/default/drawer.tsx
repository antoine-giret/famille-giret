import { Box, IconButton, Text } from '@theme-ui/components';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LayoutQuery } from '../../../graphql-types';
import GithubIcon from '../../components/icons/github';
import { defaultLanguage, prismicLanguagesMap } from '../../environment';
import { linkStyle } from '../../theme';

const listItemStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  height: 36,
  padding: '0 24px',
};

interface IProps {
  data: LayoutQuery;
  open: boolean;
  openDrawer: (open: boolean) => void;
}

function Drawer({ open, data: { allPrismicResume }, openDrawer }: IProps): JSX.Element {
  const [backdropOpen, openBackdrop] = useState(false);
  const {
    i18n: { language },
    t,
  } = useTranslation();

  useEffect(() => {
    if (open) {
      openBackdrop(true);

      if (typeof window === 'undefined') return;
      document.body.classList.add('drawer-open');
    } else {
      setTimeout(() => {
        openBackdrop(false);

        if (typeof window === 'undefined') return;
        document.body.classList.remove('drawer-open');
      }, 300);
    }
  }, [open]);

  return (
    <Box
      className={backdropOpen && 'visible'}
      onClick={() => openDrawer(false)}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        visibility: 'hidden',
        zIndex: 1000,
        '&.visible': {
          visibility: 'visible',
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          left: open ? 0 : -300,
          maxWidth: '90%',
          position: 'absolute',
          top: 0,
          transition: 'left 0.3s ease',
          width: 300,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexShrink: 0,
            height: 64,
            justifyContent: 'flex-end',
            padding: '0 16px',
          }}
        >
          <IconButton aria-label="Close" onClick={() => openDrawer(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </IconButton>
        </Box>
        <Box as="nav" sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Link
            activeStyle={{ backgroundColor: 'whitesmoke' }}
            style={{ ...linkStyle, ...listItemStyle }}
            to={language === defaultLanguage ? '/' : `/${language}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              style={{ marginRight: 8 }}
              viewBox="0 0 24 24"
              width="24px"
              fill="#009688"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
            </svg>
            {t('navigation.home')}
          </Link>
          <Link
            activeStyle={{ backgroundColor: 'whitesmoke' }}
            style={{ ...linkStyle, ...listItemStyle }}
            to={language === defaultLanguage ? '/blog' : `/${language}/blog`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              style={{ marginRight: 8 }}
              viewBox="0 0 24 24"
              width="24px"
              fill="#009688"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            {t('navigation.blog')}
          </Link>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: 36,
              marginTop: 16,
              padding: '0 16px',
            }}
          >
            <Text color="textSecondary" sx={{ fontSize: '0.9em' }}>
              {t('navigation.resumes')}
            </Text>
          </Box>
          <Box>
            {allPrismicResume.edges
              .filter(({ node: { lang } }) => prismicLanguagesMap[lang] === language)
              .map(
                ({
                  node: {
                    uid,
                    data: {
                      thumbnail: { gatsbyImageData: thumbnail },
                      first_name: { text: firstName },
                    },
                  },
                }) => (
                  <Link
                    activeStyle={{ backgroundColor: 'whitesmoke' }}
                    key={uid}
                    onClick={() => openDrawer(false)}
                    style={{ ...linkStyle, ...listItemStyle }}
                    to={`${language === defaultLanguage ? '' : `/${language}`}/resume/${uid}/`}
                  >
                    <GatsbyImage
                      alt={`Photo of ${firstName}`}
                      image={thumbnail}
                      style={{ borderRadius: '50%', height: 24, marginRight: 8 }}
                    />
                    {firstName}
                  </Link>
                ),
              )}
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexShrink: 0,
            height: 64,
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
          <a
            className="text-button icon-button"
            href="https://github.com/antoine-giret/famille-giret"
            rel="noreferrer"
            style={{ fontSize: '0.9em', marginLeft: 8 }}
            target="_blank"
            title="Github"
          >
            <span>Fork me on</span>
            <GithubIcon />
          </a>
        </Box>
      </Box>
    </Box>
  );
}

export default Drawer;
