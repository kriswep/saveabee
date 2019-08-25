import React from 'react';
import { Link } from 'gatsby';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import '../fonts/montserrat.css';
import '../fonts/overlock.css';

import { rhythm, scale } from '../utils/typography';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    overflow: auto;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }
`;

const theme = {
  color: { main: { dark: '#3f3f3c', light: '#e3e300', tint: '#9d0000' } },
};

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header = null;

    if (location.pathname === rootPath) {
      header = (
        <h2
          css={`
            ${scale(0.82)};
            font-family: overlock, sans-serif;
            font-style: normal;
            font-weight: 900;
            color: ${({ theme }) => theme.color.main.dark};
            margin: 0;
          `}
        >
          <Link
            css={`
              box-shadow: none;
              text-decoration: none;
              color: inherit;
            `}
            to={`/`}
          >
            {title}
          </Link>
        </h2>
      );
    }
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <div
            css={`
              min-height: 100vh;
              min-width: 100vw;
              background-color: ${({ theme }) => theme.color.main.light};
              display: grid;
              grid-template-columns: repeat(12, 1fr);
              grid-template-rows: auto 1fr;
            `}
          >
            <header
              css={`
                grid-row: 1 / 1;
                grid-column: 2 / 12;
                padding: ${rhythm(2)} 0;
              `}
            >
              {header}
            </header>
            <main
              css={`
                grid-row: 2 / 2;
                grid-column: 1 / 13;
              `}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </>
    );
  }
}

export default Layout;
