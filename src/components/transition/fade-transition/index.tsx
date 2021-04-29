import React from 'react';
import cx from 'classnames';
import Slide from '@/components/slide';
import { getContainerStyles } from '@/shared';
import styles from './fade-transition.less';

import type { FadeTransitionProps } from '@/typings/props';

function FadeTransition(props: FadeTransitionProps) {
  const { children } = props;
  return (
    <ul className={cx(styles['slider-list'])} style={getContainerStyles(props)}>
      {React.Children.map(children, (child) => (
        <Slide>{child}</Slide>
      ))}
    </ul>
  );
}

export { FadeTransition };
