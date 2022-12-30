import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { IndexProps, PageType, Params } from "../types/types";
import Layout from "../components/Layout";
import Introduction from "../components/Introduction";
import Links from "../components/Links";
import ContactForm from "../components/ContactForm";
import Cube from "../components/Cube";

const About: NextPage = () => {
  return (
    <Layout>
      <div className="sm:grid sm:grid-rows-3 lg:grid-rows-4 sm:grid-cols-2 sm:grid-flow-col sm:h-full">
        <div
          id="introduction"
          className="introduction border-b-2 border-white sm:row-span-2 place-content-center"
        >
          <Introduction />
        </div>
        <div
          id="links"
          className="link border-b-2 border-white lg:row-span-2 relative"
        >
          <Cube width={80} height={80} />
          <Links />
        </div>
        <div
          id="contact"
          className="contact sm:row-span-3 lg:row-span-4 col-span-1 border-l-2 border-b-2 border-white w-full grid place-content-center"
        >
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default About;
