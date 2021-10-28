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
import { Link } from 'react-router-dom';

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
      <div className="main-container-menu">
        {props.menu ? (
          props.menu.map((row, i) => (
            <BottomModalContainerInner key={i}>
              {i === 0 && children && (
                <div className="main-content-bottom-modal">{children}</div>
              )}

              {row.map((menu, index) => (
                <div
                  key={index}
                  className={classNames('menu-item', menu.className)}
                >
                  {menu.href ? (
                    <a href={menu.href} onClick={menu.onClick}>
                      {menu.label}
                    </a>
                  ) : menu.to ? (
                    <Link to={menu.to}>{menu.label}</Link>
                  ) : (
                    <button onClick={menu.onClick}>{menu.label}</button>
                  )}
                </div>
              ))}
            </BottomModalContainerInner>
          ))
        ) : (
          <BottomModalContainerInner>{children}</BottomModalContainerInner>
        )}
      </div>
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
