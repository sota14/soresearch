import React from 'react'
import type { GetStaticProps, NextPage } from "next";
import { IndexProps, PageType, Params } from "../types/types";
import Layout from '../components/Layout';
import Introduction from '../components/Introduction';
import Links from '../components/Links';
import ContactForm from '../components/ContactForm';

const About: NextPage = () => {
  return (
    <Layout>
    <div className='grid grid-rows-2 sm:grid-cols-2 sm:grid-flow-col sm:h-full'>
      <div className='introduction border-b-2 border-white'><Introduction/></div>
      <div className='link border-b-2 border-white'><Links/></div>
      <div className='contact row-span-2 col-span-1 border-l-2 border-b-2 border-white w-full grid place-content-center'><ContactForm/></div>
    </div>
    </Layout>
  )
}

export default About