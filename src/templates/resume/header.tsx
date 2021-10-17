import { Avatar, Heading, Paragraph } from '@theme-ui/components';
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
      <Avatar alt={thumbnail.alt} src={thumbnail.url} sx={{ height: 96, width: 96 }} />
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
