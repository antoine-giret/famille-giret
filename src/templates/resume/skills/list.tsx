import { Box, Text } from '@theme-ui/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';
import { listSubheaderStyle } from '../../../theme';

import TechnicalSkillsListItem from './technical-skills-list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function SkillsList({ data }: IProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Section title={t('resume.skills')}>
      <Box sx={{ marginTop: 24 }}>
        <Text color="textSecondary" sx={listSubheaderStyle}>
          {t('resume.technical_skills')}
        </Text>
        <Box sx={{ marginTop: 24 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginRight: -16,
              marginTop: -16,
            }}
          >
            {data.technical_skills.map((skillData, index) => (
              <TechnicalSkillsListItem data={skillData} key={index} />
            ))}
          </Box>
        </Box>
      </Box>
      {data.other_skills.length > 0 && (
        <Box sx={{ marginTop: 24 }}>
          <Text color="textSecondary" sx={listSubheaderStyle}>
            {t('resume.other_skills')}
          </Text>
          <Box sx={{ marginTop: 24 }}>
            <ul>
              {data.other_skills.map(({ title: { text } }, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </Box>
        </Box>
      )}
    </Section>
  );
}

export default SkillsList;
