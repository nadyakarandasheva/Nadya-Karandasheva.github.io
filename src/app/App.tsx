import React from 'react';

import { Layout } from 'shared/Layout/Layout';
import { RoutingWrapper } from './navigation/RoutingWrapper';

import { useTokenSync } from './store/useTokenSync';

import './App.css';

function App() {
  useTokenSync();

  return (
    <Layout>
      <RoutingWrapper />
    </Layout>
  );
}

export default App;
