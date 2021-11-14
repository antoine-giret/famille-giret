import { Box, Heading } from '@theme-ui/components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
    linkedin_profile_url: { url: linkedInProfileUrl },
    github_profile_url: { url: githubProfileUrl },
  },
}: IProps): JSX.Element {
  const { t } = useTranslation();

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
      <Box
        color="textSecondary"
        dangerouslySetInnerHTML={{ __html: resume }}
        sx={{ ...pageDescriptionStyle, marginTop: 16 }}
      />
      {(linkedInProfileUrl || githubProfileUrl) && (
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 16, marginTop: 16 }}>
          {linkedInProfileUrl && (
            <a
              className="icon-button"
              href={linkedInProfileUrl}
              rel="noreferrer"
              target="_blank"
              title={t('resume.linkedin_profile')}
            >
              <svg
                height="256"
                width="256"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <g fill="none">
                  <path
                    d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z"
                    fill="#069"
                  />
                  <path
                    d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z"
                    fill="#fff"
                  />
                </g>
              </svg>
            </a>
          )}
          {githubProfileUrl && (
            <a
              className="icon-button"
              href={githubProfileUrl}
              rel="noreferrer"
              target="_blank"
              title={t('resume.github_profile')}
            >
              <svg
                width="1024"
                height="1024"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                  fill="#1B1F23"
                />
              </svg>
            </a>
          )}
        </Box>
      )}
    </>
  );
}

export default Header;
