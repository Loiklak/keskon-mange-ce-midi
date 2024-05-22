import styles from "./ReviewComponent.module.css";

export const displayNoReview = () => {
  return (
    <div className={styles.review} id="slider">
      <a
        href="https://docs.google.com/spreadsheets/d/1B1kD-kZQiJUEYcSmAXom_lY7_JhOLp9UTq0Uf44wNY0/edit#gid=915087104"
        target="_blank"
        rel="noopener noreferrer"
      >
        Deviens la première personne à ajouter un commentaire !
      </a>
    </div>
  );
};
