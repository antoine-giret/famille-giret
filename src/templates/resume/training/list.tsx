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

  const trainings = data.training.filter(({ school_name }) => school_name?.text);

  if (trainings.length === 0) return <></>;

  return (
    <Section title={t('resume.training')}>
      {trainings.map((_, index) => (
        <TrainingListItem data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default TrainingList;
