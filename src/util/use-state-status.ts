import useCreateState from 'react-hook-setstate';
import { Status } from '../components/statuses/statuses.interface';

type UseStateStatus<T> = T & {
  status: Status;
};

export type UseStateInterface<T> = UseStateStatus<T> & { disabled: boolean };

type ReturnUseState<T> = [
  UseStateInterface<T>,
  (args: Partial<UseStateStatus<T>>) => void
];

export const useStateStatus = <T>(state: T): ReturnUseState<T> => {
  const [_state, setState] = useCreateState<UseStateStatus<T>>({
    status: Status.initializing,
    ...state,
  });
  const disabled = _state.status !== Status.loaded;

  return [{ ..._state, disabled }, setState];
};
