import React, { useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../common/Element';
// import { isEmpty } from 'src/validations';
import { formatMoneyInput, getRandomId } from 'src/utils';
import { Input, InputCurrency } from '../common';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export type HeaderItem = {
  title: string;
  subTitle?: string;
  rowSpan: number;
  colSpan: number;
};

export type HeaderList = Array<HeaderItem[]>;

const DEFAULT_FIRST_COLUMN = 'year';

const CountTable: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  name,
  onBlur,
  currentYear,
  // columnHeaders,
  headerList,
  data,
  ...props
}) => {
  const id = useRef<string>(`counting-table-${getRandomId()}`);
  const rowFiled = Object.keys(data[0]);
  const countingField = rowFiled.slice(1);
  const convertedData = useMemo(
    () =>
      data.map((item) => {
        let temp = { ...item };
        countingField.forEach(
          (name) =>
            (temp[`${name}`] = (
              <Input
                defaultValue={formatMoneyInput(temp[`${name}`])}
                disabled
                iconName="ic_dollar"
                className="cmp-count-table__input cmp-count-table__input--dark"
              />
            ))
        );
        return temp;
      }),
    [data, countingField]
  );

  const reducer = (currentValue: Object) => {
    return countingField.reduce((sum, name) => (sum += currentValue[`${name}`]), 0);
  };
  const total = useMemo(
    () => data.reduce((sum, object) => sum + reducer(object), 0),
    // eslint-disable-next-line
    [data]
  );

  const [countingRow, setCountingRow] = useState<Object>(
    Object.fromEntries(countingField.map((item) => [item, 0]))
  );
  const handleChange = (name: string, value: number) => {
    setCountingRow({ ...countingRow, [name]: value });
  };
  const firstRow = Object.fromEntries(
    rowFiled.map((name) =>
      name === DEFAULT_FIRST_COLUMN
        ? [name, currentYear]
        : [
            name,
            <InputCurrency
              className="cmp-count-table__input"
              placeholder="Enter cost here"
              name={name}
              onChange={handleChange}
              value={countingRow[`${name}`]}
            />,
          ]
    )
  );

  const records = currentYear ? [firstRow, ...convertedData] : convertedData;

  const renderTotal = () => {
    const data = total + reducer(countingRow);
    onChange(data);
    return formatMoneyInput(data);
  };

  const header = useMemo(
    () =>
      headerList.map((list) => (
        <TableRow>
          {list.map((item) => (
            <TableCell colSpan={item.colSpan} rowSpan={item.rowSpan}>
              {item.title}
              {item.subTitle && (
                <span className="cmp-count-table__header--light">
                  <br />
                  {item.subTitle}
                </span>
              )}
            </TableCell>
          ))}
        </TableRow>
      )),
    [headerList]
  );

  const body = records.map((record) => (
    <TableRow>
      {rowFiled.map((name) => (
        <TableCell>{record[`${name}`]}</TableCell>
      ))}
    </TableRow>
  ));

  // const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-count-table', containerClassName)}
    >
      <Table>
        <TableHead>{header}</TableHead>
        <TableBody>
          {body}
          <TableRow>
            <TableCell>TOTAL</TableCell>
            <TableCell colSpan={countingField.length}>
              <Input
                value={renderTotal()}
                disabled
                iconName="ic_dollar"
                className="cmp-count-table__input cmp-count-table__input--dark"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    name?: string;
    label?: string | React.ReactNode;
    headerList?: HeaderList;
    // columnHeaders: string[];
    currentYear?: number;
    data: Array<Object>;
    onChange: (value: number) => void;
    onBlur?: (name: string, value: boolean) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CountTable);
