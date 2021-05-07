import React, { useCallback } from 'react';
import style from './style.less';

import type { RenderControlProps } from '@/typings/props';

function Indicators(props: RenderControlProps) {
  const { slideCount, currentSlide, goToSlide } = props;

  const indexes = [];

  for (let i = 0; i < slideCount; i += 1) {
    indexes.push(i);
  }

  const handleControlMouseOver = useCallback(
    (evt) => {
      const { index } = evt.target.dataset;
      if (typeof index !== 'undefined' && index >= 0) {
        goToSlide.call(null, +index);
      }
    },
    [goToSlide],
  );

  return (
    <div className={style['slide-list__control']} onMouseOver={handleControlMouseOver}>
      {indexes.map((index) => (
        <span
          data-index={index}
          key={index}
          className={
            style[`slide-list__control-buttons${index === currentSlide ? '--selected' : ''}`]
          }
        ></span>
      ))}
    </div>
  );
}

export { Indicators };
