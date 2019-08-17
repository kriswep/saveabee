const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // Filter out files we don't create pages for
  const postOrPage = result.data.allMarkdownRemark.edges.filter(edge => {
    if (edge.node.frontmatter.templateKey === 'navbar') {
      return false;
    } else if (edge.node.frontmatter.templateKey === 'footer') {
      return false;
    } else {
      return !Boolean(edge.node.fields.slug.match(/^\/meetups\/.*$/));
    }
  });

  // Create pages.
  postOrPage.forEach(edge => {
    let component, pathName;
    if (edge.node.frontmatter.templateKey === 'home-page') {
      pathName = '/';
      component = path.resolve(`src/pages/index.js`);
    } else {
      pathName = edge.node.frontmatter.path || edge.node.fields.slug;
      component = path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
      );
    }
    const id = edge.node.id;
    createPage({
      path: pathName,
      component,
      // additional data can be passed via context, can be used in page Query
      context: {
        id,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
