import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from 'src/shared/layout/Layout';
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
