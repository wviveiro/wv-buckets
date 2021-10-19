import { Status } from 'components/util/status';
import React from 'react';
import { BottomModalButtonProps } from '../bottom-modal/bottom-modal.interface';

export interface ConfirmModalState {
  status: Status;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  confirmVariant: BottomModalButtonProps['variant'];
  cancelVariant: BottomModalButtonProps['variant'];
  show: boolean;
  closed: boolean;
  onCancel: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
