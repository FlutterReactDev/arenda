export const findClosestNumber = (num: number, arr: number[]) => {
  return arr.reduce((prev, curr) => {
    return Math.abs(num - curr) < Math.abs(prev - num) ? curr : prev;
  });
};
