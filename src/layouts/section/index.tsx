import { Box, Heading } from '@theme-ui/components';
import React from 'react';

import { sectionTitleStyle } from '../../theme';

interface IProps {
  children?: React.ReactNode;
  title: React.ReactNode;
}

function Section({ title, children }: IProps): JSX.Element {
  return (
    <Box as="section" sx={{ marginTop: 48, maxWidth: '100%', width: 800 }}>
      <Heading as="h3" color="secondary" sx={sectionTitleStyle}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default Section;
