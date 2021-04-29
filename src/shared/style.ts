import type { SliderProps, FadeTransitionProps } from '@/typings/props';

function getSliderStyles(props: Pick<SliderProps, 'width' | 'height' | 'style'>) {
  const styles = {
    height: props.height,
    width: props.width,
  };

  return { ...styles, ...props.style };
}

function getContainerStyles(props: FadeTransitionProps) {
  return {
    cursor: props.dragging === true ? 'pointer' : 'inherit',
    width: props.slideWidth,
    height: props.slideHeight,
  };
}

export { getSliderStyles, getContainerStyles };
