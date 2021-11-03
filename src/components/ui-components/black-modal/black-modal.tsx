import React from 'react';
import { useBlackModalState } from './black-modal.hook';
import { BlackModalProps, BlackModalTitleProps } from './black-modal.interface';
import { BlackModalContainer, BlackModalTitle } from './black-modal.styled';

export const BlackModal: React.FC<BlackModalProps> = (props) => {
  const { render, show } = useBlackModalState(props);

  if (!render) return null;

  return (
    <BlackModalContainer show={show}>
      <div className="row-modal-inner">{props.children}</div>
    </BlackModalContainer>
  );
};

export const Title: React.FC<BlackModalTitleProps> = (props) => {
  return (
    <BlackModalTitle>
      {props.leftButton && (
        <div className="black-modal-title-left-button">{props.leftButton}</div>
      )}
      <h4>{props.children}</h4>
      {props.rightButton && (
        <div className="black-modal-title-right-button">
          {props.rightButton}
        </div>
      )}
    </BlackModalTitle>
  );
};

const components = {
  Title,
};

export default Object.assign(BlackModal, components);