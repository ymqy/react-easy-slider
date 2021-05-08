import React from 'react';
import cx from 'classnames';
import styles from './style.less';

import type { TransitionProps } from '@/typings/props';

function Transition(props: TransitionProps) {
  const {
    children,
    dragging,
    slideWidth: slidewidth,
    slideHeight: slideheight,
    autoGenerateStyleTag,
  } = props;
  return (
    <div
      className={cx(styles['slider-list'])}
      style={{
        cursor: dragging === true ? 'pointer' : 'inherit',
        width: slidewidth,
        height: slideheight,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          className={cx(styles.slide, autoGenerateStyleTag ? 'slide-item' : '')}
          style={getSlideStyles(props, index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

function getSlideStyles(props: TransitionProps, index: number) {
  const { currentSlide, slideCount, slideHeight, slideWidth, transitionMode } = props;

  const previousIndex = (slideCount + currentSlide - 1) % slideCount;
  const nextIndex = (currentSlide + 1) % slideCount;
  const isPrevious = previousIndex === index;
  const isNext = nextIndex === index;
  const isActive = currentSlide === index;

  let transform = 'translateX(0)';
  if (isPrevious && slideCount > 1) {
    transform = transitionMode === 'fade' ? 'translateX(-10px)' : 'translateX(-100%)';
  } else if (isNext && slideCount > 1) {
    transform = transitionMode === 'fade' ? 'translateX(10px)' : 'translateX(100%)';
  }

  return {
    height: slideHeight,
    width: slideWidth,
    display: isPrevious || isActive || isNext ? 'block' : 'none',
    opacity: isActive || transitionMode === 'scroll' ? 1 : 0,
    transform,
  };
}

export default Transition;
