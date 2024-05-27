import { getReviewForRestaurant } from "@/core/avis/getReviewByRestaurant";
import { useEffect, useRef, useState } from "react";
import styles from "./ReviewCarousel.module.css";
import { slideLeftAnimation, slideRightAnimation, waitLeftAnimation, waitRightAnimation } from "./keyframe";
import { ReviewInfos } from "@/core/avis/type/interface";
import {  ReviewComponentMiddleAndSides } from "./ReviewComponent";

const WAIT_TIME = 15000;
const TRANSLATION_DURATION = 500;
const EPSILON_DURATION = 100;

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
    clearTimeout(timerRef.current);
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

  const changeIndexOfSideComments = (changeStep : number) =>{
    setIndexOfDisplayedComments(({ left, middle: middle, right }) => ({
      left: mod(left + changeStep, numberOfReview),
      middle,
      right: mod(right + changeStep, numberOfReview),
    }))};
    
  const changeIndexOfMiddleComment = (changeStep : number) =>{
      setIndexOfDisplayedComments(({ left, middle, right }) => ({
        left: left,
        middle: mod(middle + changeStep, numberOfReview),
        right: right,
      }))};

  function updateDisplayedCommentsAndAnimate(
    slideAnimation: any,
    waitAnimation:any,
    allSliderElem: NodeListOf<Element>,
    changeStep: number
    ){
      allSliderElem.forEach((elem) => {
        elem.animate(slideAnimation, {
          duration: TRANSLATION_DURATION,
        }).onfinish = () =>{
          changeIndexOfMiddleComment(changeStep);
          elem.animate(waitAnimation, {
            duration: EPSILON_DURATION,
          }).onfinish = () => {
            changeIndexOfSideComments(changeStep);
          };
        }
        });
  }
  function updateDisplayedCommentsAndAnimateDependingOnDirection(
    direction: Direction,
    allSliderElem: NodeListOf<Element>
    ) {
    switch (direction){ 
      case Direction.NEXT:
        updateDisplayedCommentsAndAnimate(slideLeftAnimation,waitLeftAnimation, allSliderElem, 1)
        break;
      case Direction.PREVIOUS:
        updateDisplayedCommentsAndAnimate(slideRightAnimation,waitRightAnimation, allSliderElem, -1)
        break;
      case Direction.STAY:
        break;
    }
  };

  const changeCurrentCommentAndAnimateCarousel = (direction: Direction) => {
    const allSliderElem = document.querySelectorAll("[id=slider]");
    updateDisplayedCommentsAndAnimateDependingOnDirection(
      direction,
      allSliderElem
    );
    createTimerChangingCurrentCommentAfterIt();
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

const mod = (numberToDivide: number, divisor: number): number => {
  return ((numberToDivide % divisor) + divisor) % divisor;
};
