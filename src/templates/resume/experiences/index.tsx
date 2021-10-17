import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';

import Experience from './item';

interface IProps {
  data: PrismicResumeDataType;
}

function Experiences({ data }: IProps): JSX.Element {
  return (
    <Section title="Experiences">
      {data.experiences.map((_, index) => (
        <Experience data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default Experiences;
