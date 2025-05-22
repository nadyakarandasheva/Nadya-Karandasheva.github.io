import React, { useMemo, FC } from 'react';
import cn from 'clsx';

import { getValueByCursor } from './get-value-by-cursor';
import { getValueInRange } from './get-value-in-range';

import './rangeSlider.css';

export interface IRangeSliderProps {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

/**
 * Компонент слайдера с диапазоном.
 * @param {IRangeSliderProps} params  - Входные параметры компонента.
 * @returns
 */
export const RangeSlider: FC<IRangeSliderProps> = ({ className, value, onChange, min, max }) => {
  const range = max - min;

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

    onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: event.clientX, rootClientX: rect.x }));
  };

  const { onStart } = useMemo(() => {
    let rect: DOMRect;

    const mousemove = (e: MouseEvent) => {
      onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.clientX, rootClientX: rect.x }));
    };

    const touchmove = (e: TouchEvent) => {
      onChange(
        getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.touches[0].clientX, rootClientX: rect.x })
      );
    };

    const end = () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchend', end);
    };

    return {
      onStart: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();

        rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('touchmove', touchmove);
        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);
      },
    };
  }, [max, min, onChange]);

  const VALUE_IN_RANGE = getValueInRange(value, { min, max });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const change_value = Number(event.target.value.replace(/[^\d-]/g, ''));

    onChange(change_value);
  };

  return (
    <div className={cn('rangeSlider', className)}>
      <div onMouseDown={onStart} onTouchStart={onStart} className={'field'} onClick={onClick}>
        <div className={'runner'} style={{ left: ((VALUE_IN_RANGE - min) / range) * 100 + '%' }}></div>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        className={cn('rangeSliderInput', className)}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
