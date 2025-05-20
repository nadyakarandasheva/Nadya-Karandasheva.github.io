import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from 'src/widgets/Layout/Layout';

import { RoutingWrapper } from './navigation/RoutingWrapper';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <RoutingWrapper />
      </Layout>
    </BrowserRouter>
  )
}

export default App;
