import { Rating } from 'constants/interface';

export const isYoutubeURL = (url: string) =>
  url.match(
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|shorts\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/
  );

export const increment = (value: number) => ++value;

export const decrement = (value: number) => --value;

export const getAverageRating = (ratings: Rating[]) => {
  const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return ratings?.length ? total / ratings.length : 0;
};
