import classNames from 'classnames';
import React from 'react';
import { TogglerOption, TogglerProps } from './toggler.interface';
import { TogglerContainer } from './toggler.styled';

export const Toggler: React.FC<TogglerProps> = (props) => {
  const { onChange, ...containerProps } = props;
  const { options, classes, disabled } = containerProps;

  const onClickOption = (option: TogglerOption) => {
    return () => {
      if (onChange) {
        return onChange(option);
      }
    };
  };

  return (
    <TogglerContainer {...containerProps}>
      {options.map((option, index) => (
        <div
          key={index}
          className={classNames(
            'toggler-option-container',
            classes?.optionContainer
          )}
        >
          <button
            className={classNames(
              'toggler-option-button',
              classes?.optionButton
            )}
            disabled={disabled}
            onClick={onClickOption(option)}
          >
            {option.label}
          </button>
        </div>
      ))}
    </TogglerContainer>
  );
};
