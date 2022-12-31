import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "../../components/Layout";
import { WorkDetailProps, Params } from "../../types/types";
import NotionBlocks from "../../components/renderer/NotionBlocks";
import Image from "next/image";
import { fetchAllBlocksByPageId, fetchPages } from "../../utils/notion";
import {
  getCover,
  getDate,
  getLocalImage,
  getMultiSelect,
  getText,
  getYearMonth,
} from "../../utils/property";

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  // const recommends = await fetchPages({}).then();

  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page ? page.id : "";
  const { results: blocks } = await fetchAllBlocksByPageId(pageId);

  return {
    props: {
      page: page,
      pageId: pageId ? pageId : null,
      blocks: blocks,
      // recommends: recommends ? recommends.results ? recommends.results : [] :[]
    },
    revalidate: 10,
  };
};

const WorkDetail: NextPage<WorkDetailProps> = ({ page, blocks, pageId }) => {
  return (
    <Layout>
      <div className="xs:mx-2 sm:mx-6 grid md:grid-cols-3 overflow-y-scroll md:h-full">
        {/* 画像 */}
        <div className="bg-fixed md:col-span-2 md:m-8">
          <img
            className="mx-auto"
            src={getLocalImage(page.properties.slug.rich_text)}
          ></img>
          {/* image */}
          {/* <div className="flex justify-center">
            {" "}
            <Image
              className="static justify-center"
              src={getCover(page.cover)}
              alt=""
              objectFit="cover"
              width={640}
              height={360}
              quality={50}
            />
          </div> */}
        </div>
        <div className="overflow-x-hidden xs:h-max md:overflow-y-scroll pt-8">
          {/* タイトル */}
          <h1 className="mb-1 text-4xl font-bold z-20">
            {getText(page.properties.name.title)}
          </h1>
          {/* 制作年 */}
          <div className="mb-1 text-xl z-20">
            {getYearMonth(page.properties.workDate.date)}
          </div>
          {/* タグ */}
          <div className="mb-6 z-20 md:mt-4">
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag: string, index: number) => (
                <span className="tag md:p-2" key={index}>{`#${tag} `}</span>
              )
            )}
          </div>
          {/* 本文 */}
          <section className="z-20">
            <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
          </section>
        </div>
      </div>
    </Layout>
  );
};
export default WorkDetail;
