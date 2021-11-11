import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  DateModalButtonsContainer,
  DateModalContainer,
  DateModalInner,
} from './date-modal.styled';
import 'react-datepicker/dist/react-datepicker.css';

export const DateModal: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date: Date) => {
    setDate(date);
  };

  return (
    <DateModalContainer>
      <DateModalInner>
        <div>
          <ReactDatePicker
            selected={date}
            onChange={onChange}
            inline
            calendarClassName="date-modal-picker"
          />

          <DateModalButtonsContainer>
            <button className="button-accept">OK</button>
            <button className="button-cancel">Cancel</button>
          </DateModalButtonsContainer>
        </div>
      </DateModalInner>
    </DateModalContainer>
  );
};
