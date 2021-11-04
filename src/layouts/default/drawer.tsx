import { Box, IconButton, Text } from '@theme-ui/components';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';

import { LayoutQuery } from '../../../graphql-types';

interface IProps {
  data: LayoutQuery;
  open: boolean;
  openDrawer: (open: boolean) => void;
}

function Drawer({ open, data: { allPrismicResume }, openDrawer }: IProps): JSX.Element {
  const [backdropOpen, openBackdrop] = useState(false);

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
          <Box sx={{ alignItems: 'center', display: 'flex', height: 36, padding: '0 16px' }}>
            <Text color="textSecondary" sx={{ fontSize: '0.9em' }}>
              Resumes
            </Text>
          </Box>
          <Box>
            {allPrismicResume.edges.map(
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
                  style={{
                    alignItems: 'center',
                    color: 'black',
                    display: 'flex',
                    height: 36,
                    padding: '0 24px',
                    textDecoration: 'none',
                  }}
                  to={`/resume/${uid}/`}
                >
                  <GatsbyImage
                    alt="Avatar"
                    image={thumbnail}
                    style={{ borderRadius: '50%', height: 24, marginRight: 8 }}
                  />
                  {firstName}
                </Link>
              ),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Drawer;
