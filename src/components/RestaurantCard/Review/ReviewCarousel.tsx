import { getReviewForRestaurant } from "@/core/avis/getReviewByRestaurant";
import { useEffect, useRef, useState } from "react";
import styles from "./ReviewCarousel.module.css";
import { slideLeftAnimation, slideRightAnimation } from "./keyframe";
import { ReviewInfos } from "@/core/avis/type/interface";
import { ReviewComponent } from "./ReviewComponent";

const WAIT_TIME = 1500;
const TRANSLATION_DURATION = 500;

type RestaurantNameProps = {
  restaurantName: string;
};

enum Direction {
  PREVIOUS = "PREVIOUS",
  NEXT = "NEXT",
  STAY = "STAY",
}
export const ReviewCarousel = ({ restaurantName }: RestaurantNameProps) => {
  const [currentReviewArray, setCurrentReviewArray] = useState<ReviewInfos[]>(
    []
  );
  const [numberOfReview, setNumberOfReview] = useState<number>(1);

  const [indexOfDisplayedComments, setIndexOfDisplayedComments] = useState({
    left: 0,
    middle: 1,
    right: 2,
  });

  const timerRef = useRef<NodeJS.Timeout>();

  const createTimerChangingCurrentCommentAfterIt = () => {
    timerRef.current = setTimeout(
      () => changeCurrentCommentAndAnimateCarousel(Direction.NEXT),
      WAIT_TIME
    );
  };

  useEffect(() => {
    var reviewArray: ReviewInfos[] = [];
    createTimerChangingCurrentCommentAfterIt();
    if (restaurantName) {
      const asynGetReviewForRestaurant = async () => {
        reviewArray = await getReviewForRestaurant(restaurantName);
      };
      asynGetReviewForRestaurant().then(() => {
        if (reviewArray) {
          setCurrentReviewArray(reviewArray);
          setNumberOfReview(reviewArray.length);
        } else {
          setCurrentReviewArray(reviewArray);
          setNumberOfReview(1);
        }
      });
    } else {
      setCurrentReviewArray(reviewArray);
      setNumberOfReview(1);
    }
    return () => clearInterval(timerRef.current);
  }, [restaurantName]);

  const changeCurrentCommentAndAnimateCarousel = (direction: Direction) => {
    const allSliderElem = document.querySelectorAll("[id=slider]");
    updateChangeStepDirectionAndAnimate(direction, allSliderElem);
    timerRef.current = setTimeout(
      () => changeCurrentCommentAndAnimateCarousel(Direction.NEXT),
      WAIT_TIME
    );
  };

  const displayCurrentCommentAndSide = (reviewArray: ReviewInfos[]) => {
    if (reviewArray?.length > 0) {
      return (
        <div className={styles.reviewContainer}>
          <ReviewComponentMiddleAndSides
            reviewLeft={reviewArray[indexOfDisplayedComments.left]}
            reviewMiddle={reviewArray[indexOfDisplayedComments.middle]}
            reviewRight={reviewArray[indexOfDisplayedComments.right]}
          />
        </div>
      );
    } else {
    return (
      <div className={styles.reviewContainer}>
          <ReviewComponentMiddleAndSides/>
      </div>
    );
    }
  };

  return (
    <div>
      <div className={styles.reviewAndButtonContainer}>
        <button
          onClick={() =>
            changeCurrentCommentAndAnimateCarousel(Direction.PREVIOUS)
          }
        >
          &lt;
        </button>

        {displayCurrentCommentAndSide(currentReviewArray)}

        <button
          onClick={() => changeCurrentCommentAndAnimateCarousel(Direction.NEXT)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
function updateChangeStepDirectionAndAnimate(
  direction: Direction,
  allSliderElem: NodeListOf<Element>
) {
  switch (direction) {
    case Direction.NEXT:
      allSliderElem.forEach((elem) =>
        elem.animate(slideLeftAnimation, {
          duration: TRANSLATION_DURATION,
        })
      );
      return +1;
    case Direction.PREVIOUS:
      allSliderElem.forEach((elem) =>
        elem.animate(slideRightAnimation, {
          duration: TRANSLATION_DURATION,
        })
      );
      return -1;
    case Direction.STAY:
      return 0;
  }
}
