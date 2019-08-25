import React from 'react';

import { HomePageTemplate } from '../../pages/index';
import StylesheetInjector from '../StylesheetInjector';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const frontmatter = entry.getIn(['data']).toJS();
  return (
    <StylesheetInjector location={{ pathname: '/' }} title="Preview">
      <HomePageTemplate
        page={{
          ...frontmatter,
          html: entry.getIn(['data', 'body']),
          isPreview: true,
        }}
      />
    </StylesheetInjector>
  );
};

export default BlogPostPreview;
