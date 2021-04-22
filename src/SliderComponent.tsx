import React from 'react';
import './index.less';

const SliderComponent = (props) => {
  return (
    <div id="my-slider" className="slider-list">
      <ul>
        <li className="slider-list__item--selected">
          <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
        </li>
        <li className="slider-list__item">
          <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
        </li>
        <li className="slider-list__item">
          <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
        </li>
        <li className="slider-list__item">
          <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
        </li>
      </ul>
    </div>
  )
};

export default SliderComponent;