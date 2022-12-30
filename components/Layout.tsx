import Link from "next/link";
import React, { FC, useState } from "react";
import { LayoutProps } from "../types/types";
import Menu from "./Menu";
import { motion } from "framer-motion";

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenuHandler = (e: any) => {
    setIsOpenMenu(false);
  };
  return (
    <div>
      <header className="fixed t-0 h-12 flex justify-between px-2 border-b-2 border-white w-screen z-40 bg-def bg-none">
        <Link href="/" className="flex items-center ml-2">
          <h1 className="header-site-title pt-1 xs:text-lg text-4xl avenir font-extrabold">
            SO RESEARCH
          </h1>
        </Link>
        <button
          className="globalmenu m-2"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <span className="xs:text-sm text-xl font-bold futura">
            {!isOpenMenu ? "MENU" : "CLOSE"}
          </span>
        </button>
      </header>
      {/* <main className="pt-12 h-screen">{children}</main> */}
      <motion.main
        initial={{ opacity: 0, y: -500 }} // 初期状態
        animate={{ opacity: 1, y: 0 }} // マウント時
        exit={{ y: 1000, transition: { duration: 0.5 } }} // アンマウント時
        transition={{
          duration: 1,
        }}
        className="pt-12 md:h-screen "
      >
        {children}
      </motion.main>

      {isOpenMenu && <Menu close={closeMenuHandler} />}
    </div>
  );
};

export default Layout;
