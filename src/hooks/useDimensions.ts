import { useEffect, useRef, useState } from 'react';
import { calculateSlideHeight } from '@/shared';
import type { SliderProps } from '@/typings/props';

function useDimensions({
  frame,
  heightMode,
  currentSlide,
  initialSlideHeight,
  children: childs,
}: Pick<SliderProps, 'heightMode' | 'initialSlideHeight' | 'children'> & {
  frame: HTMLDivElement | null;
  currentSlide: number;
}) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const fnRef = useRef<() => void>();

  useEffect(() => {
    if (frame) {
      const { children } = frame.children[0];

      const setSlideWidthAndHeight = () => {
        setSlideWidth(frame.offsetWidth);
        setSlideHeight(calculateSlideHeight({ heightMode, initialSlideHeight }, children));
      };

      const image = getUnloadImageFromSlide(children[currentSlide]);
      handleImageLoaded(image, () => setSlideWidthAndHeight());

      fnRef.current = setSlideWidthAndHeight;

      fnRef.current();

      window.addEventListener('resize', fnRef.current);
    }

    return () => {
      window.removeEventListener('resize', fnRef.current as any);
    };
  }, [frame, heightMode, initialSlideHeight, currentSlide, childs]);

  return [slideWidth, slideHeight];
}

function handleImageLoaded(image: HTMLImageElement | undefined, callback: () => void) {
  if (image) {
    if (image.complete) {
      setTimeout(callback, 0);
      return;
    }

    const imageLoadCallback = () => {
      callback();
      image.removeEventListener('load', imageLoadCallback);
    };
    image.addEventListener('load', imageLoadCallback);
  }
}

function getUnloadImageFromSlide(childNode: Element | undefined): HTMLImageElement | undefined {
  if (!childNode) return undefined;
  return childNode.getElementsByTagName('img')[0];
}

export { useDimensions };
