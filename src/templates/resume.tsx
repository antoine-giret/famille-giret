import { graphql } from 'gatsby';
import React from 'react';


export function ResumeTemplate({ data }: { data: IData }): JSX.Element {
  if (!data) return null;
  const {
    thumbnail,
    name: { text: name },
    resume: { html: resume },
    experiences,
  } = data.allPrismicResume.edges[0].node.data;

  return (
    <main>
      {thumbnail.url && <img alt={thumbnail.alt} src={thumbnail.url} />}
      <h2>{name}</h2>
      <div dangerouslySetInnerHTML={{ __html: resume }} />
      <section>
        <h3>Expériences</h3>
        {experiences.map(
          (
            {
              company_logo: companyLogo,
              company_name: { text: company },
              company_website: { url: companyUrl },
              location: { text: location },
              start_date: startDate,
              end_date: endDate,
              current,
              title: { text: experienceTitle },
              description: { html: experienceDescription },
            },
            index,
          ) => (
            <div key={index}>
              {companyLogo.url && <img alt={companyLogo.alt} src={companyLogo.url} />}
              <h4>{experienceTitle}</h4>
              <p>
                {companyUrl ? (
                  <a href={companyUrl} rel="noreferrer" target="_blank">
                    {company}
                  </a>
                ) : (
                  <span>{company}</span>
                )}
                {location && (
                  <>
                    &nbsp;&bull;&nbsp;<span>{location}</span>
                  </>
                )}
                &nbsp;&bull;&nbsp;
                {current ? (
                  <span>Depuis le {startDate}</span>
                ) : (
                  <span>
                    Du {startDate} au {endDate}
                  </span>
                )}
              </p>
              <div dangerouslySetInnerHTML={{ __html: experienceDescription }} />
            </div>
          ),
        )}
      </section>
    </main>
  );
}

interface IData {
  allPrismicResume: {
    edges: Array<{
      node: {
        uid: string;
        data: {
          thumbnail: {
            alt: string | null;
            url: string | null;
          };
          name: { text: string };
          resume: { html: string };
          experiences: Array<{
            company_logo: {
              alt: string | null;
              url: string | null;
            };
            company_name: {
              text: string;
            };
            company_website: {
              url: string;
            };
            location: {
              text: string;
            };
            title: {
              text: string;
            };
            start_date: string | null;
            current: boolean;
            end_date: string | null;
            description: {
              html: string;
            };
          }>;
        };
      };
    }>;
  };
}

export const query = graphql`
  query PageQuery($uid: String) {
    allPrismicResume(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          data {
            thumbnail {
              alt
              url
            }
            name {
              text
            }
            resume {
              html
            }
            experiences {
              company_logo {
                alt
                url
              }
              company_name {
                text
              }
              company_website {
                url
              }
              location {
                text
              }
              title {
                text
              }
              start_date
              current
              end_date
              description {
                html
              }
            }
          }
        }
      }
    }
  }
`;

export default ResumeTemplate;
