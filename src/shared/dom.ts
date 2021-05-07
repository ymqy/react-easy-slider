function getMax(a: number, b: number) {
  return a > b ? a : b;
}

function getHeightOfSlide(slide: HTMLElement) {
  if (!slide) {
    return 0;
  }

  if (slide.children && slide.children.length > 0) {
    let totalHeight = 0;
    for (let i = 0; i < slide.children.length; i += 1) {
      totalHeight += (slide.children[i] as HTMLElement).offsetHeight;
    }
    return totalHeight;
  }

  return slide.offsetHeight;
}

function findMaxHeightSlideInRange(slides: HTMLElement[], start: number, end: number) {
  let maxHeight = 0;

  if (
    slides.length === 0 ||
    start < 0 ||
    end < 0 ||
    start > slides.length - 1 ||
    end > slides.length
  ) {
    return maxHeight;
  }

  if (start < end) {
    for (let i = start; i < end; i += 1) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }
  } else if (start > end) {
    // Finding max in a wrap around
    for (let i = start; i < slides.length; i += 1) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }

    for (let i = 0; i < end; i += 1) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }
  } else {
    // start === end
    maxHeight = getHeightOfSlide(slides[start]);
  }

  return maxHeight;
}

function calculateSlideHeight(
  props: Pick<Props.SliderProps, 'heightMode' | 'initialSlideHeight'>,
  slides: HTMLCollection,
) {
  const { heightMode, initialSlideHeight } = props;
  const slideArray = Array.from(slides) as HTMLElement[];

  if (heightMode === 'max') {
    return findMaxHeightSlideInRange(slideArray, 0, slideArray.length);
  }

  return initialSlideHeight;
}

export { calculateSlideHeight };
