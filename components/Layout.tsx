import Link from "next/link";
import React, { FC, useState } from "react";
import { LayoutProps } from "../types/types";
import Menu from "./Menu";

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenuHandler = (e: any) => {
    setIsOpenMenu(false);
  };
  return (
    <div>
      <header className="fixed t-0 h-12 flex justify-between px-2 border-b-2 border-white w-screen z-40 bg-def bg-none">
        <Link href="/" className="flex items-center ml-2">
          <object
            data="/logo.svg"
            type="image/svg+xml"
            className="xs:w-5 xs:h-5 w-7 h-7 m-2 ml-0 pointer-events-none"
          ></object>
          <h1 className="header-site-title pt-1 xs:text-lg text-4xl avenir font-extrabold">
            SO RESEARCH
          </h1>
        </Link>
        <button className="globalmenu m-2" onClick={() => setIsOpenMenu(true)}>
          <span className="xs:text-sm text-xl font-bold futura">MENU</span>
        </button>
      </header>
      <main className="pt-12 h-screen">{children}</main>

      {isOpenMenu && <Menu close={closeMenuHandler} />}
    </div>
  );
};

export default Layout;
