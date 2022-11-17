import React, { useEffect, useState, createRef, useRef, RefObject } from 'react';
import cn from 'classnames';
import './styles.scss';

import useMeasure from 'src/hooks/useMeasure';
import { isEmpty, isNumeric } from 'src/validations';
import { generateArray, getRandomId } from 'src/utils';
import { connect } from 'react-redux';
import { Input } from 'src/components/common';
import Element from 'src/components/common/Element';
import appConfig from 'src/appConfig';
import { IRootState } from 'src/redux/rootReducer';

const MAX_SIZE = 64;
const SPACE_BETWEEN = 24;
const SPACE_BETWEEN_SMALL = 8;
const SPACE_AROUND = 0;

const getDiff = (str1: string, str2: string) => {
  const res = str2.replace(str1, '');
  return res;
};

const ComfirmationCodeField: React.FC<Props> = ({
  label,
  errorMessage,
  fields = appConfig.VERIFICATION_CODE_LENGTH,
  containerClassName,
  className,
  onChange,
}) => {
  const id = useRef<string>(`code-field-${getRandomId()}`);
  const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);
  const [valueArr, setValue] = useState(generateArray(fields));
  const {
    bind,
    bounds: { width },
  } = useMeasure();
  const [cellSize, setCellSize] = useState(MAX_SIZE);
  const isBackward = useRef(false);

  // Auto size width of text field when screen is small
  useEffect(() => {
    if (width > 0) {
      const spaceBetween = width > 768 ? SPACE_BETWEEN : SPACE_BETWEEN_SMALL;
      const size = (width - spaceBetween * (fields - 1) - SPACE_AROUND * 2) / fields;

      if (size < MAX_SIZE) setCellSize(size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // Link ref to input fields
  useEffect(() => {
    setRefs((elRefs) => generateArray(fields).map((_, i) => elRefs[`${i}`] || createRef()));
  }, [fields]);

  const handleInputChange = (idx: number) => (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    handleValueChange(idx, value);
  };

  const handleValueChange = (idx: number, value: string) => {
    if (isNumeric(value)) {
      const updatedValue = [...valueArr];
      const pasteValue = getDiff(valueArr[`${idx}`], value);

      if (isEmpty(pasteValue)) {
        updatedValue[`${idx}`] = '';
        move(idx);
      } else {
        pasteValue.split('').map((x, i) => (updatedValue[idx + i] = x));
        move(idx + pasteValue.length - 1);
      }

      updatedValue.splice(fields);
      setValue(updatedValue);
      onChange(updatedValue.join(''));
    }
  };

  const handleKeyPress = (idx: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    switch (key) {
      case 'ArrowLeft':
        isBackward.current = true;
        move(idx);
        break;
      case 'ArrowRight':
        move(idx);
        break;
      case 'Delete':
        handleValueChange(idx, '');
        break;
      case 'Backspace':
        isBackward.current = true;
        handleValueChange(idx, '');
        // prevent Default to prevent delete 2 times
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const move = (idx: number) => {
    if (isBackward.current) {
      isBackward.current = false;
      moveBackward(idx);
    } else {
      moveForward(idx);
    }
  };

  const moveForward = (idx: number) => {
    if (idx + 1 < fields) {
      refs[idx + 1]?.current?.focus();
    } else {
      refs[fields - 1].current?.focus();
    }
  };

  const moveBackward = (idx: number) => {
    idx > 0 && refs[idx - 1].current?.focus();
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };

  const inputContainerClassName =
    width > 768 ? 'cmp-code-field__input--container' : 'cmp-code-field__input--container-small';
  const hasError = !!errorMessage;
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
    >
      <div className={cn('cmp-code-field__container', className)} {...bind}>
        {generateArray(fields).map((_, index) => (
          <Input
            key={`code-field-${index}`}
            inputMode="decimal"
            inputRef={refs[`${index}`]}
            containerClassName={cn(inputContainerClassName)}
            className={cn('cmp-code-field__input')}
            errorMessage={hasError ? ' ' : ''}
            value={valueArr[`${index}`]}
            onKeyDown={handleKeyPress(index)}
            onChange={handleInputChange(index)}
            style={cellStyle}
            hideIconError
          />
        ))}
      </div>
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    label?: string | React.ReactNode;
    errorMessage?: string;
    onChange: (...args: any[]) => void;
    fields?: number;
    containerClassName?: string;
    className?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComfirmationCodeField);
