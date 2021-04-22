import React, { useRef, FC, ReactNode } from 'react';
import './index.less';

interface Props {
  children?: ReactNode;
}

const SliderComponent: FC<Props> = (props) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} id="my-slider" className="slider-list">
      <ul>
        { props.children }
      </ul>
    </div>
  )
};

export default SliderComponent;