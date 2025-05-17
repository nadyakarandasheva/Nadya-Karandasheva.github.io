import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeWorksPage } from 'src/pages/HomeWorksPage/HomeWorksPage';
import { ProfileCompletedForm } from 'src/pages/ProfileForm/ProfileForm';
import { AuthScreen } from 'src/pages/AuthScreen/AuthScreen';
import { OperationsPage } from 'src/pages/OperationsPage/OperationsPage';

import { useLoginNavigate } from './useLoginNavigate';

export const Navigation: FC = () => {

  useLoginNavigate();

  return (
    <Routes>
      <Route path='/' element={<HomeWorksPage />} />
      <Route path="profile" element={<ProfileCompletedForm />} />
      <Route path="auth/*" element={<AuthScreen />}>
        <Route path=":mode" element={<AuthScreen />} />
      </Route>
      <Route path="operations" element={<OperationsPage />} />
    </Routes>
  );
};
