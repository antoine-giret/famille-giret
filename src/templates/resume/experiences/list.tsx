import React from 'react';
import { useTranslation } from 'react-i18next';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';

import ExperiencesListItem from './list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function ExperiencesList({ data }: IProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Section title={t('resume.experiences')}>
      {data.experiences.map((_, index) => (
        <ExperiencesListItem data={data} key={index} index={index} />
      ))}
    </Section>
  );
}

export default ExperiencesList;
