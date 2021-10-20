import { Box, Heading, Paragraph } from '@theme-ui/components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { PrismicResumeDataType } from '../../../graphql-types';

interface IProps {
  data: PrismicResumeDataType;
}

function Header({
  data: {
    thumbnail,
    name: { text: name },
    resume: { html: resume },
  },
}: IProps): JSX.Element {
  return (
    <>
      <Box sx={{ borderRadius: '50%', height: 96, overflow: 'hidden', width: 96 }}>
        <GatsbyImage alt={name} image={thumbnail.gatsbyImageData} />
      </Box>
      <Heading as="h2" color="primary" sx={{ fontSize: '2em', fontWeight: 200, marginTop: 24 }}>
        {name}
      </Heading>
      <Paragraph
        color="textSecondary"
        dangerouslySetInnerHTML={{ __html: resume }}
        sx={{
          fontSize: '1em',
          fontWeight: 200,
          maxWidth: '100%',
          textAlign: 'center',
          width: 800,
        }}
      />
    </>
  );
}

export default Header;
