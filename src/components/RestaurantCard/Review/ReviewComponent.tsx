import {
  ReviewInfos,
  convertEvaluationToStringToDisplay,
} from "@/core/avis/type/interface";
import styles from "./ReviewComponent.module.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1B1kD-kZQiJUEYcSmAXom_lY7_JhOLp9UTq0Uf44wNY0/edit#gid=915087104";
interface ReviewComponentProps {
  review?: ReviewInfos;
}

interface ReviewComponentProps {
  reviewLeft?: ReviewInfos;
  reviewMiddle?: ReviewInfos;
  reviewRight?: ReviewInfos;
}

export const ReviewComponent: React.FC<ReviewComponentProps> = ({ reviewLeft, reviewMiddle, reviewRight}) => {
  return(
    <div className={styles.reviewContainerVisible} id="slider">
          <OneReviewComponent
            review={reviewLeft}
          />
          <OneReviewComponent
            review={reviewMiddle}
          />
          <OneReviewComponent
            review={reviewRight}
          />
    </div>
  )
};

export const OneReviewComponent: React.FC<ReviewComponentProps> = ({ review }) => {
  return review ? displayOneReviewComment(review) : displayNoReview();
};

export const displayOneReviewComment = (review: ReviewInfos) => {
  return (
    <div className={styles.review}>
      <p className={styles.evaluation}>
        {convertEvaluationToStringToDisplay(review.evaluation)}
      </p>
      <div className={styles.comment}>
        <p>❝ {review.comment} ❞</p>
      </div>
      <div className={styles.containerCommentAndAuthor}>
        <div>
          <p className={styles.addComment}>
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ajouter un commentaire !
            </a>
          </p>
        </div>
        <div>
          <p className={styles.author}>
            -{review.author ? review.author : "Anonyme"}
          </p>
        </div>
      </div>
    </div>
  );
};
export const displayNoReview = () => {
  return (
    <div className={styles.review}>
      <a
        href={GOOGLE_SHEET_URL}
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
