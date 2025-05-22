import React from 'react';
import cn from 'clsx';

import { ChangePasswordCompletedForm } from './ChangePasswordCompletedForm/ChangePasswordCompletedForm';
import { ChangeProfileForm } from './ChangeProfileForm';

import style from './ProfileForm.module.css';

/**
 * Компонент форм провиля.
 */
export const ProfileCompletedForm = () => {
  return (
    <div className={cn(style.page)}>
      <div className={cn(style.formsContainer)}>
        <ChangeProfileForm />
        <ChangePasswordCompletedForm />
      </div>
    </div>
  );
};
