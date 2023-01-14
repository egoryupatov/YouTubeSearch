export const countViews = (views: number) => {
  if (views > 1000 && views < 1000000) {
    return Math.round(views / 1000) + "K views";
  }

  if (views > 1000000) {
    return Math.round(views / 1000000) + "M views";
  }

  return views + " views";
};
