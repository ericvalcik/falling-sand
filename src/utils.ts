export const createCells = (size: number): (string | undefined)[][] => {
  return new Array(size).fill(0).map(() => new Array(size).fill(undefined));
};
