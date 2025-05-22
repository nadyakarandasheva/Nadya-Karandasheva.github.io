import React, { useState } from 'react';

import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

/**
 * Компонент примера работы модального окна.
 * @returns
 */
export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button label={'Open Modal'} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal isVisible={isOpen} onClose={() => setIsOpen(false)}>
          {inputValue}
        </Modal>
      )}
    </>
  );
};
