import styles from "./Rat.module.css";
import TrackingEye from "./TrackingEye/TrackingEye";

const Rat = () => {
  return (
    <div className={styles.rat}>
      <img height={40} src="/chef-rat.png" alt="rat" />
      <div className={styles.bg_red}>
        <TrackingEye />
      </div>
      <div className={styles.bg_black}>
        <TrackingEye />
      </div>
    </div>
  );
};
export default Rat;
