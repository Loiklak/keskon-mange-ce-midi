import useMousePosition from "@/hooks/useMousePosition";
import styles from "./TrackingEye.module.css";
import { useRef, useState, useEffect } from "react";

const TrackingEye = () => {
  const mousePosition = useMousePosition();

  const boxRef = useRef<HTMLDivElement | null>(null);

  const [xEye, setXEye] = useState<number>();
  const [yEye, setYEye] = useState<number>();
  const [xTranslation, setXTranslation] = useState<number>(0);
  const [yTranslation, setYTranslation] = useState<number>(0);

  const getPosition = () => {
    var element: null | HTMLElement | Element = boxRef.current;
    var y = 0;
    var x = 0;
    while (element) {
      if (element instanceof HTMLElement) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      }
    }

    setXEye(x);
    setYEye(y);
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  useEffect(() => {
    if (mousePosition.x && xEye) {
      setXTranslation((100 * (mousePosition.x - xEye)) / window.innerWidth);
    } else {
      setXTranslation(0);
    }
    if (mousePosition.y && yEye) {
      setYTranslation((100 * (mousePosition.y - yEye)) / innerHeight);
    } else {
      setYTranslation(0);
    }
  }, [mousePosition, xEye, yEye]);

  return (
    <div>
      <div className={styles.eye}>
        <div
          className={styles.eyeBall}
          style={{
            transform:
              "translate(" +
              String(-50 + xTranslation) +
              "%, " +
              String(-50 + yTranslation) +
              "%)",
          }}
          ref={boxRef}
        />
      </div>
    </div>
  );
};

export default TrackingEye;
