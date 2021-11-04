import { Box, Heading, Paragraph } from '@theme-ui/components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { PrismicResumeDataType } from '../../../graphql-types';
import { pageDescriptionStyle, pageTitleStyle } from '../../theme';

interface IProps {
  data: PrismicResumeDataType;
}

function Header({
  data: {
    thumbnail,
    full_name: { text: fullName },
    resume: { html: resume },
  },
}: IProps): JSX.Element {
  return (
    <>
      <Box
        sx={{ borderRadius: '50%', height: 96, marginBottom: 24, overflow: 'hidden', width: 96 }}
      >
        <GatsbyImage alt={fullName} image={thumbnail.gatsbyImageData} />
      </Box>
      <Heading as="h2" color="primary" sx={pageTitleStyle}>
        {fullName}
      </Heading>
      <Paragraph
        color="textSecondary"
        dangerouslySetInnerHTML={{ __html: resume }}
        sx={pageDescriptionStyle}
      />
    </>
  );
}

export default Header;
