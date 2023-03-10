import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { LayoutProps } from "../types/types";

const Introduction: FC = () => {
  return (
    <div className="m-16 grid lg:grid-cols-2">
      <img src="/profile_so.jpg" className="object-cover"></img>
      {/* <Image
        src="/profile_so.jpg"
        alt="profile_so"
        fill
        className="object-cover"
      ></Image> */}
      <article className="lg:pl-6 pt-2 lg:pt-0">
        <h2 className="font-bold text-xl futura">
          SO<span className="ml-2">ソー</span>
        </h2>
        <p className="text-sm">1997年 東京都練馬区生まれ。</p>
        <p className="text-sm">
          青山学院大学経営学部を卒業後、エンジニアとして就職。2023年に退職し、現在フリーランス。
        </p>
        <p className="text-sm">
          Webアプリ開発やサイト制作が得意で、写真・映像・グラフィックデザインなども広範にカバーする。
        </p>
      </article>
    </div>
  );
};

export default Introduction;
