import React from 'react';
import styles from './style.less';

import type { SliderProps, RenderControlProps } from '@/typings/props';

const controlsMap = [
  { funcName: 'renderTopLeftControls', key: 'TopLeft' },
  { funcName: 'renderTopCenterControls', key: 'TopCenter' },
  { funcName: 'renderTopRightControls', key: 'TopRight' },
  { funcName: 'renderCenterLeftControls', key: 'CenterLeft' },
  { funcName: 'renderCenterCenterControls', key: 'CenterCenter' },
  { funcName: 'renderCenterRightControls', key: 'CenterRight' },
  { funcName: 'renderBottomLeftControls', key: 'BottomLeft' },
  { funcName: 'renderBottomCenterControls', key: 'BottomCenter' },
  { funcName: 'renderBottomRightControls', key: 'BottomRight' },
];

function renderControls(props: SliderProps & RenderControlProps): React.ReactNode[] {
  return controlsMap.map(({ funcName, key }) => {
    const func = props[funcName];
    const controlChildren = typeof func === 'function' && func(props);

    return (
      controlChildren && (
        <div key={key} className={styles[key]}>
          {controlChildren}
        </div>
      )
    );
  });
}

export { renderControls };
export * from './Button/Button';
export * from './Indicators/Indicators';
