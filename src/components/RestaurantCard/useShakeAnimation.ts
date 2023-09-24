import { useRef } from "react";
import {
  focusInAnimation,
  shakeAnimation,
  focusOutAnimation,
} from "./keyframes";

const FOCUS_ANIMATION_DURATION = 100;
const SHAKE_ANIMATION_DURATION = 300;

/**
 * At the start of the animation the card will be focused in.
 * Then the card will shake on repeat until the animation is stopped.
 * When the animation is stopped the card will be focused out.
 */
export const useShakeAnimation = () => {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const shakeAnimationRef = useRef<Animation | undefined>(undefined);
  const shouldAnimateRef = useRef<boolean>(false);

  const startAnimate = () => {
    shouldAnimateRef.current = true;
    animateFocusIn()?.finished.then(() => {
      playShakeAnimationUntilShouldntAnimate();
    });
  };

  const animateFocusIn = () => {
    return animationContainerRef.current?.animate(focusInAnimation, {
      duration: FOCUS_ANIMATION_DURATION,
    });
  };

  const stopAnimate = () => {
    shouldAnimateRef.current = false;
  };

  const playShakeAnimationUntilShouldntAnimate = () => {
    animationContainerRef.current
      ?.animate(shakeAnimation, {
        duration: SHAKE_ANIMATION_DURATION,
      })
      ?.finished.then(() => {
        shakeAnimationRef.current = undefined;
        shouldAnimateRef.current
          ? playShakeAnimationUntilShouldntAnimate()
          : stopAndCleanAnimation();
      });
  };

  const stopAndCleanAnimation = () => {
    animationContainerRef.current?.animate(focusOutAnimation, {
      duration: FOCUS_ANIMATION_DURATION,
    });
  };

  return {
    startAnimate,
    stopAnimate,
    animationContainerRef,
  };
};
