import { getRestaurantNameToReview } from "@/core/avis/getReviewByRestaurant";
import { ReviewInfos } from "@/core/avis/type/interface";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styles from "./ReviewCarousel.module.css";
import { ReviewComponent } from "./ReviewComponent";
import {
  slideLeftAnimation,
  slideRightAnimation,
  waitLeftAnimation,
  waitRightAnimation,
} from "./keyframe";

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
  const {
    data: dataReview,
    isLoading: isLoadingReview,
    isError: isErrorReview,
  } = useQuery("reviewData", getRestaurantNameToReview, {
    refetchIntervalInBackground: false, // 15 mins
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchInterval: 15 * (60 * 1000), // 15 mins
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

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

  const initCarouselAutoAnimation = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => changeCurrentCommentAndAnimateCarousel(Direction.NEXT),
      WAIT_TIME
    );
  };
  const asynGetReviewForRestaurantUsingUseQuery = () => {
    const reviewArray = dataReview?.[restaurantName];
    if (reviewArray) {
      setCurrentReviewArray(reviewArray);
      setNumberOfReview(reviewArray.length);
    } else {
      setCurrentReviewArray([]);
      setNumberOfReview(1);
    }
  };

  useEffect(() => {
    initCarouselAutoAnimation();
    if (restaurantName && !isLoadingReview) {
      asynGetReviewForRestaurantUsingUseQuery();
    } else {
      setCurrentReviewArray([]);
      setNumberOfReview(1);
    }
    return () => clearInterval(timerRef.current);
  }, [restaurantName, isLoadingReview]);

  const changeIndexOfSideComments = () => {
    setIndexOfDisplayedComments(({ left, middle: middle, right }) => ({
      left: mod(middle - 1, numberOfReview),
      middle,
      right: mod(middle + 1, numberOfReview),
    }));
  };

  const changeIndexOfMiddleComment = (changeStep: number) => {
    setIndexOfDisplayedComments(({ left, middle, right }) => ({
      left: left,
      middle: mod(middle + changeStep, numberOfReview),
      right: right,
    }));
  };

  function updateDisplayedCommentsAndAnimate(
    slideAnimation: any,
    waitAnimation: any,
    allSliderElem: NodeListOf<Element>,
    changeStep: number
  ) {
    allSliderElem.forEach((elem) => {
      elem.animate(slideAnimation, {
        duration: TRANSLATION_DURATION,
        easing: "ease-in",
      }).onfinish = () => {
        changeIndexOfMiddleComment(changeStep);
        elem.animate(waitAnimation, {
          duration: EPSILON_DURATION,
        }).onfinish = () => {
          changeIndexOfSideComments();
        };
      };
    });
  }
  function updateDisplayedCommentsAndAnimateDependingOnDirection(
    direction: Direction,
    allSliderElem: NodeListOf<Element>
  ) {
    switch (direction) {
      case Direction.NEXT:
        updateDisplayedCommentsAndAnimate(
          slideLeftAnimation,
          waitLeftAnimation,
          allSliderElem,
          1
        );
        break;
      case Direction.PREVIOUS:
        updateDisplayedCommentsAndAnimate(
          slideRightAnimation,
          waitRightAnimation,
          allSliderElem,
          -1
        );
        break;
      case Direction.STAY:
        break;
    }
  }

  const changeCurrentCommentAndAnimateCarousel = (direction: Direction) => {
    const allSliderElem = document.querySelectorAll("[id=slider]");
    updateDisplayedCommentsAndAnimateDependingOnDirection(
      direction,
      allSliderElem
    );
    initCarouselAutoAnimation();
  };

  const displayCurrentCommentAndSide = (reviewArray: ReviewInfos[]) => {
    if (reviewArray?.length > 0) {
      return (
        <div className={styles.reviewContainer}>
          <ReviewComponent
            reviewLeft={reviewArray[indexOfDisplayedComments.left]}
            reviewMiddle={reviewArray[indexOfDisplayedComments.middle]}
            reviewRight={reviewArray[indexOfDisplayedComments.right]}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.reviewContainer}>
          <ReviewComponent />
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
