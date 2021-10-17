import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';

import TrainingListItem from './list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function TrainingList({ data }: IProps): JSX.Element {
  return (
    <Section title="Training">
      {data.training.map((_, index) => (
        <TrainingListItem data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default TrainingList;
