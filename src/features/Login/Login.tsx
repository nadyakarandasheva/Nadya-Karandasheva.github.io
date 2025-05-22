import React, { FC } from 'react';
import cn from 'clsx';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { tokenSelectors, tokenActions } from './../../app/store/token';
import { RootState } from '../../app/store';

import s from './Login.module.css';

interface LoginProps {
  className?: string;
}

/**
 * Компонент перехода к авторизации пользователя.
 * @param param0
 * @returns
 */
export const Login: FC<LoginProps> = ({ className }) => {
  const dispatch = useDispatch();

  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);

  return (
    <div className={cn(s.root, className)}>
      {token ? (
        <button className={s.btn} type="button" onClick={() => dispatch(tokenActions.clear())}>
          <LogoutIcon />
        </button>
      ) : (
        <Link className={s.btn} to="auth">
          <LoginIcon />
        </Link>
      )}
    </div>
  );
};
