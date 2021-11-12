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

function TrainingListItem({ data: { training }, index }: IProps): JSX.Element {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const {
    school_logo: schoolLogo,
    school_name: { text: schoolName },
    school_website: { url: schoolWebsiteUrl },
    degree: { text: degree },
    start_date: startDate,
    end_date: endDate,
    additional_data: { html: additionalData },
  } = training[index];

  return (
    <ResumeListItem
      description={additionalData}
      enableBorderTop={index > 0}
      logo={schoolLogo.gatsbyImageData}
      subHeader={
        <Text>
          {t('periods.from_to', {
            startDate: DateTime.fromISO(startDate).setLocale(language).toFormat('yyyy'),
            endDate: DateTime.fromISO(endDate).setLocale(language).toFormat('yyyy'),
          })}
        </Text>
      }
      subTitle={degree}
      title={schoolName}
      websiteUrl={schoolWebsiteUrl}
    />
  );
}

export default TrainingListItem;
