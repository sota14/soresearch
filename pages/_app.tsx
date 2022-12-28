import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import adobeLoader from "../adobeloader.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (process.browser) adobeLoader(document);
  }, []);

  return (
    <>
      <Head>
        <title>SO RESEARCH</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  );
}
