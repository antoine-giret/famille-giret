import { HLocation } from '@reach/router';
import { Box, Heading, Text } from '@theme-ui/components';
import { Link } from 'gatsby';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLanguage from '../hooks/language';
import { defaultLanguage, languages } from '../languages';
import Layout from '../layouts/default';
import { titleStyle } from '../theme';

function NotFound({ location }: { location: HLocation }): JSX.Element {
  const language =
    languages.find((language) => location.pathname.split('/')[1] === language) || defaultLanguage;
  const { t } = useTranslation();
  useLanguage(language);

  return (
    <Layout location={location} title={t('page_not_found.title')}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Heading as="h2" color="primary" sx={{ ...titleStyle, fontSize: '2.5em' }}>
          404
        </Heading>
        <Heading as="h3" color="text" sx={titleStyle}>
          {t('page_not_found.title')}
        </Heading>
        <Text color="textSecondary" sx={{ marginTop: 16 }}>
          {t('page_not_found.description')}
        </Text>
        <Link
          className="secondary-button"
          style={{ marginTop: 16 }}
          to={language === defaultLanguage ? '/' : `/${language}`}
        >
          {t('actions.back_home')}
        </Link>
      </Box>
    </Layout>
  );
}

export default NotFound;
