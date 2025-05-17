import React, { FC, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { SingInBlock } from 'src/pages/AuthScreen/SingInBlock';
import { SingUpBlock } from 'src/pages/AuthScreen/SingUpBlock';
import { Title } from 'src/shared/Title/Title';

import styles from './AuthScreen.module.css';

export enum AuthMode {
  signIn = 'signin',
  signUp = 'signup',
}

export type Params = { mode: AuthMode; token?: string };

export const AuthScreen: FC = () => {
  const location = useLocation();

  const path = useMemo(() => location.pathname.split('/').slice(0, -1).join('/'), [location.pathname]);

  const signinElement = (
    <>
      <div className={styles.top}>
        <Title className={styles.title}>{'Войти'}</Title>
        <Link to={`${path}/${AuthMode.signUp}`}>{'Зарегистрироваться'}</Link>
      </div>
      <SingInBlock />
    </>
  );

  const signupElement = (
    <>
      <div className={styles.top}>
        <Title className={styles.title}>{'Зарегистрироваться'}</Title>
        <Link to={`${path}/${AuthMode.signIn}`}>{'Войти'}</Link>
      </div>
      <SingUpBlock />
    </>
  );

  return (
    <div className={styles.root}>
      <div className={styles.frame}>
        <Routes>
          <Route index element={<Navigate to={AuthMode.signIn} state={location.state} replace />} />
          <Route path={AuthMode.signIn} element={signinElement} />
          <Route path={AuthMode.signUp} element={signupElement} />
        </Routes>
      </div>
    </div>
  );
};
