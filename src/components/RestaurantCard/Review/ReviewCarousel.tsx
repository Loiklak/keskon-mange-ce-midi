import { getReviewForRestaurant } from "@/core/avis/getReviewByRestaurant";
import { useEffect, useRef, useState } from "react";
import styles from "./ReviewCarousel.module.css";
import { slideLeftAnimation, slideRightAnimation } from "./keyframe";
import { ReviewInfos } from "@/core/avis/type/interface";
import { ReviewComponent } from "./ReviewComponent";

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
  const currentReviewArray: ReviewInfos[] = [];
  const changeCurrentCommentAndAnimateCarousel = (direction: Direction) => {
    const allSliderElem = document.querySelectorAll("[id=slider]");
    updateChangeStepDirectionAndAnimate(direction, allSliderElem);
  };

  const displayCurrentCommentAndSide = (reviewArray: ReviewInfos[]) => {
    return (
      <div className={styles.reviewContainer}>
        <ReviewComponent />
        <ReviewComponent />
        <ReviewComponent />
      </div>
    );
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
