import React, { FC, ReactNode } from 'react';
import './index.less';

interface Props {
  isActived: boolean;
  imgUrl: string;
  children?: ReactNode;
}

const SliderItemComponent: FC<Props> = (props) => {
  const { isActived, imgUrl, children } = props;

  return (
    <li className={`slider-list__item${isActived ? '--selected' : ''}`}>
      <img src={imgUrl}/>
      { children }
    </li>
  )
};

export default SliderItemComponent;