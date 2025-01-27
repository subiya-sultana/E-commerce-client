import "aos/dist/aos.css";
import AOS from 'aos';
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import { useEffect } from "react";
import { CartContextProvider } from "@/components/CardContext";



const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&family=Smooch+Sans:wght@500&display=swap');

  :root{
    --bg-green-900 : #14532D;
    --bg-green-500 : #22C55E;
    --bg-green-300 : #86EFAC;
    --bg-green-100 : #DCFCE7;
  }

  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: var(--bg-green-300);
    font-family: "Lexend Giga", serif;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

`;

export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({ duration: 600 }); // 600ms animation
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.PNG" />
        <title>EcoCart - HomePage</title>
      </Head>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
