import styles from "./Rat.module.css";
import TrackingEye from "./TrackingEye/TrackingEye";

const Rat = () => {
  return (
    <div className={styles.rat}>
      <img height={40} src="/chef-rat.png" alt="rat" />
      <div className={styles.oeil_a_droite}>
        <TrackingEye />
      </div>
      <div className={styles.oeil_a_gauche}>
        <TrackingEye />
      </div>
    </div>
  );
};
export default Rat;
