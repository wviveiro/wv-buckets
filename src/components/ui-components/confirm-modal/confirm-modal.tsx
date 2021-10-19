import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import React, { useEffect } from 'react';
import BottomModal from '../bottom-modal';
import { ConfirmModalState } from './confirm-modal.interface';

export const initialState: ConfirmModalState = {
  status: Status.loaded,
  title: 'Are you sure?',
  description: 'This action cannot be undone',
  confirmText: 'CONFIRM',
  cancelText: 'CANCEL',
  confirmVariant: 'danger',
  cancelVariant: 'regular',
  show: false,
  closed: true,
  onCancel: () => {
    // not implemented
  },
  onConfirm: () => {
    // not implemented
  },
};

export let onConfirm = (args: Partial<ConfirmModalState>) => {
  // Not implemented
};

export const ConfirmModal = () => {
  const [state, setState] = useStateStatus<ConfirmModalState>(initialState);

  useEffect(() => {
    onConfirm = (args: Partial<ConfirmModalState>) => {
      setState({
        ...args,
        show: true,
        closed: false,
      });
    };
  }, [setState]);

  const onClose = () => {
    setState(initialState);
  };

  const onCancel = (ev: React.MouseEvent<HTMLButtonElement>) => {
    state.onCancel(ev);
    if (ev.isDefaultPrevented() || ev.isPropagationStopped()) return;
    setState({ show: false });
  };

  const onConfirmButton = (ev: React.MouseEvent<HTMLButtonElement>) => {
    state.onCancel(ev);
    if (ev.isDefaultPrevented() || ev.isPropagationStopped()) return;
    setState({ show: false });
  };

  if (state.closed) return null;

  return (
    <BottomModal show={state.show} onClose={onClose}>
      <BottomModal.Title>{state.title}</BottomModal.Title>
      <BottomModal.Disclaimer>{state.description}</BottomModal.Disclaimer>
      <BottomModal.Button
        variant={state.confirmVariant}
        onClick={onConfirmButton}
      >
        {state.confirmText}
      </BottomModal.Button>
      <BottomModal.Button variant={state.cancelVariant} onClick={onCancel}>
        {state.cancelText}
      </BottomModal.Button>
    </BottomModal>
  );
};
