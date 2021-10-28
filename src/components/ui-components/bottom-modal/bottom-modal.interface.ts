import React from 'react';

export interface BottomMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  to?: string;
  className?: string;
}

export interface BottomModalProps {
  className?: string;
  show?: boolean;
  menu?: BottomMenuItem[][];
  onOpen?: () => void;
  onClose?: () => void;
}

export interface BottomModalButtonProps {
  variant?: 'regular' | 'primary' | 'danger';
}
