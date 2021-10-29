import { Box, Text } from '@theme-ui/components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { PrismicResumeDataTechnicalSkills } from '../../../../graphql-types';

interface IProps {
  data: PrismicResumeDataTechnicalSkills;
}

function TechnicalSkillsListItem({
  data: {
    title: { text: title },
    logo: { gatsbyImageData: logo },
  },
}: IProps): JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        marginRight: 16,
        marginTop: 16,
        width: ['calc(100% - 16px)', 'calc(50% - 16px)', 'calc(33% - 16px)'],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexShrink: 0,
          justifyContent: 'center',
          height: 40,
          width: 80,
        }}
      >
        <GatsbyImage alt={title} image={logo} />
      </Box>
      <Text>{title}</Text>
    </Box>
  );
}

export default TechnicalSkillsListItem;
