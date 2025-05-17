import React, { FC } from 'react';
import cn from 'clsx';
import { Spin } from 'antd';
import style from './SpinLoading.module.css';

export type UniversalLoadingProps = {
  className?: string;
};

export const SpinLoading: FC<UniversalLoadingProps> = ({ className }) => (
  <div className={cn(style.root, className)}>
    <Spin />
  </div>
);
