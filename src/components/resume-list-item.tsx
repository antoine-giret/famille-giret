import { Box, Heading, Link, Paragraph, Text } from '@theme-ui/components';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { AspectRatio } from 'theme-ui';

import {
  listItemSubheaderStyle,
  listItemSubtitleStyle,
  listItemTextStyle,
  listItemTitleStyle,
} from '../theme';

interface IProps {
  description?: string;
  enableBorderTop?: boolean;
  logo?: IGatsbyImageData;
  shrinked?: boolean;
  subHeader?: React.ReactNode;
  subTitle: string;
  title: string;
  websiteUrl?: string;
}

function ResumeListItem({
  enableBorderTop,
  shrinked,
  logo,
  websiteUrl,
  title,
  subTitle,
  subHeader,
  description,
}: IProps): JSX.Element {
  return (
    <>
      {enableBorderTop && !shrinked && (
        <Box sx={{ borderTop: '1px solid whitesmoke', marginTop: 16, width: '100%' }} />
      )}
      <Box
        sx={{
          alignItems: ['center', 'flex-start', 'flex-start'],
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          marginTop: 24,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            height: [shrinked ? 0 : 50, 80, 80],
            width: [shrinked ? 0 : 50, 80, 80],
          }}
        >
          {!shrinked && (
            <AspectRatio ratio={1}>{logo && <GatsbyImage alt={title} image={logo} />}</AspectRatio>
          )}
        </Box>
        <Box
          sx={{
            alignSelf: 'stretch',
            margin: ['16px 0 0', '0 0 0 16px', '0 0 0 16px'],
          }}
        >
          {!shrinked && (
            <Heading as="h5" color="primary" sx={listItemTitleStyle}>
              {websiteUrl ? (
                <Link href={websiteUrl} rel="noreferrer" target="_blank">
                  {title}
                </Link>
              ) : (
                title
              )}
            </Heading>
          )}
          <Heading
            as="h6"
            sx={{
              ...listItemSubtitleStyle,
              marginTop: shrinked ? 0 : '8px',
            }}
          >
            {subTitle}
          </Heading>
          {subHeader && (
            <Paragraph color="textSecondary" sx={listItemSubheaderStyle}>
              <Text>{subHeader}</Text>
            </Paragraph>
          )}
          <Box
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: description }}
            sx={listItemTextStyle}
          />
        </Box>
      </Box>
    </>
  );
}

export default ResumeListItem;
