export interface BottomModalProps {
  className?: string;
  show?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface BottomModalButtonProps {
  variant?: 'regular' | 'primary' | 'danger';
}
