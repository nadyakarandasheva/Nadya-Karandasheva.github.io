import React, { FC, useLayoutEffect, useReducer, useRef } from 'react';
import cn from 'clsx';

import { Button } from '../button/Button';

import './collapse.css';

export type CollapseProps = {
  className?: string;
  children: React.ReactNode;
  opened: boolean;
  onClick: () => void
};

export type CollapseState = {
  opened: boolean;
  mounted: boolean;
};

enum CollapseActionType {
  open,
  close,
  unmount,
  mount,
}

export const reducer = (state: CollapseState, action: CollapseActionType) => {
  switch (action) {
    case CollapseActionType.close:
      return { ...state, opened: false };

    case CollapseActionType.unmount:
      return { mounted: false, opened: false };

    case CollapseActionType.mount:
      return { ...state, mounted: true };

    case CollapseActionType.open:
      return { mounted: true, opened: true };
  }
};

/**
 * Компонент сворачаевого элемента.
 * @param {CollapseProps} param - Входные параметры компонента.
 * @returns 
 */
export const Collapse: FC<CollapseProps> = ({ className, opened, children, onClick }) => {
  const [state, dispatch] = useReducer(reducer, { opened: false, mounted: false });

  const root = useRef<HTMLDivElement>();

  const wrapper = useRef<HTMLDivElement>();


  const onTransitionEnd = (event: React.TransitionEvent) => {
    if (event.target !== event.currentTarget) return;

    if (state.opened) return;

    dispatch(CollapseActionType.unmount);

    root.current.style.height = '0';
  };

  useLayoutEffect(() => {
    if (opened) {
      root.current.style.height = 'auto';
      dispatch(CollapseActionType.mount);
      setTimeout(() => dispatch(CollapseActionType.open), 1);
    } else {
      dispatch(CollapseActionType.close);
    }
  }, [opened]);

  return (
    <div>
      <Button label={'Collapse button'} onClick={onClick} />
      <div ref={root} className={cn('root', className)}>
        {state.mounted && (
          <div
            ref={wrapper}
            onTransitionEnd={onTransitionEnd}
            className={cn('wrapper', state.opened && 'opened')}
          >
            {children}
          </div>
        )}
      </div>
    </div>

  );
};