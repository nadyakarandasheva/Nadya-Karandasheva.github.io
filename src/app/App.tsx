import React from 'react';

import { RoutingWrapper } from './navigation/RoutingWrapper';
import { Layout } from 'widgets/Layout/Layout';

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
