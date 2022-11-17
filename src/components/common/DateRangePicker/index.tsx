import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import dayjs from 'dayjs';

export type DateRange = [Date, Date];

const DateRangePicker: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'MM/DD/YYYY - MM/DD/YYYY',
  dateFormat = 'MM/DD/YYYY',
  selecteds,
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<DateRange>(selecteds as DateRange);

  const handleDateChange = (dates: DateRange) => {
    setDates(dates);

    if (!!dates[0] && !!dates[1]) {
      setIsOpen(false);
      onChange(dates);
    }
  };

  const fomartDates = (): string => {
    if (isEmpty(selecteds)) return '';

    return selecteds?.map((x) => dayjs(x).format(dateFormat as string)).join(' - ') || '';
  };

  const handleClickOutside = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpen(false);
  };

  // For more information:
  // https://reactdatepicker.com/

  const hasError = !isEmpty(errorMessage);
  const startDate = dates?.[0];
  const endDate = dates?.[1];
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker', containerClassName)}
    >
      <DatePicker
        id={id.current}
        onChange={handleDateChange}
        placeholderText={placeholder}
        className={cn(
          'cmp-datepicker__input',
          { 'cmp-datepicker__input--error': hasError },
          classNames
        )}
        showPopperArrow={false}
        {...props}
        value={fomartDates()}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={handleClickOutside}
      />
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ReactDatePickerProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    label?: string;
    onChange?: (value: DateRange) => void;
    selecteds?: [Date, Date];
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePicker);
