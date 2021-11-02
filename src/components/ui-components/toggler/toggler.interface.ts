export interface TogglerOption {
  label: string;
  value: string | number | boolean;
}

export interface TogglerProps {
  value: TogglerOption['value'];
  options: TogglerOption[];
  onChange?: (option: TogglerOption) => void;
  disabled?: boolean;
  classes?: {
    optionContainer?: string;
    optionButton?: string;
  };
}
