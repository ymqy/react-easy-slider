import React, { useRef, useCallback, FC, ReactNode } from 'react';
import './index.less';

interface Props {
  activeIndex: number;
  onControlHover?: (number) => void;
  onControlOut?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  children?: ReactNode;
}

const SliderComponent: FC<Props> = (props) => {
  const containerRef = useRef(null);
  const handleControlMouseOver = useCallback((evt) => {
    const { index } = evt.target.dataset;
    if (typeof index !== 'undefined' && index >= 0) {
      props.onControlHover(+index);
    }
  }, [props.onControlHover]);
  const handleControlMouseOut = useCallback(() => {
    props.onControlOut();
  }, [props.onControlOut]);

  return (
    <div ref={containerRef} id="my-slider" className="slider-list">
      <ul>
        { props.children }
      </ul>
      <a className="slide-list__next" onClick={props.onNext}></a>
      <a className="slide-list__previous" onClick={props.onPrevious}></a>
      <div 
        className="slide-list__control"
        onMouseOver={handleControlMouseOver}
        onMouseOut={handleControlMouseOut}
      >
        {
          props.children.map((_, index) => (
            <span
              data-index={index}
              key={index}
              className={`slide-list__control-buttons${index === props.activeIndex ? '--selected' : ''}`}
            ></span>
          ))
        }
      </div>
    </div>
  )
};

export default SliderComponent;