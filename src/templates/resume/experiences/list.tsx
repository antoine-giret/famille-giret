import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';

import ExperiencesListItem from './list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function ExperiencesList({ data }: IProps): JSX.Element {
  return (
    <Section title="Experiences">
      {data.experiences.map((_, index) => (
        <ExperiencesListItem data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default ExperiencesList;
