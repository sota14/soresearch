import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { CardProps } from "../types/types";
import { motion } from "framer-motion";
import {
  getCover,
  getDate,
  getLocalImage,
  getMultiSelect,
  getText,
  getYearMonth,
} from "../utils/property";

const BlogCard: FC<CardProps> = ({ page }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="shadow-md m-5 border-1">
      <Link
        href={{ pathname: `/blog/${getText(page.properties.slug.rich_text)}` }}
        as={`/blog/${getText(page.properties.slug.rich_text)}`}
        className=""
      >
        {/* <div className="shadow-lg grid mx-auto my-4 md:my-0 overflow-hidden max-w-sm bg-white">
            {/* image */}
        {/* <img
              className="mx-auto"
              src={getLocalImage(page.properties.slug.rich_text)}
            ></img> */}
        {/*<div className="">
            {" "}
            <Image
              className="w-full static w-full h-auto"
              // src={getCover(page.cover)}
              src={getLocalImage(page.properties.slug.rich_text)}
              alt=""
              objectFit="cover"
              width={320}
              height={180}
              quality={50}
            />
          </div>
        </div> */}
        <div className="m-2 text-left">
          {/* タイトル */}
          <h2 className="leading-tight text-xl font-bold">
            {getText(page.properties.name.title)}
          </h2>
          {/* 制作年 */}
          <div className="text-xl z-20">
            {getYearMonth(page.properties.published.date)}
          </div>
          {/* タグ */}
          <div className="z-20">
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag: string, index: number) => (
                <span className="tag md:p-2" key={index}>{`#${tag} `}</span>
              )
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
