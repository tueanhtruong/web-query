import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Button, View } from '..';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import { FiPaperclip, FiTrash } from 'react-icons/fi';

const InputFile: React.FC<Props> = ({
  label,
  errorMessage,
  containerClassName,
  classNames,
  name,
  labelButton = 'ADD FILE',
  onChange,
  onBlur,
  onClear,
}) => {
  const [fileName, setFileName] = useState<string>();
  const id = useRef<string>(`input-file-${getRandomId()}`);
  const file = useRef<HTMLInputElement>();

  const handleClickFile = () => {
    if (file && file.current) return file.current.click();
  };

  const handleChange = () => {
    const data = file?.current;
    setFileName(data.files[0].name);
    onChange(name, data.value);
  };

  const handleClear = () => {
    file?.current?.form?.reset();
    setFileName(null);
    onClear && onClear(name, null);
  };

  const hasError = !isEmpty(errorMessage);

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-input-file', containerClassName)}>
      <input className={cn('cmp-input-file__input')} type="file" ref={file} name={name} onChange={handleChange} />
      {!fileName ? (
        <Button
          label={labelButton}
          onClick={handleClickFile}
          className={cn('cmp-input-file__button', classNames, { hasError }, 'jump-in')}
          variant="secondary-outline"
          type="button"
          onBlur={() => onBlur && onBlur(name, true)}
        />
      ) : (
        <View isRow flexGrow={1} align="center" className="jump-in">
          <FiPaperclip className={cn('cmp-input-file__icon')} />
          <p className={cn('cmp-input-file__name')}>{fileName}</p>
          <FiTrash className={cn('cmp-input-file__icon--trash')} onClick={handleClear} />
        </View>
      )}
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    name?: string;
    label?: string | React.ReactNode;
    labelButton?: string;
    onChange: (name: string, value: any) => void;
    onBlur?: (name: string, value: boolean) => void;
    onClear?: (name: string, value: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputFile);
