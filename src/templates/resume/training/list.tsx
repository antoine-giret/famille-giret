import React from 'react';
import { useTranslation } from 'react-i18next';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';

import TrainingListItem from './list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function TrainingList({ data }: IProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Section title={t('resume.training')}>
      {data.training.map((_, index) => (
        <TrainingListItem data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default TrainingList;
