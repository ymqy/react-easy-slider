import React, { isValidElement } from 'react';

export function addAccessibility(children: React.ReactNode, currentSlide: number) {
  let needsTabIndex: boolean;

  return React.Children.map(children, (child, index) => {
    needsTabIndex = index !== currentSlide;
    const ariaProps = needsTabIndex
      ? { 'aria-hidden': 'true' }
      : { 'aria-hidden': 'false', tabIndex: 0 };

    if (isValidElement(child)) {
      return React.cloneElement(child, {
        ...ariaProps,
        ...child.props,
      });
    }
    return child;
  });
}
