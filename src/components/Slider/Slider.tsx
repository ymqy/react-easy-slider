import React, { useCallback, useRef } from 'react';
import cx from 'classnames';
import { renderControls, NextButton, PreviousButton, Indicators } from '@/Components/Controls';
import Transition from '@/Components/Transition/Transition';
import { useDimensions, useSliderAutoplay, useControllableState } from '@/hooks';
import { getMouseEvents, getTouchEvents } from '@/shared';
import styles from './style.less';

import type { SwipeEvent } from '@/shared';
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
  wrapAround: false,
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
    dragging,
  } = props;

  const slideCount = React.Children.count(children);

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

  const swipeConfig = {
    swipeStart: () => {
      if (pauseOnHover) pauseAutoplay();
    },
    swipe: (e: SwipeEvent) => {
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
  };

  const touchEvents = getTouchEvents(swipeConfig);
  const mouseEvents = getMouseEvents(swipeConfig);

  return (
    <div className={cx(styles.slider)} style={{ width, height }}>
      <div ref={frameRef} {...mouseEvents} {...touchEvents} className={cx(styles['slider-frame'])}>
        <Transition
          {...{ dragging, slideHeight, slideWidth, currentSlide, slideCount, transitionMode }}
        >
          {children}
        </Transition>
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
