export const createCells = (size: number) => {
  return new Array(size).fill(0).map(() => new Array(size).fill(false));
};
