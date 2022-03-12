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

  const technicalSkills = data.technical_skills.filter(({ title }) => title?.text);
  const otherSkills = data.other_skills.filter(({ title }) => title?.text);

  if (technicalSkills.length === 0 && otherSkills.length === 0) return <></>;

  return (
    <Section title={t('resume.skills')}>
      {technicalSkills.length > 0 && (
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
              {technicalSkills.map((skillData, index) => (
                <TechnicalSkillsListItem data={skillData} key={index} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
      {otherSkills.length > 0 && (
        <Box sx={{ marginTop: 24 }}>
          <Text color="textSecondary" sx={listSubheaderStyle}>
            {t('resume.other_skills')}
          </Text>
          <Box sx={{ marginTop: 24 }}>
            <ul>
              {otherSkills.map(({ title: { text } }, index) => (
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
