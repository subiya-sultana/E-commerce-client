import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&family=Smooch+Sans:wght@500&display=swap');

  :root{
    --bg-green-900 : #14532D;
    --bg-green-500 : #22C55E;
    --bg-green-300 : #86EFAC;
  }

  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: pink;
    font-family: "Lexend Giga", serif;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
