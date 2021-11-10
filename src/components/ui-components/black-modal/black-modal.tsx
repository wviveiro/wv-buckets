import React from 'react';
import { useBlackModalState } from './black-modal.hook';
import { BlackModalProps, BlackModalTitleProps } from './black-modal.interface';
import {
  BlackModalContainer,
  BlackModalList,
  BlackModalListItem,
  BlackModalTitle,
} from './black-modal.styled';

export const BlackModal: React.FC<BlackModalProps> = (props) => {
  const { render, show } = useBlackModalState(props);

  if (!render) return null;

  return (
    <BlackModalContainer show={show} noBackground={props.noBackground}>
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

export const Item = BlackModalListItem;

export const List: React.FC = (props) => {
  return <BlackModalList>{props.children}</BlackModalList>;
};

const ListComponent = Object.assign(List, { Item });

const components = {
  Title,
  List: ListComponent,
};

export default Object.assign(BlackModal, components);
