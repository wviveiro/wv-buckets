import { Status } from 'components/util/status';
import { createContext, useContext } from 'react';
import useCreateState from 'react-hook-setstate';
import { AppContextInterface } from './app.interface';

export const AppContext = createContext<AppContextInterface>({
  status: Status.initializing,
});

export const useAppState = () => {
  const context = useContext(AppContext);
  const [state] = useCreateState<AppContextInterface>({ ...context });

  return {
    state,
  };
};
