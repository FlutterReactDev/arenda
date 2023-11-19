export const createCalendarMap = (count: number) => {
  const arrayCount = Array(count)
    .fill("")
    .map((_, idx) => idx)
    .reduce((acc, curr) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore

      acc[curr] = [];
      return acc;
    }, {});

  return arrayCount;
};
