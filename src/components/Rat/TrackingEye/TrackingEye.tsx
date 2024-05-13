import useMousePosition from "@/hooks/useMousePosition";
import useScrollPosition from "@/hooks/useScrollPostition";
import styles from "./TrackingEye.module.css";
import { useRef, useState, useEffect } from "react";

const TrackingEye = () => {
  const mousePosition = useMousePosition();
  const scrollPositionY = useScrollPosition();

  const boxRef = useRef<HTMLDivElement | null>(null);

  const [xEye, setXEye] = useState<number>();
  const [yEye, setYEye] = useState<number>();
  const [xTranslation, setXTranslation] = useState<number>(0);
  const [yTranslation, setYTranslation] = useState<number>(0);

  const getPosition = () => {
    var element: null | HTMLElement | Element = boxRef.current;
    var x = 0;
    var y = 0;
    console.log("scrollX : %d", window.scrollX);
    console.log("scrollY : %d", window.scrollY);
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
    }
    if (mousePosition.y && yEye) {
      setYTranslation(
        (100 * (mousePosition.y + scrollPositionY - yEye)) / innerHeight
      );
    }
  }, [mousePosition, xEye, yEye, scrollPositionY]);

  return (
    <div>
      <div className={styles.eye}>
        <div
          className={styles.eyeBall}
          style={{
            transform: `translate(${-50 + xTranslation}%, ${
              50 + yTranslation
            }%)`,
          }}
          ref={boxRef}
        />
      </div>
    </div>
  );
};

export default TrackingEye;
