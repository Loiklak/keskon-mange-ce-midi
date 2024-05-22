import styles from "./ReviewComponent.module.css";

interface ReviewComponentProps {
  review?: ReviewInfos;
}

export const ReviewComponent: React.FC<ReviewComponentProps> = ({ review }) => {
  return review ? <div>comment</div> : displayNoReview();
};
export const displayNoReview = () => {
  return (
    <div className={styles.review} id="slider">
      <a
        href="https://docs.google.com/spreadsheets/d/1B1kD-kZQiJUEYcSmAXom_lY7_JhOLp9UTq0Uf44wNY0/edit#gid=915087104"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className={styles.evaluation}>No evaluation</p>
        <div className={styles.comment}>
        Deviens la première personne à ajouter un commentaire !
        </div>
      </a>
    </div>
  );
};
