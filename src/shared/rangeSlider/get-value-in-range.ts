export const getValueInRange = (value: number, { min, max }: { min: number; max: number }) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};