import { Box, Text } from '@theme-ui/components';
import { DateTime } from 'luxon';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer(): JSX.Element {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Box
      as="footer"
      sx={{
        display: 'flex',
        backgroundColor: '#fff',
        flexShrink: 0,
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <Text color="text" sx={{ fontSize: '0.9em' }}>
        © {DateTime.now().setLocale(language).toFormat('yyyy')} Antoine Giret
      </Text>
    </Box>
  );
}

export default Footer;
