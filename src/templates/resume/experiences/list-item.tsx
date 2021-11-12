import { Text } from '@theme-ui/components';
import { DateTime } from 'luxon';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PrismicResumeDataType } from '../../../../graphql-types';
import ResumeListItem from '../../../components/resume-list-item';

interface IProps {
  data: PrismicResumeDataType;
  index: number;
}

function ExperiencesListItem({ data: { experiences }, index }: IProps): JSX.Element {
  const {
    i18n: { language },
    t,
  } = useTranslation();

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
    <ResumeListItem
      description={experienceDescription}
      enableBorderTop={index > 0 && !isSameCompany}
      logo={companyLogo.gatsbyImageData}
      shrinked={isSameCompany}
      subHeader={
        <>
          {location && <Text>{location}&nbsp;&#8729;&nbsp;</Text>}
          {current ? (
            <Text>
              {t('periods.since', {
                date: DateTime.fromISO(startDate).setLocale(language).toFormat('MMMM yyyy'),
              })}
            </Text>
          ) : (
            <Text>
              {t('periods.from_to', {
                startDate: DateTime.fromISO(startDate).setLocale(language).toFormat('MMMM yyyy'),
                endDate: DateTime.fromISO(endDate).setLocale(language).toFormat('MMMM yyyy'),
              })}
            </Text>
          )}
        </>
      }
      subTitle={experienceTitle}
      title={company}
      websiteUrl={companyUrl}
    />
  );
}

export default ExperiencesListItem;
