import { Box, Heading } from '@theme-ui/components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PrismicResumeDataType } from '../../../graphql-types';
import GithubIcon from '../../components/icons/github';
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
              <GithubIcon />
            </a>
          )}
        </Box>
      )}
    </>
  );
}

export default Header;
