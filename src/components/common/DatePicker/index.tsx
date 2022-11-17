import React, { useRef } from 'react';
import cn from 'classnames';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import './styles.scss';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import { Callback } from 'src/redux/types';

const DateSelector: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'MM/DD/YYYY',
  dateFormat = 'MM/dd/yyyy',
  required,
  name,
  onBlur,
  isTranslatable,
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);
  // For more information:
  // https://reactdatepicker.com/
  const handleChange = (value: Date) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker', containerClassName)}
      required={required}
      isTranslatable={isTranslatable}
    >
      <DatePicker
        id={id.current}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholderText={placeholder}
        className={cn(
          'cmp-datepicker__input',
          { 'cmp-datepicker__input--error': hasError },
          classNames
        )}
        showPopperArrow={false}
        dateFormat={dateFormat}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        {...props}
      />
    </Element>
  );
};

type BaseDatePickerProps = Pick<
  ReactDatePickerProps,
  Exclude<keyof ReactDatePickerProps, 'onChange' | 'onBlur'>
>;

type Props = BaseDatePickerProps & {
  errorMessage?: string;
  containerClassName?: string;
  classNames?: string;
  placeholder?: string;
  mask?: string;
  label?: string | React.ReactNode;
  onChange: Callback;
  onBlur?: Callback;
  hasDifferentValue?: boolean;
  isTranslatable?: boolean;
};

export default DateSelector;
