import { useRef } from "react";
import {
  focusInAnimation,
  shakeAnimation,
  focusOutAnimation,
} from "./keyframes";

const FOCUS_ANIMATION_DURATION = 100;
const SHAKE_ANIMATION_DURATION = 300;

export const useShakeAnimation = () => {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const shakeAnimationRef = useRef<Animation | undefined>(undefined);
  const shouldAnimateRef = useRef<boolean>(false);

  const startAnimate = () => {
    shouldAnimateRef.current = true;
    animateFocusIn()?.finished.then(() => {
      playShakeAnimation();
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

  const playShakeAnimation = () => {
    animationContainerRef.current
      ?.animate(shakeAnimation, {
        duration: SHAKE_ANIMATION_DURATION,
      })
      ?.finished.then(() => {
        shakeAnimationRef.current = undefined;
        shouldAnimateRef.current
          ? playShakeAnimation()
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
