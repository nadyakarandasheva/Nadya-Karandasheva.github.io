import React, { FC, useMemo, useRef, useState } from 'react';
import cn from 'clsx';

import './resizer.css';

export type Size = { width: number; height: number };

export type ResizerProps = {
  className?: string;
  initialWidth: number;
  initialHeight: number;
  children: (size: Size) => React.ReactNode;
};

const MIN_SIZE = 32;

/**
 * Компонент контейнера изменяющего размер.
 * @param {ResizerProps} param - Входные параметры компонента.
 * @returns
 */
export const Resizer: FC<ResizerProps> = ({ className, children, initialWidth, initialHeight }) => {
  const root = useRef<HTMLDivElement>();

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const sizesCopy = useRef(size);

  sizesCopy.current = size;

  const { onMouseDownResizer } = useMemo(() => {
    let start = { x: 0, y: 0, width: MIN_SIZE, height: MIN_SIZE };

    const safeSetSizes = (_size: Size) => {
      setSize({
        width: _size.width < MIN_SIZE ? MIN_SIZE : Math.round(_size.width),
        height: _size.height < MIN_SIZE ? MIN_SIZE : Math.round(_size.height),
      });
    };

    const move = (event: MouseEvent) => {
      event.preventDefault();

      const rect = root.current.getBoundingClientRect();

      const x = start.x - (event.clientX - rect.x);

      const y = start.y - (event.clientY - rect.y);

      safeSetSizes({ width: start.width - x, height: start.height - y });
    };

    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    return {
      onMouseDownResizer: (event: React.MouseEvent) => {
        event.stopPropagation();

        const rect = root.current.getBoundingClientRect();

        start = {
          x: event.clientX - rect.x,
          y: event.clientY - rect.y,
          width: sizesCopy.current.width,
          height: sizesCopy.current.height,
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
      },
    };
  }, []);

  return (
    <div ref={root} className={cn('root', className)} style={{ width: size.width, height: size.height }}>
      <div className={'wrapper'}>{children(size)}</div>
      <button type="button" className={'resizer'} onMouseDown={onMouseDownResizer} />
    </div>
  );
};
