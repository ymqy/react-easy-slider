import { useEffect, useRef } from 'react';

function swipeDirection(x1: number, x2: number, y1: number, y2: number) {
  const xDist = x1 - x2;
  const yDist = y1 - y2;
  const r = Math.atan2(yDist, xDist);
  let swipeAngle = Math.round((r * 180) / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }
  if (swipeAngle <= 45 && swipeAngle >= 0) {
    return 'Left';
  }
  if (swipeAngle <= 360 && swipeAngle >= 315) {
    return 'Left';
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return 'Right';
  }
  return 'Vertical';
}

type Direction = 'Left' | 'Right' | 'Vertical';

type TouchEndEvent = TouchEvent & { direction: Direction };

type TouchEventsConfig = {
  swipeStart: () => void;
  swipe: (e: TouchEndEvent) => void;
};

function useTouchEvents(dom: HTMLDivElement | null, config: TouchEventsConfig) {
  const { swipeStart, swipe } = config;

  const touchObjectRef = useRef<{
    startX: number;
    startY: number;
    direction?: Direction;
  }>();

  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchObjectRef.current = {
        startX: e.touches[0].pageX,
        startY: e.touches[0].pageY,
      };
    }

    function onTouchMove(e: TouchEvent) {
      const touchObject = touchObjectRef.current!;

      const direction = swipeDirection(
        touchObject.startX,
        e.touches[0].pageX,
        touchObject.startY,
        e.touches[0].pageY,
      );

      const length = Math.round(Math.sqrt(e.touches[0].pageX ** touchObject.startX));

      if (length >= 10) {
        swipeStart();
      }

      touchObjectRef.current = {
        ...touchObject,
        direction,
      };
    }

    function onTouchEnd(e: TouchEvent) {
      const evt: TouchEndEvent = { ...e, direction: 'Vertical' };
      evt.direction = touchObjectRef.current!.direction!;
      swipe(evt);
    }

    if (dom) {
      dom.addEventListener('touchstart', onTouchStart);
      dom.addEventListener('touchmove', onTouchMove);
      dom.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (dom) {
        dom.removeEventListener('touchstart', onTouchStart);
        dom.removeEventListener('touchmove', onTouchMove);
        dom.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, [dom, swipe, swipeStart]);
}

export { useTouchEvents };
