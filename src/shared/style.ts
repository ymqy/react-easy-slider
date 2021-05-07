import type { SliderProps } from '@/typings/props';

function getSlideStyles(
  props: Pick<SliderProps, 'slideWidth'> & {
    currentSlide: number;
    slideCount: number;
    slideHeight: number;
  },
  index: number,
) {
  const { currentSlide, slideCount, slideHeight, slideWidth } = props;

  const previousIndex = (slideCount + currentSlide - 1) % slideCount;
  const nextIndex = (currentSlide + 1) % slideCount;
  const isPrevious = previousIndex === index;
  const isNext = nextIndex === index;
  const isActive = currentSlide === index;

  let transform = 'translateX(0)';
  if (isNext && slideCount > 1) {
    transform = 'translateX(10px)';
  } else if (isPrevious && slideCount > 1) {
    transform = 'translateX(-10px)';
  }

  return {
    height: slideHeight,
    width: slideWidth,
    display: isPrevious || isActive || isNext ? 'block' : 'none',
    opacity: isActive ? 1 : 0,
    transform,
  };
}

export { getSlideStyles };
