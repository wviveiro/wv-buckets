import { useRowModal } from '../row-modal.hook';
import { RowModalStateInterface } from '../row-modal.interface';

export interface RowModalContextInterface
  extends ReturnType<typeof useRowModal> {}
