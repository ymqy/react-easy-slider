import { useEffect, useRef, useState } from 'react';
import { calculateSlideHeight } from '@/shared';
import type { SliderProps } from '@/typings/props';

function useDimensions({
  heightMode,
  initialSlideHeight,
  frame,
  currentSlide,
}: Pick<SliderProps, 'heightMode' | 'initialSlideHeight'> & {
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

      fnRef.current = setSlideWidthAndHeight;

      setSlideWidthAndHeight();

      const image = getUnloadImageFromSlide(children[currentSlide]);
      handleImageLoaded(image, ({ offsetHeight }) => setSlideHeight(offsetHeight));

      window.addEventListener('resize', fnRef.current);
    }

    return () => {
      window.removeEventListener('resize', fnRef.current as any);
    };
  }, [frame, heightMode, initialSlideHeight, currentSlide]);

  return [slideWidth, slideHeight];
}

function handleImageLoaded(
  image: HTMLImageElement | undefined,
  callback: (image: HTMLImageElement) => void,
) {
  if (image) {
    const imageCallback = () => {
      callback(image);
      image.removeEventListener('load', imageCallback);
    };
    image.addEventListener('load', imageCallback);
  }
}

function getUnloadImageFromSlide(childNode: ChildNode | undefined): HTMLImageElement | undefined {
  // TODO: 去掉 any
  if (!childNode) return undefined;
  return (childNode as any).getElementsByTagName('img')[0];
}

export { useDimensions };
