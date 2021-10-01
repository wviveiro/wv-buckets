import React from 'react';
import { Layout } from '../../ui-components/layout/layout';
import { useMainContextState, MainContext } from './main-provider.hook';

export const MainProvider: React.FC = ({ children }) => {
  const { state } = useMainContextState();

  return <MainContext.Provider value={state}>{children}</MainContext.Provider>;
};
