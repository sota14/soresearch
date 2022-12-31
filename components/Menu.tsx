import React, { useState } from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

type Props = {
  close: (e: any) => void;
};

const Menu: React.FC<Props> = (props) => {
  const unmount = useAnimation();
  const clickLink = () => {
    unmount
      .start({
        opacity: 0,
        scale: [1, 0.9, 1.1],
        transition: { duration: 0.3 },
      })
      .then(props.close);
  };
  return (
    <>
      <div className={styles.menu}>
        <motion.div animate={unmount}>
          <section className={styles.panel}>
            <div className="menu-wrap grid gap-6 font-bold xs:text-center">
              <Link href="/" onClick={clickLink}>
                TOP
              </Link>
              <Link href="/works" onClick={clickLink}>
                WORKS
              </Link>
              <Link href="/about#introduction" onClick={clickLink}>
                ABOUT
              </Link>
              <Link href="/about#contact" onClick={clickLink}>
                CONTACT
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default Menu;
