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

        const image = getUnloadImageFromSlide(children[currentSlide]);
        handleImageLoaded(image, ({ offsetHeight }) => setSlideHeight(offsetHeight));
      };

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

function handleImageLoaded(
  image: HTMLImageElement | undefined,
  callback: (image: HTMLImageElement) => void,
) {
  if (image) {
    if (image.complete) {
      // 图片读取缓存无法触发 load 事件
      setTimeout(() => {
        callback(image);
      }, 0);
      return;
    }

    const imageCallback = () => {
      callback(image);
      image.removeEventListener('load', imageCallback);
    };
    image.addEventListener('load', imageCallback);
  }
}

function getUnloadImageFromSlide(childNode: Element | undefined): HTMLImageElement | undefined {
  if (!childNode) return undefined;
  return childNode.getElementsByTagName('img')[0];
}

export { useDimensions };
