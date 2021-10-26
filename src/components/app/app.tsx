import React from 'react';
import { LayoutTheme } from 'components/global-style';
import { AlertsCreator } from 'components/alert';
import { ConfirmModal } from 'components/ui-components/confirm-modal/confirm-modal';
import { store } from 'components/redux/store';
import { Provider } from 'react-redux';
import { Main } from './main';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LayoutTheme>
        <Main />
        <AlertsCreator />
        <ConfirmModal />
      </LayoutTheme>
    </Provider>
  );
};
