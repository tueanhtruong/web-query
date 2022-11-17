import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { IRootState } from 'src/redux/rootReducer';
import { Input } from '..';
import { InputIcon, InputProps } from '../Input';
import { Callback } from 'src/redux/types';
import { emptyFunction, MoneyInputDetect } from 'src/utils';

const DollarInputIcon = (
  <InputIcon
    iconName={'ic_dollar'}
    isIconPositionLeft={true}
    iconComponent={null}
    onIconClick={emptyFunction}
  />
);

const customInput = ({ ...props }) => (
  <Input customIcon={DollarInputIcon} iconPosition="left" {...props} />
);

const InputCurrency: React.FC<Props> = ({
  unFixedDecimalScale = false,
  name,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (values) => {
    const { floatValue } = values;
    const returnValue = floatValue ? floatValue : floatValue === 0 ? 0 : null;
    onChange(name, returnValue);
  };
  return (
    <CurrencyFormat
      customInput={customInput}
      thousandSeparator
      fixedDecimalScale={!unFixedDecimalScale}
      decimalScale={2}
      displayType="input"
      onValueChange={handleChange}
      {...props}
      name={name}
      value={typeof value === 'string' ? value : MoneyInputDetect(value)}
    />
  );
};
type Props = Omit<CurrencyFormat.Props, 'InputProps'> & { InputProps: InputProps } & {
  unFixedDecimalScale?: boolean;
  value: string | number;
  name: string;
  onChange: Callback;
};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputCurrency);
