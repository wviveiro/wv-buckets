export interface InnerAlertInterface {
  message: string;
  variant:
    | 'danger'
    | 'success'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'dark'
    | 'light';
  onClose?: () => void;
}
