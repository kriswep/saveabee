import React from 'react';
import { HomePageTemplate } from '../../pages/index';

import Layout from '../../components/layout';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const frontmatter = entry.getIn(['data']).toJS();
  return (
    <Layout location={{ pathname: '/' }} title="Preview">
      <HomePageTemplate
        page={{
          ...frontmatter,
          html: entry.getIn(['data', 'body']),
          isPreview: true,
        }}
      />
    </Layout>
  );
};

export default BlogPostPreview;
