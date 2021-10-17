import { Box, Heading } from '@theme-ui/components';
import React from 'react';

import { PrismicResumeDataType } from '../../../../graphql-types';

import Experience from './item';

interface IProps {
  data: PrismicResumeDataType;
}

function Experiences({ data }: IProps): JSX.Element {
  return (
    <Box as="section" sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
      <Heading
        as="h3"
        color="secondary"
        sx={{ fontSize: '1.5em', fontWeight: 200, textAlign: 'center' }}
      >
        Experiences
      </Heading>
      {data.experiences.map((_, index) => (
        <Experience data={data} key={index} index={index} />
      ))}
    </Box>
  );
}

export default Experiences;
