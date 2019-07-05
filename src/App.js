import React from 'react';

import './App.css';
import Layout from './components/Layout/Layout';
import LoginForm from './containers/LoginForm/LoginForm';

function App() {
  return (
    <div>
      <Layout>
        LeanSheets
        <LoginForm />
      </Layout>
    </div>
  );
}

export default App;
