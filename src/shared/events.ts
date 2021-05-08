import { swipeDirection } from '@/shared';

type Direction = 'Left' | 'Right' | 'Vertical';

type MouseEndEvent = React.MouseEvent & { direction: Direction };

type MouseEventsConfig = {
  swipeStart: () => void;
  swipe: (e: MouseEndEvent) => void;
};

type MouseObject = {
  dragging: boolean;
  startX?: number;
  startY?: number;
  length?: number;
  direction?: Direction;
};

function getMouseEvents(config: MouseEventsConfig) {
  const { swipeStart, swipe } = config;

  let mouseObject: MouseObject = {
    dragging: false,
  };

  function onMouseDown(e: React.MouseEvent) {
    if (e.preventDefault) e.preventDefault();

    mouseObject = {
      startX: e.clientX,
      startY: e.clientY,
      dragging: true,
    };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!mouseObject.dragging) return;

    const direction = swipeDirection(
      mouseObject.startX!,
      e.clientX,
      mouseObject.startY!,
      e.clientY,
    );

    if (direction !== 'Vertical') e.preventDefault();

    const length = Math.round(Math.sqrt((e.clientX - mouseObject.startX!) ** 2));

    if (length >= 10) {
      swipeStart();
    }

    mouseObject = {
      ...mouseObject,
      length,
      direction,
    };
  }

  function onMouseUp(e: React.MouseEvent) {
    if (mouseObject.length === 0 || mouseObject.length === undefined) {
      mouseObject.dragging = false;
      return;
    }

    const evt: MouseEndEvent = { ...e, direction: mouseObject.direction! };
    swipe(evt);
  }

  function onMouseLeave(e: React.MouseEvent) {
    if (!mouseObject.dragging) {
      return;
    }

    const evt: MouseEndEvent = { ...e, direction: mouseObject.direction! };
    swipe(evt);
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}

type TouchEndEvent = React.TouchEvent & { direction: Direction };

type TouchEventsConfig = {
  swipeStart: () => void;
  swipe: (e: TouchEndEvent) => void;
};

type TouchObject = {
  startX?: number;
  startY?: number;
  direction?: Direction;
};

function getTouchEvents(config: TouchEventsConfig) {
  const { swipeStart, swipe } = config;

  let touchObject: TouchObject = {};

  function onTouchStart(e: React.TouchEvent) {
    touchObject = {
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY,
    };
  }

  function onTouchMove(e: React.TouchEvent) {
    const direction = swipeDirection(
      touchObject.startX!,
      e.touches[0].pageX,
      touchObject.startY!,
      e.touches[0].pageY,
    );

    const length = Math.round(Math.sqrt((e.touches[0].pageX - touchObject.startX!) ** 2));

    if (length >= 10) {
      swipeStart();
    }

    touchObject = {
      ...touchObject,
      direction,
    };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const evt: TouchEndEvent = { ...e, direction: touchObject.direction! };
    swipe(evt);
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

type SwipeEvent = MouseEndEvent | TouchEndEvent;

export { getMouseEvents, getTouchEvents };
export type { SwipeEvent };
