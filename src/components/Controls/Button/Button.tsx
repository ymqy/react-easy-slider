import React from 'react';
import cx from 'classnames';
import style from './style.less';

import type { RenderControlProps } from '@/typings/props';

function PreviousButton(props: RenderControlProps) {
  const { slideHeight: slideheight, previousSlide } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    previousSlide();
  };

  return (
    <button
      style={{ height: slideheight }}
      className={cx(style['slider-btn'], style['slider-btn-left'])}
      onClick={handleClick}
    >
      <i className={cx(style['slider-icon'], style['slider-icon-left'])}></i>
    </button>
  );
}

function NextButton(props: RenderControlProps) {
  const { slideHeight: slideheight, nextSlide } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    nextSlide();
  };

  return (
    <button
      style={{ height: slideheight }}
      className={cx(style['slider-btn'], style['slider-btn-right'])}
      onClick={handleClick}
    >
      <i className={cx(style['slider-icon'], style['slider-icon-right'])}></i>
    </button>
  );
}

export { NextButton, PreviousButton };
