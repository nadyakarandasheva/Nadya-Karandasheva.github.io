import React, { FC } from 'react';
import cn from 'clsx';
import style from './Title.module.css';

export type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: React.ReactElement | React.ReactNode;
  required?: boolean;
};

export const Title: FC<TitleProps> = ({ className, required, ...props }) => (
  <div {...props} className={cn(style.root, required && style.required, className)} />
);
