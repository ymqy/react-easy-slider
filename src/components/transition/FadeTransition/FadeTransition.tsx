import React from 'react';
import cx from 'classnames';
import { getSlideStyles } from '@/shared';
import styles from './style.less';

import type { FadeTransitionProps } from '@/typings/props';

function FadeTransition(props: FadeTransitionProps) {
  const { children, dragging, slideWidth: slidewidth, slideHeight: slideheight } = props;
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
        <div className={cx(styles.slide)} style={getSlideStyles(props, index)}>
          {child}
        </div>
      ))}
    </div>
  );
}

export { FadeTransition };
