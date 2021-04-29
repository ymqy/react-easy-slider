declare namespace Props {
  type WithChildren<T = Record<string, never>> = T & { children?: React.ReactNode };

  type SliderProps = WithChildren<{
    animation: string;
    autoGenerateStyleTag: boolean;
    autoplay: boolean;
    autoplayInterval: number;
    disableAnimation: boolean;
    dragging: boolean;
    disableEdgeSwiping: boolean;
    easing: string;
    edgeEasing: string;
    height: string;
    heightMode: string;
    pauseOnHover: boolean;
    renderAnnounceSlideMessage: () => void;
    renderBottomCenterControls: () => void;
    renderBottomLeftControls: () => void;
    renderBottomRightControls: () => void;
    renderCenterCenterControls: () => void;
    renderCenterLeftControls: () => void;
    renderCenterRightControls: () => void;
    renderTopCenterControls: () => void;
    renderTopLeftControls: () => void;
    renderTopRightControls: () => void;
    slideIndex: number;
    slideWidth: string | number;
    slideHeight: string | number;
    speed: number;
    style: React.CSSProperties;
    swiping: boolean;
    transitionMode: string;
    width: string;
    withoutControls: boolean;
    wrapAround: boolean;
  }>;

  type SlideProps = WithChildren<{}>;

  type FadeTransitionProps = Pick<
    SliderProps,
    'dragging' | 'slideHeight' | 'slideWidth' | 'children'
  >;
}

export = Props;
export as namespace Props;
