import { getValueInRange } from './get-value-in-range';

export const getValueByCursor = ({
  min,
  max,
  rootClientX,
  cursorClientX,
  rootWidth,
}: {
  cursorClientX: number;
  rootClientX: number;
  rootWidth: number;
  min: number;
  max: number;
}) => {
  const range = max - min;
  const x = cursorClientX - rootClientX;
  const percent = x / rootWidth;
  return getValueInRange(Math.round(range * percent) + min, { min, max });
};
