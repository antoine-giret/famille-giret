import { AspectImage, Box, Heading, Link, Paragraph, Text } from '@theme-ui/components';
import { DateTime } from 'luxon';
import React from 'react';
import { AspectRatio } from 'theme-ui';

import { PrismicResumeDataType } from '../../../../graphql-types';

interface IProps {
  data: PrismicResumeDataType;
  index: number;
}

function Experience({ data: { experiences }, index }: IProps): JSX.Element {
  const {
    company_logo: companyLogo,
    company_name: { text: company },
    company_website: { url: companyUrl },
    location: { text: location },
    start_date: startDate,
    end_date: endDate,
    current,
    title: { text: experienceTitle },
    description: { html: experienceDescription },
  } = experiences[index];
  const isSameCompany = experiences[index - 1]?.company_name.text.localeCompare(company) === 0;

  return (
    <>
      {index > 0 && !isSameCompany && (
        <Box sx={{ borderTop: '1px solid whitesmoke', marginTop: 16, width: '100%' }} />
      )}
      <Box
        sx={{
          alignItems: ['center', 'flex-start', 'flex-start'],
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          marginTop: 24,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            height: [isSameCompany ? 0 : 50, 80, 80],
            width: [isSameCompany ? 0 : 50, 80, 80],
          }}
        >
          {!isSameCompany && (
            <AspectRatio ratio={1} sx={{ bg: 'whitesmoke' }}>
              {companyLogo.url && (
                <AspectImage alt={companyLogo.alt} ratio={1} src={companyLogo.url} />
              )}
            </AspectRatio>
          )}
        </Box>
        <Box
          sx={{
            alignSelf: 'stretch',
            margin: ['16px 0 0', '0 0 0 16px', '0 0 0 16px'],
          }}
        >
          {!isSameCompany && (
            <Heading as="h5" color="primary" sx={{ fontSize: '1.1em', fontWeight: 200 }}>
              {companyUrl ? (
                <Link href={companyUrl} rel="noreferrer" target="_blank">
                  {company}
                </Link>
              ) : (
                company
              )}
            </Heading>
          )}
          <Heading
            as="h6"
            sx={{
              fontSize: '1em',
              fontWeight: 200,
              marginTop: isSameCompany ? 0 : '8px',
            }}
          >
            {experienceTitle}
          </Heading>
          <Paragraph color="textSecondary" sx={{ fontSize: '1em', fontWeight: 200 }}>
            {location && <Text>{location}</Text>}
            &nbsp;&#8729;&nbsp;
            {current ? (
              <Text>Since {DateTime.fromISO(startDate).setLocale('en').toFormat('MMMM yyyy')}</Text>
            ) : (
              <Text>
                From {DateTime.fromISO(startDate).setLocale('en').toFormat('MMMM yyyy')} to{' '}
                {DateTime.fromISO(endDate).setLocale('en').toFormat('MMMM yyyy')}
              </Text>
            )}
          </Paragraph>
          <Box
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: experienceDescription }}
            sx={{ fontSize: '0.9em', fontWeight: 200 }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Experience;
