import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { IndexProps, PageType, Params } from "../../types/types";
import Layout from "../../components/Layout";
import { fetchBlogPages } from "../../utils/notion";
import Card from "../../components/Card";
import BlogCard from "../../components/BlogCard";

export const getStaticProps: GetStaticProps = async () => {
  const { results, next_cursor } = await fetchBlogPages({});
  // const recommends = await fetchPages({}).then();
  return {
    props: {
      pages: results ? results : [],
      nextCur: next_cursor ? next_cursor : [],
      // recommends: recommends ? recommends.results ? recommends.results : [] :[]
    },
    revalidate: 10,
  };
};

const Home: NextPage<IndexProps> = ({ pages, nextCur, recommends }) => {
  return (
    <Layout>
      <div className="pt-1 w-full col-span-4">
        <div className="grid sm:gap-6 px-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-12 overflow-auto">
          {/* Card */}
          {pages.map((page, index) => (
            <BlogCard key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
