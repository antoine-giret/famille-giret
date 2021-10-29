import { Box, Text } from '@theme-ui/components';
import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';
import Section from '../../../layouts/section';
import { listSubheaderStyle } from '../../../theme';

import TechnicalSkillsListItem from './technical-skills-list-item';

interface IProps {
  data: PrismicResumeDataType;
}

function SkillsList({ data }: IProps): JSX.Element {
  return (
    <Section title="Skills">
      <Box sx={{ marginTop: 24 }}>
        <Text color="textSecondary" sx={listSubheaderStyle}>
          Technical Skills
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
            Other Skills
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
