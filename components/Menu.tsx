import React, { useState } from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";

type Props = {
  close: (e: any) => void;
};

const Menu: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.modal}>
        <div>
          <section className={styles.panel}>
            <div className="menu-wrap grid grid-rows-2 grid-cols-2">
              <Link href="/" onClick={props.close}>
                TOP
              </Link>
              <Link href="/works" onClick={props.close}>
                WORKS
              </Link>
              <Link href="/about#introduction" onClick={props.close}>
                ABOUT
              </Link>
              <Link href="/about#contact" onClick={props.close}>
                CONTACT
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Menu;
