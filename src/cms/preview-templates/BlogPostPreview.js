import React from 'react';
import { BlogPostTemplate } from '../../templates/blog-post';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const frontmatter = entry.getIn(['data']).toJS();
  frontmatter.date = frontmatter.date.toLocaleString();

  return (
    <BlogPostTemplate
      page={{
        frontmatter,
        html: entry.getIn(['data', 'body']),
        isPreview: true,
      }}
    />
  );
};

export default BlogPostPreview;
