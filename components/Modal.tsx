import React, { useState } from "react";
import styles from "./Modal.module.scss";

type Props = {
  close: (e: any) => void;
  modalText:string;
};

const Modal: React.FC<Props> = (props) => {

  return (
    <>
      <div
        className={styles.modal}
      >
        <div>
          
            <section 
            className={styles.panel}
            >
            <div>{props.modalText}</div>
            <footer>
                <button type="button" onClick={props.close}>
                OK
                </button>
            </footer>
            </section>
        </div>
      </div>
    </>
  );
};

export default Modal;