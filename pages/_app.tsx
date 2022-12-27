import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import adobeLoader from "../adobeloader.js";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.browser) adobeLoader(document);
  }, []);

  return (
    <>
      <Head>
        <title>SO RESEARCH</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
