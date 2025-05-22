import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { ProfileCompletedForm } from 'pages/ProfileForm/ProfileForm';
import { AuthScreen } from 'pages/AuthScreen/AuthScreen';
import { OperationsPageAdmin } from 'pages/OperationsPageAdmin/OperationsPageAdmin';
import { InitPage } from 'pages/InitialPage/InitPage';
import { OperationsPage } from 'pages/OperationsPage/OperationsPage';

import { useLoginNavigate } from './useLoginNavigate';

/**
 * Компонент обертки роутинга.
 * @returns
 */
export const RoutingWrapper: FC = () => {
  useLoginNavigate();

  return (
    <Routes>
      <Route path="/" element={<InitPage />} />
      <Route path="auth" element={<AuthScreen />}>
        <Route path=":mode" element={<AuthScreen />} />
      </Route>
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfileCompletedForm />
          </ProtectedRoute>
        }
      />
      <Route path="operations" element={<OperationsPage />} />
      <Route
        path="operations-admin"
        element={
          <ProtectedRoute>
            <OperationsPageAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
