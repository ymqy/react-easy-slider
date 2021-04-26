declare namespace Props {
  interface Slider {
    animation: string;
    autoGenerateStyleTag: boolean;
    autoplay: boolean;
    autoplayInterval: number;
    disableAnimation: boolean;
    disableEdgeSwiping: boolean;
    dragging: boolean;
    easing: string;
    edgeEasing: string;
    height: string;
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
    speed: number;
    swiping: boolean;
    width: string;
    withoutControls: boolean;
    wrapAround: boolean;
  }
  
  interface SliderItem {
    
  }
}