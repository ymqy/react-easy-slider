import type { SliderProps } from '@/typings/props';
import { useEffect, useRef, useCallback } from 'react';

function useSliderAutoplay({
  autoplayInterval,
  autoplay,
  callback,
}: Pick<SliderProps, 'autoplayInterval' | 'autoplay'> & { callback: () => void }) {
  const timer = useRef<number>();

  const start = useCallback(() => {
    if (timer.current) return;
    // TODO: 如何指定 setInterval 返回指类型为浏览器环境的 Timeout
    timer.current = setInterval(callback, autoplayInterval) as any;
  }, [autoplayInterval, callback]);

  const stop = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  useEffect(() => {
    if (!autoplay) {
      return stop();
    }

    start();

    return stop;
  }, [autoplayInterval, autoplay, callback, start]);

  return [start, stop];
}

export { useSliderAutoplay };
