import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

export const BlogPostTemplate = props => {
  const { page } = props;

  return (
    <article>
      <header>
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {page.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {page.frontmatter.date}
        </p>
      </header>
      {page.isPreview ? (
        <ReactMarkdown source={page.html} />
      ) : (
        <section dangerouslySetInnerHTML={{ __html: page.html }} />
      )}

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </article>
  );
};

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <BlogPostTemplate page={{ ...post, isPreview: false }} />
      </Layout>
    );
  }
}

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
