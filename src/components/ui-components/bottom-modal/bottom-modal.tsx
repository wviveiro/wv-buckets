import React from 'react';
import classNames from 'classnames';
import {
  BottomModalButton,
  BottomModalContainer,
  BottomModalContainerInner,
  BottomModalDisclaimer,
  BottomModalTitleContainer,
} from './bottom-modal.styled';
import { BottomModalProps } from './bottom-modal.interface';
import { useBottomModalState } from './bottom-modal.hook';

export const BottomModal: React.FC<BottomModalProps> = (props) => {
  const { children, className } = props;
  const { state } = useBottomModalState(props);

  return (
    <BottomModalContainer
      show={state.show}
      className={classNames(className, {
        isMenu: !!props.menu,
      })}
    >
      {props.menu ? (
        props.menu.map((row, i) => (
          <BottomModalContainerInner
            key={i}
            className={classNames({ hasExtra: (props.menu?.length || 0) > 1 })}
          >
            {i === 0 && (
              <div className="main-content-bottom-modal">{children}</div>
            )}

            {row.map((menu, index) => (
              <div key={index}>Menu {index}</div>
            ))}
          </BottomModalContainerInner>
        ))
      ) : (
        <BottomModalContainerInner>{children}</BottomModalContainerInner>
      )}
    </BottomModalContainer>
  );
};

export const Title = BottomModalTitleContainer;
export const Disclaimer = BottomModalDisclaimer;
export const Button = BottomModalButton;

const components = {
  Title,
  Disclaimer,
  Button,
};

export default Object.assign(BottomModal, components);
