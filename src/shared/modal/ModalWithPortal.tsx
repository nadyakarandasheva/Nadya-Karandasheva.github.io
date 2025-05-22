import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import { IModalProps, Modal } from './Modal';

/**
 * Компонент модального окна с порталом.
 * @param {IModalProps} params
 * @returns
 */
export const ModalWithPortal: FC<IModalProps> = ({ ...props }) => {
  return createPortal(<Modal {...props} />, document.body);
};
