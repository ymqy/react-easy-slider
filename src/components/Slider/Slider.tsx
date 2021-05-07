import React, { useCallback, useRef } from 'react';
import cx from 'classnames';
import { renderControls, NextButton, PreviousButton, Indicators } from '@/Components/Controls';
import * as Transitions from '@/Components/Transition';
import { useDimensions, useSliderAutoplay, useTouchEvents, useControllableState } from '@/hooks';
import styles from './style.less';

import type { SliderProps } from '@/typings/props';

const defaultProps: Partial<SliderProps> = {
  autoplay: false,
  autoplayInterval: 3000,
  slideIndex: 0,
  transitionMode: 'fade',
  height: 'inherit',
  heightMode: 'max',
  initialSlideHeight: 100,
  width: '100%',
  dragging: true,
  pauseOnHover: true,
  renderBottomCenterControls: (props) => <Indicators {...props} />,
  renderCenterLeftControls: (props) => <PreviousButton {...props} />,
  renderCenterRightControls: (props) => <NextButton {...props} />,
};

function Slider(_props: SliderProps) {
  const props = { ...defaultProps, ..._props };
  const {
    autoplay,
    children,
    transitionMode,
    slideIndex,
    pauseOnHover,
    autoplayInterval,
    heightMode,
    width,
    height,
    initialSlideHeight,
    wrapAround,
  } = props;

  const slideCount = React.Children.count(children);
  const TransitionControls = Transitions[transitionMode];

  const frameRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useControllableState<number>(slideIndex);
  const [slideWidth, slideHeight] = useDimensions({
    heightMode,
    currentSlide,
    initialSlideHeight,
    frame: frameRef.current,
  });

  const nextSlide = useCallback(
    () =>
      setCurrentSlide((i) => {
        let next = i;
        if (i < slideCount - 1) {
          next = i + 1;
        } else if (wrapAround) {
          next = (i + 1) % slideCount;
        }
        return next;
      }),
    [setCurrentSlide, slideCount, wrapAround],
  );

  const previousSlide = useCallback(
    () =>
      setCurrentSlide((i) => {
        let previous = i;
        if (i >= 1) {
          previous = i - 1;
        } else if (wrapAround) {
          previous = (slideCount + i - 1) % slideCount;
        }
        return previous;
      }),
    [setCurrentSlide, slideCount, wrapAround],
  );

  const [unpauseAutoplay, pauseAutoplay] = useSliderAutoplay({
    autoplay,
    autoplayInterval,
    callback: nextSlide,
  });

  useTouchEvents(frameRef.current, {
    swipeStart: () => {
      if (pauseOnHover) pauseAutoplay();
    },
    swipe: (e) => {
      switch (e.direction) {
        case 'Left':
          nextSlide();
          break;
        case 'Right':
          previousSlide();
          break;
        default:
          break;
      }

      if (autoplay) unpauseAutoplay();
    },
  });

  return (
    <div className={cx(styles.slider)} style={{ width, height }}>
      <div ref={frameRef} className={cx(styles['slider-frame'])}>
        <TransitionControls {...{ heightMode, slideHeight, slideWidth, currentSlide, slideCount }}>
          {children}
        </TransitionControls>
      </div>
      {renderControls(props, {
        slideHeight,
        slideCount,
        currentSlide,
        goToSlide: setCurrentSlide,
        nextSlide,
        previousSlide,
      })}
    </div>
  );
}

export default Slider;
