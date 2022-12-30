import Link from "next/link";
import React, { FC } from "react";
import { LayoutProps } from "../types/types";
import Cube from "./Cube";

const Links: FC = () => {
  return (
    <div className="m-16 grid grid-rows-3 gap-4 relative">
      <div>
        <h2 className="font-bold text-xl futura">EMAIL</h2>
        <span>soresearching@gmail.com</span>
      </div>
      <div>
        <h2 className="font-bold text-xl futura">ADDRESS</h2>
        <span>東京都奥多摩郡</span>
      </div>
      <div>
        <h2 className="font-bold text-xl futura">SNS</h2>
        <span>非公開</span>
      </div>
    </div>
  );
};

export default Links;
