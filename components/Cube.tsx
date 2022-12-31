import { useAnimationFrame } from "framer-motion";
import React, { useRef } from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import styles from "./Cube.module.scss";

type CubeProps = {
  height: number;
  width: number;
};

const Cube: React.FC<CubeProps> = ({ height, width }) => {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    // const rotate = 160;
    const y = Math.sin(t / 1200) * 40;
    const x = Math.cos(t / 1200) * 40;
    const rotate = Math.sin(t / 10000) * 200;
    // const y = (1 + Math.sin(t / 1000)) * -30;
    if (ref && ref.current) {
      ref.current.style.transform = `translateY(${y}px) translateX(${x}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <div
      className={`${styles.cubeContainer} h-screen absolute`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: "50%",
        left: "50%",
        transform: "translateY(-50%) translateX(-50%)",
      }}
    >
      <div ref={ref} style={{ width: `${width}px`, height: `${height}px` }}>
        <div style={{ transform: `rotateY(0deg) translateZ(${height / 2}px)` }}>
          {/* FRONT */}
        </div>
        <div
          style={{ transform: `rotateY(180deg) translateZ(${height / 2}px)` }}
        >
          {/* BACK */}
        </div>
        <div
          style={{ transform: `rotateX(90deg) translateZ(${height / 2}px)` }}
        >
          {/* RIGHT */}
        </div>
        <div
          style={{ transform: `rotateX(270deg) translateZ(${height / 2}px)` }}
        >
          {/* LEFT */}
        </div>
        <div
          style={{ transform: `rotateY(270deg) translateZ(${width / 2}px)` }}
        >
          {/* TOP */}
        </div>
        <div style={{ transform: `rotateY(90deg) translateZ(${width / 2}px)` }}>
          {/* BOTTOM */}
        </div>
      </div>
    </div>
  );
};

export default Cube;
