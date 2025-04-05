import React, { FC, forwardRef, useImperativeHandle, useLayoutEffect, useReducer, useRef } from 'react';
import cn from 'clsx';

import { Button } from '../button/Button';

import { reducer } from './reducer';

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

export enum CollapseActionType {
  open,
  close,
  unmount,
  mount,
}

/**
 * Компонент сворачаевого элемента.
 * @param {CollapseProps} param - Входные параметры компонента.
 * @returns 
 */
export const Collapse: FC<CollapseProps> = forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, opened, children, onClick }, ref) => {
    const [state, dispatch] = useReducer(reducer, { opened: false, mounted: false });

    const root = useRef<HTMLDivElement>();

    const wrapper = useRef<HTMLDivElement>();

    useImperativeHandle(ref, () => root.current!, [root]);

    const onTransitionEnd = (event: React.TransitionEvent) => {
      if (event.target !== event.currentTarget) return;

      if (state.opened) return;

      dispatch(CollapseActionType.unmount);

      root.current.style.height = '0';
    };

    useLayoutEffect(() => {
      if (!root.current) return;

      if (opened) {
        root.current.style.height = 'auto';
        dispatch(CollapseActionType.mount);

        requestAnimationFrame(() => {
          dispatch(CollapseActionType.open);
        });
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
  });