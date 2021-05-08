import React from 'react';

const styles: React.CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden'
};

const AnnounceSlide = ({ message }: { message: string }) => {

  return (
    <div aria-live="polite" aria-atomic="true" style={styles} tabIndex={-1}>
      {message}
    </div>
  );
};

export const defaultRenderAnnounceSlideMessage = ({
  currentSlide,
  slideCount
}: { currentSlide: number, slideCount: number }) => `Slide ${currentSlide + 1} of ${slideCount}`;

export default AnnounceSlide;
