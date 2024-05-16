import { getReviewForRestaurant } from "@/core/avis/getReviewByRestaurant";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./Review.module.css";
import { slideLeftAnimation, slideRightAnimation } from "./keyframe";
import {
  ReviewInfos,
  convertEvaluationToStringToDisplay,
} from "@/core/avis/type/interface";

const WAIT_TIME = 45000;
const TRANSLATION_DURATION = 500;

type RestaurantNameProps = {
  restaurantName: string;
};

export const ReviewItem = ({ restaurantName }: RestaurantNameProps) => {
  const [currentReviewArray, setCurrentReviewArray] = useState<ReviewInfos[]>(
    []
  );
  const [numberOfReview, setnumberOfReview] = useState<number>();
  const [myVariable, setMyVariable] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateVariable = () => {
      timerRef.current = setTimeout(
        () => handleEvent(Direction.NEXT),
        WAIT_TIME
      );
    };

    var reviewArray: ReviewInfos[] = [];

    updateVariable();
    if (restaurantName) {
      getReviewForRestaurant(restaurantName).then((reviewArray) => {
        setCurrentReviewArray(reviewArray);
      });
    } else {
      setCurrentReviewArray(reviewArray);
    }
    setnumberOfReview(reviewArray.length);

    return () => clearTimeout(timerRef.current);
  }, [restaurantName]);

  enum Direction {
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT",
    STAY = "STAY",
  }
  const handleEvent = (direction: Direction) => {
    clearTimeout(timerRef.current);
    var step = 0;
    var sliderElem = document.getElementById("slider");
    var allSliderElem = document.querySelectorAll("[id=slider]");
    switch (direction) {
      case Direction.PREVIOUS:
        step = -1;
        allSliderElem.forEach((elem) =>
          elem.animate(slideLeftAnimation, {
            duration: TRANSLATION_DURATION,
          })
        );
        break;
      case Direction.NEXT:
        step = 1;
        allSliderElem.forEach((elem) =>
          elem.animate(slideRightAnimation, {
            duration: TRANSLATION_DURATION,
          })
        );
        break;

      case Direction.STAY:
        step = 0;
        break;
    }

    sleep(TRANSLATION_DURATION).then(() =>
      setMyVariable((prevValue) => prevValue + step)
    );
    timerRef.current = setTimeout(() => handleEvent(Direction.NEXT), WAIT_TIME);
  };
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  var dictCom = {
    0: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    1: "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    2: "Duis semper.",
  };
  const displayOneReviewComment = (review: ReviewInfos) => {
    return (
      <div className={styles.review} id="slider">
        <p className={styles.evaluation}>
          {convertEvaluationToStringToDisplay(review.evaluation)}
        </p>
        <div className={styles.comment}>
          <p>❝ {review.comment} ❞</p>
        </div>
      </div>
    );
  };
  const mod = (numberToDivide: number, divisor: number): number => {
    return ((numberToDivide % divisor) + divisor) % divisor;
  };

  const displayCurrentCommentAndSide = (reviewArray: ReviewInfos[]) => {
    console.log(reviewArray);
    if (reviewArray?.length > 0) {
      return (
        <div className={styles.reviewContainer}>
          {displayOneReviewComment(
            reviewArray[mod(myVariable + 1, reviewArray?.length)]
          )}{" "}
          {displayOneReviewComment(
            reviewArray[mod(myVariable, reviewArray?.length)]
          )}
          {displayOneReviewComment(
            reviewArray[mod(myVariable - 1, reviewArray?.length)]
          )}
        </div>
      );
    } else {
      return (
        <div className={styles.reviewContainer}>
          <div className={styles.review} id="slider">
            Deviens la première personne à ajouter un commentaire ! <br />
            com n°{mod(myVariable + 1, 3)}
            <br />
            {dictCom[mod(myVariable + 1, 3)]}
          </div>
          <div className={styles.review} id="slider">
            Deviens la première personne à ajouter un commentaire !<br />
            com n°{mod(myVariable, 3)}
            <br />
            {dictCom[mod(myVariable, 3)]}
          </div>
          <div className={styles.review} id="slider">
            Deviens la première personne à ajouter un commentaire !<br />
            com n°{mod(myVariable - 1, 3)}
            <br />
            {dictCom[mod(myVariable - 1, 3)]}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className={styles.reviewAndButtonContainer}>
        <button onClick={() => handleEvent(Direction.PREVIOUS)}> &lt; </button>

        {displayCurrentCommentAndSide(currentReviewArray)}

        <button onClick={() => handleEvent(Direction.NEXT)}> &gt;</button>
      </div>
    </div>
  );
};
