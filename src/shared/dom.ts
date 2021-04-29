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

export { getHeightOfSlide };
