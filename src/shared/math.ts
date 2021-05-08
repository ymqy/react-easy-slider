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

export { swipeDirection };
