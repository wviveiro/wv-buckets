import React from 'react';
import { Router } from './components/router';
import { Theme } from './ui-components/global-style';
import PullToRefresh from 'react-simple-pull-to-refresh';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertsCreator } from './components/alert/alert';

const App: React.FC = () => {
  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <Theme>
      <PullToRefresh onRefresh={handleRefresh}>
        <Router />
      </PullToRefresh>
      <AlertsCreator />
    </Theme>
  );
};

export default App;
