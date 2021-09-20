import React from 'react';
import { Router } from './components/router';
import { Theme } from './ui-components/global-style';
import PullToRefresh from 'react-simple-pull-to-refresh';

const App: React.FC = () => {
  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <Theme>
      <PullToRefresh onRefresh={handleRefresh}>
        <Router />
      </PullToRefresh>
    </Theme>
  );
};

export default App;
