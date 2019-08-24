import React from 'react';
import { graphql, Link } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const StyledMarkdown = styled(ReactMarkdown)`
  & > p {
    margin: 0;
  }
`;

export const HomePageTemplate = props => {
  const { page } = props;

  return (
    <section
      css={`
        display: grid;
        grid-template-columns: repeat(12, 1fr);
      `}
    >
      <h1
        css={`
          ${scale(1)};
          grid-column: 2 / 7;
          font-style: normal;
          font-weight: 800;
          color: ${({ theme }) => theme.color.main.dark};
          margin: 0;
          padding-top: ${rhythm(9)};
          letter-spacing: 0.05em;
        `}
      >
        {page.title}
      </h1>
      <div
        css={`
          ${scale(0.82)};
          line-height: 4.8rem;
          grid-column: 2 / 7;
          font-style: normal;
          font-weight: 700;
          padding: ${rhythm(3)} 0;
        `}
      >
        <StyledMarkdown source={page.subtitle} />
      </div>
      <h3
        css={`
          grid-column: 2 / 7;
          ${scale(0.55)};
          font-style: normal;
          font-weight: 700;
          color: ${({ theme }) => theme.color.main.tint};
          margin: 0;
        `}
      >
        <Link
          css={`
            box-shadow: none;
            text-decoration: none;
            color: inherit;
          `}
          to={page.callToActions.firstCTA.linkURL}
        >
          {page.callToActions.firstCTA.text}
        </Link>
      </h3>
    </section>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const pageData = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} />
        {pageData.length > 0 && (
          <HomePageTemplate page={pageData[0].node.frontmatter} />
        )}
      </Layout>
    );
  }
}

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            subtitle
            title
            templateKey
            callToActions {
              firstCTA {
                linkType
                linkURL
                text
              }
            }
          }
        }
      }
    }
  }
`;
