import React, { useState } from "react";
import styles from "./Modal.module.scss";
import { motion, useAnimation } from "framer-motion";

type Props = {
  close: (e: any) => void;
  modalText: string;
};

const Modal: React.FC<Props> = (props) => {
  const unmount = useAnimation();
  const clickOk = () => {
    unmount
      .start({
        opacity: 0,
        transition: { duration: 0.3 },
      })
      .then(props.close);
  };
  return (
    <>
      <motion.div className={styles.modal} animate={unmount}>
        <div>
          <section className={styles.panel}>
            <div>{props.modalText}</div>
            <footer>
              <button type="button" onClick={clickOk}>
                OK
              </button>
            </footer>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
