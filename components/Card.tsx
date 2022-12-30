import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { CardProps } from "../types/types";
import { motion } from "framer-motion";
import {
  getCover,
  getDate,
  getMultiSelect,
  getText,
  getYearMonth,
} from "../utils/property";

const Card: FC<CardProps> = ({ page }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        href={{ pathname: `/works/${getText(page.properties.slug.rich_text)}` }}
        as={`/works/${getText(page.properties.slug.rich_text)}`}
        className=""
      >
        <div className="shadow-lg grid mx-auto my-4 md:my-0 overflow-hidden max-w-sm bg-white">
          {/* image */}
          <div className="">
            {" "}
            <Image
              className="w-full static w-full h-auto"
              src={getCover(page.cover)}
              alt=""
              objectFit="cover"
              width={320}
              height={180}
              quality={50}
            />
          </div>
        </div>
        <div className="m-2 text-center">
          {/* タイトル */}
          <h2 className="mb-1 text-xl font-bold z-20">
            {getText(page.properties.name.title)}
          </h2>
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
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
