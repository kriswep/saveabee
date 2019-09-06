import React, { useState, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';

import Layout from '../components/layout';

const StylesheetInjector = props => {
  const [iframeRef, setIframeRef] = useState(undefined);

  useEffect(() => {
    const iframe = document.querySelector('#nc-root iframe');
    const iframeHeadElem = iframe && iframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    <>
      {iframeRef && (
        <StyleSheetManager target={iframeRef}>
          <Layout location={props.location} title={props.title}>
            {props.children}
          </Layout>
        </StyleSheetManager>
      )}
    </>
  );
};

export default StylesheetInjector;
