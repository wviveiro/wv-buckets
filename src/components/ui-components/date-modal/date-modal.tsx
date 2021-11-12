import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  DateModalButtonsContainer,
  DateModalContainer,
  DateModalInner,
} from './date-modal.styled';
import 'react-datepicker/dist/react-datepicker.css';
import { DateModalProps } from './date-modal.interface';
import { useDateModalState } from './date-modal.hook';

export const DateModal: React.FC<DateModalProps> = (props) => {
  const { open, date, onChange, onCancel, onAccept } = useDateModalState(props);

  return (
    <DateModalContainer open={open}>
      <DateModalInner open={open}>
        <div>
          <ReactDatePicker
            selected={date}
            onChange={onChange}
            inline
            calendarClassName="date-modal-picker"
          />

          <DateModalButtonsContainer>
            <button className="button-accept" onClick={onAccept}>
              OK
            </button>
            <button className="button-cancel" onClick={onCancel}>
              Cancel
            </button>
          </DateModalButtonsContainer>
        </div>
      </DateModalInner>
    </DateModalContainer>
  );
};
