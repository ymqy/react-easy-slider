import type { CSSProperties } from 'react';

declare namespace Props {
  type WithChildren<T = Record<string, never>> = T & { children?: React.ReactNode };

  type RenderControlProps = {
    slideHeight: number;
    slideCount: number;
    currentSlide: number;
    goToSlide: (index: number) => void;
    nextSlide: () => void;
    previousSlide: () => void;
  };

  type SliderProps = WithChildren<{
    animation: string;
    autoGenerateStyleTag: boolean;
    autoplay: boolean;
    autoplayInterval: number;
    defaultControlsConfig?: {
      containerClassName?: string;
      nextButtonClassName?: string;
      nextButtonStyle?: CSSProperties;
      nextButtonText?: string;
      prevButtonClassName?: string;
      prevButtonStyle?: CSSProperties;
      prevButtonText?: string;
      pagingDotsContainerClassName?: string;
      pagingDotsClassName?: string;
      pagingDotsStyle?: CSSProperties;
    };
    disableAnimation: boolean;
    dragging: boolean;
    disableEdgeSwiping: boolean;
    easing: string;
    edgeEasing: string;
    height: string;
    heightMode: string;
    initialSlideHeight: number;
    initialSlideWidth: number;
    pauseOnHover: boolean;
    renderAnnounceSlideMessage?: (props: RenderControlProps) => JSX.Element;
    renderBottomCenterControls?: (props: RenderControlProps) => JSX.Element;
    renderBottomLeftControls?: (props: RenderControlProps) => JSX.Element;
    renderBottomRightControls?: (props: RenderControlProps) => JSX.Element;
    renderCenterCenterControls?: (props: RenderControlProps) => JSX.Element;
    renderCenterLeftControls?: (props: RenderControlProps) => JSX.Element;
    renderCenterRightControls?: (props: RenderControlProps) => JSX.Element;
    renderTopCenterControls?: (props: RenderControlProps) => JSX.Element;
    renderTopLeftControls?: (props: RenderControlProps) => JSX.Element;
    renderTopRightControls?: (props: RenderControlProps) => JSX.Element;
    slideIndex: number;
    slideWidth: number;
    speed: number;
    swiping: boolean;
    transitionMode: 'fade' | 'scroll';
    width: string;
    withoutControls: boolean;
    wrapAround: boolean;
  }>;

  type TransitionProps = Pick<
    SliderProps,
    'dragging' | 'slideWidth' | 'transitionMode' | 'children'
  > & {
    currentSlide: number;
    slideCount: number;
    slideHeight: number;
  };
}

export = Props;
export as namespace Props;
