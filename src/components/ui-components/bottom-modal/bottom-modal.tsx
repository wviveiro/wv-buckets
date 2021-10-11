import React from 'react';
import classNames from 'classnames';
import {
  BottomModalContainer,
  BottomModalContainerInner,
  BottomModalTitleContainer,
} from './bottom-modal.styled';
import { BottomModalProps } from './bottom-modal.interface';
import { useBottomModalState } from './bottom-modal.hook';

export const BottomModal: React.FC<BottomModalProps> = (props) => {
  const { children, className } = props;
  const { state } = useBottomModalState(props);

  return (
    <BottomModalContainer show={state.show} className={classNames(className)}>
      <BottomModalContainerInner>{children}</BottomModalContainerInner>
    </BottomModalContainer>
  );
};

const _default = {
  default: BottomModal,
  Title: BottomModalTitleContainer,
};

export default _default;
