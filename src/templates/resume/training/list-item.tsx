import { Text } from '@theme-ui/components';
import { DateTime } from 'luxon';
import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';
import ResumeListItem from '../../../components/resume-list-item';

interface IProps {
  data: PrismicResumeDataType;
  index: number;
}

function TrainingListItem({ data: { training }, index }: IProps): JSX.Element {
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
          From {DateTime.fromISO(startDate).setLocale('en').toFormat('yyyy')} to{' '}
          {DateTime.fromISO(endDate).setLocale('en').toFormat('yyyy')}
        </Text>
      }
      subTitle={degree}
      title={schoolName}
      websiteUrl={schoolWebsiteUrl}
    />
  );
}

export default TrainingListItem;
